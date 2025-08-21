import React, { useState, useEffect } from "react";
import "./scss/Sub07MyOrder.scss";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import { Link } from "react-router-dom";
import SiteMapComponent from "../../custom/SiteMapComponent";

function Sub07MyOrderMd(props) {
  return (
    <div id="sub07MyOrderMd">
      <div className="container">
        <div className="title">
          <Link to="/myOrder">
            <h2>My Order</h2>
          </Link>
        </div>
        <SiteMapComponent
          firstLink="/mp"
          firstName="마이페이지"
          secondLink="./"
          secondName="주문내역"
        />
        <div className="content">
          <Sub07MpSideMenu />

          <div className="order">
            <ul>
              <li className="order1">
                {/* 주문배송조회 */}
                <div>
                  <div className="sub-title">
                    <h3>주문 / 배송 조회</h3>
                  </div>
                  <div className="table">
                    <div className="head-box">
                      <ul className="column-box">
                        <li className="col col1">
                          <h3>주문일자</h3>
                        </li>
                        <li className="col col2">
                          <h3>주문상품</h3>
                        </li>
                        <li className="col col3">
                          <h3>결제금액</h3>
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
                              <h3>2025-07-30</h3>
                            </li>
                            <li className="col col2">
                              <h3>Lauv(라우브) - 2집 All 4 Nothing</h3>
                            </li>
                            <li className="col col3">
                              <em>59,100원</em>
                            </li>
                            <li className="col col4">
                              <button>상세보기</button>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <ul className="column-box">
                            <li className="col col1">
                              <h3>2025-06-18</h3>
                            </li>
                            <li className="col col2">
                              <a href="!#">
                                <h3>
                                  Carpenters(카펜터스) - The Singles 1969-1973
                                </h3>
                              </a>
                            </li>
                            <li className="col col3">
                              <em>74,300원</em>
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

export default Sub07MyOrderMd;
