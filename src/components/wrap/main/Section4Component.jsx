import React from "react";
import "./scss/Section4Component.scss";

export default function Section4Component(props) {
  React.useEffect(() => {
    const schedule = document.getElementById("schedule");
    if (!schedule) return;

    const container = schedule.querySelector(".container");
    const yearMonthEl = container.querySelector(".left .year-month");
    const weekNumEl = container.querySelector(".left .week-number");
    const rightEl = container.querySelector(".right");
    const slideListEl = container.querySelector(".slide-list");
    const slideWrapperEl = container.querySelector(".slide-wrapper");
    const prevBtn = container.querySelector(".btn.prev");
    const nextBtn = container.querySelector(".btn.next");

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const todayDate = today.getDate();
    const weekdaysKor = ["월", "화", "수", "목", "금", "토", "일"];
    const todayWeekday = today.getDay() === 0 ? 6 : today.getDay() - 1;
    let currentIndex = todayWeekday;
    let monday;

    const todayCircle = document.createElement("div");
    todayCircle.className = "today-circle";

    function getWeekNumber(date) {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const firstDayWeekday = firstDay.getDay() || 7;
      const offsetDate = date.getDate() + firstDayWeekday - 1;
      return Math.floor(offsetDate / 7) + 1;
    }

    function getMondayDate() {
      const monday = new Date(today);
      monday.setDate(today.getDate() - todayWeekday);
      return monday;
    }

    function renderYearMonthWeek() {
      yearMonthEl.textContent = `${year}.${month.toString().padStart(2, "0")}`;
      const weekNum = getWeekNumber(today);
      weekNumEl.textContent = `WEEK${weekNum}`;
    }

    function renderWeekdaysDates() {
      rightEl.innerHTML = "";
      monday = getMondayDate();

      for (let i = 0; i < 7; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");

        const weekdayDiv = document.createElement("div");
        weekdayDiv.classList.add("weekday");
        weekdayDiv.textContent = weekdaysKor[i];

        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        const dateNumber = date.getDate();

        const dateSpan = document.createElement("span");
        dateSpan.classList.add("date-text");
        dateSpan.textContent = dateNumber;

        const dateDiv = document.createElement("div");
        dateDiv.classList.add("date");
        dateDiv.appendChild(dateSpan);

        if (
          date.getDate() === todayDate &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        ) {
          const label = document.createElement("div");
          label.classList.add("today-label");
          label.textContent = "Today";
          dayDiv.appendChild(label);
          dateDiv.appendChild(todayCircle);
          dateDiv.classList.add("has-today-circle");
        }

        dayDiv.appendChild(weekdayDiv);
        dayDiv.appendChild(dateDiv);

        (function (idx) {
          dayDiv.addEventListener("click", () => {
            currentIndex = idx;
            updateSlides();
          });
        })(i);

        rightEl.appendChild(dayDiv);
      }
    }

    const imagePaths = [
      "img/공연일정_휴무일.jpg",
      "img/공연일정_휴무일.jpg",
      "img/공연일정_포스터_회색지대.jpg",
      "img/공연일정_포스터_섬광.jpg",
      "img/공연일정_포스터_oyster.jpg",
      "img/공연일정_포스터_파도.jpg",
      "img/공연일정_포스터_jazz.jpg",
    ];

    function createSlideItem(idx) {
      const li = document.createElement("li");
      li.classList.add("slide");
      const a = document.createElement("a");
      a.href = "!#";
      const img = document.createElement("img");
      img.src = imagePaths[idx];
      img.alt = `요일 이미지 ${weekdaysKor[idx]}`;
      a.appendChild(img);
      li.appendChild(a);
      return li;
    }

    function renderSlides() {
      slideListEl.innerHTML = "";
      for (let i = 0; i < 7; i++) {
        slideListEl.appendChild(createSlideItem(i));
      }
      updateSlides();
    }

    function updateSlides() {
      const lis = slideListEl.querySelectorAll("li.slide");
      const dayEls = rightEl.querySelectorAll(".day");

      //  Today 배지 추가
      lis.forEach((li, idx) => {
        li.classList.remove("today-slide");

        if (idx === todayWeekday) {
          li.classList.add("today-slide");
        }
      });

      // 모두 초기화
      lis.forEach((li, idx) => {
        li.classList.remove("center");
        li.style.opacity = "0.3";
        li.style.transform = "scale(0.6)";
      });

      if (lis[currentIndex]) {
        lis[currentIndex].classList.add("center");
        lis[currentIndex].style.opacity = "1";
        lis[currentIndex].style.transform = "scale(1)";
      }

      if (lis[currentIndex - 1]) {
        lis[currentIndex - 1].style.opacity = "0.5";
        lis[currentIndex - 1].style.transform = "scale(0.8)";
      }

      if (lis[currentIndex + 1]) {
        lis[currentIndex + 1].style.opacity = "0.5";
        lis[currentIndex + 1].style.transform = "scale(0.8)";
      }

      const wrapperRect = slideWrapperEl.getBoundingClientRect();
      const centerSlide = lis[currentIndex];
      const centerRect = centerSlide.getBoundingClientRect();

      const currentTranslate = slideListEl.style.transform || "translateX(0px)";
      const match = currentTranslate.match(/-?\d+\.?\d*/);
      const prevTranslateX = match ? parseFloat(match[0]) : 0;

      let newTranslate;

      //  화면 너비 440px 이하일 경우
      if (window.innerWidth <= 440) {
        const slideWidth = wrapperRect.width;
        newTranslate = -currentIndex * slideWidth;
      } else {
        const offset =
          centerRect.left +
          centerRect.width / 2 -
          (wrapperRect.left + wrapperRect.width / 2);
        newTranslate = prevTranslateX - offset;
      }

      slideListEl.style.transform = `translateX(${newTranslate}px)`;

      // Today circle 이동 등은 기존 코드 유지...
      const targetDay = dayEls[currentIndex];
      if (targetDay) {
        const targetDate = targetDay.querySelector(".date");
        dayEls.forEach((day) => {
          const dateDiv = day.querySelector(".date");
          dateDiv.classList.remove("has-today-circle");
        });

        if (targetDate && todayCircle.parentNode !== targetDate) {
          targetDate.appendChild(todayCircle);
        }
        targetDate.classList.add("has-today-circle");
      }

      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === lis.length - 1;
    }

    // 터치 스와이프 (반응형)
    function bindTouchEvents() {
      if (window.innerWidth > 1024) return; // 1024px 이하일 때만 적용

      let startX = 0;
      let isDragging = false;

      slideWrapperEl.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      });

      slideWrapperEl.addEventListener(
        "touchmove",
        (e) => {
          if (!isDragging) return;
          const deltaX = e.touches[0].clientX - startX;
          if (Math.abs(deltaX) > 10) e.preventDefault();
        },
        { passive: false }
      );

      slideWrapperEl.addEventListener("touchend", (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;

        if (Math.abs(diffX) > 50) {
          if (diffX > 0) {
            prevSlide();
          } else {
            nextSlide();
          }
        }

        isDragging = false;
      });
    } // 터치 스와이프
    function bindEvents() {
      prevBtn.addEventListener("click", prevSlide);
      nextBtn.addEventListener("click", nextSlide);

      bindTouchEvents();
    }

    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlides();
      }
    }

    function nextSlide() {
      if (currentIndex < 6) {
        currentIndex++;
        updateSlides();
      }
    }

    function bindEvents() {
      prevBtn.addEventListener("click", prevSlide);
      nextBtn.addEventListener("click", nextSlide);
      window.addEventListener("resize", updateSlides);
    }

    renderYearMonthWeek();
    renderWeekdaysDates();
    renderSlides();
    bindEvents();
  });

  return (
    <div id="section4Component">
      <section id="schedule" class="section">
        <div class="container">
          <div class="top-area">
            <h1>Weekly schedule</h1>
            <h2>이번 주 공연일정</h2>
          </div>
          <div class="split-area">
            <div class="left">
              <div class="year-month"></div>
              <div class="week-number"></div>
            </div>
            <div class="right">
              <div class="weekdays"></div>
              <div class="dates"></div>
            </div>
          </div>
          <div class="slide-area">
            <button class="btn prev" disabled>
              ‹
            </button>
            <div class="slide-wrapper">
              <ul class="slide-list">
                <li class="slide slide1">
                  <a href="!#">
                    <img src="./images/사진1.jpg" alt="" />
                  </a>
                </li>
                <li class="slide slide2">
                  <a href="!#">
                    <img src="./images/사진2.jpg" alt="" />
                  </a>
                </li>
                <li class="slide slide3">
                  <a href="!#">
                    <img src="./images/사진1.jpg" alt="" />
                  </a>
                </li>
                <li class="slide slide4">
                  <a href="!#">
                    <img src="./images/사진2.jpg" alt="" />
                  </a>
                </li>
                <li class="slide slide5">
                  <a href="!#">
                    <img src="./images/사진1.jpg" alt="" />
                  </a>
                </li>
                <li class="slide slide6">
                  <a href="!#">
                    <img src="./images/사진2.jpg" alt="" />
                  </a>
                </li>
                <li class="slide slide7">
                  <a href="!#">
                    <img src="./images/사진1.jpg" alt="" />
                  </a>
                </li>
              </ul>
            </div>
            <button class="btn next">›</button>
          </div>
        </div>
      </section>
    </div>
  );
}
