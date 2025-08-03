import React from "react";
import './scss/Sub035Pre.scss';
import { Link } from "react-router-dom";

function Sub035Pre() {
  return (
    <div id="sub_pre">
      <div className="clipboard">
        <div className="clip"></div>
        <div className="paper">
          <h1>사전 예약 게시판</h1>

          <Link to="/PreW" className="write-button">사전주문신청</Link>

          <table className="board-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>예약일</th>
                <th>작성일</th>
                <th>종류</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><Link to="/Prev/view/1">[예약신청] 9월 12일 2인</Link></td>
                <td>홍길동</td>
                <td>2025-09-12</td>
                <td>2025-08-01</td>
                <td><span className="type-label">예약자</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sub035Pre;