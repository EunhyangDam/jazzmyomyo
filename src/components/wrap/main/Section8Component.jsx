import React, { useState, useEffect, useRef, forwardRef } from "react";
import "./scss/Section8Component.scss";
import useCustomA from "../custom/useCustomA";
import axios from "axios";

const Section8Component = forwardRef((props, ref) => {
  const { onClickA } = useCustomA();

  const [state, setState] = useState({ 영상소스: [] });

  const [reviews, setReviews] = React.useState({
    후기: [],
  });

  React.useEffect(() => {
    axios({
      url: "/jazzmyomyo/review_table_select.php",
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200 && res.data !== 0) {
          let 후기 = res.data;
          후기 = [
            ...후기
              .sort((a, b) => Number(b.Heart) - Number(a.Heart))
              .slice(0, 4),
          ];
          setReviews({
            ...reviews,
            후기: 후기,
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const slideWrap = useRef(null);
  const iframeRefs = useRef([]);
  const timerId = useRef(null);

  const [cnt, setCnt] = useState(0);

  // 드래그 관련 상태
  const mouseDown = useRef(false);
  const dragStart = useRef(0);
  const dragEnd = useRef(0);

  // 영상소스 불러오기
  useEffect(() => {
    fetch("./json/section8/section8.json")
      .then((res) => res.json())
      .then((data) => setState({ 영상소스: data.영상소스 }))
      .catch(console.log);
  }, []);

  // 슬라이드 자동 타이머 함수
  const autoTimer = () => {
    if (timerId.current) clearInterval(timerId.current);
    timerId.current = setInterval(() => {
      setCnt((prev) => (prev + 1) % (state.영상소스.length || 9));
    }, 4000);
  };

  // 유튜브 API 연동 및 상태 감지
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      state.영상소스.forEach((item, idx) => {
        new window.YT.Player(iframeRefs.current[idx], {
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                clearInterval(timerId.current);
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                autoTimer();
              }
            },
          },
        });
      });
    };
  }, [state.영상소스]);

  useEffect(() => {
    autoTimer();
    return () => clearInterval(timerId.current);
  }, [state.영상소스]);

  // 슬라이드 위치 업데이트
  useEffect(() => {
    if (!slideWrap.current) return;
    const total = state.영상소스.length;
    let index = cnt;
    if (index >= total) index = 0;
    if (index < 0) index = total - 1;

    slideWrap.current.style.transition = "left 0.3s ease-in-out";
    slideWrap.current.style.left = `${-300 * index}px`;
  }, [cnt, state.영상소스]);

  // 드래그 이벤트 핸들러

  const onMouseDownEvent = (e) => {
    autoTimer();
    mouseDown.current = true;
    dragStart.current =
      e.clientX - (slideWrap.current.getBoundingClientRect().left - 452.5);
  };

  const onTouchStartEvent = (e) => {
    mouseDown.current = true;
    dragStart.current =
      e.changedTouches[0].clientX -
      (slideWrap.current.getBoundingClientRect().left - 452.5);
  };

  const onMouseMoveEvent = (e) => {
    if (!mouseDown.current) return;
    dragEnd.current = e.clientX;

    slideWrap.current.style.transition = "left 0s ease-in-out";
    slideWrap.current.style.left = `${dragEnd.current - dragStart.current}px`;
  };

  const onTouchMoveEvent = (e) => {
    if (!mouseDown.current) return;
    dragEnd.current = e.changedTouches[0].clientX;

    slideWrap.current.style.transition = "left 0s ease-in-out";
    slideWrap.current.style.left = `${dragEnd.current - dragStart.current}px`;
  };

  const onMouseUpOrTouchEnd = () => {
    mouseDown.current = false;

    if (dragEnd.current - dragStart.current < 0) {
      const moveCount = Math.round(
        Math.abs(dragEnd.current - dragStart.current) / 300
      );
      setCnt((prev) =>
        prev + moveCount >= state.영상소스.length ? 0 : prev + moveCount
      );
    }

    if (dragEnd.current - dragStart.current > 0) {
      const moveCount = Math.round(
        Math.abs(dragEnd.current - dragStart.current) / 300
      );
      setCnt((prev) => (prev - moveCount < 0 ? 0 : prev - moveCount));
    }
  };

  useEffect(() => {
    // 문서 전체 mouseup 이벤트에도 drag 종료 처리
    const onDocumentMouseUp = () => {
      if (!mouseDown.current) return;
      mouseDown.current = false;
      onMouseUpOrTouchEnd();
    };

    document.addEventListener("mouseup", onDocumentMouseUp);

    return () => {
      document.removeEventListener("mouseup", onDocumentMouseUp);
    };
  }, []);

  return (
    <div id="section8Component" ref={ref}>
      <section id="section8" className="sns">
        <div className="container">
          <div className="title">
            <div className="title-container">
              <a href="!#" onClick={(e) => onClickA(e, "/rev")}>
                <h2>
                  <img src="/img/section8/paw.png" alt="" />
                  <em>묘묘와의 추억</em>
                </h2>
              </a>
              <h3>...memories in myomymo</h3>
            </div>
            <div className="line"></div>
          </div>
          <div className="content">
            <div className="reviews">
              <ul>
                {reviews.후기.map((item, idx) => (
                  <li
                    className={`col${idx + 1}`}
                    key={item.idx}
                    data-key={item.idx}
                  >
                    <img
                      src={`/img/section8/memo${idx + 1}.png`}
                      alt={`review${idx + 1}`}
                    />
                    <p>
                      {item.wContent ? item.wContent : ""} <br />
                      <span>- {item.wName} -</span>
                    </p>
                    <span></span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="video">
              <div className="video-container">
                <div className="slide-container">
                  <div className="slide-view">
                    <ul
                      className="slide-wrap"
                      ref={slideWrap}
                      onMouseDown={onMouseDownEvent}
                      onTouchStart={onTouchStartEvent}
                      onMouseUp={onMouseUpOrTouchEnd}
                      onTouchEnd={onMouseUpOrTouchEnd}
                      onMouseMove={onMouseMoveEvent}
                      onTouchMove={onTouchMoveEvent}
                    >
                      {state.영상소스.map((item, idx) => (
                        <li key={item.ID} data-key={item.ID}>
                          <iframe
                            src={`${item["영상 링크"]}?enablejsapi=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            ref={(el) => (iframeRefs.current[idx] = el)}
                            referrerPolicy="strict-origin-when-cross-origin"
                          ></iframe>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
export default Section8Component;
