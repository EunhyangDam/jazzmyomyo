import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./scss/Section11Component.scss";

const Section11Component = forwardRef((props, ref) => {
  const isMobile = window.innerWidth <= 440;

  const data = [
    "https://www.youtube.com/embed/UAAWGUWVlZk",
    "https://www.youtube.com/embed/nY91GdKot_U",
    "https://www.youtube.com/embed/1GLSNV2yKZA",
    "https://www.youtube.com/embed/knBSirap4sY",
    "https://www.youtube.com/embed/9_ddQoK9lHA",
    "https://www.youtube.com/embed/jD_3aa2jGQw",
    "https://www.youtube.com/embed/gU7fhY6rMJg",
    "https://www.youtube.com/embed/8ZmMIlLl58M",
    "https://www.youtube.com/embed/t1UG4IOPWVQ?si=TQKMIUvey3P9dzno",
  ];

  const visibleCount = 3;
  const moveStep = 2;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const dotsRef = useRef(null);

  const maxIndex = data.length - visibleCount;

  const handleMove = (step) => {
    setCurrentIndex((prev) => {
      const next = Math.max(0, Math.min(prev + step, maxIndex));
      return next;
    });
  };

  const moveTo = (index) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
  };

  useEffect(() => {
    if (!slideRef.current) return;
    const slide = slideRef.current.querySelector("li");
    if (!slide) return;

    const slideWidth = slide.offsetWidth;
    const gap = 30;
    const offset = (slideWidth + gap) * currentIndex * -1;

    slideRef.current.style.transform = `translateX(${offset}px)`;
  }, [currentIndex]);

  useEffect(() => {
    if (!isMobile) return;
    const slideView = document.querySelector(".slide-view");
    const slides = slideRef.current?.querySelectorAll("li") || [];
    const dots = dotsRef.current;
    if (!slideView || !dots || slides.length === 0) return;

    dots.innerHTML = "";

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "dot";
      if (i === 0) dot.classList.add("active");
      dots.appendChild(dot);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = [...slides].indexOf(entry.target);
            dots.querySelectorAll(".dot").forEach((d, i) => {
              d.classList.toggle("active", i === index);
            });
          }
        });
      },
      {
        root: slideView,
        threshold: 0.6,
      }
    );

    slides.forEach((li) => observer.observe(li));

    return () => observer.disconnect();
  }, [isMobile]);

  const renderSlides = () => {
    const items = isMobile ? data.slice(0, 4) : data;
    return items.map((url, i) => (
      <li key={i}>
        <iframe
          src={url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={`video-${i}`}
        ></iframe>
      </li>
    ));
  };

  const renderDots = () => {
    const pageCount = Math.ceil((data.length - visibleCount) / moveStep) + 1;
    return Array.from({ length: pageCount }).map((_, i) => (
      <button
        key={i}
        className={`dot ${
          Math.floor(currentIndex / moveStep) === i ? "active" : ""
        }`}
        onClick={() => moveTo(i * moveStep)}
      ></button>
    ));
  };

  return (
    <section id="Section11Component" className="gallery section" ref={ref}>
      <div className="container">
        <h2 className="section-title">Gallery</h2>

        <div className="gallery-wrapper">
          <div className="slide-view">
            <ul className="slide-track" ref={slideRef}>
              {renderSlides()}
              {isMobile && (
                <li className="more">
                  <a href="#">더보기</a>
                </li>
              )}
            </ul>
          </div>

          <div className="dots" ref={dotsRef}>
            {!isMobile && renderDots()}
          </div>

          <div className="button-row">
            <div className="button-align">
              <div className="cat-deco">
                <img src="./img/고양이_슬라이드.png" alt="장식 고양이" />
              </div>
              <div className="button-group">
                <button
                  className="btn prev"
                  onClick={() => handleMove(-moveStep)}
                  disabled={currentIndex <= 0}
                >
                  &lt;
                </button>
                <button
                  className="btn next"
                  onClick={() => handleMove(moveStep)}
                  disabled={currentIndex >= maxIndex}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
export default Section11Component;
