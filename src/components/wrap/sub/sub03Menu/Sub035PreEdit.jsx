/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import './scss/Sub035PreEdit.scss';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";

function Sub035PreEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const [form, setForm] = useState({
    id: id || "",
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
    status: "예약중",
    reply: "", 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userInfoString = localStorage.getItem("jazzmyomyo_sign_in") || sessionStorage.getItem("jazzmyomyo_sign_in");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const role = localStorage.getItem("role");
    const isAdmin = role === "admin";

    if (!userInfo || !userInfo.아이디) {
      dispatch(confirmModalAction({
        heading: "로그인 필요",
        explain: "로그인 후 사전 예약을 수정할 수 있어요.",
        isON: true,
        isConfirm: false,
        message1: "확인",
      }));
      return;
    }

    const fetchReservation = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/jazzmyomyo/preorder_table_select_one.php", {
          params: { id }
        });

        if (res.data.success && res.data.item) {
          const item = res.data.item;
          
          if (!isAdmin && userInfo.아이디 !== item.user_id) {
            dispatch(confirmModalAction({
              heading: "접근 불가",
              explain: "본인의 예약만 수정할 수 있습니다.",
              isON: true,
              isConfirm: false,
              message1: "확인",
            }));
            return;
          }

          setForm({
            id: item.id || "",
            user_id: item.user_id || "",
            writer_name: item.writer_name || "",
            title: item.title || "",
            reserve_date: item.reserve_date || "",
            reserve_time: item.reserve_time || "",
            people: item.people || 1,
            wine: item.wine || "",
            beverage: item.beverage || "",
            food: item.food || "",
            note: item.note || "",
            status: item.status || "예약중",
            reply: item.reply || "",
          });
          setError(null);
        } else {
          setError(res.data.error || "예약 정보를 불러올 수 없습니다.");
        }
      } catch (err) {
        setError("에러 발생: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReservation();
  }, [id, dispatch, navigate]);

  useEffect(() => {
    if (modal.heading === "로그인 필요" && modal.isON) {
      dispatch(confirmModalYesNoAction(false));
      navigate("/lg");
    }
    if (modal.heading === "접근 불가" && modal.isON) {
      dispatch(confirmModalYesNoAction(false));
      navigate("/pre");
    }
    if (modal.heading === "예약 정보가 수정되었습니다." && modal.isON) {
      dispatch(confirmModalYesNoAction(false));
      navigate("/preV/view/" + id);
    }
  }, [modal, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("id", form.id);
      body.append("title", form.title);
      body.append("people", form.people);
      body.append("wine", form.wine);
      body.append("beverage", form.beverage);
      body.append("food", form.food);
      body.append("note", form.note);
      body.append("status", form.status);
      body.append("reserve_date", form.reserve_date);
      body.append("reserve_time", form.reserve_time);
      body.append("reply", form.reply);

      const res = await axios.post("/jazzmyomyo/preorder_table_update.php", body);
      if (res.data.success) {
        dispatch(confirmModalAction({
          heading: "예약 정보가 수정되었습니다.",
          explain: "",
          isON: true,
          isConfirm: false,
          message1: "확인",
        }));
      } else {
        dispatch(confirmModalAction({
          heading: "수정 실패",
          explain: res.data.message || "수정 중 오류 발생",
          isON: true,
          isConfirm: false,
          message1: "확인",
        }));
      }
    } catch (err) {
      dispatch(confirmModalAction({
        heading: "수정 실패",
        explain: "에러 발생: " + err.message,
        isON: true,
        isConfirm: false,
        message1: "확인",
      }));
    }
  };

  if (loading) {
    return (
      <div id="sub_preEdit">
        <div className="edit-container" style={{ textAlign: "center", padding: "40px" }}>
          예약 정보를 불러오는 중...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="sub_preEdit">
        <div className="edit-container" style={{ textAlign: "center", padding: "40px", color: "#c00" }}>
          {error}
          <button className="back-btn" onClick={() => navigate("/Pre")} style={{ marginTop: "10px" }}>
            ← 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }
  
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  return (
    <div id="sub_preEdit">
      <div className="edit-container">
        <h2>예약 정보 수정</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>작성자</label>
          <input className="writer_name" type="text" name="writer_name" value={form.writer_name} readOnly />

          <label>제목</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required />

          <label>예약 날짜</label>
          <input type="date" name="reserve_date" value={form.reserve_date} readOnly />

          <label>예약 시간</label>
          <input type="time" name="reserve_time" value={form.reserve_time} onChange={handleChange} />

          <label>인원 수</label>
          <input type="number" name="people" value={form.people} onChange={handleChange} min="1" max="10" />
          
          {isAdmin && (
            <>
              <label>예약 상태</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="예약중">예약중</option>
                <option value="예약완료">예약완료</option>
                <option value="주문취소">주문취소</option>
              </select>
              
              {/* <-- 4. 관리자 전용 댓글 입력란 추가 */}
              <label>관리자 댓글</label>
              <textarea
                name="reply"
                value={form.reply}
                onChange={handleChange}
                placeholder="관리자 댓글을 입력하세요."
              ></textarea>
            </>
          )}

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

          <div className="btn-group">
            <button type="submit" className="submit-btn">수정 완료</button>
            <button type="button" className="back-btn" onClick={() => navigate(-1)}>← 돌아가기</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sub035PreEdit;