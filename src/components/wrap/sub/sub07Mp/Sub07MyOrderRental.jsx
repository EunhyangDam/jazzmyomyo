import React, { useState, useEffect } from "react";
import "./scss/Sub07MyOrder.scss";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import { Link } from "react-router-dom";
import SiteMapComponent from "../../custom/SiteMapComponent";

function Sub07MyOrderRental(props) {
  return (
    <div id="sub07MyOrderRental">
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
          secondName="대관신청 내역"
        />
        <div className="content">
          <Sub07MpSideMenu />

          <div className="order">
            <ul>
              <li className="order4">
                {/* 대관신청 */}
                <div>
                  <div className="sub-title">
                    <h3>대관 신청 내역</h3>
                  </div>
                  <div className="table">
                    <div className="head-box">
                      <ul className="column-box">
                        <li className="col col1">
                          <h3>신청일자</h3>
                        </li>
                        <li className="col col2">
                          <h3>사용일자</h3>
                        </li>
                        <li className="col col3">
                          <h3>승인여부</h3>
                        </li>
                        <li className="col col4">
                          <h3>상세보기</h3>
                        </li>
                      </ul>
                    </div>
                    <div className="list-box">
                      <ul>
                        <li>
                          <p>신청 내역이 없습니다.</p>
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

export default Sub07MyOrderRental;
