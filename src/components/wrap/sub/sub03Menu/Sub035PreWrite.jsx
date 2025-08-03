import React from "react";
import './scss/Sub035PreWrite.scss';
import { useNavigate } from "react-router-dom";

function Sub035PreWrite() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("예약이 등록되었습니다.");
    navigate("/Pre");
  };

  return (
    <div id="sub_pre">
      <div className="board-view">
        <h2 className="form-title">✍ 사전 예약 작성</h2>

        <form className="write-form" onSubmit={handleSubmit}>
          <label>작성 유형</label>
          <select>
            <option>예약자</option>
            <option>관리자</option>
          </select>

          <label>제목</label>
          <input type="text" placeholder="[예약신청] 날짜 인원, 와인" />

          <label>작성자</label>
          <input type="text" placeholder="예: 홍길동" />

          <label>예약 날짜</label>
          <input type="date" />

          <label>예약 시간</label>
          <input type="time" />

          <label>인원 수</label>
          <input type="number" min="1" max="10" />

          <label>와인</label>
          <input type="text" placeholder="예: Shiraz Whisper" />

          <label>안주</label>
          <input type="text" placeholder="예: 재즈 나초" />

          <label>특이사항</label>
          <textarea placeholder="알러지 등 참고사항"></textarea>

          <button type="submit" className="submit-btn">등록하기</button>
        </form>

        <div className="notice">
          💳 <strong>결제 방식</strong>: 현장결제 (예약금 2만원, 계좌이체)<br />
          🍽 <strong>픽업 방식</strong>: 예약 시간에 맞춰 테이블로 서빙<br />
          ❌ <strong>취소 안내</strong>: 공연 24시간 전까지 취소 가능 (이후에는 예약금 환불 불가)<br />
          📞 <strong>문의사항</strong>: 기타 궁금한 점은 재즈묘묘로 연락주세요<br />
          🚫 <strong>안내사항</strong>: 외부 음식 반입 금지<br />
        </div>

        <div className="view-actions">
          <button className="back-btn" onClick={() => navigate(-1)}>← 게시판 목록으로</button>
        </div>
      </div>
    </div>
  );
}

export default Sub035PreWrite;