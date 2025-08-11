import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./scss/Sub05NtcAdminEdit.scss";

function Sub05NtcAdminEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const { title, content } = location.state || {};

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (title && content) {
      setForm({ title, content });
    } else {
      alert("잘못된 접근입니다.");
      navigate("/NtcAdmin");
    }
  }, [title, content, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    // 백엔드 연결 예정
    alert("공지사항이 수정되었습니다.");
    navigate(-1);
  };

  return (
    <div id="Sub05NtcAdimEdit">
      <div className="breadcrumb">
        <i className="bi bi-house"></i> &gt; 공지사항 &gt; 글수정
      </div>

      <h2>공지사항 수정</h2>

      <form className="write-form" onSubmit={handleSubmit}>
        <label>제목</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
        />

        <label>내용</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
        />

        <div className="btn-group">
          <button type="submit">수정</button>
          <button type="button" onClick={() => navigate(-1)}>취소</button>
        </div>
      </form>
    </div>
  );
}

export default Sub05NtcAdminEdit;