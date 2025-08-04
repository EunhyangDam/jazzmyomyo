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
          <div className="menu">
            <div className="menu">
              <ul>
                <li>
                  <h2>메뉴</h2>
                </li>
                <li className="sub-title">
                  <h3>계정관리</h3>
                </li>
                <li>
                  <Link to="/MyProfile">회원정보 확인</Link>
                </li>
                <li>
                  <Link to="/EditProfile">회원정보 수정</Link>
                </li>
                <li>
                  <Link to="/DeleteAccount">회원 탈퇴</Link>
                </li>
                <li className="sub-title">
                  <h3>이용내역</h3>
                </li>
                <li>
                  <Link to="/MyOrder">예매내역 확인</Link>
                </li>
                <li>
                  <Link to="/MyOrder">주문내역 확인</Link>
                </li>
                <li>
                  <Link to="/MyOrder">대관신청 확인</Link>
                </li>
                <li className="sub-title">
                  <h3>게시판</h3>
                </li>
                <li>
                  <Link to="/Ntc">공지사항</Link>
                </li>
                <li>
                  <Link to="/Faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/Rev">작성 후기</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="order">
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
                          <h3>2025-08-01</h3>
                        </li>
                        <li className="col col2">
                          <h3>블랙묘묘 인형(30cm)</h3>
                        </li>
                        <li className="col col3">
                          <em>38,000원</em>
                        </li>
                        <li className="col col4">
                          <button>상세보기</button>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul className="column-box">
                        <li className="col col1">
                          <h3>2025-08-01</h3>
                        </li>
                        <li className="col col2">
                          <h3>블랙묘묘 인형(30cm)</h3>
                        </li>
                        <li className="col col3">
                          <em>38,000원</em>
                        </li>
                        <li className="col col4">
                          <button>상세보기</button>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul className="column-box">
                        <li className="col col1">
                          <h3>2025-08-01</h3>
                        </li>
                        <li className="col col2">
                          <h3>블랙묘묘 인형(30cm)</h3>
                        </li>
                        <li className="col col3">
                          <em>38,000원</em>
                        </li>
                        <li className="col col4">
                          <button>상세보기</button>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul className="column-box">
                        <li className="col col1">
                          <h3>2025-08-01</h3>
                        </li>
                        <li className="col col2">
                          <h3>블랙묘묘 인형(30cm)</h3>
                        </li>
                        <li className="col col3">
                          <em>38,000원</em>
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
                          <h3>2025-08-01</h3>
                        </li>
                        <li className="col col2">
                          <h3>2025-08-08</h3>
                        </li>
                        <li className="col col3">
                          <em>3명</em>
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
                          <h3>2025-08-11</h3>
                        </li>
                        <li className="col col2">
                          <h3>4시간</h3>
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
    </div>
  );
}

export default Sub07MyOrder;
