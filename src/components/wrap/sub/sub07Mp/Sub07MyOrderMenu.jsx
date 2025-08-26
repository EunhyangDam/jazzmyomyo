import React, { useState, useEffect } from "react";
import "./scss/Sub07MyPreorderMenu.scss";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import SiteMapComponent from "../../custom/SiteMapComponent";
import { useSelector } from "react-redux";
import axios from "axios";
import useCustomA from "../../custom/useCustomA";

function Sub07MyOrderMenu() {
  const { onClickA } = useCustomA();

  const [state, setState] = useState({
    isOpen: false,
    주문목록: [],
    selectedOrder: null,
  });

  const userId = useSelector((s) => s.signIn.아이디);

  useEffect(() => {
    if (!userId) {
      setState((prev) => ({ ...prev, 주문목록: [] }));
      return;
    }

    const fd = new FormData();
    fd.append("userId", userId);

    axios
      .post("/jazzmyomyo/my_preorder_table_select.php", fd)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        list.sort((a, b) => {
          const aT = new Date(a.wDate || a.reserveDate || 0).getTime();
          const bT = new Date(b.wDate || b.reserveDate || 0).getTime();
          return bT - aT;
        });
        setState((prev) => ({ ...prev, 주문목록: list }));
      })
      .catch(() => setState((prev) => ({ ...prev, 주문목록: [] })));
  }, [userId]);

  const onClickViewDetail = (e, item) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isOpen: true, selectedOrder: item }));
  };

  const onClickCloseBtn = (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div id="sub07MyPreorderMenu">
      <div className="container">
        <div className="title">
          <a href="/mp" onClick={(e) => onClickA(e, "/mp")}>
            <h2>My Order</h2>
          </a>
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
                <div>
                  <div className="sub-title">
                    <h3>사전주문 내역</h3>
                  </div>

                  <div className="table">
                    <div className="head-box">
                      <ul className="column-box">
                        <li className="col col1"><h3>주문일자</h3></li>
                        <li className="col col2"><h3>예약내용</h3></li>
                        <li className="col col3"><h3>확정 여부</h3></li>
                        <li className="col col4"><h3>상세보기</h3></li>
                      </ul>
                    </div>

                    <div className="list-box">
                      <ul>
                        {state.주문목록.length > 0 ? (
                          state.주문목록.map((item, idx) => (
                            <li key={item.idx ?? idx} data-key={item.idx}>
                              <ul className="column-box">
                                <li className="col col1">
                                  <h3>{String(item.wDate || item.reserveDate).slice(0, 10)}</h3>
                                </li>
                                <li className="col col2">
                                  <h3>
                                    {item.title}{" "}
                                    <span className="reserve-date">
                                      ({String(item.reserveDate).slice(0, 10)} {item.reserve_time})
                                    </span>
                                  </h3>
                                </li>
                                <li className="col col3">
                                  <em>{item.status}</em>
                                </li>
                                <li className="col col4">
                                  <button onClick={(e) => onClickViewDetail(e, item)}>상세보기</button>
                                </li>
                              </ul>
                            </li>
                          ))
                        ) : (
                          <li>
                            <p>신청 내역이 없습니다.</p>
                          </li>
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

      {state.isOpen && state.selectedOrder && (
        <div className="modal">
          <div className="modal-box">
            <div className="modal-container">
              <div className="title">
                <h2>주문 내역 상세보기</h2>
                <button onClick={onClickCloseBtn}>
                  <i className="bi bi-x-square"></i>
                </button>
              </div>

              <div className="content">
                <ul className="list-box">
                  <li className="row1 order-date">
                    <p>{String(state.selectedOrder.wDate || state.selectedOrder.orderDate).slice(0, 10)}</p>
                    <em>주문</em>
                  </li>
                  <li className="order-status">
                    <em>{state.selectedOrder.status}</em>
                  </li>
                  <li className="row2">
                    <p className="sub-name">주문상품 : </p>
                    <p>{state.selectedOrder.title}</p>
                  </li>
                  <li className="name">
                    <p>예약자 : {state.selectedOrder.writer_name}</p>
                  </li>
                  <li className="row7">
                    <p>예약일자 : {String(state.selectedOrder.reserveDate).slice(0, 10)}</p>
                  </li>
                  <li className="row7">
                    <p>예약시간 : {state.selectedOrder.reserve_time}</p>
                  </li>
                  <li className="row7">
                    <p>예약상태 : {state.selectedOrder.status}</p>
                  </li>
                  <li className="row7">
                    <p>인원 : {state.selectedOrder.people}</p>
                  </li>
                  <li className="row7">
                    <p>와인 : {state.selectedOrder.wine}</p>
                  </li>
                  <li className="row7">
                    <p>음료 : {state.selectedOrder.beverage}</p>
                  </li>
                  <li className="row7">
                    <p>안주 : {state.selectedOrder.food}</p>
                  </li>
                  <li className="row7">
                    <p>메모 : {state.selectedOrder.note}</p>
                  </li>
                  <li className="row7">
                    <p>결제방식 : {state.selectedOrder.payMethod || "무통장입금"}</p>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sub07MyOrderMenu;
