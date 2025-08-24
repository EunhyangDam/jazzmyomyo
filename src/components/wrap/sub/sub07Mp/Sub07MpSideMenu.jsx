import React from "react";
import "./scss/Sub07MpSideMenu.scss";
import useCustomA from "../../custom/useCustomA";

function Sub07MpSideMenu(props) {
  const { onClickA } = useCustomA();
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
          <a href="!#" onClick={(e) => onClickA(e, "/myProfile")}>
            회원정보 확인
          </a>
        </li>
        <li>
          <a href="!#" onClick={(e) => onClickA(e, "/editProfile")}>
            회원정보 수정
          </a>
        </li>
        <li>
          <a href="!#" onClick={(e) => onClickA(e, "/addressList")}>
            배송지 관리
          </a>
        </li>
        <li>
          <a href="!#" onClick={(e) => onClickA(e, "/deleteAccount")}>
            회원 탈퇴
          </a>
        </li>

        <li className="sub-title">
          <h3>이용내역</h3>
        </li>
        <li>
          <a href="!#" onClick={(e) => onClickA(e, "/myOrderMd")}>
            주문/ 배송조회
          </a>
        </li>
        <li>
          <a href="!#" onClick={(e) => onClickA(e, "/myOrderTk")}>
            티켓 예매 내역
          </a>
        </li>
        <li>
          <a href="!#" onClick={(e) => onClickA(e, "/myOrderMenu")}>
            사전주문 내역
          </a>
        </li>
        <li>
          <a href="!#" onClick={(e) => onClickA(e, "/myOrderRental")}>
            대관신청 내역
          </a>
        </li>
        <li className="sub-title">
          <h3>게시판</h3>
        </li>
        <li>
          <a href="!#" onClick={(e) => onClickA(e, "/ntc")}>
            공지사항
          </a>
        </li>
        <li>
          <a href="!#" onClick={(e) => onClickA(e, "/faq")}>
            FAQ
          </a>
        </li>
        <li>
          <a href="!#" onClick={(e) => onClickA(e, "/rev")}>
            작성 후기
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sub07MpSideMenu;
