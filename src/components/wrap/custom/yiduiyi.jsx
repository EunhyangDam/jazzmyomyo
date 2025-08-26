import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { inquiryAction } from "../../../store/inquiry";
import "./scss/yiduiyi.scss";

export default function Yiduiyi({ onClose, onSubmit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const ENDPOINT = "/jazzmyomyo/submit_inquiry.php";

  // ESC 닫기
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

  // FormData를 사용하여 서버에 전송
  async function sendToServer(payload) {
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: payload, // FormData 객체 직접 전달
      });

      console.log("Server Response Status:", res.status, res.statusText);
      const text = await res.text();
      console.log("Server Response Body (Raw):", text);

      let json = {};
      try {
        json = JSON.parse(text);
        console.log("Server Response Body (JSON):", json);
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
      }

      if (!res.ok || !json.ok) {
        throw new Error(json.error || `HTTP ${res.status}`);
      }
      return json;
    } catch (err) {
      console.error("Error during fetch operation:", err);
      throw err;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const fd = new FormData(e.currentTarget);
    const data = {
      subject: fd.get("subject")?.trim() || "",
      content: fd.get("content")?.trim() || "",
      email: fd.get("email")?.trim() || "",
      _hp: fd.get("_hp")?.trim() || "",
    };

    if (data._hp) {
      alert("제출에 실패하였습니다.");
      return;
    }
    if (!data.subject || !data.content || !data.email) {
      alert("제목, 내용, 이메일은 필수입니다.");
      return;
    }
    if (data.subject.length > 200) {
      alert("제목은 200자 이하로 입력하세요.");
      return;
    }

    try {
      setLoading(true);

      let result;
      if (onSubmit) {
        result = await onSubmit(data);
      } else {
        result = await sendToServer(fd);
      }

      // 리덕스
      dispatch(
        inquiryAction.addInquiry({
          idx: result?.idx,
          subject: data.subject,
          email: data.email,
          content: data.content,
        })
      );

      alert("문의가 등록되었습니다. 답변은 순차적으로 발송됩니다.");
      e.currentTarget.reset();

      if (onClose) onClose();
      else navigate(-1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const closeAll = () => {
    if (onClose) onClose();
    else navigate(-1);
  };

  return (
    <div className="cs-inquiry" role="dialog" aria-modal="true" aria-label="1:1 문의하기">
      <div className="modal-hitbox" onClick={closeAll} aria-hidden="true" />
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        aria-busy={loading}
      >
        <h2 className="title">1:1 문의하기</h2>
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <input type="text" name="_hp" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
          <label className="field" htmlFor="inq-subject">
            <span className="label">제목</span>
            <input
              id="inq-subject"
              type="text"
              name="subject"
              placeholder="제목을 입력하세요."
              required
              autoComplete="off"
              maxLength={200}
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </label>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "보내는 중..." : "보내기"}
          </button>
        </form>
        <button
          type="button"
          className="floating-close"
          aria-label="닫기"
          onClick={closeAll}
          disabled={loading}
        >
          <i className="bi bi-x" />
        </button>
      </div>
    </div>
  );
}
