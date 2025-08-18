import React, { useEffect, useState } from "react";
import "./scss/Sub05Rev.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reviewAction } from "../../../../store/review";

function Sub05Rev(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviews = useSelector((state) => state.review.review);

  const [state, setState] = useState({
    isOpen: false,
    selectedId: null,
  });

  useEffect(() => {
    if (reviews.length === 0) {
      fetch("/json/sub05/rev.json")
        .then((res) => res.json())
        .then((data) => {
          dispatch(reviewAction(data.review));
        })
        .catch(console.error);
    }
  }, [dispatch, reviews.length]);

  // 로그인 없이 무한 증가 클릭 이벤트
  const onClickRevHeart = (id, idx) => {
    const updated = reviews.map((review) =>
      review.id === id ? { ...review, 하트: (review.하트 || 0) + 1 } : review
    );

    dispatch(reviewAction(updated));
  };

  const onClickRevWriteBtn = (e) => {
    e.preventDefault();
    navigate("/RevWrite");
  };

  //모달 이벤트
  const selectedReview = reviews.find((r) => r.id === state.selectedId);

  const onClickGap = (id) => {
    setState({
      isOpen: true,
      selectedId: id,
    });
  };

  const onClickModalClose = (e) => {
    e.stopPropagation();
    setState({
      isOpen: false,
      selectedId: null,
    });
  };

  //모달 이동 이벤트
  const currentIndex = reviews.findIndex((r) => r.id === state.selectedId);

  const onClickPrev = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setState({
        ...state,
        selectedId: reviews[currentIndex - 1].id,
      });
    }
  };

  const onClickNext = (e) => {
    e.stopPropagation();
    if (currentIndex < reviews.length - 1) {
      setState({
        ...state,
        selectedId: reviews[currentIndex + 1].id,
      });
    }
  };
  return (
    <div id="sub05Rev">
      <div className="container">
        <div className="site">
          <Link to="/">
            <i className="bi bi-house-fill"></i>
          </Link>
          <i>&gt;</i>
          <Link to="/Mp">마이페이지</Link>
          <i>&gt;</i>
          <Link to="./" className="now">
            공연 후기
          </Link>
        </div>
        <div className="title">
          <Link to="./">
            <h2>한줄 후기</h2>
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
              {reviews.slice(0, 9).map((item) => (
                <li key={item.id} data-key={item.id}>
                  <div className="gap" onClick={() => onClickGap(item.id)}>
                    <div className="row1">
                      <p>{item.작성내용}</p>
                    </div>
                    <div className="row2">{item.작성자명}</div>
                    <div className="row3">{item.작성일자}</div>
                    <div className="row4">
                      <em> {item.작성분류}</em>
                      <span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onClickRevHeart(item.id);
                          }}
                        >
                          <i className="bi bi-suit-heart-fill"></i>
                        </button>
                        <b>{item.하트}</b>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {selectedReview && state.isOpen && (
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
                    <p>{selectedReview.작성내용}</p>
                  </div>
                  <div className="row2">{selectedReview.작성자명}</div>
                  <div className="row3">{selectedReview.작성일자}</div>
                  <div className="row4">
                    <em>{selectedReview.작성분류}</em>
                    <span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClickRevHeart(selectedReview.id);
                        }}
                      >
                        <i className="bi bi-suit-heart-fill"></i>
                      </button>
                      <b>{selectedReview.하트}</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav next">
              {currentIndex < reviews.length - 1 && (
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
