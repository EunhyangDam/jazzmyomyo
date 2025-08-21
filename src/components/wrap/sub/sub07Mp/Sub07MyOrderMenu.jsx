import React, { useState, useEffect } from "react";
import "./scss/Sub07MyOrder.scss";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import { Link } from "react-router-dom";
import SiteMapComponent from "../../custom/SiteMapComponent";

function Sub07MyOrderMenu(props) {
  return (
    <div id="sub07MyOrderMenu">
      <div className="container">
        <div className="title">
          <Link to="/mp">
            <h2>My Order</h2>
          </Link>
        </div>
        <SiteMapComponent
          firstLink="/mp"
          firstName="마이페이지"
          secondLink="./"
          secondName="사전주문 내역"
        />
        <div className="content">
          <Sub07MpSideMenu />

          <div className="order">
            <ul>
              <li className="order3">
                {/* 사전메뉴주문 */}
                <div>
                  <div className="sub-title">
                    <h3>사전주문 내역</h3>
                  </div>
                  <div className="table">
                    <div className="head-box">
                      <ul className="column-box">
                        <li className="col col1">
                          <h3>주문일자</h3>
                        </li>
                        <li className="col col2">
                          <h3>예약내용</h3>
                        </li>
                        <li className="col col3">
                          <h3>확정 여부</h3>
                        </li>
                        <li className="col col4">
                          <h3>상세보기</h3>
                        </li>
                      </ul>
                    </div>
                    <div className="list-box">
                      <ul>
                        <li>
                          <ul className="column-box">
                            <li className="col col1">
                              <h3>2025-08-02</h3>
                            </li>
                            <li className="col col2">
                              <h3>
                                [ 9월 14일 / 20:00 / 3인 / Chablis / 감바스 ]
                              </h3>
                            </li>
                            <li className="col col3">
                              <em> 취소 </em>
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
                              <h3>
                                [ 9월 12일 / 19:00 / 2인 / Shiraz Whisper /
                                감바스 ]
                              </h3>
                            </li>
                            <li className="col col3">
                              <em>확정</em>
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
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07MyOrderMenu;
