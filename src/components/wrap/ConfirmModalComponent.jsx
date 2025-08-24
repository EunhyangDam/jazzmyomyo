import React, { useEffect } from "react";
import "./scss/ConfirmModalComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction } from "../../store/confirmModal";
import { confirmModalYesNoAction } from "../../store/confirmModal";

function ConfirmModalComponent(props) {
  const dispatch = useDispatch();
  const asset = useSelector((state) => state.confirmModal);
  const clickModalClose = (e) => {
    e.preventDefault();
    let obj = {
      heading: "",
      explain: "",
      isON: false,
      isConfirm: false,
      //여기 추가
      message1: "",
      message2: "",
      isYes: false, // 응답이 예스/노
    };
    dispatch(confirmModalAction(obj));
  };

  //
  // 옵션 2개일 때
  const onClickMessage1 = (e) => {
    e.preventDefault();
    dispatch(confirmModalYesNoAction(true)); // 예 응답

    const obj = {
      isON: false,
    };
    dispatch(confirmModalAction(obj));
  };

  const onClickMessage2 = (e) => {
    e.preventDefault();
    dispatch(confirmModalYesNoAction(false)); // 아니오 응답
    const obj = {
      isON: false,
    };
    dispatch(confirmModalAction(obj));
  };

  return (
    <div id="confirmModalComponent">
      <div className="container">
        <div className="content">
          <div className="col1 col">
            <div className="sentence">
              <p className="heading">{asset.heading}</p>
              {asset.explain !== "" && (
                <p className="explain">{asset.explain}</p>
              )}
            </div>

            {asset.isConfirm ? (
              <div className="button">
                {/* 취소 / 지우기를 메시지 직접 입력하는 것으로 수정  */}
                <button onClick={onClickMessage1}>{asset.message1}</button>
                <button onClick={onClickMessage2}>{asset.message2}</button>
              </div>
            ) : (
              <div className="button">
                <button onClick={clickModalClose}>확인</button>
              </div>
            )}
          </div>
          <div className="col2 col">
            <i className="fa-solid fa-paw"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModalComponent;
