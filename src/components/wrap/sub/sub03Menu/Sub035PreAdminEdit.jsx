import React, { useState, useEffect } from "react";
import "./scss/Sub035PreAdminEdit.scss";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";

function Sub035PreAdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();


  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const dummyData = {
    "1": { title: "[예약신청] 9월 12일 2인", writer: "이시은", reserveDate: "2025-09-12", time: "19:00", people: "2명", wine: "Shiraz Whisper", food: "재즈 나초", note: "견과류 알러지 있어요" },
    "2": { title: "[예약신청] 9월 14일 3인", writer: "이은지", reserveDate: "2025-09-14", time: "20:00", people: "3명", wine: "Chablis", food: "감바스", note: "" },
    "3": { title: "[예약신청] 9월 18일 4인", writer: "박의연", reserveDate: "2025-09-18", time: "18:30", people: "4명", wine: "Moscato Dream", food: "트러플 감자튀김", note: "창가 자리 요청" },
    "4": { title: "[예약신청] 9월 22일 3인", writer: "정하은", reserveDate: "2025-09-22", time: "21:00", people: "3명", wine: "Petit Chablis", food: "치즈 플래터", note: "생일 케이크 지참 예정" },
    "5": { title: "[예약신청] 9월 25일 2인", writer: "홍규린", reserveDate: "2025-09-25", time: "19:30", people: "2명", wine: "Brut Rosé", food: "재즈 나초", note: "분리 결제 요청" },
    "6": { title: "[예약신청] 9월 30일 5인", writer: "홍길동", reserveDate: "2025-09-30", time: "18:00", people: "5명", wine: "Argento Malbec", food: "모둠 플래터", note: "" }
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

  useEffect(() => {
    if (dummyData[id]) {
      setForm(dummyData[id]);
    } else {
      dispatch(
        confirmModalAction({
          heading: "해당 글이 없습니다.",
          explain: "",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (modal.heading === "해당 글이 없습니다." && modal.isON === false) {
      dispatch(confirmModalYesNoAction(false));
      navigate("/PreAdmin");
    }
  }, [modal.heading, modal.isON, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      confirmModalAction({
        heading: "수정되었습니다.",
        explain: "",
        isON: true,
        isConfirm: false,
        message1: "",
        message2: "",
      })
    );
  };

  useEffect(() => {
    if (modal.heading === "수정되었습니다." && modal.isON) {
      dispatch(confirmModalYesNoAction(false));
      navigate(`/PreAdminV/view/${id}`);
    }
  }, [modal.heading, modal.isON, dispatch, navigate, id]);

  return (
    <div id="sub_preAdminEdit">
      <div className="board-view">
        <h2 className="form-title">✏ 예약 정보 수정</h2>

        <form className="write-form" onSubmit={handleSubmit}>
          <label>제목</label>
          <input name="title" value={form.title} onChange={handleChange} />

          <label>작성자</label>
          <input name="writer" value={form.writer} onChange={handleChange} />

          <label>예약 날짜</label>
          <input name="reserveDate" type="date" value={form.reserveDate} onChange={handleChange} />

          <label>예약 시간</label>
          <input name="time" type="time" value={form.time} onChange={handleChange} />

          <label>인원 수</label>
          <input name="people" value={form.people} onChange={handleChange} />

          <label>와인</label>
          <select name="wine" value={form.wine} onChange={handleChange}>
            <optgroup label="레드 와인 (Red)">
              <option>Chablis</option>
              <option>Argento Malbec</option>
              <option>Shiraz Whisper</option>
            </optgroup>
            <optgroup label="화이트 와인 (White)">
              <option>Riesling Touch</option>
              <option>Brut Rosé</option>
              <option>Petit Chablis</option>
            </optgroup>
            <optgroup label="스파클링 와인 (Sparkling)">
              <option>Moscato Dream</option>
              <option>Crémant Rosé</option>
              <option>Cava Estrella</option>
            </optgroup>
          </select>

          <label>주류&음료</label>
          <select>
            <optgroup label="맥주 (Beer)">
              <option>클라우드 생맥주 500ml</option>
              <option>스텔라 아르투아 330ml</option>
              <option>허니문배 Draft 330ml</option>
              <option>흑맥주</option>
            </optgroup>
            <optgroup label="칵테일 (Cocktail)">
              <option>깔루아밀크</option>
              <option>모스카토 선셋</option>
              <option>클래식 네그로니</option>
              <option>마티니 드라이</option>
            </optgroup>
            <optgroup label="위스키 (Whisky)">
              <option>글렌리벳 12년</option>
              <option>제임슨</option>
              <option>잭다니엘</option>
              <option>시바스대갈</option>
            </optgroup>
            <optgroup label="무알콜 / 음료">
              <option>샤인머스캣 에이드</option>
              <option>자몽에이드</option>
              <option>제로콜라</option>
              <option>콜라</option>
              <option>스프라이트</option>
              <option>에비앙</option>
            </optgroup>
          </select>

          <label>안주</label>
          <select name="food" value={form.food} onChange={handleChange}>
            <optgroup label="플래터 & 핑거푸드">
              <option>묘묘의 클래식 소파 플래터</option>
              <option>묘묘의 달빛 야식 플래터</option>
              <option>묘묘의 과일정원 플래터</option>
              <option>크래커 & 치즈 한입 세트</option>
              <option>무화과 크림치즈 바이트</option>
              <option>트러플 감자튀김</option>
              <option>트러플 초콜릿 & 견과 세트</option>
              <option>프로슈토 멜론 스틱</option>
              <option>바나나 푸딩</option>
              <option>스모어딥</option>
              <option>재즈 나초</option>
              <option>하몽 살라미 샐러드</option>
              <option>피자 1조각(페퍼로니)</option>
              <option>피자 1조각(하와이안)</option>
              <option>피자 1조각(고르곤졸라)</option>
              <option>피자 한판(페퍼로니)</option>
              <option>피자 한판(하와이안)</option>
              <option>피자 한판(고르곤졸라)</option>
            </optgroup>
            <optgroup label="묘한세트">
              <option>클래식 나잇 듀오라묘</option>
              <option>문라이트 로맨틱라묘</option>
              <option>샤르르 달콤하묘</option>
            </optgroup>
          </select>

          <label>특이사항</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="알러지 등 참고사항"
          ></textarea>

          <div className="admin-section">
            <label>예약 상태</label>
            <select>
              <option>예약중</option>
              <option>예약완료</option>
              <option>예약취소</option>
            </select>

            <label>관리자 답변</label>
            <textarea placeholder="회원에게 남길 안내 메시지를 입력하세요."></textarea>
          </div>

          <button type="submit" className="submit-btn">수정 완료</button>
        </form>

        <div className="notice">
          <div className="notice-line">
            <i className="bi bi-bell"></i>
            <div className="text">
              <strong>결제 방식</strong> : 현장결제 (예약금 2만원, 계좌이체)
            </div>
          </div>
          <div className="notice-line">
            <i className="bi bi-bell-fill"></i>
            <div className="text">
              <strong>픽업 방식</strong> : 예약 시간에 맞춰 테이블로 서빙
            </div>
          </div>
          <div className="notice-line">
            <i className="bi bi-bell"></i>
            <div className="text">
              <strong>취소 안내</strong> : 공연 24시간 전까지 취소 가능 (이후에는 예약금 환불 불가)
            </div>
          </div>
          <div className="notice-line">
            <i className="bi bi-bell-fill"></i>
            <div className="text">
              <strong>문의사항</strong> : 기타 궁금한 점은 재즈묘묘로 연락주세요
            </div>
          </div>
          <div className="notice-line">
            <i className="bi bi-bell"></i>
            <div className="text">
              <strong>안내사항</strong> : 외부 음식 반입 금지
            </div>
          </div>
        </div>

        <div className="view-actions">
          <button className="back-btn" onClick={() => navigate(`/PreAdminV/view/${id}`)}>
            ← 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sub035PreAdminEdit;