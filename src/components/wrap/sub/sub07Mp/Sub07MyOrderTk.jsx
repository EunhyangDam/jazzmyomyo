import React, { useState, useEffect } from "react";
import "./scss/Sub07MyOrder.scss";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import { Link } from "react-router-dom";
import SiteMapComponent from "../../custom/SiteMapComponent";

function Sub07MyOrderTk(props) {
  return (
    <div id="sub07MyOrderTk">
      <div className="container">
        <div className="title">
          <Link to="/MyOrder">
            <h2>My Order</h2>
          </Link>
        </div>
        <SiteMapComponent
          firstLink="/Mp"
          firstName="마이페이지"
          secondLink="./"
          secondName="예매내역"
        />
        <div className="content">
          <Sub07MpSideMenu />

          <div className="order">
            <ul>
              <li className="order2">
                {/* 예매내역 */}
                <div>
                  <div className="sub-title">
                    <h3>예매 내역</h3>
                  </div>
                  <div className="table">
                    <div className="head-box">
                      <ul className="column-box">
                        <li className="col col1">
                          <h3>공연일자</h3>
                        </li>
                        <li className="col col2">
                          <h3>공연명</h3>
                        </li>
                        <li className="col col3">
                          <h3>매수</h3>
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
                              <h3>2025-06-14</h3>
                            </li>
                            <li className="col col2">
                              <h3>Paloalto 단독콘서트 : JAZZHOP</h3>
                            </li>
                            <li className="col col3">
                              <em> 2매</em>
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

export default Sub07MyOrderTk;
