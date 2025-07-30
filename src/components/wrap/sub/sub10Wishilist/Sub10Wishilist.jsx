import React from "react";
import "../scss/sub.scss";
import "./scss/Sub10Wishilist.scss";
import { Link } from "react-router-dom";
export default function Sub10Wishilist(props) {
  return (
    <div id="sub10Wishilist" className="sub-page">
      <div className="inner">
        <div className="site">
          <Link to="./">
            <i className="bi bi-house-fill"></i>
          </Link>
          <i>&gt;</i>
          <Link to="./">마이페이지</Link>
          <i>&gt;</i>
          <Link to="./Sub10Wishilist" className="now">
            찜리스트
          </Link>
        </div>
        <div className="head">
          <ul>
            <li className="col col1">
              <h2 className="name">
                <span>묘묘</span> 님
              </h2>
              <p className="email">myomyocat@gmail.com</p>
              <p>일반회원</p>
            </li>
            <li className="col col2">
              <h3>나의 첫 방문일</h3>
              <p className="content">2025.09.10</p>
            </li>
            <li className="col col3">
              <h3>나의 감상횟수</h3>
              <p className="content">6회</p>
            </li>
            <li className="col col4">
              <h3>보유 티켓 수</h3>
              <p className="content">8장</p>
            </li>
          </ul>
        </div>
        <div className="body">
          <h3>
            찜 리스트 <span>(8)</span>
          </h3>
          <ul className="content">
            <li>
              <div className="img-container">
                <img src="" alt="" />
                <div className="x-box">
                  <button>
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              </div>
              <h4>상품명</h4>
              <p className="price">
                <span>32000</span>원
              </p>
              <div className="box">
                <span className="new">신상품</span>
                <span className="sold-out">품절</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="foot">
          <ul>
            <li className="pre">
              <button>
                <i className="bi bi-chevron-double-left"></i>
              </button>
              <button>
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>
            <li className="page">
              <button className="active">1</button>
            </li>
            <li className="next">
              <button>
                <i className="bi bi-chevron-double-right"></i>
              </button>
              <button>
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
