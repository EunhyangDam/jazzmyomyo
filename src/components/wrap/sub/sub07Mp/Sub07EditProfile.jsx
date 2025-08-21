import React from "react";
import "./scss/Sub07EditProfile.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import SiteMapComponent from "../../custom/SiteMapComponent";
function Sub07EditProfile(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickCancelEdit = (e) => {
    e.preventDefault();

    const obj = {
      heading: "수정을 취소합니다",
      explain: "",
      isON: true,
      isConfirm: false,
      message1: "",
      message2: "",
      isYes: false,
    };

    dispatch(confirmModalAction(obj));
    navigate("/MyProfile");
  };

  const onClickFinishEdit = (e) => {
    e.preventDefault();

    const obj = {
      heading: "수정이 완료되었습니다",
      explain: "",
      isON: true,
      isConfirm: false,
      message1: "",
      message2: "",
      isYes: false,
    };

    dispatch(confirmModalAction(obj));
  };

  return (
    <div id="sub07EditProfile">
      <div className="container">
        <SiteMapComponent
          firstLink="/Mp"
          firstName="마이페이지"
          secondLink="./"
          secondName="회원정보 수정"
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
              <h3>회원 정보 수정</h3>
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
              <button onClick={onClickCancelEdit}>수정취소</button>
              <button onClick={onClickFinishEdit}>수정완료</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07EditProfile;
