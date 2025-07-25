import React, { useEffect, useRef, useState } from "react";
import "./scss/Section9Component.scss";

export default function Section9Component() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;

  const slideInterval = useRef(null); // ← 자동 슬라이드 저장용
  const delayAfterManual = useRef(null); // ← 수동 조작 후 재시작용

  useEffect(() => {
    startAutoSlide();
    return () => {
      clearInterval(slideInterval.current);
      clearTimeout(delayAfterManual.current);
    };
  }, []);

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
  };

  const resetAutoSlide = () => {
    clearInterval(slideInterval.current);
    clearTimeout(delayAfterManual.current);
    delayAfterManual.current = setTimeout(() => {
      startAutoSlide();
    }, 2000); // 3초 후 다시 자동 시작
  };

  const goUp = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    resetAutoSlide();
  };

  const goDown = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    resetAutoSlide();
  };

  const slideContents = [
    {}, // slide 0 (인트로) → 내용 없음
    {
      title: "Chapter 1. 재즈의 탄생",
      desc: "1900년대 초 뉴올리언스에서 시작된 재즈의 뿌리를 만나보세요.",
    },
    {
      title: "Chapter 2. 클래식한 밤",
      desc: "빛바랜 LP에서 흘러나오는 섬세한 선율의 세계로.",
    },
    {
      title: "Chapter 3. 묘묘의 추천",
      desc: "묘묘가 골라주는 오늘 밤의 와인과 음악 조합.",
    },
    {
      title: "Chapter 4. 감성 한 스푼",
      desc: "사람들과 나누고 싶은 따뜻한 이야기, 그리고 재즈.",
    },
    {
      title: "Chapter 5. 재즈묘묘를 닮은 밤",
    },
  ];

  return (
    <section id="section9Component" className="section">
      <div className="slide-container">
        {[...Array(totalSlides)].map((_, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""} 
            ${index === 0 || index === totalSlides - 1 ? "" : "half"}`}
          >
            {(index === 0 || index === totalSlides - 1) && (
              <div
                className={`bg-img ${
                  index === totalSlides - 1 ? "no-filter" : ""
                }`}
                style={{
                  backgroundImage: `url(./img/slide${index + 1}.jpg)`,
                }}
              ></div>
            )}

            {index !== 0 && index !== totalSlides - 1 && (
              <div
                className="bg-img"
                style={{
                  backgroundImage: `url(./img/slide${index + 1}.jpg)`,
                }}
              ></div>
            )}

            <div className="container">
              {index === 0 || index === totalSlides - 1 ? (
                <div className="text-box">
                  <ul>
                    {index === 0 ? (
                      <>
                        <li>묘묘와 재즈가 머무는 이곳</li>
                        <li>당신의 밤을 위한 작은 아지트를 소개합니다.</li>
                        <li>하루의 끝, 음악이 조용히 위로가 되는 공간</li>
                      </>
                    ) : (
                      <>
                        <li>재즈가 흐르고, 묘묘가 머무는 특별한 공간</li>
                        <li>지금, 당신을 묘묘의 공간으로 초대합니다.</li>
                      </>
                    )}
                  </ul>
                </div>
              ) : (
                <div className="content-box">
                  <div className="img-box">
                    {[...Array(totalSlides)].map((_, imgIdx) => (
                      <img
                        key={imgIdx}
                        src={`./img/slide${imgIdx + 1}.jpg`}
                        alt=""
                        className={`slide-img ${
                          imgIdx === currentSlide ? "active" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-box">
                    <h2>{slideContents[index]?.title}</h2>
                    {slideContents[index]?.desc && (
                      <p>{slideContents[index].desc}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="nav-icons">
              <button onClick={goUp}>
                <i className="bi bi-chevron-up"></i>
              </button>
              <button onClick={goDown}>
                <i className="bi bi-chevron-down"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
