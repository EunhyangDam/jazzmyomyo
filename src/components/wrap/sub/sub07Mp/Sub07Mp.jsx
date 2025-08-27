import React, { useEffect, useState } from "react";
import "./scss/Sub07Mp.scss";
import { useSelector } from "react-redux";
import SiteMapComponent from "../../custom/SiteMapComponent";
import useCustomA from "../../custom/useCustomA";
import axios from "axios";

function Sub07Mp(props) {
  const { onClickA } = useCustomA();
  const cartAsset = useSelector((state) => state.cart.cart);
  const wishAsset = useSelector((state) => state.wishlist.위시리스트);
  const userID = useSelector((state) => state.signIn);
  const [isOn, setIsOn] = useState(false);
  const onClickProfile = (e) => {
    setIsOn((prev) => !prev);
  };

  useEffect(() => {}, [userID]);

  // order테이블 개수 확인
  const userId = useSelector((state) => state.signIn.아이디);
  const [state, setState] = React.useState({
    주문목록: [],
  });
  const [mdOrder, setMdOrder] = React.useState(0);
  const [tkOrder, setTkOrder] = React.useState(0);

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
            console.log("데이터가 없습니다.");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  React.useEffect(() => {
    const 예매내역 = state.주문목록.filter(
      (item) => item.orderType === "TK"
    ).length;

    setTkOrder(예매내역);

    const 주문배송내역 = state.주문목록.filter(
      (item) => item.orderType === "MD"
    ).length;

    setMdOrder(주문배송내역);
  }, [state.주문목록]);

  return (
    <div id="sub07Mp">
      <div className="container">
        <SiteMapComponent firstLink="/mp" firstName="마이페이지" />

        <div className="title">
          <a href="/!#" onClick={(e) => onClickA(e, "/mp")}>
            <h2>My Page</h2>
          </a>
        </div>
        <div className="content">
          <div className="row1">
            <div className="left">
              <div
                className={`profile-front${isOn ? " on" : ""}`}
                onClick={onClickProfile}
                title="🐾"
              >
                <p>MEMBER</p>
                <p>{userID.이름}</p>
              </div>
              <div
                className={`profile-back${isOn ? " on" : ""}`}
                onClick={onClickProfile}
                title="🐾"
              ></div>
            </div>
            <div className="right">
              <ul>
                <li className="col1">
                  <h2>예매 내역</h2>
                  <a href="!#" onClick={(e) => onClickA(e, "/myOrderTk")}>
                    <p>{tkOrder}</p>
                  </a>
                </li>
                <li className="col2">
                  <h2>위시리스트</h2>
                  <a href="!#" onClick={(e) => onClickA(e, "/wishlist")}>
                    <p>{wishAsset.length}</p>
                  </a>
                </li>
                <li className="col3">
                  <h2>장바구니</h2>
                  <a href="!#" onClick={(e) => onClickA(e, "/cart")}>
                    <p>{cartAsset.length || "0"}</p>
                  </a>
                </li>
                <li className="col4">
                  <h2>주문/배송</h2>
                  <a href="!#" onClick={(e) => onClickA(e, "/myOrderMd")}>
                    <p>{mdOrder}</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row2">
            <ul>
              <li>
                <h3>계정관리</h3>
                <a href="!#" onClick={(e) => onClickA(e, "/myProfile")}>
                  회원정보 확인
                </a>
                <a href="!#" onClick={(e) => onClickA(e, "/editProfile")}>
                  회원정보 수정
                </a>
                <a href="!#" onClick={(e) => onClickA(e, "/addressList")}>
                  배송지 관리
                </a>
                <a href="!#" onClick={(e) => onClickA(e, "/deleteAccount")}>
                  회원 탈퇴
                </a>
              </li>
              <li>
                <h3>이용내역</h3>
                <a href="!#" onClick={(e) => onClickA(e, "/myOrderMd")}>
                  주문/ 배송조회
                </a>
                <a href="!#" onClick={(e) => onClickA(e, "/myOrderTk")}>
                  예매 내역
                </a>
                <a href="!#" onClick={(e) => onClickA(e, "/myOrderMenu")}>
                  사전주문 내역
                </a>
                <a href="!#" onClick={(e) => onClickA(e, "/myOrderRental")}>
                  대관신청 내역
                </a>
              </li>
              <li>
                <h3>게시판</h3>
                <a href="!#" onClick={(e) => onClickA(e, "/ntc")}>
                  공지사항
                </a>
                <a href="!#" onClick={(e) => onClickA(e, "/faq")}>
                  FAQ
                </a>
                <a href="!#" onClick={(e) => onClickA(e, "/rev")}>
                  후기 작성
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07Mp;
