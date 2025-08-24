import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { confirmModalAction } from "../../../../store/confirmModal";
import "./scss/Sub085MmLental.scss";

export default function Sub086MmTk() {
  const dispatch = useDispatch();
  const modal = useSelector((s) => s.confirmModal);

  // 유틸
  const asDate = (s) => (s || "").slice(0, 10);
  const transResType = (t) =>
    t === "member" ? "회원예약" : t === "guest" ? "비회원예약" : "-";
  const normStatus = (s = "") => {
    const x = String(s).toLowerCase();
    if (x === "cancled") return "canceled";
    if (x === "eserved") return "reserved";
    return x;
  };
  const transOrderStatus = (s) =>
    ({ canceled: "취소", reserved: "예약중", completed: "확정", deleted: "삭제" }[
      normStatus(s)
    ] || "예약중");
  const displayUserId = (row) =>
    row?.resType === "member" && row?.userId ? row.userId : "-";
  const yyyymm = (s = "") => s.slice(0, 7);
  const getTime = (s) => {
    if (!s) return 0;
    // scheduleDate가 YYYY-MM-DD 형태면 Date로 안전 변환
    const d = s.length <= 10 ? `${s}T00:00:00` : s;
    const t = Date.parse(d);
    return Number.isNaN(t) ? 0 : t;
  };

  // 서버 원본 + 화면 가공
  const [rowsRaw, setRowsRaw] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // 정렬 & 필터
  const [sort, setSort] = useState("createdDesc"); // 예약 최신순
  const [month, setMonth] = useState("all"); // 신청월(예매일 createdAt 기준)
  const [statusFilter, setStatusFilter] = useState("all"); // all|reserved|canceled

  // 최근 12개월 옵션
  const monthOptions = useMemo(() => {
    const arr = [{ label: "전체", value: "all" }];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const v = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      arr.push({ label: v, value: v });
    }
    return arr;
  }, []);

  // 데이터 로드: 많이 받아와서 프론트에서 가공
  const load = React.useCallback(() => {
    axios
      .get("/jazzmyomyo/reservations_admin.php", {
        params: {
          page: 1,
          size: 1000, // 프론트 가공용으로 넉넉히
          month: "", // 서버 필터 안 씀 (프론트에서 month 처리)
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        setRowsRaw(data?.rows ?? []);
        setPage(1); // 새로고침 시 첫 페이지로
      })
      .catch((err) => {
        console.error(
          "[예약목록] 오류:",
          err?.response?.status,
          err?.response?.data
        );
        dispatch(
          confirmModalAction({
            heading: "알림!",
            explain: "목록을 불러오지 못했습니다.",
            isON: true,
            isConfirm: false,
            message1: "",
            message2: "",
          })
        );
      });
  }, [dispatch]);

  useEffect(() => {
    load();
  }, [load]);

  // 프론트 필터/정렬
  const derivedRows = useMemo(() => {
    let arr = rowsRaw.slice();

    // 월 필터 (createdAt 기준)
    if (month !== "all") {
      arr = arr.filter((r) => yyyymm(r.createdAt || "") === month);
    }

    // 상태 필터
    if (statusFilter === "reserved") {
      arr = arr.filter((r) => normStatus(r.orderStatus) === "reserved");
    } else if (statusFilter === "canceled") {
      arr = arr.filter((r) => normStatus(r.orderStatus) === "canceled");
    }

    // 정렬
    arr.sort((a, b) => {
      if (sort === "createdAsc")
        return getTime(a.createdAt) - getTime(b.createdAt);
      if (sort === "createdDesc")
        return getTime(b.createdAt) - getTime(a.createdAt);
      if (sort === "scheduleAsc")
        return getTime(a.scheduleDate) - getTime(b.scheduleDate);
      if (sort === "scheduleDesc")
        return getTime(b.scheduleDate) - getTime(a.scheduleDate);
      return 0;
    });

    return arr;
  }, [rowsRaw, month, statusFilter, sort]);

  // 페이지네이션 (프론트 슬라이스)
  const total = derivedRows.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pagedRows = useMemo(() => {
    const start = (page - 1) * perPage;
    return derivedRows.slice(start, start + perPage);
  }, [derivedRows, page, perPage]);

  return (
    <div id="Sub085MmLental">
      <div className="rental-list">
        <aside className="sidebar">
          <h2>회원관리</h2>
          <ul>
            <li>
              <Link to="/Mm">회원리스트</Link>
            </li>
            <li>
              <Link to="/MmGrade">회원등급설정</Link>
            </li>
            <li>
              <Link to="/MmSign">회원가입설정</Link>
            </li>
            <li>
              <Link to="/MmLental">대관신청관리</Link>
            </li>
            <li className="active">
              <Link to="/MmTk">공연예매 현황</Link>
            </li>
          </ul>
        </aside>

        <div className="main">
          <div className="top-title">
            <h1 className="title">공연예매 현황</h1>
            <div className="controls">
              <label>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="createdDesc">최신순</option>
                  <option value="createdAsc">오래된순</option>
                  <option value="scheduleAsc">공연일 빠른순</option>
                  <option value="scheduleDesc">공연일 늦은순</option>
                </select>
                정렬
              </label>

              <label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="all">전체</option>
                  <option value="reserved">예약중만</option>
                  <option value="canceled">취소만</option>
                </select>
                예약상태
              </label>

              <label>
                <select
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                    setPage(1);
                  }}
                >
                  {monthOptions.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                신청월
              </label>

              <label>
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(+e.target.value);
                    setPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                페이지당
              </label>
            </div>
          </div>

          <section className="tablewrap">
            <table className="table">
              <thead>
                <tr>
                  <th>예약번호</th>
                  <th>회원유무</th>
                  <th>예매일</th>
                  <th>공연일</th>
                  <th>예매인원</th>
                  <th>이름</th>
                  <th>아이디</th>
                  <th>연락처</th>
                  <th>이메일</th>
                  <th>예매상태</th>
                </tr>
              </thead>
              <tbody>
                {pagedRows.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="empty">
                      데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  pagedRows.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{transResType(r.resType)}</td>
                      <td>{asDate(r.createdAt)}</td>
                      <td>{asDate(r.scheduleDate)}</td>
                      <td>{r.peopleCount}</td>
                      <td>{r.userName}</td>
                      <td>{displayUserId(r)}</td>
                      <td>{r.userHp}</td>
                      <td>{r.userEmail}</td>
                      <td>{transOrderStatus(r.orderStatus)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

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
        </div>
      </div>
    </div>
  );
}