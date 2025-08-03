import React from "react";
import './scss/Sub035PreView.scss';
import { useParams, useNavigate } from "react-router-dom";

function Sub035PreView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const mockData = {
    "1": {
      title: "[예약신청] 9월 12일 2인",
      writer: "홍길동",
      reserveDate: "2025-09-12",
      writeDate: "2025-08-01",
      time: "19:00",
      people: "2명",
      wine: "Shiraz Whisper",
      food: "재즈 나초",
      note: "견과류 알러지 있어요",
      reply: "예약 확인되었습니다. 공연 날 뵙겠습니다! 🎷 테이블 3번으로 안내드릴 예정입니다."
    }
  };

  const post = mockData[id];

  if (!post) {
    return <div id="sub_pre"><div className="paper"><p>해당 게시글을 찾을 수 없습니다.</p></div></div>;
  }

  return (
    <div id="sub_pre">
  <div className="board-view">
    <div className="view-header">
      <h2>{post.title}</h2>
      <div className="view-meta">
        작성자: {post.writer} | 예약일: {post.reserveDate} | 작성일: {post.writeDate}
      </div>
    </div>

    <div className="view-body">
      <table className="info-table">
        <tbody>
          <tr><th>시간</th><td>{post.time}</td></tr>
          <tr><th>인원</th><td>{post.people}</td></tr>
          <tr><th>와인</th><td>{post.wine}</td></tr>
          <tr><th>안주</th><td>{post.food}</td></tr>
          <tr><th>특이사항</th><td>{post.note}</td></tr>
        </tbody>
      </table>

      {post.reply && (
        <div className="admin-reply">
          <strong>관리자 답변</strong>
          <p>{post.reply}</p>
        </div>
      )}
    </div>

    <div className="view-actions">
      <button className="back-btn" onClick={() => navigate(`/Pre`)}>← 목록으로</button>
      <button className="edit-btn" onClick={() => navigate(`/PreE/edit/${id}`)}>
  ✏ 수정하기
</button>

<button
  className="delete-btn"
  onClick={() => {
    if (window.confirm("정말 이 글을 삭제하시겠습니까?")) {
      alert("삭제되었습니다."); // 실제 삭제 로직은 추후 연결
      navigate("/Pre");
    }
  }}
>
  🗑 삭제하기
</button>

    </div>
  </div>
    </div>
    
  );
}

export default Sub035PreView;