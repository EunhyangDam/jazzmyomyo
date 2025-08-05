import React, { useEffect } from "react";
import "./scss/ConfirmModalComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction } from "../../store/confirmModal";
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

            {asset.isCOnfirm ? (
              <div className="button">
                <button>취소</button>
                <button>지우기</button>
              </div>
            ) : (
              <div className="button">
                <button onClick={clickModalClose}>확인</button>
              </div>
            )}
          </div>
          <div className="col2 col">
            <i class="fa-solid fa-paw"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModalComponent;
