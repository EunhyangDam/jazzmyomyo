import React, { useState } from "react";
import "./scss/ReactDaumPostcode.scss";
import Postcode from "react-daum-postcode";
import { useDispatch } from "react-redux";
import {
  daumPostcodeAction,
  daumPostcodeOpenAction,
} from "../../store/daumPostcode";
import { confirmModalAction } from "../../store/confirmModal";

export default function ReactDaumPostcode(props) {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    우편번호: "",
    검색주소: "",
    상세주소: "",
  });

  const onCompletePostcode = (data) => {
    let extraAddr = "";

    if (data.userSelectedType === "R") {
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }

      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }

      if (extraAddr !== "") {
        extraAddr = ` (${extraAddr})`;
      }
    }

    setState({
      ...state,
      우편번호: data.zonecode,
      검색주소: `${data.address}${extraAddr}`, //  건물명 (주엽동 강선마을 14단지) => 엑스트라 어드레스
      상세주소: "",
    });
  };

  // 나머지 주소(상세주소) 온체인지 이벤트
  const onChangeAddress2 = (e) => {
    setState({
      ...state,
      상세주소: e.target.value,
    });
  };

  // 주소 저장하고 모달창을 닫는다.
  const onClickAddressSave = (e) => {
    e.preventDefault();

    if (state.상세주소 === "") {
      // 컨펌모달
      const obj = {
        heading: "알림!",
        explain: "상세주소를 입력하세요.",
        isON: true,
        isConfirm: false,
      };
      dispatch(confirmModalAction(obj));
    } else {
      const obj = {
        우편번호: state.우편번호,
        검색주소: state.검색주소,
        상세주소: state.상세주소,
      };
      dispatch(daumPostcodeAction(obj));
      dispatch(daumPostcodeOpenAction(false));
    }
  };

  // 주소검색 API 닫기
  const onClickClose = (e) => {
    e.preventDefault();
    dispatch(daumPostcodeOpenAction(false));
  };

  // 주소검색 재검색
  const onClickReSearch = (e) => {
    e.preventDefault();
    dispatch(daumPostcodeOpenAction(false));
    setTimeout(() => {
      dispatch(daumPostcodeOpenAction(true));
    }, 100);
  };

  const postStyle = {
    zIndex: 2,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#fff",
  };

  return (
    <div id="reactDaumPostcode">
      <div className="container">
        <div className="window-title">
          <div className="left">
            <h1>
              <img src="./images/favicon.ico" alt="" />
              <strong>HONGO FASHION</strong>
            </h1>
          </div>
          <div className="right">
            <button onClick={onClickClose}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
        <div className="content">
          <div className="address-form">
            <form>
              <div className="title">
                <h1>
                  <em>묘묘가</em> <span>배달 가요.</span>
                </h1>
                <h2>꼼꼼히 포장해서, 문 앞까지 사뿐사뿐 전해드려요.</h2>
              </div>
              <div className="contents">
                <ul>
                  <li className="row1">
                    <div className="gap">
                      <p id="address1">{`${state.우편번호} ${state.검색주소}`}</p>
                      <button onClick={onClickReSearch}>
                        <i className="bi bi-search"></i> 재검색
                      </button>
                    </div>
                  </li>
                  <li className="row2">
                    <div className="gap">
                      <input
                        type="text"
                        name="address2"
                        id="address2"
                        onChange={onChangeAddress2}
                        value={state.상세주소}
                      />
                    </div>
                  </li>
                  <li className="row3">
                    <div className="gap">
                      <p>
                        ※ 저장된 배송지는 최대 7일 간 임시 저장 후 자동
                        삭제됩니다.
                        <br />
                        로그인 할 경우, 회원님의 배송지 목록에 추가됩니다.
                      </p>
                    </div>
                  </li>
                  <li className="row4">
                    <div className="gap">
                      <button onClick={onClickAddressSave}>저장</button>
                    </div>
                  </li>
                  <li className="row5">
                    <div className="gap">
                      <p>
                        <i className="bi bi-info-circle"></i>
                        <span>
                          일부 관공서, 학교, 병원, 시장, 공단지역, 산간지역,
                          백화점 등은 현장 상황에 따라 샛별배송이 불가능할 수
                          있습니다.
                        </span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>

          <Postcode style={postStyle} onComplete={onCompletePostcode} />
        </div>
      </div>
    </div>
  );
}
