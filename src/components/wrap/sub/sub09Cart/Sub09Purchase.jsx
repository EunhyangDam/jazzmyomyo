import React, { useEffect, useState } from "react";
import "./scss/Sub09Purchase.scss";
import SiteMapComponent from "../../custom/SiteMapComponent";
import { useSelector } from "react-redux";
export default function Sub09Purchase(props) {
  const [state, setState] = useState({
    product: [],
  });
  const cartAsset = useSelector((state) => state.cart.checkedProduct);
  const cartPrice = useSelector((state) => state.cart);
  useEffect(() => {
    setState({ product: cartAsset });
  }, [cartAsset]);
  return (
    <main id="sub09Purchase">
      <div className="inner">
        <SiteMapComponent firstLink="" firstName="주문서 작성/결제" />
        <div className="container">
          <div className="head">
            <ul>
              <li className="text">
                <span>
                  01
                  <br className="first" /> 장바구니
                </span>
                <img src="./img/sub09cart/1.png" alt="" />
              </li>
              <li className="text">
                <span>
                  02
                  <br className="first" /> 주문서 작성
                  <br className="second" />
                  결제
                </span>
                <img src="./img/sub09cart/2.png" alt="" />
              </li>
              <li className="text">
                <span>
                  03
                  <br className="first" /> 주문완료
                </span>
                <img src="./img/sub09cart/3.png" alt="" />
              </li>
            </ul>
          </div>
          <form>
            <div className="body">
              <div className="col col1">
                <div className="content">
                  <div className="adr">
                    <div className="heading">
                      <h3>배송지</h3>
                      <button>배송지 추가/변경</button>
                    </div>
                    <ul>
                      <li>
                        <div className="col col1">배송지명 (선택)</div>
                        <div className="col col2">
                          <input type="text" name="dName" id="dName" />
                        </div>
                      </li>
                      <li>
                        <div className="col col1">수신자명</div>
                        <div className="col col2">
                          <input
                            type="text"
                            name="dRecipient"
                            id="dRecipient"
                          />
                        </div>
                      </li>
                      <li>
                        <div className="col col1">수신자 연락처</div>
                        <div className="col col2">
                          <input type="text" name="dContact" id="dContact" />
                        </div>
                      </li>
                      <li className="delivery">
                        <div className="col col1">배송지 주소</div>
                        <div className="col col2">
                          <div className="group">
                            <input type="text" name="dAdr1" id="dAdr1" />
                            <button>
                              우편번호
                              <br />
                              검색
                            </button>
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
                  </div>
                  <div className="product">
                    <div className="heading">
                      <h3>상품정보</h3>
                    </div>
                    <dl>
                      <dt>
                        <div className="col col2">상품정보</div>
                        <div className="col col3">수량</div>
                        <div className="col col4">배송구분</div>
                        <div className="col col5">주문금액</div>
                      </dt>
                      {state.product.map((el, idx) => (
                        <dd className={el.품절 ? "sold-out" : ""} key={el.id}>
                          <div className="col col2">
                            <div className="img-container">
                              <img src={el.이미지[0]} alt="" />
                            </div>
                            <div className="txt-container">
                              <h3>{el.상품명}</h3>
                              <div className="bottom">
                                <div className="box">
                                  {el.신상품 && (
                                    <span className="new">신상품</span>
                                  )}
                                  {el.품절 && (
                                    <span className="sold-out">품절</span>
                                  )}
                                </div>
                                <p>{el.옵션.length > 0 && "옵션:"}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col col3">
                            <div className="container">
                              <input
                                type="number"
                                name={`inputNumber${el.idx}`}
                                id={`inputNumber${el.idx}`}
                                value={el.수량}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="col col4">기본배송</div>
                          <div className="col col5">
                            <span>
                              {(el.가격 * el.수량).toLocaleString("ko-kr")}
                            </span>
                            원
                          </div>
                        </dd>
                      ))}
                    </dl>
                  </div>
                  <div className="purchase">
                    <div className="heading">
                      <h3>결제하기</h3>
                    </div>
                    <div className="table">
                      <div className="row1 row">
                        <div className="col col1">
                          <p>결제수단</p>
                        </div>
                        <div className="col col2">
                          <label>
                            <input
                              type="radio"
                              name="radioDeposit"
                              id="radioDeposit"
                            />
                            <span>무통장 입금</span>
                          </label>
                          <select name="selectCard" id="selectCard">
                            <option value="">
                              - [필수] 입금하실 계좌를 선택해주세요 -
                            </option>
                            <option value="100162941363">
                              [케이뱅크] 100162941363
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="row2 row">
                        <div className="col col1">
                          <p>결제수단 확인</p>
                        </div>
                        <div className="col col2">
                          <span>무통장입금</span>
                          <span>[기업은행] 12345645678956</span>
                          <span>예금주명: 재즈묘묘</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col2">
                <div className="total">
                  <h3>최종 결제 금액</h3>
                  <div className="calc">
                    <div className="row row1">
                      <span className="field">주문 금액</span>
                      <div className="num">
                        {cartPrice.subTotal.toLocaleString("ko-KR")}
                        <span>원</span>
                      </div>
                    </div>
                    <div className="row row2">
                      <span className="field">할인 금액</span>
                      <div className="num">
                        {cartPrice.discountTotal.toLocaleString("ko-KR")}
                        <span>원</span>
                      </div>
                    </div>
                    <div className="row row3">
                      <span className="field">배송비</span>
                      <div className="num">
                        {cartPrice.shipping.toLocaleString("ko-KR")}
                        <span>원</span>
                      </div>
                    </div>
                  </div>
                  <div className="total-recipt">
                    <p className="field">결제 금액</p>
                    <p className="key">
                      {cartPrice.total.toLocaleString("ko-KR")}
                      <span>원</span>
                    </p>
                  </div>
                  <p className="describe">
                    50,000원 이상 구매 시 무료배송 됩니다
                  </p>
                </div>
                <div className="agree">
                  <h4>주문 내역 및 결제 내역을 확인했습니다.</h4>
                  <div className="term">
                    <div className="row row1">
                      <input
                        type="checkbox"
                        name="allChkTerm"
                        id="allChkTerm"
                      />
                      <label htmlFor="allChkTerm">전체동의</label>
                    </div>
                    <div className="row row2">
                      <input type="checkbox" name="agree1" id="agree1" />
                      <label htmlFor="agree1">
                        결제 개인정보 수집 및 이용 동의 (필수)
                      </label>
                    </div>
                    <div className="row row3">
                      <input type="checkbox" name="agree2" id="agree2" />
                      <label htmlFor="agree2">
                        결제 개인정보 제3자 제공 동의 (필수)
                      </label>
                    </div>
                    <div className="row row4">
                      <input type="checkbox" name="agree3" id="agree3" />
                      <label htmlFor="agree3">
                        배송에 대한 개인정보 수집 및 이용 동의 (필수)
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit">결제하기</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
