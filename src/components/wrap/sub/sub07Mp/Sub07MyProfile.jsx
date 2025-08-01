import React, { useState, useEffect } from "react";
import "./scss/Sub07MyProfile.scss";
import { Link } from "react-router-dom";

function Sub07MyProfile(props) {
  return (
    <div id="sub07MyProfile">
      <div className="container">
        <div className="title">
          <Link to="/Mp">
            <h2>My Page</h2>
          </Link>
        </div>
        <div className="content">
          <div className="head">
            <h3>회원 정보 확인</h3>
          </div>
          <div className="main">
            <ul>
              <li className="user-ID">
                <div className="left">
                  <span>아이디</span>
                </div>
                <div className="right">
                  <p>myomyo</p>
                </div>
              </li>
              <li className="user-PW">
                <div className="left">
                  <span>비밀번호</span>
                </div>
                <div className="right">
                  <p>1234*</p>
                </div>
              </li>
              <li className="user-PW2">
                <div className="left">
                  <span>비밀번호 확인</span>
                </div>
                <div className="right">
                  <p>1234*</p>
                </div>
              </li>
              <li className="user-name">
                <div className="left">
                  <span>이름</span>
                </div>
                <div className="right">
                  <p>김묘묘</p>
                </div>
              </li>
              <li className="user-mobile-number">
                <div className="left">
                  <span>휴대전화번호</span>
                </div>
                <div className="right">
                  <p>010-1234-5678</p>
                </div>
              </li>
              <li className="user-address">
                <div className="left">
                  <span>주소</span>
                </div>
                <div className="right">
                  <p>서울특별시 영등포구 어쩌구 </p>
                </div>
              </li>
              <li className="user-email">
                <div className="left">
                  <span>이메일</span>
                </div>
                <div className="right">
                  <p>myomyo@naver.com</p>
                </div>
              </li>
              <li className="user-email-agree">
                <div className="left">
                  <span>이메일 수신 동의</span>
                </div>
                <div className="right">
                  <input type="checkbox" />
                  <span>동의</span>
                  <input type="checkbox" /> <span>미동의</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="foot">
            <Link to="/EditProfile">정보수정</Link>
            <Link to="/DeleteAccount">탈퇴하기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07MyProfile;
