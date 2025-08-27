import React, { useState, useEffect } from "react";
import "./scss/Sub07MyProfile.scss";
import { Link } from "react-router-dom";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import SiteMapComponent from "../../custom/SiteMapComponent";
import { useSelector } from "react-redux";
import axios from "axios";

function Sub07MyProfile(props) {
  const userID = useSelector((state) => state.signIn);

  const [state, setState] = useState({
    ID: null,
    adress: null,
    dob: null,
    email: null,
    gender: null,
    name: null,
    number: null,
    service: null,
  });
  useEffect(() => {
    const formData = new FormData();
    formData.append("ID", userID.아이디);
    axios({ url: "/jazzmyomyo/user_info.php", method: "POST", data: formData })
      .then((res) => {
        switch (res.status) {
          case 200:
            let email = false;
            res.data.service &&
              res.data.service.includes("이메일") &&
              (email = true);
            setState(res.data, { emailChk: email });
            break;
          default:
            alert("a");
            break;
        }
      })
      .catch();
  }, [userID]);
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
                    <p>{state.ID}</p>
                  </div>
                </li>
                <li className="user-name">
                  <div className="left">
                    <span>이름</span>
                  </div>
                  <div className="right">
                    <p>{state.name}</p>
                  </div>
                </li>
                <li className="user-mobile-number">
                  <div className="left">
                    <span>휴대전화번호</span>
                  </div>
                  <div className="right">
                    <p>
                      {state.number &&
                        `${state.number.slice(0, 3)}-${state.number.slice(
                          3,
                          7
                        )}-
                      ${state.number.slice(7, 11)}`}
                    </p>
                  </div>
                </li>
                <li className="user-email">
                  <div className="left">
                    <span>이메일</span>
                  </div>
                  <div className="right">
                    <p>{state.email}</p>
                  </div>
                </li>
                <li className="birthday">
                  <div className="left">
                    <span>생년월일</span>
                  </div>
                  <div className="right">
                    <p>{state.dob}</p>
                  </div>
                </li>
                <li className="user-email-agree">
                  <div className="left">
                    <span>이메일 수신 동의</span>
                  </div>
                  <div className="right">
                    <label htmlFor="agree">
                      <input
                        type="radio"
                        name="agree"
                        id="agree"
                        checked={state.emailChk}
                        readOnly
                      />
                      <span>동의</span>
                    </label>
                    <label htmlFor="disagree">
                      <input
                        type="radio"
                        name="agree"
                        id="disagree"
                        checked={!state.emailChk}
                        readOnly
                      />
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
