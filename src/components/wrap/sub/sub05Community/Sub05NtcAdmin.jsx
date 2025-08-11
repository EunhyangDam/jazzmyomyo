import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./scss/Sub05NtcAdmin.scss";

function Sub05NtcAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const notices = [
    { id: 5, title: "묘묘 키링 1차 재입고 안내", date: "2025.08.07", writer: "관리자", views: 281, isNew: true },
    { id: 4, title: "여름 한정 신메뉴 “수박화채” 출시예정!", date: "2025.08.01", writer: "관리자", views: 586 },
    { id: 3, title: "8월 정기 공연 세션 공개", date: "2025.07.17", writer: "관리자", views: 612 },
    { id: 2, title: "재즈묘묘 정기 휴무 안내", date: "2025.02.08", writer: "관리자", views: 967 },
    { id: 1, title: "감성재즈바 재즈묘묘 오픈!", date: "2025.01.14", writer: "관리자", views: 988 }
  ];

  // 공통 필터 함수
  const runFilter = (term) => {
    const q = term.trim().toLowerCase();
    if (!q) return notices;
    return notices.filter((n) => n.title.toLowerCase().includes(q));
  };

  // 실시간 반영
  useEffect(() => {
    setFilteredList(runFilter(searchTerm));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // 버튼/엔터도 같은 로직
  const handleSearch = () => {
    setFilteredList(runFilter(searchTerm));
  };

  const displayedList = searchTerm ? filteredList : notices;

  return (
    <div id="sub05NtcAdmin" className="container">
      <div className="breadcrumb">
        <Link to="/mainComponent"><i className="bi bi-house"></i></Link> &gt; 공지사항
      </div>

      <h2>공지사항</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}         // 실시간
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}  // 엔터
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>날짜</th>
            <th>작성자</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {displayedList.length > 0 ? (
            displayedList.map((item) => (
              <tr key={item.id}>
                <td>{item.isNew ? <span className="badge-new">NEW</span> : item.id}</td>
                <td className="title">
                  <Link to={`/NtcAdminV/${item.id}`}>{item.title}</Link>
                </td>
                <td>{item.date}</td>
                <td>{item.writer}</td>
                <td>{item.views}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>검색 결과가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled>&laquo;</button>
        <button className="active">1</button>
        <button disabled>&raquo;</button>
        <Link to="/NtcAdminW" className="write-btn">+ 글쓰기</Link>
      </div>
    </div>
  );
}

export default Sub05NtcAdmin;