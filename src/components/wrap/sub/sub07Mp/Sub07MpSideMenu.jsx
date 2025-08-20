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
          <Link to="/MyOrderMd">주문/ 배송조회</Link>
        </li>
        <li>
          <Link to="/MyOrderTk"> 예매 내역</Link>
        </li>
        <li>
          <Link to="/MyOrderMenu">사전주문 내역</Link>
        </li>
        <li>
          <Link to="/MyOrderRental">대관신청 내역</Link>
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
  );
}

export default Sub07MpSideMenu;
