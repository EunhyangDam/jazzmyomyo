import React from "react";
import "./scss/CSModal.scss";

export default function CSModal({ onClose }) {
  return (
    <div className="cs-modal">
      <div className="modal-container">
        {/* 헤더 */}
        <div className="header">
          <div className="profile">
            <img src="/img/CSmodal/CS_modal_cat.png" alt="1:1 문의 모달" />
          </div>
          <span className="title">재즈묘묘 1 : 1 문의</span>
        </div>

        {/* 말풍선 */}
        <div className="chat-box">
          <div className="chat">
            <div className="profile small">
              <img src="/img/CSmodal/CS_modal_cat.png" alt="프로필이미지" />
            </div>
            <p className="chat-text">
              안녕,
              <br />
              나는 묘묘라냥!
            </p>
          </div>

          <div className="chat">
            <div className="profile small">
              <img src="/img/CSmodal/CS_modal_cat.png" alt="프로필이미지" />
            </div>
            <p className="chat-text">
              공연, 메뉴, 예약 등<br />
              궁금한 점이 있다면
              <br />
              아래 ‘문의하기’ 버튼을 눌러주라냥!
              <br />
              문의 순서대로 답장하겠다냥!
            </p>
          </div>
        </div>

        {/* 버튼 */}
        <div className="btn-wrap">
          <button className="ask-btn">문의하기</button>
        </div>

        {/* 닫기 버튼 */}
        <button
          type="button"
          className="floating-close"
          aria-label="닫기"
          onClick={onClose}
        >
          <i className="bi bi-x"></i>
        </button>
      </div>
    </div>
  );
}
