import React, { useEffect, useState, useCallback } from "react";
import "./scss/CSModal.scss";
import Yiduiyi from "./yiduiyi";

export default function CSModal({ onClose }) {
  const [openInquiry, setOpenInquiry] = useState(false);

  // 폼 열렸으면 폼부터 닫기, 아니면 메인 모달 닫기
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        if (openInquiry) setOpenInquiry(false);
        else onClose?.();
      }
    },
    [openInquiry, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);


  // 폼 모달에서 닫기버튼 클릭시 모두 닫기
  const handleCloseAll = () => {
    setOpenInquiry(false);
    onClose?.(); // CSModal까지 닫기
  };

  return (
    <>
      {/* 메인 안내 모달 */}
      <div className="cs-modal" role="dialog" aria-modal="true" aria-label="재즈묘묘 1:1 문의 안내">
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>

          {/* 헤더 */}
          <div className="header">
            <div className="profile">
              <img src="./img/CSmodal/CS_modal_cat.png" alt="1:1 문의 모달" />
            </div>
            <span className="title">재즈묘묘 1:1 문의</span>
          </div>

          {/* 말풍선 */}
          <div className="chat-box" role="region" aria-label="안내 메시지">
            <div className="chat">
              <div className="profile small">
                <img src="./img/CSmodal/CS_modal_cat.png" alt="프로필이미지" />
              </div>
              <p className="chat-text">
                안녕,
                <br />
                나는 묘묘라냥!
              </p>
            </div>

            <div className="chat">
              <div className="profile small">
                <img src="./img/CSmodal/CS_modal_cat.png" alt="프로필이미지" />
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

          {/* 문의하기 버튼 */}
          <div className="btn-wrap">
            <button
              className="ask-btn"
              type="button"
              aria-haspopup="dialog"
              aria-expanded={openInquiry}
              onClick={() => setOpenInquiry(true)}
            >
              문의하기
            </button>
          </div>

          {/* 닫기 버튼 */}
          <button
            type="button"
            className="floating-close"
            aria-label="닫기"
            onClick={onClose}
          >
            <i className="bi bi-x" />
          </button>
        </div>
      </div>

      {/* 1:1 문의 폼 모달 */}
      {openInquiry && (
        <Yiduiyi
          onClose={handleCloseAll}
        />
      )}
    </>
  );
}
