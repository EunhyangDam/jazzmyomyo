/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./scss/Sub05NtcAdmin.scss";

function Sub05NtcAdmin() {
  const [state, setState] = React.useState({
    공지사항: [],
    필터공지사항: [],
    검색: "",
    검색조건: "subject",
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const parseDate = (s) => {
    if (!s) return new Date(0);
    return new Date(String(s).replace(/\./g, "-"));
  };

  React.useEffect(() => {
    axios({ url: "./json/sub05/notice.json", method: "GET" })
      .then((res) => {
        if (res.status === 200) {
          let list = res.data?.공지사항 ?? [];
          list = [...list]
            .sort((a, b) => {
              const d = parseDate(b.date) - parseDate(a.date);
              if (d !== 0) return d;
              return (b.idx ?? 0) - (a.idx ?? 0);
            })
            .map((item, i) => ({ ...item, _rowId: `${item.idx}-${i}` }));
          setState((p) => ({ ...p, 공지사항: list, 필터공지사항: list }));
        }
      })
      .catch(console.error);
  }, []);

  const onChangeSearch = (e) => {
    setState((p) => ({ ...p, 검색: e.target.value }));
  };

  const onChangeFilter = (e) => {
    setState((p) => ({ ...p, 검색조건: e.target.value }));
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    const q = (state.검색 || "").trim().toLowerCase();
    if (!q) {
      setState((p) => ({ ...p, 필터공지사항: p.공지사항 }));
      setCurrentPage(1);
      return;
    }
    const filtered = state.공지사항.filter((item) => {
      if (state.검색조건 === "subject") {
        return String(item.subject ?? "").toLowerCase().includes(q);
      } else if (state.검색조건 === "date") {
        return String(item.date ?? "").toLowerCase().includes(q);
      }
      return false;
    });
    setState((p) => ({ ...p, 필터공지사항: filtered }));
    setCurrentPage(1);
  };

  const onKeyDownSearch = (e) => {
    if (e.key === "Enter") onSubmitSearch(e);
  };

  const totalItems = state.필터공지사항.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = state.필터공지사항.slice(indexOfFirst, indexOfLast);

  return (
    <div id="sub05NtcAdmin">
      <div className="container">
        <div className="sangdan">
          <Link to="/mainComponent" aria-label="홈으로">
            <i className="bi bi-house-door-fill" />
          </Link>
          <span className="sep"><i className="bi bi-chevron-right"></i></span>
          <span className="admin">관리자페이지</span>
        </div>

        <div className="title-row">
          <h2><i class="bi bi-gear"></i> 공지사항 관리자</h2>
          <form className="search-form" onSubmit={onSubmitSearch}>
            <select value={state.검색조건} onChange={onChangeFilter} aria-label="검색조건 선택">
              <option value="">검색조건</option>
              <option value="subject">제목</option>
              <option value="date">날짜</option>
            </select>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={state.검색}
              onChange={onChangeSearch}
              onKeyDown={onKeyDownSearch}
              aria-label="공지사항 검색"
            />
            <button type="submit">검색</button>
          </form>
        </div>

        <div className="notice-list">
          <div className="list-header">
            <span className="col-num">번호</span>
            <span className="col-title">제목</span>
            <span className="col-date">날짜</span>
            <span className="col-writer">작성자</span>
            <span className="col-views">조회수</span>
          </div>

          <ul className="list-body">
            {currentItems.length > 0 ? (
              currentItems.map((item, idx) => {
                const runningNumber = totalItems - (indexOfFirst + idx);
                return (
                  <li key={item._rowId} className="row">
                    <span className="col-num">{runningNumber}</span>
                    <span className="col-title">
                      <Link to={`/NtcAdminV/${item.idx}`} state={item}>
                        {item.subject}
                      </Link>
                    </span>
                    <span className="col-date">{item.date}</span>
                    <span className="col-writer">{item.name}</span>
                    <span className="col-views">{item.hit}</span>
                  </li>
                );
              })
            ) : (
              <li className="no-result">검색 결과가 없습니다.</li>
            )}
          </ul>
        </div>

        <div className="list-actions">
          <Link to="/NtcAdminW" className="write-btn">글쓰기</Link>
        </div>

        {totalPages > 1 && (
          <div className="pagenation" role="navigation" aria-label="페이지네이션">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              aria-label="첫 페이지"
            >
              <i className="bi bi-chevron-double-left"></i>
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="이전 페이지"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={`page-${i + 1}`}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
                aria-current={currentPage === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="다음 페이지"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="마지막 페이지"
            >
              <i className="bi bi-chevron-double-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sub05NtcAdmin;
