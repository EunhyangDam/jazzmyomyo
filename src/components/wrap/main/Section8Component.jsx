<<<<<<< HEAD
import React from "react";
import "./scss/Section8Component.scss";
=======
import React, { useState, useEffect } from "react";
import "./scss/Section8Component.scss";
import { Link } from "react-router-dom";
>>>>>>> origin/temp

export default function Section8Component(props) {
  const [state, setState] = useState({
    한줄후기: [],
    영상소스: [],
    아이콘: [],
  });

  useEffect(() => {
    fetch("./json/section8/section8.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setState({
          아이콘: data.아이콘,
          한줄후기: data.한줄후기,
          영상소스: data.영상소스,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // 갤러리 슬라이드
    let cnt = 0;
    let setId = 0;

    const slideWrap = document.querySelector(
      "#section8Component #section8 .container .video .video-container .slide-container .slide-wrap"
    );
    const iframe = document.querySelectorAll(
      "#section8Component #section8 .container .video .video-container .slide-container .slide-wrap iframe"
    );

    // 모바일용
    iframe.forEach((item) => {
      item.addEventListener("dragstart", (e) => {
        e.preventDefault();
      });
    });

    function mainSlide() {
      if (cnt > 8) {
        cnt = 0;
        slideWrap.style.transition = "left 0.3s ease-in-out";
        slideWrap.style.left = `${-300 * 0}px`;
      } else {
        slideWrap.style.transition = "left 0.3s ease-in-out";
        slideWrap.style.left = `${-300 * cnt}px`;
      }
    }
    function nextCount() {
      cnt++;
      mainSlide();
    }
    function autoTimer() {
      clearInterval(setId);
      setId = setInterval(nextCount, 7000);
    }
    autoTimer();

    // 마우스 드래그앤드롭 drag & drop 구현
    let mouseDown = false;
    let dragStart = null;
    let dragEnd = null;

    // 1-1. 마우스 다운 이벤트 리스너 등록 touchstart
    slideWrap.addEventListener("click", (e) => {
      e.preventDefault();
    });

    // 1-1. 마우스 다운 이벤트 리스너 등록 touchstart
    slideWrap.addEventListener("mousedown", (e) => {
      autoTimer();
      mouseDown = true;
      dragStart = e.clientX - (slideWrap.getBoundingClientRect().left - 452.5); //
      // 0으로 만들어준 후 빼줌 => 이동했던 좌표가 유지됨
    });

    // 1-2. 마우스 다운 이벤트 리스너 등록 touchstart
    slideWrap.addEventListener("touchstart", (e) => {
      mouseDown = true;
      dragStart =
        e.changedTouches[0].clientX -
        (slideWrap.getBoundingClientRect().left - 452.5); //
      // 0으로 만들어준 후 빼줌 => 이동했던 좌표가 유지됨
    });

    // 2-1. 마우스 무브 이벤트 리스너 등록 touchmove
    slideWrap.addEventListener("mousemove", (e) => {
      if (!mouseDown) return;
      dragEnd = e.clientX;

      slideWrap.style.transition = "left 0s ease-in-out";
      slideWrap.style.left = `${dragEnd - dragStart}px`; // 드래그 길이만큼 이동시킴
    });
    // 2-2. 마우스 무브 이벤트 리스너 등록 touchmove
    slideWrap.addEventListener("touchmove", (e) => {
      if (!mouseDown) return;
      dragEnd = e.changedTouches[0].clientX;

      slideWrap.style.transition = "left 0s ease-in-out";
      slideWrap.style.left = `${dragEnd - dragStart}px`; // 드래그 길이만큼 이동시킴
    });

    // 방향 설정 - 마우스업에서
    // 'dragEnd - dragStart : 양수면 왼쪽으로 감(이전슬라이드), 음수면 => 우측으로 이동 (다음슬라이드)

    // 3-1. 마우스 업 이벤트 리스너 등록 touchend (2개 -> 슬라이드랩 영역, 도큐먼트 영역(예외처리))
    slideWrap.addEventListener("mouseup", (e) => {
      mouseDown = false;

      // 우측이동
      if (dragEnd - dragStart < 0) {
        // console.log("다음슬라이드");
        cnt = Math.round(Math.abs(dragEnd - dragStart) / 300);
        if (cnt > 8) {
          cnt = 8;
        }
      }

      // 왼쪽 이동
      if (dragEnd - dragStart > 0) {
        cnt = Math.round(Math.abs(dragEnd - dragStart) / 300);
        if (cnt > 0) {
          cnt = 0;
        }
      }
      mainSlide();
    });

    // 3-1. 마우스 업 이벤트 (2개 -> 슬라이드랩 영역, 도큐먼트 영역)

    document.addEventListener("mouseup", (e) => {
      if (!mouseDown) return; // 도큐먼트에서는 반드시 리턴 넣어야함
      mouseDown = false;

      // 우측이동
      if (dragEnd - dragStart < 0) {
        // console.log("다음슬라이드");
        cnt = Math.round(Math.abs(dragEnd - dragStart) / 300);
        if (cnt > 8) {
          cnt = 8;
        }
      }

      // 왼쪽 이동
      if (dragEnd - dragStart > 0) {
        cnt = Math.round(Math.abs(dragEnd - dragStart) / 300);
        if (cnt > 0) {
          cnt = 0;
        }
      }
      mainSlide();
    });

    // 3-2. 모바일  마우스 업 이벤트 리스너 등록
    slideWrap.addEventListener("touchend", (e) => {
      mouseDown = false;

      // 우측이동
      if (dragEnd - dragStart < 0) {
        // console.log("다음슬라이드");
        cnt = Math.round(Math.abs(dragEnd - dragStart) / 300);
        if (cnt > 8) {
          cnt = 8;
        }
      }

      // 왼쪽 이동
      if (dragEnd - dragStart > 0) {
        cnt = Math.round(Math.abs(dragEnd - dragStart) / 300);
        if (cnt > 0) {
          cnt = 0;
        }
      }
      mainSlide();
    });
  }, [state.영상소스]);
  return (
<<<<<<< HEAD
    <div id="section8Component" className="section">
      <section id="section8" class="sns">
        <div class="container">
          <div class="title">
            <h2>재즈 묘묘 후기</h2>
            <h3>memories</h3>
            <div class="line"></div>
          </div>
          <div class="content">
            <div class="reviews">
              <ul>
                <li>
                  <span class="review">
                    {" "}
                    잊을 수 없는 경험, 칵테일 한 잔과 재즈 선율이 완벽한
                    밤이었어요.
                  </span>
                  <span>
                    &nbsp;<i class="bi bi-stars"></i>&nbsp;
                  </span>
                  <span class="review">
                    {" "}
                    따뜻한 서비스와 친근한 분위기가 인상적이었어요. 다음에 또
                    오고싶어요!{" "}
                  </span>
                  <span>
                    &nbsp;<i class="bi bi-stars"></i>&nbsp;
                  </span>
                  <span class="review">
                    {" "}
                    잊을 수 없는 경험, 칵테일 한 잔과 재즈 선율이 완벽한
                    밤이었어요.
                  </span>
                  <span>
                    &nbsp;<i class="bi bi-stars"></i>&nbsp;
                  </span>
                  <span class="review">
                    {" "}
                    따뜻한 서비스와 친근한 분위기가 인상적이었어요. 다음에 또
                    오고싶어요!{" "}
                  </span>
                  <span>
                    &nbsp;<i class="bi bi-stars"></i>&nbsp;
                  </span>
                </li>
                <li>
                  <span class="review">
                    재즈 묘묘에서 감성 충전 제대로 했습니다. 친구들과 즐거운
                    시간 보냈어요.{" "}
                  </span>
                  <span>
                    &nbsp; <i class="bi bi-moon-stars-fill"></i>&nbsp;
                  </span>
                  <span class="review">
                    은은한 조명 아래에서 재즈 연주 들으니까 하루 피로가 싹
                    풀리더라구요.
                  </span>
                  <span>
                    &nbsp; <i class="bi bi-moon-stars-fill"></i>&nbsp;
                  </span>
                  <span class="review">
                    재즈 묘묘에서 감성 충전 제대로 했습니다. 친구들과 즐거운
                    시간 보냈어요{" "}
                  </span>
                  <span>
                    &nbsp; <i class="bi bi-moon-stars-fill"></i>&nbsp;
                  </span>
                  <span class="review">
                    은은한 조명 아래에서 재즈 연주 들으니까 하루 피로가 싹
                    풀리더라구요.
                  </span>
                  <span>
                    &nbsp; <i class="bi bi-moon-stars-fill"></i>&nbsp;
                  </span>
                </li>
                <li>
                  <span class="review">
                    재즈를 몰라도 충분히 즐길 수 있어요! 분위기가 좋아요~{" "}
                  </span>
                  <span>
                    &nbsp;<i class="bi bi-asterisk"></i>&nbsp;
                  </span>
                  <span class="review">
                    묘묘가 너무 귀여워요. 아늑한 분위기에서 귀호강 했어요.
                  </span>
                  <span>
                    &nbsp;<i class="bi bi-asterisk"></i>&nbsp;
                  </span>
                  <span class="review">
                    재즈를 몰라도 충분히 즐길 수 있어요! 분위기가 좋아요~{" "}
                  </span>
                  <span>
                    &nbsp;<i class="bi bi-asterisk"></i>&nbsp;
                  </span>
                  <span class="review">
                    묘묘가 너무 귀여워요. 아늑한 분위기에서 귀호강 했어요.
                  </span>
                  <span>
                    &nbsp;<i class="bi bi-asterisk"></i>&nbsp;
                  </span>
                </li>
                <li>
                  <span class="review">
                    맛있는 음식 먹으면서 재즈 즐기기 딱 좋더라구요.
                  </span>
                  <span>
                    &nbsp;<i class="bi bi-music-note"></i>&nbsp;
                  </span>
                  <span class="review">
                    분위기가 좋아서 커플끼리 와도 좋은 곳입니다
                  </span>
                  <span>
                    &nbsp;<i class="bi bi-music-note"></i>&nbsp;
                  </span>
                  <span class="review">
                    맛있는 음식 먹으면서 재즈 즐기기 딱 좋더라구요.
                  </span>
                  <span>
                    &nbsp;<i class="bi bi-music-note"></i>&nbsp;
                  </span>
                  <span class="review">
                    분위기가 좋아서 커플끼리 와도 좋은 곳입니다
                  </span>
                  <span>
                    &nbsp;<i class="bi bi-music-note"></i>&nbsp;
                  </span>
                </li>
              </ul>
            </div>
            <div class="video">
              <ul>
                <li>
                  <iframe
                    width="356"
                    height="500"
                    src="https://www.youtube.com/embed/zLG-KMmZqRs"
                    title="🐈‍⬛Alfie’s Jazz Bar🐈‍⬛ stacked weekend ahead book your tickets at soho.live/alfiestickets"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </li>
                <li>
                  <iframe
                    width="356"
                    height="500"
                    src="https://www.youtube.com/embed/1VNte_ZvxgU"
                    title="Jazz Bar in Seoul"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </li>
                <li>
                  <iframe
                    width="356"
                    height="500"
                    src="https://www.youtube.com/embed/kOAEf5LZbkU"
                    title="Andy&#39;s Jazz bar in Chicago"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </li>
                <li>
                  <iframe
                    width="356"
                    height="500"
                    src="https://www.youtube.com/embed/ER73lJrm6iQ"
                    title="Blue Note Jazz Club New York City"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </li>
              </ul>
=======
    <div id="section8Component">
      <section id="section8" className="sns">
        <div className="container">
          <div className="title">
            <div className="title-container">
              <Link to="./sub05Rev">
                <h2>재즈 묘묘 후기</h2>
              </Link>
              <h3>memories</h3>
            </div>
            <div className="line"></div>
          </div>
          <div className="content">
            <div className="reviews">
              <ul>
                {state.한줄후기.map((item, idx) => (
                  <li key={item.ID} data-key={item.ID}>
                    <span className="review">{item.후기1}</span>
                    <span>
                      &nbsp;<i className={state.아이콘[idx].클래스이름}></i>{" "}
                      &nbsp;{" "}
                    </span>
                    <span className="review">{item.후기2}</span>
                    <span>
                      {" "}
                      &nbsp;<i
                        className={state.아이콘[idx].클래스이름}
                      ></i>{" "}
                      &nbsp;
                    </span>
                    <span className="review">{item.후기1}</span>
                    <span>
                      &nbsp;<i className={state.아이콘[idx].클래스이름}></i>{" "}
                      &nbsp;{" "}
                    </span>
                    <span className="review">{item.후기2}</span>
                    <span>
                      {" "}
                      &nbsp;<i
                        className={state.아이콘[idx].클래스이름}
                      ></i>{" "}
                      &nbsp;
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="video">
              <div className="video-container">
                <div className="slide-container">
                  <div className="slide-view">
                    <ul className="slide-wrap">
                      {state.영상소스.map((item) => (
                        <li key={item.ID} data-key={item.ID}>
                          <iframe
                            src={item["영상 링크"]}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          ></iframe>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
>>>>>>> origin/temp
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
