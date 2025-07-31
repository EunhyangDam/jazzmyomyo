import React from "react";
import './scss/Sub04Monthly.scss';

function Sub04Monthly(props) {


(function () {
    const state = {
      currentDate: new Date(),
      scheduleData: [],
    };
  
    const calendarEl = document.querySelector('.calendar-grid');
    const calendarTitleEl = document.querySelector('.calendar-title');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
  
    const performanceHeaderDate = document.querySelector('.current-date');
    const prevDayBtn = document.querySelector('.prev-day');
    const nextDayBtn = document.querySelector('.next-day');
    const performanceListEl = document.querySelector('.performance-list');
  
    // 날짜 포맷: YYYY-MM-DD (브라우저 기준, 한국시간 정확히 반영)
    function formatDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  
    // 오늘 날짜 반환 (formatDate 사용)
    function getTodayDate() {
      return formatDate(new Date());
    }
  
    // 날짜별 공연 데이터 그룹핑
    function groupPerformancesByDate(data) {
      const map = {};
      data.forEach(item => {
        if (!map[item.date]) map[item.date] = [];
        map[item.date].push(item);
      });
      return map;
    }
  
    // 달력 렌더링
    function renderCalendar() {
      const year = state.currentDate.getFullYear();
      const month = state.currentDate.getMonth();
  
      calendarTitleEl.textContent = (month + 1).toString().padStart(2, '0');
  
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();
  
      const performanceMap = groupPerformancesByDate(state.scheduleData);
      const todayStr = getTodayDate();
  
      calendarEl.innerHTML = '';
  
      ['SUN','MON','TUE','WED','THU','FRI','SAT'].forEach(day => {
        const label = document.createElement('div');
        label.className = 'day-label';
        label.textContent = day;
        calendarEl.appendChild(label);
      });
  
      for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-cell empty';
        calendarEl.appendChild(empty);
      }
  
      for (let d = 1; d <= lastDate; d++) {
        const dateObj = new Date(year, month, d);
        const dateStr = formatDate(dateObj);
  
        const cell = document.createElement('div');
        cell.className = 'calendar-cell';
  
        if (dateStr === todayStr) cell.classList.add('today');
        if (dateStr === formatDate(state.currentDate)) cell.classList.add('selected');
  
        const dateSpan = document.createElement('span');
        dateSpan.className = 'date-circle';
        dateSpan.textContent = d;
  
        const weekday = dateObj.getDay();
        if (weekday === 0) dateSpan.style.color = '#dd0000';
        else if (weekday === 6) dateSpan.style.color = '#003cff';
  
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'dots';
  
        if (performanceMap[dateStr]) {
          performanceMap[dateStr].forEach(() => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dotsContainer.appendChild(dot);
          });
        }
  
        cell.appendChild(dateSpan);
        cell.appendChild(dotsContainer);
  
        cell.addEventListener('click', () => {
          state.currentDate = dateObj;
          renderCalendar();
          renderPerformanceList();
        });
  
        calendarEl.appendChild(cell);
      }
    }
  
    // 공연 리스트 렌더링
    function renderPerformanceList() {
      const dateStr = formatDate(state.currentDate);
      const list = state.scheduleData.filter(item => item.date === dateStr);
  
      performanceHeaderDate.textContent = dateStr;
      performanceListEl.innerHTML = '';
  
      if (list.length === 0) {
        performanceListEl.innerHTML = '<p>해당 날짜에는 공연이 없다묘</p>';
        return;
      }
  
      list.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'performance-card';
  
        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = (index + 1).toString().padStart(2, '0');
  
        const img = document.createElement('img');
        img.src = item.poster;
        img.alt = item.artist;
  
        const info = document.createElement('div');
        info.className = 'info';
  
        const h3 = document.createElement('h3');
        h3.textContent = item.artist;
  
        const p = document.createElement('p');
        p.textContent = item.time;
  
        info.appendChild(h3);
        info.appendChild(p);
  
        const arrow = document.createElement('a');
        arrow.className = 'arrow';
        arrow.href = item.link || '#';
        arrow.textContent = '↗';
        arrow.setAttribute('aria-label', '공연 상세 보기');
  
        card.appendChild(number);
        card.appendChild(img);
        card.appendChild(info);
        card.appendChild(arrow);
  
        performanceListEl.appendChild(card);
      });
    }
  
    // 날짜 이동 버튼 이벤트
    prevMonthBtn.addEventListener('click', () => {
      state.currentDate.setMonth(state.currentDate.getMonth() - 1);
      renderCalendar();
    });
  
    nextMonthBtn.addEventListener('click', () => {
      state.currentDate.setMonth(state.currentDate.getMonth() + 1);
      renderCalendar();
    });
  
    prevDayBtn.addEventListener('click', () => {
      state.currentDate.setDate(state.currentDate.getDate() - 1);
      renderCalendar();
      renderPerformanceList();
    });
  
    nextDayBtn.addEventListener('click', () => {
      state.currentDate.setDate(state.currentDate.getDate() + 1);
      renderCalendar();
      renderPerformanceList();
    });
  
    // 공연 데이터 로드
    fetch('./json/sub04Monthly/sub04Monthly.json')
      .then(res => res.json())
      .then(data => {
        state.scheduleData = data;
        renderCalendar();
        renderPerformanceList();
      })
      .catch(err => console.error('공연 데이터 로딩 실패:', err));
  })();
  




  return (
    <div id="sub04Monthly">
      
    <section id="schedule-detail" class="section">
        <div class="container">
          {/* <!-- 타이틀 --> */}
           <div class="page-title">
            <h2>Schedule</h2>
           </div>
           <div class="site-map">
              <a href="/" class="home-icon">
                <i class="material-icons">home</i>
              </a>
              <span class="arrow"> &gt; </span>
              <span class="schedule">Schedule</span>
           </div>
          
           <div class="contents">
            {/*  <!-- 달력 영역 --> */}
            <div class="calendar-area">
            <div class="calendar-header">
              <button class="prev-month" aria-label="이전 달">
                <i class="material-icons" style="font-size:36px">keyboard_arrow_left</i>
              </button>
              <div class="calendar-title">07</div>
              <button class="next-month" aria-label="다음 달">
                <i class="material-icons" style="font-size:36px">keyboard_arrow_right</i>
              </button>
            </div>
            <div class="calendar-grid">
              <div class="day-label">SUN</div>
              <div class="day-label">MON</div>
              <div class="day-label">TUE</div>
              <div class="day-label">WED</div>
              <div class="day-label">THU</div>
              <div class="day-label">FRI</div>
              <div class="day-label">SAT</div>
              {/* <!-- 날짜 셀 예시 (반복됨) --> */}
              <div class="calendar-cell today selected">
                <span class="date-circle">27</span>
                <div class="dots">
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div>
              </div>
              
            </div>
            </div>
          
            {/* <!-- 공연 리스트 영역 --> */}
            <div class="performance-area">
            <div class="performance-header">
              <button class="prev-day" aria-label="이전 날짜">
                <i class="material-icons" style="font-size:36px">keyboard_arrow_left</i>
              </button>
              <div class="current-date">{/* <!-- 해당날짜 --> */}</div>
              <button class="next-day" aria-label="다음 날짜">
                <i class="material-icons" style="font-size:36px">keyboard_arrow_right</i>
              </button>
            </div>
            <div class="performance-list">
             {/*  <!-- 공연 카드 예시 --> */}
              <div class="performance-card">
                <div class="number">01</div>
                <img src="./img/sample.jpg" alt="Rob Quintet" />
                <div class="info">
                  <h3>Rob Quintet</h3>
                  <p>19:00 ~ 21:30</p>
                </div>
                <a href="#" class="arrow" aria-label="공연 상세 보기">↗</a>
              </div>
     
            </div>
            </div>
          </div>

          <div class="info-box">
            <div class="infomation">
              <h2>공연안내</h2>
              <ul>
                <li><p>매주 수요일부터 일요일까지 저녁 8시에 라이브 재즈 세션이 진행됩니다. (월·화요일은 휴무입니다)</p></li>
                <li><p>예약 안내: 예약은 필수는 아니지만 좌석이 한정되어 있어, [공연예약 페이지] 또는 전화로 사전 예약을 권장드립니다.</p></li>
                <li><p>재즈묘묘는 주류를 판매하는 공간으로, 19세 이상만 입장 가능합니다. 미성년자의 출입은 제한되오니 양해 부탁드립니다.</p></li>
                <li><p>좌석은 자유석으로 운영되며, 예약하신 분께는 무대 가까운 좌석이 우선 배정됩니다. 좋은 자리를 원하실 경우, 공연 30분 전까지 도착해주시길 권장드립니다.</p></li>
                
                <div class="img-box">
                  <img src="./img/발바닥.png" alt=""/>
                </div>
              </ul>
            </div>
          </div>

        </div>
      </section>   

    </div>
  );
}

export default Sub04Monthly;
