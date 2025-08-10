import React, { useEffect, useState } from "react";
import "./scss/Sub05Rev.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reviewAction } from "../../../../store/review";

function Sub05Rev(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviews = useSelector((state) => state.review.review);

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

  return (
    <div id="sub05Rev">
      <div className="container">
        <div className="site">
          <Link to="./">
            <i className="bi bi-house-fill"></i>
          </Link>
          <i>&gt;</i>
          <Link to="./">마이페이지</Link>
          <i>&gt;</i>
          <Link to="/Wishilist" className="now">
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
              {reviews.map((item) => (
                <li key={item.id} data-key={item.id}>
                  <div className="gap">
                    <div className="row1">
                      <p>{item.작성내용}</p>
                    </div>
                    <div className="row2">{item.작성자명}</div>
                    <div className="row3">{item.작성일자}</div>
                    <div className="row4">
                      <em> {item.작성분류}</em>
                      <span>
                        <button onClick={() => onClickRevHeart(item.id)}>
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
    </div>
  );
}

export default Sub05Rev;
