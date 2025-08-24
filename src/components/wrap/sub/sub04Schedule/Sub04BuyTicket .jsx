import React from "react";
import axios from "axios";
import "./scss/Sub04BuyTicket.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";
import { confirmModalYesNoAction } from "../../../../store/confirmModal";
import SiteMapComponent from "../../custom/SiteMapComponent"

// import { addReservation } from "../../../../store/resavation";

function Sub04BuyTicket(props) {
  const [state, setstate] = useState();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(null);
  const navigate = useNavigate();
  
  
  const signIn = useSelector((state) => state.signIn);  // slice 이름
  const isLogin = !!signIn.아이디;   // 아이디가 있으면 로그인 상태


  const isYes = useSelector((state) => state.confirmModal.isYes);
  
  
  // 로그인 상태에 따른 초기 설정 
  const [isGuest, setIsGuest] = useState(!isLogin);
  useEffect(() => {
    // 로그인 상태가 바뀌면 탭 기본값도 즉시 반영
    setIsGuest(!isLogin); // 로그인이면 회원예약(false), 비로그인이면 비회원예약(true)
  }, [isLogin]);

  // 회원 탭 클릭: 그대로 비회원 탭으로 전환
  const handleMemberClick = () => {
    if (!isLogin) {
      // 모달의 '예/아니오' 응답을 새로 쓰려하니, 예약확인과 충돌하지 않게 pending을 구분
      setPending("login");
      dispatch(confirmModalYesNoAction(false));
      dispatch(
        confirmModalAction({
          heading: "알림",
          explain: "현재 로그인이 안되어 있습니다.\n로그인 하시겠습니까?",
          isON: true,
          isConfirm: true,   // 예/아니오
          message1: "예",
          message2: "아니오",
        })
      );
      return; // 탭 전환 중단
    }
    setIsGuest(false); // 로그인 상태라면 정상 전환
  };




  // 탭 전환
  const handleGuestClick = () => setIsGuest(true);

  // 비회원 폼 입력
  const handleGuestNameChange = (e) =>
    setGuestForm({ ...guestForm, name: e.target.value });
  const handleGuestPhoneChange = (e) =>
    setGuestForm({ ...guestForm, phone: e.target.value });
  const handleGuestEmailChange = (e) =>
    setGuestForm({ ...guestForm, email: e.target.value });

  // 인원 선택 (커리)
  const handlePeopleClick = (item) => () => setPeopleCount(item);

  ////// 일정확인용////////////
  const [selected, setSelected] = useState(null); // yes 또는 no
  const [selectedPerformance, setSelectedPerformance] = useState(null);

  // 달력////////////////////////////////////////////////////////////////'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 달력: 이전/다음 달
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // 날짜: 이전/다음 날 (Date 불변 처리)
  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d);
  };
  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d);
  };

  // 공연 선택 (커리)
  const handleChoosePerformance = (item) => () =>
    setSelectedPerformance({ ...item, date: selectedStr });

  // 날짜 포맷 YYYY-MM-DD
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // 오늘 날짜
  const todayStr = formatDate(new Date());
  const selectedStr = formatDate(selectedDate);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 날짜별 공연 데이터 그룹
  const performanceMap = scheduleData.reduce((acc, cur) => {
    if (!acc[cur.date]) acc[cur.date] = [];
    acc[cur.date].push(cur);
    return acc;
  }, {});

  // 해당 날짜 공연 리스트
  const performancesToday = scheduleData.filter(
    (item) => item.date === selectedStr
  );

  // 데이터 불러오기
  useEffect(() => {
    fetch("./json/sub04/schedule.json")
      .then((res) => res.json())
      .then((data) => setScheduleData(data))
      .catch((err) => console.error("공연 데이터 로딩 실패:", err));
  }, []);

  // 요일 라벨
  const dayLabels = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // 날짜 셀 생성
  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(
      <div key={`empty-${i}`} className="calendar-cell empty" />
    );
  }

  for (let d = 1; d <= lastDate; d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = formatDate(dateObj);
    const weekday = dateObj.getDay();

    const isToday = dateStr === todayStr;
    const isSelected = dateStr === selectedStr;
    const hasPerformances = performanceMap[dateStr];

    calendarCells.push(
      <div
        key={dateStr}
        className={`calendar-cell ${isToday ? "today" : ""} ${
          isSelected ? "selected" : ""
        }`}
        onClick={() => setSelectedDate(dateObj)}>
        <span
          className="date-circle"
          style={{
            color:
              weekday === 0 ? "#dd0000" : weekday === 6 ? "#003cff" : undefined,
          }}>
          {d}
        </span>
        <div className="dots">
          {hasPerformances &&
            hasPerformances.map((_, idx) => <span key={idx} className="dot" />)}
        </div>
      </div>
    );
  }
  /////////////////////////////////////////////////////////////////////////////////////////

  // 섹션5 예/아니오
  const handleConfirmYes = () => setSelected("yes");
  const handleConfirmNo = () => {
    setSelectedPerformance(null);
    setSelected(null);
  };

  ///// 섹셤6, 7, 보이기 안보이기 ////////////////////////////////

  // 섹션5에서 '예' 선택했는지 여부
  const isConfirmed = selected === "yes";

  // 날짜/공연 바뀌면 확정 해제
  useEffect(() => {
    setSelected(null);
  }, [selectedPerformance]);



  ////// 예약 전송 //////////////////////////////////////

  // 예약 관련 상태 (섹션2/3/4 값 반영)
  const [guestForm, setGuestForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [peopleCount, setPeopleCount] = useState(1);

  // 섹션4에서 이미 있는 값들을 이용해 문자열로 맞춤
  const selectedDateStr = selectedStr; // 기존 selectedStr("YYYY-MM-DD") 재사용
  const selectedTime = selectedPerformance?.time || "";

  // 비회원 폼 유효성 체크 (이메일 형식 포함)
  const isGuestFormFilled = () => {
    if (!isGuest) return true;
    const { name, phone, email } = guestForm;
    if (!name.trim() || !phone.trim() || !email.trim()) return false;
    if (!isValidEmail(email.trim())) return false;
    return true;
  };


  const handleReserveClick = (e) => {
    e.preventDefault();

    // 비회원 폼 미기입
    if (!isGuestFormFilled()) {
      dispatch(
        confirmModalAction({
          heading: "알림!",
          explain: "예약자 정보를 입력해주세요!",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
      return;
    }

    // 필수 선택값 가드
    if (!selectedPerformance) {
      // 날짜/시간 미선택 안내만 필요하면 확인형 모달로
      dispatch(
        confirmModalAction({
          heading: "알림!",
          explain: "날짜와 시간을 선택해 주세요.",
          isON: true,
          isConfirm: false, // 단일 확인 버튼
          message1: "",
          message2: "",
        })
      );
      return;
    }

    // 모달에 보여줄 문자열 조립
    const dateObj = new Date(selectedPerformance.date);
    const dateText = `${
      dateObj.getMonth() + 1
    }월 ${dateObj.getDate()}일 ${selectedPerformance.time
      .split("~")[0]
      .trim()}`;
    const peopleText = `${peopleCount}명`;

    // 이전 응답값 초기화 후, 컨펌 모달 오픈
    setPending("reserve");
    dispatch(confirmModalYesNoAction(false));
    dispatch(
      confirmModalAction({
        heading: "예약 확인",
        explain: `${dateText} ${peopleText}`,
        isON: true, // 모달 열기
        isConfirm: true, // 예/아니오 버튼
        message1: "예", // 날짜/시간
        message2: "아니오", // 인원
      })
    );
  };



  // DB저장
  const isValidEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  const parseTimeRange = (range) => {
    // "19:00 ~ 21:00" → {start:"19:00:00", end:"21:00:00"}
    const [s="", e=""] = (range || "").split("~").map(t => t?.trim() || "");
    return {
      start: s ? `${s}:00` : "",
      end:   e ? `${e}:00` : null
    };
  };

  useEffect(() => {
    if (isYes === true) {
      if (pending === "login") {
        // 로그인 유도 모달에서 '예'
        dispatch(confirmModalYesNoAction(false));
        setPending(null);
        navigate("/Lg"); 
        return;
      }
     
      if (pending === "reserve") {
        // === 예약 확인 모달에서 '예' → DB 저장 ===
        const rawTime = selectedPerformance?.time || ""; // 예: "19:00 ~ 21:00"
        const [s = "", e = ""] = rawTime.split("~").map(t => (t || "").trim());
        const time_start = s ? `${s}:00` : "";
        const time_end   = e ? `${e}:00` : null;
        // 공통 부분
        const base = {          
          artistName: selectedPerformance?.artist ?? "",   
          productName: selectedPerformance?.concertTitle ?? "",
          
          poster: selectedPerformance?.poster ?? null,
          people_count: peopleCount,
          date: selectedPerformance?.date ?? "",
          time_start,
          time_end,
          price: 0,
          payMethod: "none",
        };

        axios({
          url: "/jazzmyomyo/reservations.php",   // 실제 PHP 경로
          method: "POST",
          data: isGuest
            ? {
                ...base,
                type: "guest",
                userId: null, // or '비회원'
                name: guestForm.name,
                email: guestForm.email,
                phone: guestForm.phone,
              }
            : {
                ...base,
                type: "member",
                userId: signIn.아이디,
              },
        }
      )
        .then(({ status, data }) => {
          if (status === 200 && data?.ok) {
            // 성공
            if (isGuest) setGuestForm({ name: "", phone: "", email: "" });
            dispatch(
              confirmModalAction({
                heading: "예약 완료",
                explain: "마이페이지 > 예약내역에서 확인해 주세요.",
                isON: true,
                isConfirm: false,
              })
            );
          } 
          else {
            // 서버가 실패 응답
            dispatch(
              confirmModalAction({
                heading: "오류",
                explain: data?.msg ?? "예약 저장 실패",
                isON: true,
                isConfirm: false,
              })
            );
          }
          dispatch(confirmModalYesNoAction(false));
          setPending(null);
        })

        .catch((err) => {
          console.log(err);
          dispatch(
            confirmModalAction({
              heading: "오류",
              explain: `예약 저장 중 문제가 발생했습니다.\n${err.message}`,
              isON: true,
              isConfirm: false,
            })
          );
          dispatch(confirmModalYesNoAction(false));
          setPending(null);
        });        
      }
    } 
     else if (isYes === false) {
       // 모달에서 '아니오'
       setPending(null);
    }
  }, [isYes]); // isYes가 true가 되는 순간에만 실행




  return (
    <div id="sub04BuyTicket">
      <section id="section1" className="reservation-header">
        <div className="reservation-header">
          <div className="content">
            <div className="breadcrumb">
              <SiteMapComponent
                firstLink="/monthly"
                firstName="Schedule"
                secondLink="./"
                secondName="티켓 예매"
              />
            </div>
            <h2 className="section-title">티켓 예매</h2>
          </div>
        </div>
      </section>

      <section id="section2" className="reservation-type">
        <div className="container">
          <div className="type-tabs">
            <button
              className={`tab ${isGuest ? "active" : ""}`}
              onClick={handleGuestClick}>
              <span className="checkbox" /> 비회원 예약
            </button>
            <button
              className={`tab ${!isGuest ? "active" : ""}`}
              onClick={handleMemberClick}>
              <span className="checkbox" /> 회원예약
            </button>
          </div>

          {isGuest && (
            <div className="guest-form-box">
              <div className="form-area">
                <label>
                  예약자명
                  <input
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={guestForm.name}
                    onChange={handleGuestNameChange}
                  />
                </label>
                <label>
                  연락처
                  <input
                    type="text"
                    placeholder="연락처를 입력해주세요"
                    value={guestForm.phone}
                    onChange={handleGuestPhoneChange}
                  />
                </label>
                <label>
                  이메일
                  <input
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    value={guestForm.email}
                    onChange={handleGuestEmailChange}
                  />
                </label>
              </div>
              <div className="cat-area">
                <div className="gap">
                  <Link to="/SignUp">
                    <img src="./img/resavation_cat.png" alt="고양이" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="section3" className="reservation-people">
        <div className="container">
          <h3 className="section-title">
            <i className="bi bi-person-fill"></i>
            <span>인원을 선택해주세요</span>
          </h3>
          <div className="people-select">
            {[1, 2, 3, 4, 5].map((item) => (
              <button
                key={item}
                className={`person-btn ${peopleCount === item ? "active" : ""}`}
                onClick={handlePeopleClick(item)}>
                {item} 명
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="section4" className="schedule-detail">
        <div className="container">
          <h3 className="section-title">
            <i className="bi bi-calendar-week"></i>
            <span>날짜 시간을 선택해주세요</span>
          </h3>
          <div className="contents">
            {/* 달력 영역 */}
            <div className="calendar-area">
              <div className="calendar-header">
                <button className="prev-month" onClick={handlePrevMonth}>
                  <i className="material-icons">keyboard_arrow_left</i>
                </button>
                <div className="calendar-title">
                  {(month + 1).toString().padStart(2, "0")}
                </div>
                <button className="next-month" onClick={handleNextMonth}>
                  <i className="material-icons">keyboard_arrow_right</i>
                </button>
              </div>
              <div className="calendar-grid">
                {dayLabels.map((day) => (
                  <div key={day} className="day-label">
                    {day}
                  </div>
                ))}
                {calendarCells}
              </div>
            </div>

            {/* 공연 리스트 영역 */}
            <div className="performance-area">
              <div className="performance-header">
                <button className="prev-day" onClick={handlePrevDay}>
                  <i className="material-icons">keyboard_arrow_left</i>
                </button>
                <div className="current-date">{selectedStr}</div>
                <button className="next-day" onClick={handleNextDay}>
                  <i className="material-icons">keyboard_arrow_right</i>
                </button>
              </div>
              <div className="performance-list">
                {performancesToday.length === 0 ? (
                  <p>해당 날짜에는 공연이 없다묘</p>
                ) : (
                  performancesToday.map((item, idx) => (
                    <div className="performance-card" key={idx}>
                      <div className="number">
                        {(idx + 1).toString().padStart(2, "0")}
                      </div>
                      <img src={item.poster} alt={item.artist} />
                      <div className="info">
                        <h3>{item.artist}</h3>
                        <p>{item.time}</p>
                      </div>
                      <button
                        className={`choice ${
                          selectedPerformance &&
                          selectedPerformance.artist === item.artist &&
                          selectedPerformance.date === selectedStr
                            ? "selected"
                            : ""
                        }`}
                        onClick={handleChoosePerformance(item)}>
                        선택
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section5" className="choise-time-confirm">
        {selectedPerformance ? (
          <div className="time-confirm">
            <div className="contents">
              <strong>
                {new Date(selectedPerformance.date).getMonth() + 1}월{" "}
                {new Date(selectedPerformance.date).getDate()}일{" "}
                {selectedPerformance.time.split("~")[0].trim()}
              </strong>
              <span className="question">이 시간이 맞습니까?</span>
            </div>
            <div className="buttons">
              <button
                className={`confirm-btn ${
                  selected === "yes" ? "selected" : ""
                }`}
                onClick={handleConfirmYes}>
                예
              </button>
              <button
                className={`confirm-btn ${selected === "no" ? "selected" : ""}`}
                onClick={handleConfirmNo}>
                아니오
              </button>
            </div>
          </div>
        ) : (
          <div className="time-confirm no-selection">
            <p>날짜를 선택해주세요</p>
          </div>
        )}
      </section>

      {isConfirmed && (
        <section id="section6" className="information">
          <div className="container">
            <h3 className="section-title">꼭 확인해 주세요!</h3>
            <div className="content">
              <ul>
                <li>하루 전까지 취소하면 100%환불됩니다</li>
                <li>
                  원활한 좌석배정을 위해 예약시간 15분 전까지 방문하시는걸
                  추천드립니다
                </li>
                <li>
                  연락없이 예약시간보다 15분 이상 늦으시면 좌석선택이 불가능
                  합니다. 꼭 사전에 연락주세요
                </li>
                <div className="gap">
                  <img src="./img/발바닥.png" alt="" />
                </div>
              </ul>
            </div>
          </div>
        </section>
      )}

      {isConfirmed && (
        <section id="section7" className="reserve-section">
          <div className="container">
            <button className="reserve-btn" onClick={handleReserveClick}>
              예약하기
            </button>
          </div>
        </section>
      )}

      {/* 예약 확인 모달 */}
      {/* {openConfirm && (
        <div className="modal-backdrop" onClick={() => setOpenConfirm(false)}>
          <div className="reserve-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <h4>{formatKoreanDate(selectedDateStr)} {extractStart(selectedTime)}</h4>
              <div className="modal-people">{peopleCount}명</div>
              <p>예약하시겠습니까?</p>
            </div>
            <div className="modal-actions">
              <button ref={yesBtnRef} className="btn yes" onClick={handleConfirmYes}>예</button>
              <button className="btn no" onClick={() => setOpenConfirm(false)}>아니오</button>
            </div>
          </div>
        </div>
      )} */}

      {/* 예약 완료 모달 */}
      {/* {openComplete && (
        <div className="modal-backdrop" onClick={() => setOpenComplete(false)}>
          <div className="reserve-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <p>예약이 완료되었습니다</p>
            </div>
            <div className="modal-actions single">
              <button className="btn yes" onClick={() => setOpenComplete(false)}>확인</button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Sub04BuyTicket;
