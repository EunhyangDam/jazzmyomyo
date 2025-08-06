import React from "react";
import './scss/Sub035PreView.scss';
import { useParams, useNavigate } from "react-router-dom";

function Sub035PreView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const mockData = {
    "1": {
      title: "[예약신청] 9월 12일 2인",
      writer: "이시은",
      reserveDate: "2025-09-12",
      writeDate: "2025-08-01",
      time: "19:00",
      people: "2명",
      wine: "Shiraz Whisper",
      food: "재즈 나초",
      note: "견과류 알러지 있어요",
      reply: "예약 확인되었습니다. 공연 날 뵙겠습니다! 🎷 테이블 3번으로 안내드릴 예정입니다."
    },
    "2": {
      title: "[예약신청] 9월 14일 3인",
      writer: "이은지",
      reserveDate: "2025-09-14",
      writeDate: "2025-08-02",
      time: "20:00",
      people: "3명",
      wine: "Chablis",
      food: "감바스",
      note: "",
      reply: ""
    },
    "3": {
      title: "[예약신청] 9월 18일 4인",
      writer: "박의연",
      reserveDate: "2025-09-18",
      writeDate: "2025-08-03",
      time: "18:30",
      people: "4명",
      wine: "Moscato Dream",
      food: "트러플 감자튀김",
      note: "창가 자리 요청",
      reply: ""
    },
    "4": {
      title: "[예약신청] 9월 22일 3인",
      writer: "정하은",
      reserveDate: "2025-09-22",
      writeDate: "2025-08-04",
      time: "21:00",
      people: "3명",
      wine: "Petit Chablis",
      food: "치즈 플래터",
      note: "생일 케이크 지참 예정",
      reply: "창가 자리로 배정해두었습니다. 감사합니다 :)"
    },
    "5": {
      title: "[예약신청] 9월 25일 2인",
      writer: "홍규린",
      reserveDate: "2025-09-25",
      writeDate: "2025-08-05",
      time: "19:30",
      people: "2명",
      wine: "Brut Rosé",
      food: "재즈 나초",
      note: "분리 결제 요청",
      reply: ""
    },
    "6": {
      title: "[예약신청] 9월 30일 5인",
      writer: "홍길동",
      reserveDate: "2025-09-30",
      writeDate: "2025-08-06",
      time: "18:00",
      people: "5명",
      wine: "Argento Malbec",
      food: "모둠 플래터",
      note: "",
      reply: "죄송합니다. 예약이 취소되었습니다. 추후 방문 부탁드립니다."
    }
  };
  

  const post = mockData[id];

  if (!post) {
    return <div id="sub_pre"><div className="paper"><p>해당 게시글을 찾을 수 없습니다.</p></div></div>;
  }

  return (
    <div id="sub_preView">
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