import React, { useState } from "react";
import "./scss/Sub07Mp.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SiteMapComponent from "../../custom/SiteMapComponent";

function Sub07Mp(props) {
  const cartAsset = useSelector((state) => state.cart.cart);
  const wishAsset = useSelector((state) => state.wishlist.위시리스트);
  const [isOn, setIsOn] = useState(false);
  const onClickProfile = (e) => {
    setIsOn((prev) => !prev);
  };

  return (
    <div id="sub07Mp">
      <div className="container">
        <SiteMapComponent firstLink="/Mp" fisrtName="마이페이지" />
        <div className="title">
          <Link to="/Mp">
            <h2>My Page</h2>
          </Link>
        </div>
        <div className="content">
          <div className="row1">
            <div className="left">
              <div
                className={`profile-front${isOn ? " on" : ""}`}
                onClick={onClickProfile}
                title="🐾">
                <p>MEMBER</p>
                <p>김묘묘</p>
              </div>
              <div
                className={`profile-back${isOn ? " on" : ""}`}
                onClick={onClickProfile}
                title="🐾"></div>
            </div>
            <div className="right">
              <ul>
                <li className="col1">
                  <h2>예매 내역</h2>
                  <Link to="/MyOrder">
                    <p>3</p>
                  </Link>
                </li>
                <li className="col2">
                  <h2>위시리스트</h2>
                  <Link to="/Wishlist">
                    <p>{wishAsset.length || "0"}</p>
                  </Link>
                </li>
                <li className="col3">
                  <h2>장바구니</h2>
                  <Link to="/Cart">
                    <p>{cartAsset.length || "0"}</p>
                  </Link>
                </li>
                <li className="col4">
                  <h2>주문/배송</h2>
                  <Link to="/MyOrder">
                    <p>1</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="row2">
            <ul>
              <li>
                <h3>계정관리</h3>
                <Link to="/MyProfile">회원정보 확인</Link>
                <Link to="/EditProfile">회원정보 수정</Link>
                <Link to="/AddressList">배송지 관리</Link>
                <Link to="/DeleteAccount">회원 탈퇴</Link>
              </li>
              <li>
                <h3>이용내역</h3>
                <Link to="/MyOrder">티켓예매 내역</Link>
                <Link to="/MyOrder">사전주문 내역</Link>
                <Link to="/MyOrder">주문/ 배송조회</Link>
                <Link to="/MyOrder">대관신청 내역</Link>
              </li>
              <li>
                <h3>게시판</h3>
                <Link to="/Ntc">공지사항</Link>
                <Link to="/Faq">FAQ</Link>
                <Link to="/Rev">후기 작성</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07Mp;
