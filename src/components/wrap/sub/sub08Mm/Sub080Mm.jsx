/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./scss/Sub080Mm.scss";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  confirmModalAction,
  confirmModalYesNoAction,
} from "../../../../store/confirmModal";

function Sub080Mm() {
  const [members, setMembers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortKey, setSortKey] = useState("joinDesc");
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const getGender = (g) => {
    if (!g || g === "선택안함") return "선택안함";
    return g;
  };

  useEffect(() => {
    const syncUrl = "/jazzmyomyo/member_table_sync.php";
    const url = "/jazzmyomyo/member_table_select.php";
  
    setLoading(true);
    setErr(null);
  
    // 1) 먼저 동기화 실행
    axios
      .get(syncUrl, { headers: { "Cache-Control": "no-cache" } })
      .then(() => {
        // 2) 그 다음 회원목록 가져오기
        return axios.get(url, { headers: { "Cache-Control": "no-cache" } });
      })
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : [];
        const fixed = arr.map((x) => ({ ...x, consent: x.agree }));
        if (!fixed.length) throw new Error("회원 데이터가 비었습니다.");
        setMembers(fixed);
        setPage(1);
      })
      .catch((e) => {
        const msg = e?.response
          ? `HTTP ${e.response.status} ${e.response.statusText}`
          : e?.message || "데이터 로드 실패";
        setErr(msg);
        console.error("[Members] fetch error:", msg, "url:", url);
      })
      .finally(() => setLoading(false));
  }, []);
  

  useEffect(() => {
    const fromState = location.state?.updatedMember;
    const fromSession = (() => {
      try {
        const raw = sessionStorage.getItem("updatedMember");
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    })();

    const m = fromState ?? fromSession;
    if (!m) return;

    setMembers((prev) =>
      prev.some((x) => x.id === m.id)
        ? prev.map((x) => (x.id === m.id ? m : x))
        : [m, ...prev]
    );

    sessionStorage.removeItem("updatedMember");
    navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate]);

  const allSelected = useMemo(
    () => members.length > 0 && selected.size === members.length,
    [members, selected]
  );

  const onToggleAll = () => {
    setSelected((prev) =>
      prev.size === members.length
        ? new Set()
        : new Set(members.map((m) => m.id))
    );
  };

  const onToggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const onDeleteSelected = () => {
    if (selected.size === 0) {
      dispatch(
        confirmModalAction({
          heading: "선택된 회원이 없습니다.",
          explain: "",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
      return;
    }
    dispatch(
      confirmModalAction({
        heading: "정말 삭제하시겠습니까?",
        explain: "선택한 회원이 목록에서 제거됩니다.",
        isON: true,
        isConfirm: true,
        message1: "예",
        message2: "아니오",
      })
    );
  };

  useEffect(() => {
    if (modal.isYes === true && modal.isConfirm) {
      dispatch(confirmModalYesNoAction(false));
  
      const ids = Array.from(selected);
  
      // 🔸 서버에 삭제 요청 보내기
      Promise.all(
        ids.map(idx =>
          axios.get("/jazzmyomyo/member_table_delete.php", { params: { idx } })
        )
      )
        .then(() => {
          // 성공하면 프론트 state에서도 제거
          setMembers(prev => prev.filter(m => !selected.has(m.id)));
          setSelected(new Set());
          dispatch(
            confirmModalAction({
              heading: "삭제되었습니다.",
              explain: "",
              isON: true,
              isConfirm: false,
              message1: "",
              message2: "",
            })
          );
        })
        .catch((err) => {
          console.error("삭제 실패", err);
          dispatch(
            confirmModalAction({
              heading: "삭제 실패",
              explain: "서버 오류가 발생했습니다.",
              isON: true,
              isConfirm: false,
              message1: "",
              message2: "",
            })
          );
        });
    }
  }, [modal.isYes, modal.isConfirm]);
  

  const toTime = (s) => new Date(String(s)).getTime() || 0;

  const filteredSorted = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    const filtered = members.filter((m) => {
      const text =
        `${m.id} ${m.userId} ${m.name} ${m.gender} ${m.birth} ${m.phone} ${m.email} ${m.addr} ${m.consent} ${m.grade} ${m.status} ${m.joinedAt}`.toLowerCase();
      return text.includes(k);
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name, "ko");
      if (sortKey === "grade") return a.grade.localeCompare(b.grade, "ko");
      if (sortKey === "userId") return a.userId.localeCompare(b.userId, "ko");
      if (sortKey === "joinAsc") return toTime(a.joinedAt) - toTime(b.joinedAt);
      return toTime(b.joinedAt) - toTime(a.joinedAt);
    });

    return sorted;
  }, [keyword, members, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, page]);

  useEffect(() => {
    setPage(1);
  }, [keyword, sortKey, members.length]);

  if (loading) {
    return (
      <div id="sub080Mm">
        <div className="admin-wrap">
          <main className="main" style={{ padding: 40, textAlign: "center" }}>
            불러오는 중…
          </main>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div id="sub080Mm">
        <div className="admin-wrap">
          <main
            className="main"
            style={{ padding: 40, textAlign: "center", color: "#c00" }}
          >
            데이터를 불러오지 못했어요. ({err})
          </main>
        </div>
      </div>
    );
  }

  return (
    <div id="sub080Mm">
      <div className="admin-wrap">
        <aside className="sidebar">
          <h2>회원관리</h2>
          <ul>
            <li className="active">
              <a href="#!">회원리스트</a>
            </li>
            <li>
              <Link to="/mmGrade">회원등급설정</Link>
            </li>
            <li>
              <a href="/mmSign">회원가입설정</a>
            </li>
          </ul>
        </aside>

        <main className="main">
          <header className="page-header">
            <h1>회원리스트</h1>
            <div className="btns" />
          </header>

          <div className="table-controls">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <button className="btn gray" onClick={onToggleAll}>
              {allSelected ? "전체해제" : "전체선택"}
            </button>

            <button className="btn red" onClick={onDeleteSelected}>
              선택삭제
            </button>

            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              id="sortSelect"
            >
              <option value="joinDesc">가입일(최신순)</option>
              <option value="joinAsc">가입일(오래된순)</option>
              <option value="name">이름순</option>
              <option value="grade">등급순</option>
              <option value="userId">아이디순</option>
            </select>
          </div>

          <div className="member-head" aria-hidden="true">
            <div className="col col-check">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAll}
                aria-label="전체선택"
              />
            </div>
            <div className="col col-no">번호</div>
            <div className="col col-userId">아이디</div>
            <div className="col col-name">이름</div>
            <div className="col col-gender">성별</div>
            <div className="col col-birth">생년월일</div>
            <div className="col col-phone">연락처</div>
            <div className="col col-email">이메일</div>
            <div className="col col-addr">주소</div>
            <div className="col col-consent">수신동의</div>
            <div className="col col-grade">등급</div>
            <div className="col col-status">상태</div>
            <div className="col col-joinedAt">가입일</div>
          </div>

          <div className="member-list-wrap">
            {paged.length === 0 ? (
              <div className="empty">검색 결과가 없습니다.</div>
            ) : (
              <ul className="member-list" role="list">
                {paged.map((m, idx) => (
                  <li className="member-row" key={m.id}>
                    <div className="col col-check" data-label="선택">
                      <input
                        type="checkbox"
                        checked={selected.has(m.id)}
                        onChange={() => onToggleOne(m.id)}
                        aria-label={`${m.name} 선택`}
                      />
                    </div>
                    <div className="col col-no" data-label="번호">
                      {(page - 1) * pageSize + idx + 1}
                    </div>
                    <div className="col col-userId" data-label="아이디">
                      {m.userId}
                    </div>
                    <div className="col col-name" data-label="이름">
                      <Link
                        to={`/mmView/${m.id}`}
                        className="name-link"
                        state={{ member: m }}
                      >
                        {m.name}
                      </Link>
                    </div>
                    <div className="col col-gender" data-label="성별">
                      {getGender(m.gender)}
                    </div>
                    <div className="col col-birth" data-label="생년월일">
                      {m.birth}
                    </div>
                    <div className="col col-phone" data-label="연락처">
                      {m.phone}
                    </div>
                    <div className="col col-email" data-label="이메일">
                      {m.email}
                    </div>
                    <div className="col col-addr" data-label="주소">
                      {m.addr}
                    </div>
                    <div className="col col-consent" data-label="수신동의">
                      {m.agree}
                    </div>
                    <div className="col col-grade" data-label="등급">
                      {m.grade}
                    </div>
                    <div className="col col-status" data-label="상태">
                      {m.status}
                    </div>
                    <div className="col col-joinedAt" data-label="가입일">
                      {m.joinedAt}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav className="pagination">
            <button onClick={() => setPage(1)} disabled={page === 1}>
              « 처음
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ‹ 이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  className={`page ${page === n ? "active" : ""}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              다음 ›
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              끝 »
            </button>
          </nav>
        </main>
      </div>
    </div>
  );
}

export default Sub080Mm;
