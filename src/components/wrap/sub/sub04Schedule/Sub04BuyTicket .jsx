import React from "react";
import { useState, useEffect, useMemo } from "react";
import "./scss/Sub04BuyTicket.scss";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";
import { confirmModalYesNoAction } from "../../../../store/confirmModal";
import { addReservation } from "../../../../store/resavation";

function Sub04BuyTicket(props) {
  const [state, setstate] = useState();
  const dispatch = useDispatch();

  const isYes = useSelector((state) => state.confirmModal.isYes);

  // 탭 전환
  const handleGuestClick = () => setIsGuest(true);
  const handleMemberClick = () => setIsGuest(false);

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
    fetch("./json/section4/schedule.json")
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
  const [isGuest, setIsGuest] = useState(true);
  const [guestForm, setGuestForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [peopleCount, setPeopleCount] = useState(1);

  // 섹션4에서 이미 있는 값들을 이용해 문자열로 맞춤
  const selectedDateStr = selectedStr; // 기존 selectedStr("YYYY-MM-DD") 재사용
  const selectedTime = selectedPerformance?.time || "";

  // 비회원 폼 유효성 체크 (빈값만 확인하는 버전)
  const isGuestFormFilled = () => {
    if (!isGuest) return true; // 회원예약이면 패스
    const { name, phone, email } = guestForm;
    return name.trim() !== "" && phone.trim() !== "" && email.trim() !== "";
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

  useEffect(() => {
    if (isYes === true) {
      // 저장 페이로드 구성
      const payload = {
        id: isGuest ? guestForm.name : "",
        이름: isGuest ? guestForm.name : "", // 회원예약이면 사용자 프로필에서 채워도 됨
        전화: isGuest ? guestForm.phone : "",
        이메일: isGuest ? guestForm.email : "",
        인원: peopleCount,
        일정: {
          날짜: selectedPerformance?.date ?? "",
          시간: selectedPerformance?.time ?? "",
        },
        createdAt: new Date().toISOString(),
      };
      // 저장
      dispatch(addReservation(payload));
      // isYes 초기화 (다음 컨펌 대비)
      dispatch(confirmModalYesNoAction(false));

      // 완료 안내 모달 (확인 1버튼)
      dispatch(
        confirmModalAction({
          heading: "예약 완료",
          explain:
            "예약이 저장되었습니다.\n마이페이지 > 예약내역에서 확인해 주세요.",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
    }
  }, [isYes]); // isYes가 true가 되는 순간에만 실행

  return (
    <div id="sub04BuyTicket">
      <section id="section1" className="reservation-header">
        <div class="reservation-header">
          <div class="content">
            <div class="breadcrumb">
              <span>
                <i class="material-icons">home</i>
              </span>{" "}
              &gt;
              <span>Schedule</span> &gt;
              <strong>RESAVATION</strong>
            </div>
            <h2 class="section-title">RESAVATION</h2>
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
                  <img src="./img/회원가입_말풍선_포함.png" alt="고양이" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="section3" className="reservation-people">
        <div className="container">
          <h3 className="section-title">
            <i class="bi bi-person-fill"></i>
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
            <i class="bi bi-calendar-week"></i>
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
