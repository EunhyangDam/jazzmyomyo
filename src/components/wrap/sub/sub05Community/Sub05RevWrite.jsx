import React, { useState } from "react";
import "./scss/Sub05RevWrite.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { confirmModalAction } from "../../../../store/confirmModal";
import SiteMapComponent from "../../custom/SiteMapComponent";

function Sub05RevWrite(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wNameRef = React.useRef();

  const [state, setState] = useState({
    wSubject: "후기입니다",
    wContent: "",
    wId: "testId", // 임시 아이디
    wName: "",
  });

  const onSubmitWriteReview = (e) => {
    e.preventDefault();
    let obj = {
      heading: "후기를\n 올리시겠습니까?",
      explain: "",
      isON: true,
      isConfirm: true,
      //여기 추가
      message1: "아니오",
      message2: "예",
      isYes: true, // 응답이 예스/노
    };
    dispatch(confirmModalAction(obj));
  };

  //목록 버튼 클릭이벤트
  const onClickListBtn = (e) => {
    e.preventDefault();
    navigate("/Rev");
  };

  const onChangeWName = (e) => {
    setState({
      ...state,
      wName: e.target.value,
    });
  };

  const onChangeWContent = (e) => {
    setState({
      ...state,
      wContent: e.target.value,
    });
  };

  const onSubmitReview = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("wSubject", state.wSubject);
    formData.append("wContent", state.wContent);
    formData.append("wId", state.wId);
    formData.append("wName", state.wName);

    axios({
      url: "/jazzmyomyo/review_table_insert.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data === 1) {
            dispatch(
              confirmModalAction({
                heading: "후기가 작성되었습니다.",
                explain: "",
                isON: true,
                isConfirm: false,
              })
            );
            setState({
              ...state,
              wSubject: "",
              wContent: "",
              wId: "testId",
              wName: "",
            });

            wNameRef.current.focus();
          } else {
            dispatch(
              confirmModalAction({
                heading: "글작성 실패",
                explain: "",
                isON: true,
                isConfirm: false,
              })
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div id="sub05RevWrite">
      <div className="container">
        <SiteMapComponent
          firstLink=""
          firstName="커뮤니티"
          secondLink="./"
          secondName="공연 후기"
        />
        <div className="title">
          <Link to="./">
            <h2>공연 후기</h2>
          </Link>
        </div>
        <div className="content">
          <form id="review" onSubmit={onSubmitReview}>
            <div className="write-box">
              <ul>
                <li>
                  <h3>묘원들의 한줄후기를 남겨주세요!</h3>
                </li>
                <li className="rev-writer">
                  <span>작성자</span>
                  <input
                    type="text"
                    placeholder="이름을 작성해주세요"
                    onChange={onChangeWName}
                    value={state.wName}
                    ref={wNameRef}
                  />
                </li>

                <li className="rev-content">
                  <textarea
                    type="text"
                    placeholder="후기를 남겨보세요"
                    value={state.wContent}
                    onChange={onChangeWContent}
                  ></textarea>
                </li>
              </ul>
            </div>
            <div className="button-box">
              <button type="submit">작성하기</button>
              <button onClick={onClickListBtn}>목록</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sub05RevWrite;
