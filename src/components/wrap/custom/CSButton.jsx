import React, { useState } from "react";
import "./scss/CSButton.scss";
import CSModal from "./CSModal";

export default function CSButton(props) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div id="csButtonWrap">
      <button
        id="csButton"
        type="button"
        aria-haspopup="dialog"
        aria-controls="csModal"
        aria-expanded={openModal}
        onClick={() => setOpenModal(true)}
      >
        <img src="./img/CS/CS_cat.png" alt="1:1 문의 버튼" draggable="false" />
      </button>

      {/* 모달 */}
      {openModal && <CSModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}
