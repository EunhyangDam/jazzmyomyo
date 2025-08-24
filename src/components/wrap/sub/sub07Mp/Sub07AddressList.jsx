import React, { useEffect, useState } from "react";
import "./scss/Sub07AddressList.scss";
import { useNavigate } from "react-router-dom";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import SiteMapComponent from "../../custom/SiteMapComponent";
import useCustomA from "../../custom/useCustomA";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";

function Sub07AddressList(props) {
  const { onClickA } = useCustomA();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    배송지: [],
    selectedAddress: null,
  });

  const userId = useSelector((state) => state.signIn.아이디);

  React.useEffect(() => {
    const formData = new FormData();
    formData.append("userId", userId);

    axios({
      url: "/jazzmyomyo/delivery_table_select.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data !== 0) {
            setState({
              ...state,
              배송지: res.data,
            });
          } else {
            console.log("저장된 배송지가 없습니다");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const onClickEdit = (e, item) => {
    e.preventDefault();
    setState({
      ...state,
      selectedAddress: item,
    });

    navigate("/addressListEdit", { state: { address: item } });
  };

  const onClickDelete = (e, item) => {
    setState({
      ...state,
      selectedAddress: item,
    });

    const formData = new FormData();
    formData.append("idx", item.idx);

    axios({
      url: "/jazzmyomyo/delivery_table_delete.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data !== 0) {
            let obj = {
              heading: "배송지가 삭제되었습니다.",
              explain: "",
              isON: true,
              isConfirm: false,
            };
            dispatch(confirmModalAction(obj));

            setState({
              ...state,
              배송지: state.배송지.filter((item2) => item2.idx !== item.idx),
            });
          } else {
            console.log("삭제 실패");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("axios실패");
      });
  };

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
          <a href="/!#" onClick={(e) => onClickA(e, "/mp")}>
            <h2>My Page</h2>
          </a>
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
                {state.배송지.slice(0, 3).map((item) => (
                  <li key={item.idx} data-key={item.idx}>
                    <div className="gap">
                      {item.deliveryDefault === "1" && (
                        <div className="row1">
                          <span>기본배송지</span>
                        </div>
                      )}

                      <div className="row2">
                        <div className="memo">
                          <em>{item.memo}</em>
                        </div>
                        <div className="button-box">
                          <button onClick={(e) => onClickEdit(e, item)}>
                            수정
                          </button>
                          <button onClick={(e) => onClickDelete(e, item)}>
                            삭제
                          </button>
                        </div>
                      </div>
                      <div className="row3">
                        <p>
                          <span> {item.recipient} </span>
                          <i>|</i> {item.deliveryHp}
                        </p>
                      </div>
                      <div className="row4">
                        <em>{`${item.deliveryaddress1} ${item.deliveryaddress2}(${item.zipCode})`}</em>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="foot">
              <a href="./" onClick={(e) => onClickA(e, "/addressListCreate")}>
                배송지 추가
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07AddressList;
