import React from "react";
import "./scss/Sub07AddressList.scss";
import { Link, useNavigate } from "react-router-dom";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import SiteMapComponent from "../../custom/SiteMapComponent";
function Sub07AddressList(props) {
  return (
    <div id="sub07AddressList">
      <div className="container">
        <SiteMapComponent
          firstLink="/Mp"
          firstName="마이페이지"
          secondLink="./"
          secondName="배송지 관리"
        />
        <div className="title">
          <Link to="/Mp">
            <h2>My Page</h2>
          </Link>
        </div>
        <div className="content">
          <Sub07MpSideMenu />
          <div className="address-box">
            <div className="head">
              <h3>배송지 관리</h3>
              <h4>
                <i className="bi bi-bell-fill"></i>
                <span>배송지는 3개까지 등록할 수 있습니다.</span>
              </h4>
            </div>
            <div className="main">
              <ul>
                <li>
                  <div className="gap">
                    <div className="row1">
                      <span>기본배송지</span>
                    </div>
                    <div className="row2">
                      <em>우리집</em>
                      <button>수정</button>
                    </div>
                    <div className="row3">
                      <p>
                        김묘묘 <i>|</i> 010-1234-5678
                      </p>
                    </div>
                    <div className="row4">
                      <em>서울시 영등포구 주소 (우편번호)</em>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="gap">
                    <div className="row1"></div>
                    <div className="row2">
                      <em>회사</em>
                      <button>수정</button>
                    </div>
                    <div className="row3">
                      <p>
                        김묘묘 <i>|</i> 010-1234-5678
                      </p>
                    </div>
                    <div className="row4">
                      <em>서울시 구로구 주소 (우편번호)</em>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="gap">
                    <div className="row1"></div>
                    <div className="row2">
                      <em>회사</em>
                      <button>수정</button>
                    </div>
                    <div className="row3">
                      <p>
                        김묘묘 <i>|</i> 010-1234-5678
                      </p>
                    </div>
                    <div className="row4">
                      <em>서울시 구로구 주소 (우편번호)</em>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="foot">
              <Link to="./">배송지 추가</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07AddressList;
