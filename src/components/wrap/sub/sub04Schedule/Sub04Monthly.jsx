import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import SiteMapComponent from "../../custom/SiteMapComponent"

import "./scss/Sub04Monthly.scss";

export default function Sub04Monthly() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
        onClick={() => setSelectedDate(dateObj)}
      >
        <span
          className="date-circle"
          style={{
            color:
              weekday === 0 ? "#dd0000" : weekday === 6 ? "#003cff" : undefined,
          }}
        >
          {d}
        </span>
        <div className="dots">
          {hasPerformances &&
            hasPerformances.map((_, idx) => <span key={idx} className="dot" />)}
        </div>
      </div>
    );
  }

  return (
    <div id="sub04Monthly">
      <section id="schedule-detail" className="section">
        <div className="container">
          {/* 타이틀 */}
          <div className="page-title">
            <h2>Schedule</h2>
          </div>
          <SiteMapComponent
            firstLink="/monthly"
            firstName="Schedule"
            secondLink="./"
            secondName="캘린더"
          />


          <div className="contents">
            {/* 달력 영역 */}
            <div className="calendar-area">
              <div className="calendar-header">
                <button
                  className="prev-month"
                  onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                >
                  <i className="material-icons" style={{ fontSize: 36 }}>
                    keyboard_arrow_left
                  </i>
                </button>
                <div className="calendar-title">
                  {(month + 1).toString().padStart(2, "0")}
                </div>
                <button
                  className="next-month"
                  onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                >
                  <i className="material-icons" style={{ fontSize: 36 }}>
                    keyboard_arrow_right
                  </i>
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
                <button
                  className="prev-day"
                  onClick={() =>
                    setSelectedDate(
                      new Date(selectedDate.setDate(selectedDate.getDate() - 1))
                    )
                  }
                >
                  <i className="material-icons" style={{ fontSize: 36 }}>
                    keyboard_arrow_left
                  </i>
                </button>
                <div className="current-date">{selectedStr}</div>
                <button
                  className="next-day"
                  onClick={() =>
                    setSelectedDate(
                      new Date(selectedDate.setDate(selectedDate.getDate() + 1))
                    )
                  }
                >
                  <i className="material-icons" style={{ fontSize: 36 }}>
                    keyboard_arrow_right
                  </i>
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
                      <Link 
                        to = {`/Artist?artist=${encodeURIComponent(item.artist)}`}
                        className="arrow"
                        aria-label="공연 상세 보기"
                      >
                        ↗
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 공연 안내 */}
          <div className="info-box">
            <div className="infomation">
              <h2>공연안내</h2>
              <ul>
                <li>
                  <p>
                    매주 수요일부터 일요일까지 저녁 8시에 라이브 재즈 세션이
                    진행됩니다. (월·화요일은 휴무입니다)
                  </p>
                </li>
                <li>
                  <p>
                    예약 안내: 예약은 필수는 아니지만 좌석이 한정되어 있어,
                    [공연예약 페이지] 또는 전화로 사전 예약을 권장드립니다.
                  </p>
                </li>
                <li>
                  <p>
                    재즈묘묘는 주류를 판매하는 공간으로, 19세 이상만 입장
                    가능합니다. 미성년자의 출입은 제한되오니 양해 부탁드립니다.
                  </p>
                </li>
                <li>
                  <p>
                    좌석은 자유석으로 운영되며, 예약하신 분께는 무대 가까운
                    좌석이 우선 배정됩니다. 좋은 자리를 원하실 경우, 공연 30분
                    전까지 도착해주시길 권장드립니다.
                  </p>
                </li>
                <div className="img-box">
                  <i className="fa-solid fa-paw"></i>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
