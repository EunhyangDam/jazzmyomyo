import React, { useEffect, useState } from "react";
import "./scss/Sub05Rev.scss";
import { Link, useNavigate } from "react-router-dom";
import SiteMapComponent from "../../custom/SiteMapComponent";
import axios from "axios";

function Sub05Rev(props) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    isOpen: false,
    selectedId: null,
    후기: [],
  });

  // 후기 불러오기
  useEffect(() => {
    axios({
      url: "/jazzmyomyo/review_table_select.php",
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200 && res.data !== 0) {
          let 후기 = res.data;
          후기 = [...후기.sort((a, b) => b.idx - a.idx)]; // 최신순
          setState((prev) => ({
            ...prev,
            후기,
          }));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // 하트 클릭 (DB 수정 작업 필요)
  const onClickRevHeart = (idx) => {
    // const updated = state.후기.map((review) =>
    //   review.idx === idx
    //     ? { ...review, Heart: (review.Heart || 0) + 1 }
    //     : review
    // );
    // setState((prev) => ({
    //   ...prev,
    //   후기: updated,
    // }));
  };

  // 글쓰기 이동
  const onClickRevWriteBtn = (e) => {
    e.preventDefault();
    navigate("/RevWrite");
  };

  // 모달 열기
  const onClickGap = (id) => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      selectedId: id,
    }));
  };

  // 모달 닫기
  const onClickModalClose = (e) => {
    e.stopPropagation();
    setState((prev) => ({
      ...prev,
      isOpen: false,
      selectedId: null,
    }));
  };

  // 선택된 후기 & 현재 index
  const selectedReview =
    state.후기.find((r) => r.idx === state.selectedId) || null;
  const currentIndex =
    state.selectedId !== null
      ? state.후기.findIndex((r) => r.idx === state.selectedId)
      : -1;

  // Prev, Next
  const onClickPrev = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setState((prev) => ({
        ...prev,
        selectedId: state.후기[currentIndex - 1].idx,
      }));
    }
  };

  const onClickNext = (e) => {
    e.stopPropagation();
    if (currentIndex !== -1 && currentIndex < state.후기.length - 1) {
      setState((prev) => ({
        ...prev,
        selectedId: state.후기[currentIndex + 1].idx,
      }));
    }
  };

  return (
    <div id="sub05Rev">
      <div className="container">
        <SiteMapComponent
          firstLink=""
          firstName="커뮤니티"
          secondLink="./"
          secondName="공연 후기"
        />
        <div className="title">
          <Link to="./">
            <h2>공연 후기</h2>
          </Link>
          <h3>
            재즈묘묘의 밤을 기억하는 한 줄의 마음들이 이곳에 포근히 쌓여갑니다.
          </h3>
        </div>

        <div className="content">
          <div className="top">
            <button onClick={onClickRevWriteBtn}>나도 한줄 후기 남기기</button>
            <h4>
              <i className="bi bi-bell-fill"></i>
              <span>후기는 가장 최근 순으로 최대 9개까지만 노출됩니다.</span>
            </h4>
          </div>

          <div className="review-box">
            <ul>
              {state.후기.slice(0, 9).map((item) => (
                <li key={item.idx}>
                  <div className="gap" onClick={() => onClickGap(item.idx)}>
                    <div className="row1">
                      <p>{item.wContent}</p>
                    </div>
                    <div className="row2">{item.wName}</div>
                    <div className="row3">{item.wDate}</div>
                    <div className="row4">
                      <em>{item.wSubject}</em>
                      <span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onClickRevHeart(item.idx);
                          }}
                        >
                          <i className="bi bi-suit-heart-fill"></i>
                        </button>
                        <b>{item.Heart}</b>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {state.isOpen && selectedReview && (
        <div
          className={`modal ${state.isOpen ? " on" : ""}`}
          onClick={onClickModalClose}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="nav prev">
              {currentIndex > 0 && (
                <i className="bi bi-chevron-left" onClick={onClickPrev}></i>
              )}
            </div>

            <div className="center-box">
              <div className="title">
                <h2>묘원의 공연 후기</h2>
              </div>
              <div className="content">
                <div className="gap">
                  <div className="row1">
                    <p>{selectedReview?.wContent}</p>
                  </div>
                  <div className="row2">{selectedReview?.wName}</div>
                  <div className="row3">{selectedReview?.wDate}</div>
                  <div className="row4">
                    <em>{selectedReview?.wSubject}</em>
                    <span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedReview) {
                            onClickRevHeart(selectedReview.idx);
                          }
                        }}
                      >
                        <i className="bi bi-suit-heart-fill"></i>
                      </button>
                      <b>{selectedReview?.Heart}</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav next">
              {currentIndex !== -1 && currentIndex < state.후기.length - 1 && (
                <i className="bi bi-chevron-right" onClick={onClickNext}></i>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sub05Rev;
