import React from "react";
import "./scss/ConfirmModalComponent.scss";
import { useSelector } from "react-redux";
function ConfirmModalComponent(props) {
  const asset = useSelector((state) => state.confirmModal);
  return (
    <div id="confirmModalComponent">
      <div className="container">
        <div className="content">
          <div className="col1 col">
            <div className="sentence">
              <p className="heading">{asset.heading}</p>
              <p className="explain">{asset.explain}</p>
            </div>
            <div className="button">
              <button>취소</button>
              <button>지우기</button>
            </div>
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
