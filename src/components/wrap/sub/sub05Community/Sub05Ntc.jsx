/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./scss/Sub05Ntc.scss";

function Sub05Ntc() {
  const [state, setState] = React.useState({
    공지사항: [],
    필터공지사항: [],
    검색: "",
    셀렉트: "",
  });


  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10; 


  const parseDate = (s) => {
    if (!s) return new Date(0);
    return new Date(s.replace(/\./g, "-"));
  };

  React.useEffect(() => {
    axios({
      url: "./json/sub05/notice.json",
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          let list = res.data.공지사항 ?? [];

          
          list = [...list]
            .sort((a, b) => {
              const d = parseDate(b.date) - parseDate(a.date);
              if (d !== 0) return d;
              return (b.idx ?? 0) - (a.idx ?? 0);
            })
            // 각 항목에 고유 rowId 추가
            .map((item, i) => ({ ...item, _rowId: `${item.idx}-${i}` }));

          setState((prev) => ({
            ...prev,
            공지사항: list,
            필터공지사항: list,
          }));
        }
      })
      .catch(console.error);
  }, []);


  const onChangeSearch = (e) => {
    setState((prev) => ({ ...prev, 검색: e.target.value }));
  };


  const onChangeSelect = (e) => {
    setState((prev) => ({ ...prev, 셀렉트: e.target.value }));
  };


  const onSubmitSearch = (e) => {
    e.preventDefault();
    const { 검색, 셀렉트, 공지사항 } = state;
    const q = (검색 || "").trim().toLowerCase();

    if (q === "") {
      setState((prev) => ({
        ...prev,
        필터공지사항: prev.공지사항,
        셀렉트: "",
      }));
      setCurrentPage(1); 
      return;
    }

    const field = 셀렉트 === "" ? "subject" : 셀렉트;
    const filtered = 공지사항.filter((item) =>
      String(item[field] ?? "").toLowerCase().includes(q)
    );

    setState((prev) => ({
      ...prev,
      필터공지사항: filtered,
    }));
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
    <div id="sub05Ntc" className="container">
      
      <div className="breadcrumb">
        <Link to="/mainComponent">
          <i className="bi bi-house"></i>
        </Link>{" "}
        &gt; <Link to="." reloadDocument>공지사항</Link> 
      </div>

      <h2>공지사항</h2>

     
      <div className="search-bar">
        <form onSubmit={onSubmitSearch} className="search-form">
          <div className="select">
            <select
              id="select"
              name="select"
              value={state.셀렉트}
              onChange={onChangeSelect}
              aria-label="검색 항목 선택"
            >
              <option value="">항목선택</option>
              <option value="subject">제목</option>
              <option value="date">날짜</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={state.검색}
            onChange={onChangeSearch}
            onKeyDown={onKeyDownSearch}
            name="search"
            id="search"
          />
          <button type="submit">검색</button>
        </form>

        <Link to="/NtcAdmin" className="admin-btn">
          관리자 페이지
        </Link>
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
            currentItems.map((item, idx) => (
              <li key={item._rowId} className="row">
                
                <span className="col-num">
                  {totalItems - (indexOfFirst + idx)}
                </span>
                <span className="col-title">
                  <Link to={`/NtcV/${item.idx}`} state={item}>
                    {item.subject}
                  </Link>
                </span>
                <span className="col-date">{item.date}</span>
                <span className="col-writer">{item.name}</span>
                <span className="col-views">{item.hit}</span>
              </li>
            ))
          ) : (
            <li className="no-result">검색 결과가 없습니다.</li>
          )}
        </ul>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={`page-${i + 1}`}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
}

export default Sub05Ntc;
