import React, { useState, useEffect } from "react";
import "./scss/Sub07MyProfile.scss";
import { Link, useNavigate } from "react-router-dom";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import SiteMapComponent from "../../custom/SiteMapComponent";

function Sub07MyProfile(props) {
  const navigate = useNavigate();

  return (
    <div id="sub07MyProfile">
      <div className="container">
        <SiteMapComponent
          firstLink="/mp"
          firstName="마이페이지"
          secondLink="./"
          secondName="회원정보 확인"
        />
        <div className="title">
          <Link to="/mp">
            <h2>My Page</h2>
          </Link>
        </div>
        <div className="content">
          <Sub07MpSideMenu />
          <div className="user-info">
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
                    <p>서울시 영등포구 주소</p>
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
                <li className="birthday">
                  <div className="left">
                    <span>생년월일</span>
                  </div>
                  <div className="right">
                    <p>1997-03-30</p>
                  </div>
                </li>
                <li className="user-email-agree">
                  <div className="left">
                    <span>이메일 수신 동의</span>
                  </div>
                  <div className="right">
                    <label htmlFor="agree">
                      <input type="checkbox" name="agree" id="agree" checked />
                      <span>동의</span>
                    </label>
                    <label htmlFor="disagree">
                      <input type="checkbox" name="disagree" id="disagree" />
                      <span>미동의</span>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <div className="foot">
              <Link to="/editProfile">정보수정</Link>
              <Link to="/deleteAccount">탈퇴하기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07MyProfile;
