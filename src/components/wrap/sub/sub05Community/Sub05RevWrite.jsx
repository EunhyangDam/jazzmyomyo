import React from "react";
import "./scss/Sub05RevWrite.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";
import SiteMapComponent from "../../custom/SiteMapComponent";
function Sub05RevWrite(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          <form onSubmit={onSubmitWriteReview}>
            <div className="write-box">
              <ul>
                <li>
                  <h3>묘원들의 한줄후기를 남겨주세요!</h3>
                </li>
                <li>
                  <span>작성자</span>
                  <input type="text" placeholder="이름을 작성해주세요" />
                </li>
                <li>
                  <textarea
                    type="text"
                    placeholder="후기를 남겨보세요"
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
