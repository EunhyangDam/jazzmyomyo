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
    {},
    {
      title: "Chapter 1\n조명의 온기",
      desc: "은은한 조명이 테이블 위를 비춰요.\n잔을 채운 와인과 재즈가 자연스럽게 어우러지고,\n조용한 분위기 속에서 하루가 천천히 정리돼요.",
    },
    {
      title: "Chapter 2\n시간을 담은 소리",
      desc: "벽면을 가득 채운 LP와 턴테이블이 반겨요.\n바늘이 닿는 순간, 재즈가 천천히 퍼집니다.\n오래된 소리가 마음을 어루만지고,\n공간은 시간보다 느리게 흐릅니다.",
    },
    {
      title: "Chapter 3\n사운드의 디테일",
      desc: "재즈묘묘는 소리 하나하나에 정성을 담았습니다.\nYamaha 드럼과 Fender Rhodes 피아노,\n더블 베이스, Shure 마이크, 그리고 Bose 음향.",
    },
    {
      title: "Chapter 4\n따뜻한 선율의 마무리",
      desc: "여기에 Gibson 세미 할로우 기타와\nFender Twin Reverb 앰프의 따뜻한 사운드까지.\n재즈묘묘의 공간은 연주자와 관객 모두를\n부드럽고 깊은 사운드 속으로 초대합니다.",
    },
    {},
  ];

  return (
    <section id="section9">
      <div className="slide-container">
        {[...Array(totalSlides)].map((_, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""} ${
              index === 0 || index === totalSlides - 1 ? "" : "half"
            }`}
          >
            {(index === 0 || index === totalSlides - 1) && (
              <div
                className={`bg-img ${
                  index === totalSlides - 1 ? "no-filter" : ""
                }`}
                style={{
                  backgroundImage: `url(./img/main_place/slide${
                    index + 1
                  }.jpg)`,
                }}
              ></div>
            )}

            {index !== 0 && index !== totalSlides - 1 && (
              <div
                className="bg-img"
                style={{
                  backgroundImage: `url(./img/main_place/slide${
                    index + 1
                  }.jpg)`,
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
                  {/*  마지막 슬라이드일 때만 버튼 보여줌 */}
                  {index === totalSlides - 1 && (
                    <div className="link-buttons">
                      <ul>
                        <li>
                          <a href="!#">VIEW MORE</a>
                        </li>
                        <li>
                          <a href="!#">공연일정</a>
                        </li>
                        <li>
                          <a href="!#">대관문의</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="content-box">
                  <div className="img-box">
                    {[...Array(totalSlides)].map((_, imgIdx) => (
                      <img
                        key={imgIdx}
                        src={`./img/main_place/slide${imgIdx + 1}.jpg`}
                        alt=""
                        className={`slide-img ${
                          imgIdx === currentSlide ? "active" : ""
                        }`}
                      />
                    ))}
                  </div>

                  <div className={`text-box chapter${index}`}>
                    {index >= 1 && index <= 4 ? (
                      <>
                        <h2>
                          <span className="chapter-label">
                            {slideContents[index]?.title.split("\n")[0]}
                          </span>
                          <br />
                          {slideContents[index]?.title.split("\n")[1]}
                        </h2>
                        <p>
                          {slideContents[index]?.desc
                            .split("\n")
                            .map((line, i) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))}
                        </p>
                      </>
                    ) : (
                      <>
                        <h2>{slideContents[index]?.title}</h2>
                        <p>
                          {slideContents[index]?.desc
                            .split("\n")
                            .map((line, i) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))}
                        </p>
                      </>
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
