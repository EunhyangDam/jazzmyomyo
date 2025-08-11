import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./scss/Sub080Mm.scss";

/** localStorage에서 초기 멤버 복원 (없으면 더미 사용) */
const getInitialMembers = () => {
  try {
    const saved = localStorage.getItem("members");
    if (saved) return JSON.parse(saved);
  } catch {}
  return [
    {
      id: 1, userId: "myomyo", name: "이묘묘", gender: "여", birth: "2000-01-01",
      phone: "010-1234-5678", email: "blue3@email.com", addr: "서울시 중구 장충동",
      consent: "Y", grade: "일반회원", status: "정상", joinedAt: "2025-07-07",
    },
    {
      id: 3, userId: "jazzman", name: "박재즈", gender: "여", birth: "1995-09-20",
      phone: "010-1111-2222", email: "jazzman@email.com", addr: "서울시 마포구 서교동",
      consent: "N", grade: "일반회원", status: "정상", joinedAt: "2025-05-30",
    },
    {
      id: 4, userId: "winequeen", name: "이와인", gender: "여", birth: "1992-07-05",
      phone: "010-3333-4444", email: "winequeen@email.com", addr: "인천시 연수구 송도동",
      consent: "Y", grade: "일반회원", status: "정상", joinedAt: "2025-04-25",
    },
    {
      id: 5, userId: "guitarcat", name: "홍기타", gender: "여", birth: "1988-11-11",
      phone: "010-5555-6666", email: "guitarcat@email.com", addr: "대구시 수성구 범어동",
      consent: "N", grade: "일반회원", status: "정상", joinedAt: "2025-03-18",
    },
    {
      id: 6, userId: "coffeeholic", name: "정커피", gender: "여", birth: "1999-12-25",
      phone: "010-7777-8888", email: "coffee@email.com", addr: "광주시 서구 치평동",
      consent: "Y", grade: "단골회원", status: "정상", joinedAt: "2025-02-01",
    },
  ];
};

function Sub080Mm() {
  // 1) 상태
  const [members, setMembers] = useState(getInitialMembers);
  const [keyword, setKeyword] = useState("");
  const [sortKey, setSortKey] = useState("join"); // join | name | grade | userId
  const [selected, setSelected] = useState(new Set());

  const [page, setPage] = useState(1);
  const pageSize = 10;

  // 2) 라우터 훅
  const location = useLocation();
  const navigate = useNavigate();

  // 3) 상세/수정에서 온 수정본을 머지 (라우터 state 우선, 없으면 sessionStorage 백업)
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

    // 청소
    sessionStorage.removeItem("updatedMember");
    navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate]);

  // 4) members 변경시 localStorage에 저장 (다른 페이지 갔다 와도 유지)
  useEffect(() => {
    try {
      localStorage.setItem("members", JSON.stringify(members));
    } catch {}
  }, [members]);

  // 5) 선택/삭제 등
  const allSelected = useMemo(
    () => members.length > 0 && selected.size === members.length,
    [members, selected]
  );

  const onToggleAll = () => {
    setSelected((prev) =>
      prev.size === members.length ? new Set() : new Set(members.map((m) => m.id))
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
    if (selected.size === 0) return;
    if (!window.confirm("선택한 회원을 삭제할까요?")) return;
    setMembers((prev) => prev.filter((m) => !selected.has(m.id)));
    setSelected(new Set());
  };

  // 6) 검색 + 정렬
  const filteredSorted = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    const filtered = members.filter((m) => {
      const text = `${m.id} ${m.userId} ${m.name} ${m.gender} ${m.birth} ${m.phone} ${m.email} ${m.addr} ${m.consent} ${m.grade} ${m.status} ${m.joinedAt}`.toLowerCase();
      return text.includes(k);
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name, "ko");
      if (sortKey === "grade") return a.grade.localeCompare(b.grade, "ko");
      if (sortKey === "userId") return a.userId.localeCompare(b.userId, "ko");
      // 가입일 오름차순(오래된 먼저)
      return new Date(a.joinedAt) - new Date(b.joinedAt);
    });

    return sorted;
  }, [keyword, members, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, page]);

  useEffect(() => { setPage(1); }, [keyword, sortKey, members.length]);

  return (
    <div id="sub080Mm">
      <div className="admin-wrap">
        {/* 사이드바 */}
        <aside className="sidebar">
          <h2>회원관리</h2>
          <ul>
            <li className="active"><a href="#!">회원리스트</a></li>
            <li><Link to="/MmGrade">회원등급설정</Link></li>
            <li><a href="/MmSign">회원가입설정</a></li>
          </ul>
        </aside>

        {/* 메인 */}
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
              <option value="join">회원가입순</option>
              <option value="name">이름순</option>
              <option value="grade">등급순</option>
              <option value="userId">아이디순</option>
            </select>
          </div>

          <div className="member-table-wrap">
            <table className="member-table">
              <thead>
                <tr>
                  <th><input type="checkbox" checked={allSelected} onChange={onToggleAll} aria-label="전체선택" /></th>
                  <th>번호</th>
                  <th>아이디</th>
                  <th>이름</th>
                  <th>성별</th>
                  <th>생년월일</th>
                  <th>연락처</th>
                  <th>이메일</th>
                  <th>주소</th>
                  <th>수신동의</th>
                  <th>등급</th>
                  <th>상태</th>
                  <th>가입일</th>
                </tr>
              </thead>

              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={13} style={{ padding: 24, textAlign: "center" }}>
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                ) : (
                  paged.map((m, idx) => (
                    <tr key={m.id}>
                      <td data-label="선택">
                        <input
                          type="checkbox"
                          checked={selected.has(m.id)}
                          onChange={() => onToggleOne(m.id)}
                          aria-label={`${m.name} 선택`}
                        />
                      </td>
                      {/* 페이지 기준 번호 */}
                      <td data-label="번호">{(page - 1) * pageSize + idx + 1}</td>
                      <td data-label="아이디">{m.userId}</td>
                      <td data-label="이름">
                        <Link to={`/MmView/${m.id}`} className="name-link" state={{ member: m }}>
                          {m.name}
                        </Link>
                      </td>
                      <td data-label="성별">{m.gender}</td>
                      <td data-label="생년월일">{m.birth}</td>
                      <td data-label="연락처">{m.phone}</td>
                      <td data-label="이메일">{m.email}</td>
                      <td data-label="주소">{m.addr}</td>
                      <td data-label="수신동의">{m.consent}</td>
                      <td data-label="등급">{m.grade}</td>
                      <td data-label="상태">{m.status}</td>
                      <td data-label="가입일">{m.joinedAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <nav className="pagination">
            <button onClick={() => setPage(1)} disabled={page === 1}>« 처음</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹ 이전</button>

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

            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>다음 ›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>끝 »</button>
          </nav>
        </main>
      </div>
    </div>
  );
}

export default Sub080Mm;