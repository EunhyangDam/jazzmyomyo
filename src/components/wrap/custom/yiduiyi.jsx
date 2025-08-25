// src/components/wrap/custom/yiduiyi.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./scss/yiduiyi.scss";

export default function Yiduiyi({ onClose, onSubmit }) {
  const navigate = useNavigate();

  // ESC로 닫기 → 부모 onClose(있으면) 또는 뒤로 가기
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (onClose) onClose();
        else navigate(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      subject: fd.get("subject")?.trim(),
      content: fd.get("content")?.trim(),
      email: fd.get("email")?.trim(),
    };
    if (onSubmit) onSubmit(data);
    else alert("임시 제출: " + JSON.stringify(data, null, 2));
  };

  
  const closeAll = () => {
    if (onClose) onClose();
    else navigate(-1);
  };

  return (
    <div className="cs-inquiry" role="dialog" aria-modal="true" aria-label="1:1 문의하기">
        
      {/* 배경 클릭시 닫기 */}
      <div className="modal-hitbox" onClick={closeAll} aria-hidden="true" />

      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="title">1:1 문의하기</h2>

        <form className="inquiry-form" onSubmit={handleSubmit}>
          <label className="field" htmlFor="inq-subject">
            <span className="label">제목</span>
            <input
              id="inq-subject"
              type="text"
              name="subject"
              placeholder="제목을 입력하세요."
              required
              autoComplete="off"
              autoFocus
            />
          </label>

          <label className="field" htmlFor="inq-content">
            <span className="label">내용</span>
            <textarea
              id="inq-content"
              name="content"
              rows={6}
              placeholder="문의 내용을 입력하세요."
              required
            />
          </label>

          <label className="field" htmlFor="inq-email">
            <span className="label">이메일</span>
            <input
              id="inq-email"
              type="email"
              name="email"
              placeholder="답변 받을 이메일을 입력하세요."
              required
              autoComplete="email"
              inputMode="email"
            />
          </label>

          <button type="submit" className="submit-btn">보내기</button>
        </form>

        {/* 닫기 버튼 */}
        <button
          type="button"
          className="floating-close"
          aria-label="닫기"
          onClick={closeAll}
        >
          <i className="bi bi-x" />
        </button>
      </div>
    </div>
  );
}
