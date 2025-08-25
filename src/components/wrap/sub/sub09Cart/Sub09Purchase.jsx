import React from "react";
import "./scss/Sub09Purchase.scss";
import SiteMapComponent from "../../custom/SiteMapComponent";
export default function Sub09Purchase(props) {
  return (
    <main id="sub09Purchase">
      <div className="inner">
        <SiteMapComponent firstLink="" firstName="주문서 작성/결제" />
        <div className="container">
          <div className="head">
            <ul>
              <li className="text">
                <span>01 장바구니</span>
                <img src="./img/sub09cart/1.png" alt="" />
              </li>
              <li className="text">
                <span>02 주문서 작성/결제</span>
                <img src="./img/sub09cart/2.png" alt="" />
              </li>
              <li className="text">
                <span>03 주문완료</span>
                <img src="./img/sub09cart/3.png" alt="" />
              </li>
            </ul>
          </div>
          <form>
            <div className="body">
              <div className="col col1">
                <div className="heading">
                  <h3>배송지</h3>
                  <button>배송지 추가/변경</button>
                </div>
                <div className="content">
                  <ul>
                    <li>
                      <div className="col col1">배송지명(선택)</div>
                      <div className="col col2">
                        <input type="text" name="dName" id="dName" />
                      </div>
                    </li>
                    <li>
                      <div className="col col1">수신자명</div>
                      <div className="col col2">
                        <input type="text" name="dRecipient" id="dRecipient" />
                      </div>
                    </li>
                    <li>
                      <div className="col col1">수신자 연락처</div>
                      <div className="col col2">
                        <input type="text" name="dContact" id="dContact" />
                      </div>
                    </li>
                    <li>
                      <div className="col col1">배송지 주소</div>
                      <div className="col col2">
                        <div className="group">
                          <input type="text" name="dAdr1" id="dAdr1" />
                          <button>우편번호 검색</button>
                        </div>
                        <input type="text" name="dAdr2" id="dAdr2" />
                        <input type="text" name="dAdr3" id="dAdr3" />
                      </div>
                    </li>
                    <li>
                      <div className="col col1">배송메모(선택)</div>
                      <div className="col col2">
                        <input type="text" name="dName" id="dName" />
                      </div>
                    </li>
                  </ul>

                  <dl>
                    <dt>
                      <div className="col col2">상품정보</div>
                      <div className="col col3">수량</div>
                      <div className="col col4">배송구분</div>
                      <div className="col col5">주문금액</div>
                    </dt>
                  </dl>
                </div>
              </div>
              <div className="col col2"></div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
