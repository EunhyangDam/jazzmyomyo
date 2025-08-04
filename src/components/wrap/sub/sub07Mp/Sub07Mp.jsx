import React, { useState } from "react";
import "./scss/Sub07Mp.scss";
import { Link } from "react-router-dom";

function Sub07Mp(props) {
  const [isOn, setIsOn] = useState(false);
  const onClickProfile = (e) => {
    setIsOn((prev) => !prev);
  };

  return (
    <div id="sub07Mp">
      <div className="container">
        <div className="title">
          <Link to="/Mp">
            <h2>My Page</h2>
          </Link>
        </div>
        <div className="content">
          <div className="row1">
            <div className="left">
              <div
                className={`profile-front${isOn ? " on" : ""}`}
                onClick={onClickProfile}
                title="🐾"
              >
                <p>MEMBER</p>
                <p>김묘묘</p>
              </div>
              <div
                className={`profile-back${isOn ? " on" : ""}`}
                onClick={onClickProfile}
                title="🐾"
              ></div>
            </div>
            <div className="right">
              <ul>
                <li className="col1">
                  <h2>예매 내역</h2>
                  <a href="!#">
                    <p>3</p>
                  </a>
                </li>
                <li className="col2">
                  <h2>위시리스트</h2>
                  <a href="!#">
                    <p>5</p>
                  </a>
                </li>
                <li className="col3">
                  <h2>장바구니</h2>
                  <a href="!#">
                    <p>1</p>
                  </a>
                </li>
                <li className="col4">
                  <h2>주문/배송</h2>
                  <a href="!#">
                    <p>1</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row2">
            <ul>
              <li>
                <h3>계정관리</h3>
                <Link to="/MyProfile">회원정보 확인</Link>
                <Link to="/EditProfile">회원정보 수정</Link>
                <Link to="/DeleteAccount">회원 탈퇴</Link>
              </li>
              <li>
                <h3>이용내역</h3>
                <Link to="/MyOrder">예매내역 확인</Link>
                <Link to="/MyOrder">주문내역 확인</Link>
                <Link to="/MyOrder">대관신청 확인</Link>
              </li>
              <li>
                <h3>게시판</h3>
                <Link to="/Ntc">공지사항</Link>
                <Link to="/Faq">FAQ</Link>
                <Link to="/Rev">작성 후기</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07Mp;
