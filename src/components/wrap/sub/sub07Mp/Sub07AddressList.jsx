import React from "react";
import "./scss/Sub07AddressList.scss";
import { Link, useNavigate } from "react-router-dom";
function Sub07AddressList(props) {
  return (
    <div id="sub07AddressList">
      <div className="container">
        <div className="site">
          <Link to="./">
            <i className="bi bi-house-fill"></i>
          </Link>
          <i>&gt;</i>
          <Link to="./">마이페이지</Link>
          <i>&gt;</i>
          <Link to="/Wishilist" className="now">
            찜리스트
          </Link>
        </div>
        <div className="title">
          <Link to="/Mp">
            <h2>배송지 관리</h2>
          </Link>
        </div>
        <div className="content">
          <div className="menu">
            <ul>
              <li>
                <h2>메뉴</h2>
              </li>
              <li className="sub-title">
                <h3>계정관리</h3>
              </li>
              <li>
                <Link to="/MyProfile">회원정보 확인</Link>
              </li>
              <li>
                <Link to="/EditProfile">회원정보 수정</Link>
              </li>
              <li>
                <Link to="/AddressList">배송지 관리</Link>
              </li>
              <li>
                <Link to="/DeleteAccount">회원 탈퇴</Link>
              </li>

              <li className="sub-title">
                <h3>이용내역</h3>
              </li>
              <li>
                <Link to="/MyOrder">티켓예매 내역</Link>
              </li>
              <li>
                <Link to="/MyOrder">사전주문 내역</Link>
              </li>
              <li>
                <Link to="/MyOrder">주문/ 배송조회</Link>
              </li>
              <li>
                <Link to="/MyOrder">대관신청 내역</Link>
              </li>
              <li className="sub-title">
                <h3>게시판</h3>
              </li>
              <li>
                <Link to="/Ntc">공지사항</Link>
              </li>
              <li>
                <Link to="/Faq">FAQ</Link>
              </li>
              <li>
                <Link to="/Rev">작성 후기</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07AddressList;
