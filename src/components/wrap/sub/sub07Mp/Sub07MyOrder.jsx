import React, { useState, useEffect } from "react";
import "./scss/Sub07MyOrder.scss";
import { Link } from "react-router-dom";

function Sub07MyOrder(props) {
  return (
    <div id="sub07MyOrder">
      <div className="container">
        <div className="title">
          <Link to="/Mp">
            <h2>My Order</h2>
          </Link>
        </div>
        <div className="content">
          <div className="md-order">
            <div className="sub-title">
              <h3>주문 / 배송 조회</h3>
            </div>
            <div className="table">
              <div className="head-box">
                <ul className="column-box">
                  <li className="col col1">
                    <h3>Date</h3>
                  </li>
                  <li className="col col2">
                    <h3>Product</h3>
                  </li>
                  <li className="col col3">
                    <h3>Cost</h3>
                  </li>
                  <li className="col col4">
                    <h3>Detail</h3>
                  </li>
                </ul>
              </div>
              <div className="list-box">
                <ul>
                  <li>
                    <ul className="column-box">
                      <li className="col col1">
                        <h3>Date</h3>
                      </li>
                      <li className="col col2">
                        <h3>Product</h3>
                      </li>
                      <li className="col col3">
                        <em>원</em>
                      </li>
                      <li className="col col4">
                        <button>상세보기</button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="reservation">
            <div className="sub-title">
              <h3>예약 내역 확인</h3>
            </div>
            <div className="table">
              <div className="head-box">
                <ul className="column-box">
                  <li className="col col1">
                    <h3>예약 일자</h3>
                  </li>
                  <li className="col col2">
                    <h3>방문 일자</h3>
                  </li>
                  <li className="col col3">
                    <h3>인원</h3>
                  </li>
                </ul>
              </div>
              <div className="list-box">
                <ul>
                  <li>
                    <ul className="column-box">
                      <li className="col col1">
                        <h3>방문일</h3>
                      </li>
                      <li className="col col2">
                        <h3>예약인원</h3>
                      </li>
                      <li className="col col3">
                        <em>원</em>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rent">
            <div className="sub-title">
              <h3>대관 신청 확인</h3>
            </div>
            <div className="table">
              <div className="head-box">
                <ul className="column-box">
                  <li className="col col1">
                    <h3>신청일자</h3>
                  </li>
                  <li className="col col2">
                    <h3>사용시간</h3>
                  </li>
                  <li className="col col3">
                    <h3>승인여부</h3>
                  </li>
                  <li className="col col4">
                    <h3>Detail</h3>
                  </li>
                </ul>
              </div>
              <div className="list-box">
                <ul>
                  <li>
                    <ul className="column-box">
                      <li className="col col1">
                        <h3>Date</h3>
                      </li>
                      <li className="col col2">
                        <h3>Product</h3>
                      </li>
                      <li className="col col3">
                        <em>Yes / No</em>
                      </li>
                      <li className="col col4">
                        <button>상세보기</button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07MyOrder;
