import React, { useEffect, useState } from "react";
import "./scss/Sub07EditProfile.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import SiteMapComponent from "../../custom/SiteMapComponent";
import axios from "axios";
function Sub07EditProfile(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    axios({ url: "./jazzmyomyo/user_info.php", method: "POST", data: formData })
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

  const onClickFinishEdit = (e) => {};

  const changeNumber = (e) => {
    setState({
      ...state,
      number: e.target.value,
    });
  };
  const changeEmailChk = (e) => {
    let value = e.target.value;
    setState({
      ...state,
      emailChk: value,
    });
    console.log(value);
  };
  const submitEvent = (e) => {
    e.preventDefault();
    let obj = {
      heading: "",
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
            <form action="POST" onSubmit={submitEvent}>
              <div className="main">
                <ul>
                  <li className="user-ID">
                    <div className="left">
                      <span>아이디</span>
                    </div>
                    <div className="right">
                      <input
                        type="text"
                        name="userID"
                        id="userID"
                        value={state.ID}
                        readOnly
                      />
                    </div>
                  </li>
                  <li className="user-name">
                    <div className="left">
                      <span>이름</span>
                    </div>
                    <div className="right">
                      <input
                        defaultValue={state.name}
                        name="inputName"
                        id="inputName"
                      />
                    </div>
                  </li>
                  <li className="user-mobile-number">
                    <div className="left">
                      <span>휴대전화번호</span>
                    </div>
                    <div className="right">
                      <input
                        type="text"
                        name="inputHP"
                        id="inputHP"
                        value={state.number}
                        onChange={changeNumber}
                      />
                    </div>
                  </li>
                  <li className="user-address">
                    <div className="left">
                      <span>주소</span>
                    </div>
                    <div className="right">
                      <input
                        type="text"
                        name="inputAdr"
                        id="inputAdr"
                        defaultValue={state.adress}
                      />
                    </div>
                  </li>
                  <li className="user-email">
                    <div className="left">
                      <span>이메일</span>
                    </div>
                    <div className="right">
                      <input
                        type="text"
                        name="inputEmail"
                        id="inputEmail"
                        defaultValue={state.email}
                      />
                    </div>
                  </li>
                  <li className="birthday">
                    <div className="left">
                      <span>생년월일</span>
                    </div>
                    <div className="right">
                      <input
                        type="text"
                        name="inputYear"
                        id="inputYear"
                        defaultValue={state.dob && state.dob.split("-")[0]}
                      />
                      -{" "}
                      <input
                        type="text"
                        name="inputMonth"
                        id="inputMonth"
                        defaultValue={state.dob && state.dob.split("-")[1]}
                      />
                      -{" "}
                      <input
                        type="text"
                        name="inputDay"
                        id="inputDay"
                        defaultValue={state.dob && state.dob.split("-")[2]}
                      />
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
                          value={true}
                          onChange={changeEmailChk}
                          checked={state.emailChk === "true"}
                        />
                        <span>동의</span>
                      </label>
                      <label htmlFor="disagree">
                        <input
                          type="radio"
                          name="agree"
                          id="disagree"
                          value={false}
                          onChange={changeEmailChk}
                          checked={state.emailChk === "false"}
                        />
                        <span>미동의</span>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="foot">
                <button onClick={onClickCancelEdit}>수정취소</button>
                <button type="submit">수정완료</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07EditProfile;
