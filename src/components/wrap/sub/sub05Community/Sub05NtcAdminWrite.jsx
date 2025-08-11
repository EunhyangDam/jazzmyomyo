import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./scss/Sub05NtcAdminWrite.scss";

function Sub05NtcAdminWrite() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

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

    // 🔗 여기에 백엔드 POST 연결 예정
    alert("공지사항이 등록되었습니다.");
    navigate("/NtcAdmin");
  };

  return (
    <div id="Sub05NtcAdimWrite">
      <div className="breadcrumb">
        <i className="bi bi-house"></i> &gt; 공지사항 &gt; 글쓰기
      </div>

      <h2>공지사항 글쓰기</h2>

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
          <button type="submit">등록</button>
          <button type="button" onClick={() => navigate(-1)}>취소</button>
        </div>
      </form>
    </div>
  );
}

export default Sub05NtcAdminWrite;
