import React from "react";
import "./scss/Sub07MpSideMenu.scss";
import { Link } from "react-router-dom";

function Sub07MpSideMenu(props) {
  return (
    <div className="menu">
      <ul>
        <li>
          <h2>메뉴</h2>
        </li>
        <li className="sub-title">
          <h3>계정관리</h3>
        </li>
        <li>
          <Link to="/myProfile">회원정보 확인</Link>
        </li>
        <li>
          <Link to="/editProfile">회원정보 수정</Link>
        </li>
        <li>
          <Link to="/addressList">배송지 관리</Link>
        </li>
        <li>
          <Link to="/deleteAccount">회원 탈퇴</Link>
        </li>

        <li className="sub-title">
          <h3>이용내역</h3>
        </li>
        <li>
          <Link to="/myOrderMd">주문/ 배송조회</Link>
        </li>
        <li>
          <Link to="/myOrderTk"> 예매 내역</Link>
        </li>
        <li>
          <Link to="/myOrderMenu">사전주문 내역</Link>
        </li>
        <li>
          <Link to="/myOrderRental">대관신청 내역</Link>
        </li>
        <li className="sub-title">
          <h3>게시판</h3>
        </li>
        <li>
          <Link to="/ntc">공지사항</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
          <Link to="/rev">작성 후기</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sub07MpSideMenu;
