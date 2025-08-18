/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./scss/Sub05NtcAdmin.scss";

function Sub05NtcAdmin() {

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectField, setSelectField] = React.useState("");


  const [list, setList] = React.useState([]); 
  const [filteredList, setFilteredList] = React.useState([]); 


  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;


  const parseDate = (s) => {
    if (!s) return new Date(0);
    return new Date(String(s).replace(/\./g, "-"));
  };


  React.useEffect(() => {
    axios
      .get("./json/sub05/notice.json")
      .then((res) => {
        const raw = Array.isArray(res.data?.공지사항) ? res.data.공지사항 : [];
        const sorted = [...raw]
          .sort((a, b) => {
            const d = parseDate(b.date) - parseDate(a.date);
            if (d !== 0) return d;
            return (b.idx ?? 0) - (a.idx ?? 0);
          })
          .map((it, i) => ({ ...it, _rowId: `${it.idx}-${i}` }));
        setList(sorted);
        setFilteredList(sorted);
        setCurrentPage(1);
      })
      .catch(console.error);
  }, []);


  const onSubmitSearch = (e) => {
    e.preventDefault();
    const q = (searchTerm || "").trim().toLowerCase();

    if (!q) {
      setFilteredList(list);
      setSelectField("");
      setCurrentPage(1);
      return;
    }

    const field = selectField === "" ? "subject" : selectField;
    const next = list.filter((item) =>
      String(item[field] ?? "").toLowerCase().includes(q)
    );

    setFilteredList(next);
    setCurrentPage(1);
  };


  const onKeyDown = (e) => {
    if (e.key === "Enter") onSubmitSearch(e);
  };


  const onChangeSelect = (e) => {
    setSelectField(e.target.value);
    setCurrentPage(1);
  };


  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirst, indexOfLast);


  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div id="sub05NtcAdmin" className="container">

      <div className="breadcrumb">
        <Link to="/mainComponent"><i className="bi bi-house"></i></Link> &gt; <Link to="." reloadDocument>공지사항</Link> 
      </div>

      <h2>공지사항</h2>

      <div className="search-bar">
        <form onSubmit={onSubmitSearch} className="search-form">
          <div className="select">
            {/* <select
              id="admin-select"
              name="select"
              value={selectField}
              onChange={onChangeSelect}
              aria-label="검색 항목 선택"
            >
              <option value="">항목선택</option>
              <option value="subject">제목</option>
              <option value="date">날짜</option>
            </select> */}
          </div>

          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={onKeyDown}
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
            currentItems.map((item, idx) => (
              <li key={item._rowId}>

                <span className="col-num">{totalItems - (indexOfFirst + idx)}</span>
                <span className="col-title">
                  <Link to={`/NtcAdminV/${item.idx}`} state={item}>
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

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={`admin-page-${i + 1}`}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          &raquo;
        </button>

        <Link to="/NtcAdminW" className="write-btn">+ 글쓰기</Link>
      </div>
    </div>
  );
}

export default Sub05NtcAdmin;