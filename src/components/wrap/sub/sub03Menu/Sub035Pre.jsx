import React, { useState } from "react";
import './scss/Sub035Pre.scss';
import { Link } from "react-router-dom";


export default function Sub03Pre() {
  const itemsPerPage = 5;

  const postData = [
    {
      id: 1,
      title: "[예약신청] 9월 12일 2인",
      author: "이시은",
      date: "2025-09-12",
      created: "2025-08-01",
      type: "예약완료",
    },
    {
      id: 2,
      title: "[예약신청] 9월 14일 3인",
      author: "이은지",
      date: "2025-09-14",
      created: "2025-08-02",
      type: "예약중",
    },
    {
      id: 3,
      title: "[예약신청] 9월 18일 4인",
      author: "박의연",
      date: "2025-09-18",
      created: "2025-08-03",
      type: "예약중",
    },
    {
      id: 4,
      title: "[예약신청] 9월 22일 3인",
      author: "정하은",
      date: "2025-09-22",
      created: "2025-08-04",
      type: "예약완료",
    },
    {
      id: 5,
      title: "[예약신청] 9월 25일 2인",
      author: "홍규린",
      date: "2025-09-25",
      created: "2025-08-05",
      type: "예약중",
    },
    {
      id: 6,
      title: "[예약신청] 9월 30일 5인",
      author: "홍길동",
      date: "2025-09-30",
      created: "2025-08-06",
      type: "예약취소",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPosts = postData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(postData.length / itemsPerPage);

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <section id="sub_pre">
      <div className="clipboard">
        <div className="clip"></div>
        <div className="paper">
          <h1>사전 예약 게시판</h1>
          <Link to='/PreW'
         className="write-button">
          사전주문신청
          </Link>

          {currentPosts.map((post) => (
            <div key={post.id} className="card">
              <Link to={`/PreV/view/${post.id}`} className="card-title">
                {post.title}
              </Link>
              <p className="card-type">
                  <span className={`type-label ${post.type === '예약완료' ? 'complete' : post.type === '예약중' ? 'progress' : 'cancel'}`}>
                    {post.type}
                  </span>
              </p>

              <p><strong>작성자:</strong> {post.author}</p>
              <p><strong>예약일:</strong> {post.date}</p>
              <p><strong>작성일:</strong> {post.created}</p>
              
            </div>
          ))}

          <div className="pagination">
            <button onClick={goToPrev} disabled={currentPage === 1}>
              이전
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={goToNext} disabled={currentPage === totalPages}>
              다음
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
