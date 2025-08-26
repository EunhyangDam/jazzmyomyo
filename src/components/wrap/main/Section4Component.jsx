import React, { forwardRef } from "react";
import "./scss/Section4Component.scss";
import { useEffect, useState, useRef } from "react";

const Section4Component = forwardRef((props, ref) => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(
    new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  );
  const slideListRef = useRef(null);
  const wrapperRef = useRef(null);
  const todayCircleRef = useRef(null);
  const rightElRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const todayDate = today.getDate();
  const weekdaysKor = ["월", "화", "수", "목", "금", "토", "일"];
  const todayWeekday = today.getDay() === 0 ? 6 : today.getDay() - 1;

  //  fetch slides
  useEffect(() => {
    fetch("./json/section4/section4.json")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("데이터 로드 실패:", err));
    // eslint-disable-next-line
  }, []);

  //  날짜 렌더링용: 현재 주차 계산
  const getWeekNumber = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayWeekday = firstDay.getDay() || 7;
    const offsetDate = date.getDate() + firstDayWeekday - 1;
    return Math.floor(offsetDate / 7) + 1;
  };

  const getMondayDate = () => {
    const monday = new Date(today);
    monday.setDate(today.getDate() - todayWeekday);
    return monday;
  };

  const renderDate = (i) => {
    const monday = getMondayDate();
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  };

  const updateSlideTransform = () => {
    const slideList = slideListRef.current;
    const wrapper = wrapperRef.current;
    const slidesEl = slideList.querySelectorAll("li.slide");

    slidesEl.forEach((slide, idx) => {
      slide.classList.remove("center", "today-slide");
      slide.style.opacity = "0.3";
      slide.style.transform = "scale(0.6)";
      if (idx === todayWeekday) slide.classList.add("today-slide");
    });

    if (slidesEl[currentIndex]) {
      slidesEl[currentIndex].classList.add("center");
      slidesEl[currentIndex].style.opacity = "1";
      slidesEl[currentIndex].style.transform = "scale(1)";
    }
    if (slidesEl[currentIndex - 1]) {
      slidesEl[currentIndex - 1].style.opacity = "0.5";
      slidesEl[currentIndex - 1].style.transform = "scale(0.8)";
    }
    if (slidesEl[currentIndex + 1]) {
      slidesEl[currentIndex + 1].style.opacity = "0.5";
      slidesEl[currentIndex + 1].style.transform = "scale(0.8)";
    }

    // 중앙 정렬
    const wrapperRect = wrapper.getBoundingClientRect();
    const centerSlide = slidesEl[currentIndex];
    const centerRect = centerSlide.getBoundingClientRect();
    const prevTranslate = slideList.style.transform || "translateX(0px)";
    const prevX = parseFloat(prevTranslate.match(/-?\d+\.?\d*/)?.[0] || 0);

    let newTranslate;
    if (window.innerWidth <= 440) {
      newTranslate = -currentIndex * wrapperRect.width;
    } else {
      const offset =
        centerRect.left +
        centerRect.width / 2 -
        (wrapperRect.left + wrapperRect.width / 2);
      newTranslate = prevX - offset;
    }

    slideList.style.transform = `translateX(${newTranslate}px)`;

    // Today circle 이동
    const dayEls = rightElRef.current.querySelectorAll(".day");
    dayEls.forEach((day) => {
      const dateDiv = day.querySelector(".date");
      dateDiv.classList.remove("has-today-circle");
    });

    const targetDay = dayEls[currentIndex];
    if (targetDay) {
      const targetDate = targetDay.querySelector(".date");
      if (targetDate && todayCircleRef.current) {
        targetDate.appendChild(todayCircleRef.current);
        targetDate.classList.add("has-today-circle");
      }
    }

    prevBtnRef.current.disabled = currentIndex === 0;
    nextBtnRef.current.disabled = currentIndex === 6;
  };

  useEffect(() => {
    if (slides.length > 0) updateSlideTransform();
  }, [slides, currentIndex]);

  // 📱 터치 스와이프
  useEffect(() => {
    if (window.innerWidth > 1024) return;
    const wrapper = wrapperRef.current;

    let startX = 0;
    let isDragging = false;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].clientX - startX;
      if (Math.abs(deltaX) > 10) e.preventDefault();
    };

    const onTouchEnd = (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;

      if (Math.abs(diffX) > 50) {
        setCurrentIndex((prev) =>
          diffX > 0 ? Math.max(0, prev - 1) : Math.min(6, prev + 1)
        );
      }
      isDragging = false;
    };

    wrapper.addEventListener("touchstart", onTouchStart);
    wrapper.addEventListener("touchmove", onTouchMove, { passive: false });
    wrapper.addEventListener("touchend", onTouchEnd);

    return () => {
      wrapper.removeEventListener("touchstart", onTouchStart);
      wrapper.removeEventListener("touchmove", onTouchMove);
      wrapper.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div id="section4Component" ref={ref}>
      <section id="schedule" className="section">
        <div className="container">
          <div className="top-area">
            <h1>Weekly schedule</h1>
            <p>이번 주 공연일정</p>
          </div>

          {/* 날짜 */}
          <div className="split-area">
            <div className="left">
              <div className="year-month">{`${year}.${String(month).padStart(
                2,
                "0"
              )}`}</div>
              <div className="week-number">{`WEEK${getWeekNumber(today)}`}</div>
            </div>
            <div className="right" ref={rightElRef}>
              {weekdaysKor.map((day, i) => {
                const date = renderDate(i);
                const isToday =
                  date.getDate() === todayDate &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear();

                return (
                  <div
                    key={i}
                    className="day"
                    onClick={() => setCurrentIndex(i)}
                  >
                    {isToday && <div className="today-label">Today</div>}
                    <div className="weekday">{day}</div>
                    <div className="date">
                      <span className="date-text">{date.getDate()}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={todayCircleRef} className="today-circle"></div>
            </div>
          </div>

          {/* 슬라이드 */}
          <div className="slide-area">
            <button
              ref={prevBtnRef}
              className="btn prev"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            >
              &lt;
            </button>
            <div className="slide-wrapper" ref={wrapperRef}>
              <ul className="slide-list" ref={slideListRef}>
                {slides.map((item, i) => (
                  <li
                    key={i}
                    className={`slide ${
                      i === todayWeekday ? "today-slide" : ""
                    } ${i === currentIndex ? "center" : ""}`}
                  >
                    <a href="!#">
                      <img src={item.image} alt={`slide-${i}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <button
              ref={nextBtnRef}
              className="btn next"
              onClick={() => setCurrentIndex((prev) => Math.min(6, prev + 1))}
            >
              &gt;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
});
export default Section4Component;
