import React, { useState, useEffect } from "react";
import './scss/Sub035PreEdit.scss';
import { useParams, useNavigate } from "react-router-dom";

function Sub035PreEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 더미 데이터 (나중에 fetch로 바꿔도 됨)
  const dummyData = {
    "1": {
      title: "[예약신청] 9월 12일 2인",
      writer: "홍길동",
      reserveDate: "2025-09-12",
      time: "19:00",
      people: "2명",
      wine: "Shiraz Whisper",
      food: "재즈 나초",
      note: "견과류 알러지 있어요"
    }
  };

  const [form, setForm] = useState({
    title: "",
    writer: "",
    reserveDate: "",
    time: "",
    people: "",
    wine: "",
    food: "",
    note: ""
  });

  // 컴포넌트 마운트 시 기존 데이터 불러오기
  useEffect(() => {
    if (dummyData[id]) {
      setForm(dummyData[id]);
    } else {
      alert("해당 글이 없습니다.");
      navigate("/Menu/Preorder");
    }
  }, [id]);

  // 입력값 바뀔 때
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("수정이 완료되었습니다!");
    navigate(`/PreV/view/${id}`);
  };

  return (
    <div id="sub_pre">
      <div className="edit-container">
        <h2>✏ 예약 정보 수정</h2>

        <form className="edit-form" onSubmit={handleSubmit}>
          <label>제목</label>
          <input name="title" value={form.title} onChange={handleChange} />

          <label>작성자</label>
          <input name="writer" value={form.writer} onChange={handleChange} />

          <label>예약 날짜</label>
          <input name="reserveDate" type="date" value={form.reserveDate} onChange={handleChange} />

          <label>예약 시간</label>
          <input name="time" type="time" value={form.time} onChange={handleChange} />

          <label>인원</label>
          <input name="people" value={form.people} onChange={handleChange} />

          <label>와인</label>
          <input name="wine" value={form.wine} onChange={handleChange} />

          <label>안주</label>
          <input name="food" value={form.food} onChange={handleChange} />

          <label>특이사항</label>
          <textarea name="note" value={form.note} onChange={handleChange}></textarea>

          <button type="submit" className="submit-btn">수정 완료</button>
        </form>

        <button className="back-btn" onClick={() => navigate(`/PreV/view/${id}`)}>← 돌아가기</button>
      </div>
    </div>
  );
}

export default Sub035PreEdit;