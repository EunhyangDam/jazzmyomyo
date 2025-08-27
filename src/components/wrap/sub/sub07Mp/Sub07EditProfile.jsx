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
    service: [],
  });
  useEffect(() => {
    const formData = new FormData();
    formData.append("ID", userID.아이디);
    axios({ url: "/jazzmyomyo/user_info.php", method: "POST", data: formData })
      .then((res) => {
        switch (res.status) {
          case 200:
            setState({
              ID: res.data.ID,
              adress: res.data.adress,
              dob: res.data.dob,
              email: res.data.email,
              gender: res.data.gender,
              name: res.data.name,
              number: res.data.number,
              service: res.data.service,
            });
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

  const changeNumber = (e) => {
    setState({
      ...state,
      number: e.target.value.replace(/[^0-9]/g, ""),
    });
  };
  const changeEmail = (e) => {
    setState({
      ...state,
      email: e.target.value,
    });
  };
  const changeDob = (e) => {
    let arr = state.dob;
    switch (e.target.dataset.name) {
      case "dob1":
        arr = arr.split("-")[0];
        arr = e.target.value;
        setState({
          ...state,
          dob: `${arr}-${state.dob.split("-")[1]}-${state.dob.split("-")[2]}`,
        });
        break;
      case "dob2":
        arr = arr.split("-")[1];
        arr = e.target.value;
        setState({
          ...state,
          dob: `${state.dob.split("-")[0]}-${arr}-${state.dob.split("-")[2]}`,
        });
        break;
      case "dob3":
        arr = arr.split("-")[2];
        arr = e.target.value;
        setState({
          ...state,
          dob: `${state.dob.split("-")[0]}-${state.dob.split("-")[1]}-${arr}`,
        });
        break;
      default:
        break;
    }
  };
  const changeEmailChk = (e) => {
    let arr = Array.isArray(state.service)
      ? [...state.service]
      : state.service.split(",");

    if (e.target.value === "true") {
      if (arr.includes("무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)")) {
        arr = [...arr, "이메일"];
      } else {
        arr = [
          ...arr,
          "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
          "이메일",
        ];
      }
    } else {
      if (arr.includes("SNS")) {
        arr = arr.filter((el) => el !== "이메일");
      } else {
        arr = arr.filter((el) => el !== "이메일");
        arr = arr.filter(
          (el) => el !== "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)"
        );
      }
    }
    setState({
      ...state,
      service: arr,
    });
  };
  const submitEvent = (e) => {
    e.preventDefault();
    const { dob, email, name, number, adress } = state;
    let obj = {
      heading: "",
      explain: "",
      isON: true,
      isConfirm: false,
      message1: "",
      message2: "",
      isYes: false,
    };

    const validation = [
      {
        case_: /--|-$/.test(dob) === true,
        msg: "생년월일을 입력해주세요",
      },
      {
        case_: dob.split("-")[0] > new Date().getFullYear() - 19,
        msg: "19세 미만 청소년은 가입할 수 없습니다.",
      },
      {
        case_:
          dob.split("-")[1] < 1 ||
          dob.split("-")[1] > 12 ||
          dob.split("-")[2] < 1 ||
          dob.split("-")[2] >
            new Date(dob.split("-")[0], dob.split("-")[1], 0).getDate(),
        msg: "생년월일을 다시 확인해주세요.",
      },
      {
        case_:
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ===
            false || email === "",
        msg: "이메일을 다시 확인해주세요.",
      },
      { case_: adress === "", msg: "주소를 다시 확인해주세요." },
      {
        case_:
          /^(01[016789])-?\d{3,4}-?\d{4}$|^(0\d{2})-?\d{3,4}-?\d{4}$/g.test(
            number === false
          ) || number === "",
        msg: "전화번호를 다시 확인해주세요.",
      },
      { case_: name === "", msg: "이름을 입력해주세요!" },
    ];

    for (const { case_, msg } of validation) {
      if (case_) {
        obj = { ...obj, heading: msg };
        dispatch(confirmModalAction(obj));
        return;
      }
    }

    const formData = new FormData();
    const appendData = [
      { field: "dob", dataKey: dob },
      { field: "email", dataKey: email },
      { field: "name", dataKey: name },
      { field: "number", dataKey: number },
      { field: "adress", dataKey: adress },
      { field: "userID", dataKey: state.ID },
    ];
    appendData.forEach(({ field, dataKey }) => {
      formData.append(field, dataKey);
    });
    axios({
      url: "/jazzmyomyo/user_update.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            if (res.data === 1) {
              obj = { ...obj, heading: "회원 정보가 수정되었습니다." };
              navigate("/myProfile");
            } else if (res.data === 0) {
              obj = { ...obj, heading: "정보 수정 오류" };
              console.log(res.data);
            }
            dispatch(confirmModalAction(obj));
            break;
          default:
            obj = { ...obj, heading: "정보 수정 오류" };
            dispatch(confirmModalAction(obj));
            console.log(res.data);
            break;
        }
      })
      .catch((err) => {
        console.log(err);
        alert("폼 전송 ERROR");
      });
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
                  <li className="user-email">
                    <div className="left">
                      <span>이메일</span>
                    </div>
                    <div className="right">
                      <input
                        type="text"
                        name="inputEmail"
                        id="inputEmail"
                        onChange={changeEmail}
                        value={state.email}
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
                        onChange={changeDob}
                        data-name="dob1"
                        value={state.dob && state.dob.split("-")[0]}
                      />
                      -
                      <input
                        type="text"
                        name="inputMonth"
                        id="inputMonth"
                        onChange={changeDob}
                        data-name="dob2"
                        value={state.dob && state.dob.split("-")[1]}
                      />
                      -
                      <input
                        type="text"
                        name="inputDay"
                        id="inputDay"
                        onChange={changeDob}
                        data-name="dob3"
                        value={state.dob && state.dob.split("-")[2]}
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
                          value={"true"}
                          onChange={changeEmailChk}
                          checked={
                            state.service && state.service.includes("이메일")
                          }
                        />
                        <span>동의</span>
                      </label>
                      <label htmlFor="disagree">
                        <input
                          type="radio"
                          name="agree"
                          id="disagree"
                          value={"false"}
                          onChange={changeEmailChk}
                          checked={
                            state.service && !state.service.includes("이메일")
                          }
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
