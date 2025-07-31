import React, { useState, useEffect } from "react";
import "./scss/Section7Component.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { wishAction } from "../../../store/wishlist";

export default function Section7Component(props) {
  const [state, setState] = useState({
    product: [],
  });
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.위시리스트);
  useEffect(() => {
    fetch("/json/product.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setState({
          product: data.product,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const clickWishlist = (e, data) => {
    e.preventDefault();
    let arr = [];
    if (localStorage.getItem("위시리스트") !== null) {
      arr = JSON.parse(localStorage.getItem("위시리스트"));
    }
    if (arr.some((el) => el.id === data.id)) return;
    arr = [data, ...arr];
    dispatch(wishAction(arr));
  };
  if (!state.product || state.product.length < 24) return <div>Loading…</div>;
  return (
    <div id="Section7Component">
      <section id="section7" className="shop">
        <div className="container">
          <div className="title">
            <div className="line"></div>
            <Link to="/sub02Shop">
              <h2>shop</h2>
            </Link>
            <div className="line"></div>
          </div>
          <div className="content">
            <div className="left">
              <div className="best">
                <div className="myo">
                  <img
                    src="./img/section7/myomyopick_notail.png"
                    alt="묘묘픽"
                  />
                </div>
                <div className="pick">
                  <div className="gap">
                    <Link to="./Sub02Merch03">
                      <img
                        src={state.product[3].이미지[1]}
                        alt={state.product[3].상품명}
                      />
                    </Link>
                    <div className="wish-list">
                      <Link
                        to="/Wishlist"
                        title="Wishlist"
                        onClick={(e) => clickWishlist(e, state.product[3])}
                      >
                        {wishlist.some(
                          (el) => el.id === state.product[3].id
                        ) ? (
                          <i className="bi bi-suit-heart-fill"></i>
                        ) : (
                          <i className="bi bi-suit-heart"></i>
                        )}
                      </Link>
                    </div>
                  </div>
                  <div className="caption-box">
                    <h3>Best Seller</h3>
                    <a href="!#">{state.product[3].상품명}</a>
                    <s>{state.product[3].가격.toLocaleString("ko-KR")}원</s>
                    <br />
                    <em>
                      {(
                        state.product[3].가격 *
                        (1 - state.product[3].할인율)
                      ).toLocaleString("ko-KR")}
                      원
                    </em>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <ul className="item">
                <li className="item1">
                  <div className="gap">
                    <a href="!#">
                      <img src={state.product[23].이미지[0]} alt="카펜터스" />
                    </a>
                    <div className="wish-list">
                      <a
                        href="!#"
                        title="Wishlist"
                        onClick={(e) => clickWishlist(e, state.product[23])}
                      >
                        {wishlist.some(
                          (el) => el.id === state.product[23].id
                        ) ? (
                          <i className="bi bi-suit-heart-fill"></i>
                        ) : (
                          <i className="bi bi-suit-heart"></i>
                        )}
                      </a>
                    </div>
                  </div>
                  <div className="caption-box">
                    <a href="!#">
                      {state.product[23].상품명.split("-")[0]}
                      <br />
                      {state.product[23].상품명.split("-")[1]}
                    </a>
                    <strong>
                      {state.product[23].가격.toLocaleString("ko-KR")}원
                    </strong>
                  </div>
                </li>
                <li className="item2">
                  <div className="gap">
                    <a href="!#">
                      <img src={state.product[12].이미지[0]} alt="잭킹콩" />
                    </a>
                    <div className="wish-list">
                      <a
                        href="!#"
                        title="Wishlist"
                        onClick={(e) => clickWishlist(e, state.product[12])}
                      >
                        {wishlist.some(
                          (el) => el.id === state.product[12].id
                        ) ? (
                          <i className="bi bi-suit-heart-fill"></i>
                        ) : (
                          <i className="bi bi-suit-heart"></i>
                        )}
                      </a>
                    </div>
                  </div>
                  <div className="caption-box">
                    <a href="!#">
                      {state.product[12].상품명.split("-")[0]}
                      <br />
                      {state.product[12].상품명.split("-")[1]}
                    </a>
                    <strong>
                      {state.product[12].가격.toLocaleString("ko-KR")}원
                    </strong>
                  </div>
                </li>
                <li className="item3">
                  <div className="gap">
                    <a href="!#">
                      <img src={state.product[1].이미지[0]} alt="코스터" />
                    </a>
                    <div className="wish-list">
                      <a
                        href="!#"
                        title="Wishlist"
                        onClick={(e) => clickWishlist(e, state.product[1])}
                      >
                        {wishlist.some(
                          (el) => el.id === state.product[1].id
                        ) ? (
                          <i className="bi bi-suit-heart-fill"></i>
                        ) : (
                          <i className="bi bi-suit-heart"></i>
                        )}
                      </a>
                    </div>
                  </div>
                  <div className="caption-box">
                    <a href="!#">{state.product[1].상품명}</a>
                    <strong>
                      {state.product[1].가격.toLocaleString("ko-KR")}원
                    </strong>
                  </div>
                </li>
                <li className="item4">
                  <div className="gap">
                    <a href="!#">
                      <img src={state.product[5].이미지[0]} alt="라이터" />
                    </a>
                    <div className="wish-list">
                      <a
                        href="!#"
                        title="Wishlist"
                        onClick={(e) => clickWishlist(e, state.product[5])}
                      >
                        {wishlist.some(
                          (el) => el.id === state.product[5].id
                        ) ? (
                          <i className="bi bi-suit-heart-fill"></i>
                        ) : (
                          <i className="bi bi-suit-heart"></i>
                        )}
                      </a>
                    </div>
                  </div>
                  <div className="caption-box">
                    <a href="!#">{state.product[5].상품명}</a>
                    <strong>
                      {state.product[5].가격.toLocaleString("ko-KR")}원
                    </strong>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
