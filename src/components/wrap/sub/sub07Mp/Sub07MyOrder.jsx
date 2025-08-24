import React, { useState, useEffect } from "react";
import "./scss/Sub07MyOrder.scss";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import SiteMapComponent from "../../custom/SiteMapComponent";
import axios from "axios";
import { useSelector } from "react-redux";
import useCustomA from "../../custom/useCustomA";
function Sub07MyOrder(props) {
  const { onClickA } = useCustomA();
  const [state, setState] = useState({
    isOpen: false,
    주문목록: [],
    selectedOrder: null,
  });

  const userId = useSelector((state) => state.signIn.아이디);
  const orderTextMap = {
    MD: {
      title: "주문내역 상세보기",
      label: "주문",
      quantity: "주문수량",
    },
    TK: {
      title: "예매내역 상세보기",
      label: "예매",
      quantity: "매수",
    },
    MENU: {
      title: "예약내역 상세보기",
      label: "예약",
      quantity: "",
    },
    RENTAL: {
      title: "신청내역 상세보기",
      label: "신청",
      quantity: "",
    },
  };

  React.useEffect(() => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("orderType", "");

    axios({
      url: "/jazzmyomyo/order_table_select.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data !== 0) {
            setState({
              ...state,
              주문목록: res.data,
            });
          } else {
            console.log("주문내역이 없습니다");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const onClickViewDetail = (e, item) => {
    e.preventDefault();

    setState({
      ...state,
      isOpen: true,
      selectedOrder: item,
    });
  };

  const onClickCloseBtn = (e) => {
    e.preventDefault();
    setState({
      ...state,
      isOpen: false,
    });
  };

  return (
    <div id="sub07MyOrder">
      <div className="container">
        <div className="title">
          <a href="!#" onClick={(e) => onClickA(e, "/myOrder")}>
            <h2>My Order</h2>
          </a>
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
                        {Array.isArray(state.주문목록) &&
                        state.주문목록.length > 0 ? (
                          state.주문목록
                            .filter((item) => item.orderType === "MD")
                            .map((item) => (
                              <li key={item.idx} data-key={item.idx}>
                                <ul className="column-box">
                                  <li className="col col1">
                                    <h3>
                                      {String(item.orderDate).slice(0, 10)}
                                    </h3>
                                  </li>
                                  <li className="col col2">
                                    <h3>{item.productName}</h3>
                                  </li>
                                  <li className="col col3">
                                    <em>
                                      {item.orderStatus === "주문취소"
                                        ? 0
                                        : Number(item.price).toLocaleString(
                                            "ko-KR"
                                          )}
                                      원
                                    </em>
                                  </li>
                                  <li className="col col4">
                                    <button
                                      onClick={(e) =>
                                        onClickViewDetail(e, item)
                                      }
                                    >
                                      상세보기
                                    </button>
                                  </li>
                                </ul>
                              </li>
                            ))
                        ) : (
                          <li className="empty">주문 내역이 없습니다.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
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
                        {Array.isArray(state.주문목록) &&
                        state.주문목록.length > 0 ? (
                          state.주문목록
                            .filter((item) => item.orderType === "TK")
                            .map((item) => (
                              <li key={item.idx} data-key={item.idx}>
                                <ul className="column-box">
                                  <li className="col col1">
                                    <h3>
                                      {String(item.orderDate).slice(0, 10)}
                                    </h3>
                                  </li>
                                  <li className="col col2">
                                    <h3>{item.productName}</h3>
                                  </li>
                                  <li className="col col3">
                                    <em>{item.quantity}</em>
                                  </li>
                                  <li className="col col4">
                                    <button
                                      onClick={(e) =>
                                        onClickViewDetail(e, item)
                                      }
                                    >
                                      상세보기
                                    </button>
                                  </li>
                                </ul>
                              </li>
                            ))
                        ) : (
                          <li className="empty">주문 내역이 없습니다.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
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
                        {Array.isArray(state.주문목록) &&
                        state.주문목록.length > 0 ? (
                          state.주문목록
                            .filter((item) => item.orderType === "MENU")
                            .map((item) => (
                              <li key={item.idx} data-key={item.idx}>
                                <ul className="column-box">
                                  <li className="col col1">
                                    <h3>
                                      {String(item.orderDate).slice(0, 10)}
                                    </h3>
                                  </li>
                                  <li className="col col2">
                                    <h3>{item.productName}</h3>
                                  </li>
                                  <li className="col col3">
                                    <em>{item.orderStatus}</em>
                                  </li>
                                  <li className="col col4">
                                    <button
                                      onClick={(e) =>
                                        onClickViewDetail(e, item)
                                      }
                                    >
                                      상세보기
                                    </button>
                                  </li>
                                </ul>
                              </li>
                            ))
                        ) : (
                          <li className="empty">신청 내역이 없습니다.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
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
                        {Array.isArray(state.주문목록) &&
                        state.주문목록.length > 0 ? (
                          state.주문목록
                            .filter((item) => item.orderType === "RENTAL")
                            .map((item) => (
                              <li key={item.idx} data-key={item.idx}>
                                <ul className="column-box">
                                  <li className="col col1">
                                    <h3>
                                      {String(item.orderDate).slice(0, 10)}
                                    </h3>
                                  </li>
                                  <li className="col col2">
                                    <h3>{item.productName}</h3>
                                  </li>
                                  <li className="col col3">
                                    <em>{item.orderStatus}</em>
                                  </li>
                                  <li className="col col4">
                                    <button
                                      onClick={(e) =>
                                        onClickViewDetail(e, item)
                                      }
                                    >
                                      상세보기
                                    </button>
                                  </li>
                                </ul>
                              </li>
                            ))
                        ) : (
                          <li className="empty">신청 내역이 없습니다.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 모달 */}

      {state.isOpen && state.selectedOrder && (
        <div className="modal">
          <div className="modal-box">
            <div className="modal-container">
              <div className="title">
                <h2>{orderTextMap[state.selectedOrder.orderType].title}</h2>
                <button onClick={onClickCloseBtn}>
                  <i className="bi bi-x-square"></i>
                </button>
              </div>
              <div className="content">
                <ul className="list-box">
                  <li className="row1 order-date">
                    <p>{state.selectedOrder.orderDate.slice(0, 10)}</p>
                    <em>{orderTextMap[state.selectedOrder.orderType].label}</em>
                  </li>
                  <li className="order-status">
                    <em>{state.selectedOrder.orderStatus}</em>
                  </li>
                  <li className="row2">
                    <p className="sub-name">주문상품 : </p>
                    <p>{state.selectedOrder.productName}</p>
                  </li>
                  {state.selectedOrder.quantity && (
                    <li className="row3">
                      <p className="sub-name">
                        {orderTextMap[state.selectedOrder.orderType].quantity} :{" "}
                      </p>
                      <p>{state.selectedOrder.quantity}</p>
                    </li>
                  )}
                  <li className="price">
                    <p className="sub-name">결제 금액 : </p>
                    <p>
                      {state.selectedOrder.orderStatus === "주문취소"
                        ? 0
                        : Number(state.selectedOrder.price).toLocaleString(
                            "ko-KR"
                          )}
                      <span>원</span>
                    </p>
                  </li>
                  <li className="payment">
                    <p className="sub-name">결제수단 :</p>
                    <p>{state.selectedOrder.payMethod}</p>
                  </li>

                  <li className="name">
                    <p>{state.selectedOrder.userName}</p>
                  </li>
                  <li className="row7">
                    <p>{state.selectedOrder.userHp}</p>
                  </li>
                  {state.selectedOrder.shippingAddress && (
                    <li className="row8">
                      <p>{state.selectedOrder.shippingAddress}</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sub07MyOrder;
