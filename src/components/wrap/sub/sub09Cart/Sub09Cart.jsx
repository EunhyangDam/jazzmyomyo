import React from "react";
import "../scss/sub.scss";
import "./scss/Sub09Cart.scss";
import { Link } from "react-router-dom";
function Sub09Cart(props) {
  return (
    <div id="sub09Cart" className="sub-page">
      <div className="inner">
        <div className="site">
          <Link to="./">
            <i className="bi bi-house-fill"></i>
          </Link>
          <i>&gt;</i>
          <Link to="./Sub10Wishilist" className="now">
            장바구니
          </Link>
        </div>
        <div className="body">
          <dl>
            <dt>
              <div className="col col1">
                <input type="checkbox" id="allChk" name="allChk" />
              </div>
              <div className="col col2">상품정보</div>
              <div className="col col3">수량</div>
              <div className="col col4">배송구분</div>
              <div className="col col5">주문금액</div>
            </dt>
            <dd>
              <div className="col col1">
                <input type="checkbox" id="allChk" name="allChk" />
              </div>
              <div className="col col2">
                <div className="img-container">
                  <img src="" alt="" />
                </div>
                <div className="txt-container">
                  <h3>상품명</h3>
                  <div className="bottom">
                    <div className="box">
                      <span className="new">신상품</span>
                      <span className="sold-out">품절</span>
                    </div>
                    <p>옵션:</p>
                  </div>
                </div>
              </div>
              <div className="col col3">
                <div className="container">
                  <button>-</button>
                  <input
                    type="number"
                    name="inputNumber"
                    id="inputNumber"
                    value={1}
                  />
                  <button className="active">+</button>
                </div>
              </div>
              <div className="col col4">기본배송</div>
              <div className="col col5">
                <span>32,000</span>원
              </div>
            </dd>
          </dl>
          <div className="btn-box">
            <button>선택 상품 삭제</button>
            <button>전체 삭제</button>
          </div>
        </div>
        <div className="foot">
          <div className="container">
            <button>이전화면</button>
            <button>선택 상품 주문하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub09Cart;
