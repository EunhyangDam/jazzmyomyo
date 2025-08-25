import React, { useEffect, useState } from "react";
import './scss/Sub035PreWrite.scss';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";

function Sub035PreWrite() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const [form, setForm] = useState({
    user_id: "",
    writer_name: "",
    title: "",
    reserve_date: "",
    reserve_time: "",
    people: 1,
    wine: "",
    beverage: "",
    food: "",
    note: "",
    status: "예약중"
  });

  useEffect(() => {
    const userInfoString = localStorage.getItem("jazzmyomyo_sign_in") || sessionStorage.getItem("jazzmyomyo_sign_in");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    if (!userInfo || !userInfo.아이디) {
      dispatch(confirmModalAction({
        heading: "로그인 필요",
        explain: "로그인 후 사전 예약을 진행할 수 있어요.",
        isON: true,
        isConfirm: false,
        message1: "확인",
        message2: "",
      }));
    } else {
      setForm((prev) => ({ ...prev, user_id: userInfo.아이디, writer_name: userInfo.이름 }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (modal.heading === "로그인 필요" && modal.isON) {
      dispatch(confirmModalYesNoAction(false));
      navigate("/lg");
    }
  }, [modal.heading, modal.isON, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }
      
      const res = await axios.post("/jazzmyomyo/preorder_table_insert.php", formData);
      
      if (res.data.success) {
        dispatch(confirmModalAction({
          heading: "예약신청이 등록되었습니다.",
          explain: "",
          isON: true,
          isConfirm: false,
          message1: "확인",
          message2: "",
        }));
      } else {
        dispatch(confirmModalAction({
          heading: "예약 등록 실패",
          explain: res.data.error || "알 수 없는 오류가 발생했습니다.",
          isON: true,
          isConfirm: false,
          message1: "확인",
          message2: "",
        }));
      }
    } catch (err) {
      dispatch(confirmModalAction({
        heading: "예약 등록 실패",
        explain: "에러 발생: " + err.message,
        isON: true,
        isConfirm: false,
        message1: "확인",
        message2: "",
      }));
    }
  };

  useEffect(() => {
    if (modal.heading === "예약신청이 등록되었습니다." && modal.isON) {
      dispatch(confirmModalYesNoAction(false));
      navigate("/Pre");
    }
  }, [modal.heading, modal.isON, navigate, dispatch]);

  return (
    <div id="sub_preWrite">
      <div className="board-view">
        <h2 className="form-title">사전 예약 신청</h2>

        <form className="write-form" onSubmit={handleSubmit}>

          <label>작성자</label>
          <input
            className="writer_name"
            type="text"
            name="writer_name"
            value={form.writer_name}
            onChange={handleChange}
            placeholder="예: 홍길동"
            required
            disabled
          />

          <label>제목</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="[예약신청] x월 x일 n명"
            required
          />

          <label>예약 날짜</label>
          <input
            type="date"
            name="reserve_date"
            value={form.reserve_date}
            onChange={handleChange}
            required
          />

          <label>예약 시간</label>
          <input
            type="time"
            name="reserve_time"
            value={form.reserve_time}
            onChange={handleChange}
            required
          />

          <label>인원 수</label>
          <input
            type="number"
            name="people"
            value={form.people}
            min="1"
            max="10"
            onChange={handleChange}
            required
          />

          <label>와인</label>
          <select name="wine" value={form.wine} onChange={handleChange}>
            <option value="">선택 안 함</option>
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
          <select name="beverage" value={form.beverage} onChange={handleChange}>
            <option value="">선택 안 함</option>
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
            <option value="">선택 안 함</option>
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

          <button type="submit" className="submit-btn">등록하기</button>
        </form>

        <div className="notice">
          <div className="notice-line">
            <i className="bi bi-bell"></i>
            <div className="text"><strong>결제 방식</strong> : 현장결제 (예약금 2만원, 계좌이체)</div>
          </div>
          <div className="notice-line">
            <i className="bi bi-bell-fill"></i>
            <div className="text"><strong>픽업 방식</strong> : 예약 시간에 맞춰 테이블로 서빙</div>
          </div>
          <div className="notice-line">
            <i className="bi bi-bell"></i>
            <div className="text"><strong>취소 안내</strong> : 공연 24시간 전까지 취소 가능 (이후에는 예약금 환불 불가)</div>
          </div>
          <div className="notice-line">
            <i className="bi bi-bell-fill"></i>
            <div className="text"><strong>문의사항</strong> : 기타 궁금한 점은 재즈묘묘로 연락주세요</div>
          </div>
          <div className="notice-line">
            <i className="bi bi-bell"></i>
            <div className="text"><strong>안내사항</strong> : 외부 음식 반입 금지</div>
          </div>
        </div>

        <div className="view-actions">
          <button className="back-btn" onClick={() => navigate(-1)}>← 게시판 목록으로</button>
        </div>
      </div>
    </div>
  );
}

export default Sub035PreWrite;