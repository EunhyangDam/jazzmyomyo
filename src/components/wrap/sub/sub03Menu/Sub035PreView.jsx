import React, { useEffect } from "react";
import "./scss/Sub035PreView.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";

function Sub035PreView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal); // { heading, isON, isConfirm, isYes, ... }

  const mockData = {
    "1": { title: "[예약신청] 9월 12일 2인", writer: "이시은", reserveDate: "2025-09-12", writeDate: "2025-08-01", time: "19:00", people: "2명", wine: "Shiraz Whisper", food: "재즈 나초", note: "견과류 알러지 있어요", status: "예약완료", reply: "예약 확인되었습니다. 공연 날 뵙겠습니다! 🎷 테이블 3번으로 안내드릴 예정입니다." },
    "2": { title: "[예약신청] 9월 14일 3인", writer: "이은지", reserveDate: "2025-09-14", writeDate: "2025-08-02", time: "20:00", people: "3명", wine: "Chablis", food: "감바스", note: "", status: "예약중", reply: "" },
    "3": { title: "[예약신청] 9월 18일 4인", writer: "박의연", reserveDate: "2025-09-18", writeDate: "2025-08-03", time: "18:30", people: "4명", wine: "Moscato Dream", food: "트러플 감자튀김", note: "창가 자리 요청", status: "예약중", reply: "" },
    "4": { title: "[예약신청] 9월 22일 3인", writer: "정하은", reserveDate: "2025-09-22", writeDate: "2025-08-04", time: "21:00", people: "3명", wine: "Petit Chablis", food: "치즈 플래터", note: "생일 케이크 지참 예정", status: "예약완료", reply: "창가 자리로 배정해두었습니다. 감사합니다 :)" },
    "5": { title: "[예약신청] 9월 25일 2인", writer: "홍규린", reserveDate: "2025-09-25", writeDate: "2025-08-05", time: "19:30", people: "2명", wine: "Brut Rosé", food: "재즈 나초", note: "분리 결제 요청", status: "예약중", reply: "" },
    "6": { title: "[예약신청] 9월 30일 5인", writer: "홍길동", reserveDate: "2025-09-30", writeDate: "2025-08-06", time: "18:00", people: "5명", wine: "Argento Malbec", food: "모둠 플래터", note: "", status: "예약취소", reply: "죄송합니다. 예약이 취소되었습니다. 추후 방문 부탁드립니다." }
  };

  const post = mockData[id];

  const onClickDelete = () => {
    dispatch(
      confirmModalAction({
        heading: "정말 이 글을 삭제하시겠습니까?",
        explain: "삭제 후에는 되돌릴 수 없습니다.",
        isON: true,
        isConfirm: true,
        message1: "예",
        message2: "아니오",
      })
    );
  };

  useEffect(() => {
    if (modal.isYes === true) {
      dispatch(confirmModalYesNoAction(false)); // 초기화
      dispatch(
        confirmModalAction({
          heading: "삭제되었습니다.",
          explain: "",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
    }
  }, [modal.isYes, dispatch]);


  useEffect(() => {
    if (modal.heading === "삭제되었습니다." && modal.isON) {
      navigate("/Pre");
    }
  }, [modal.heading, modal.isON, navigate]);

  return (
    <div id="sub_preView">
      <div className="board-view">
        {!post ? (
          <div id="sub_pre">
            <div className="paper">
              <p>해당 게시글을 찾을 수 없습니다.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="view-header">
              <h2>{post.title}</h2>
              <div className="view-meta">
                작성자: {post.writer} | 예약일: {post.reserveDate} | 작성일: {post.writeDate}
              </div>
            </div>

            <div className="view-body">
              <ul className="info-table">
                <li><strong>시간</strong><span>{post.time}</span></li>
                <li><strong>인원</strong><span>{post.people}</span></li>
                <li><strong>와인</strong><span>{post.wine}</span></li>
                <li><strong>안주</strong><span>{post.food}</span></li>
                <li><strong>특이사항</strong><span>{post.note}</span></li>
              </ul>

              {post.reply && (
                <div className="admin-reply">
                  <strong>관리자 답변</strong>
                  <p>{post.reply}</p>
                </div>
              )}
            </div>

            <div className="view-actions">
              <button className="back-btn" onClick={() => navigate("/Pre")}>← 목록으로</button>
              <button className="edit-btn" onClick={() => navigate(`/PreE/edit/${id}`)}>✏ 수정하기</button>
              <button className="delete-btn" onClick={onClickDelete}>삭제하기</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Sub035PreView;