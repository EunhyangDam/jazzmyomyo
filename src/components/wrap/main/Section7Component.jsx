import React, { useState, useEffect, forwardRef } from "react";
import "./scss/Section7Component.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { wishAction } from "../../../store/wishlist";
import useCustomA from "../custom/useCustomA";

const Section7Component = forwardRef((props, ref) => {
  const { onClickA } = useCustomA();
  const [state, setState] = useState({
    product: [],
  });
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("./json/product.json", { method: "GET" })
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
    <div id="Section7Component" ref={ref}>
      <section id="section7" className="shop">
        <div className="container">
          <div className="title">
            <div className="line"></div>
            <a href="!#" onClick={(e) => onClickA(e, "/shop")}>
              <h2>shop</h2>
            </a>
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
                    <Link to="ShopDetail" state={state.product[3]}>
                      <img
                        src={state.product[3].이미지[1]}
                        alt={state.product[3].상품명}
                      />
                    </Link>
                    <div className="wish-list">
                      <a
                        href="!#"
                        title="Wishlist"
                        onClick={(e) => clickWishlist(e, state.product[3])}
                      >
                        <i className="bi bi-suit-heart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="caption-box">
                    <h3>Best Seller</h3>
                    <Link to="/ShopDetail" state={state.product[3]}>
                      {state.product[3].상품명}
                    </Link>
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
                    <Link to="/ShopDetail" state={state.product[23]}>
                      <img src={state.product[23].이미지[0]} alt="카펜터스" />
                    </Link>
                    <div className="wish-list">
                      <a
                        href="!#"
                        title="Wishlist"
                        onClick={(e) => clickWishlist(e, state.product[23])}
                      >
                        <i className="bi bi-suit-heart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="caption-box">
                    <Link to="/ShopDetail" state={state.product[23]}>
                      {state.product[23].상품명.split("-")[0]}
                      <br />
                      {state.product[23].상품명.split("-")[1]}
                    </Link>
                    <strong>
                      {state.product[23].가격.toLocaleString("ko-KR")}원
                    </strong>
                  </div>
                </li>
                <li className="item2">
                  <div className="gap">
                    <Link to="/ShopDetail" state={state.product[12]}>
                      <img src={state.product[12].이미지[0]} alt="잭킹콩" />
                    </Link>
                    <div className="wish-list">
                      <a
                        href="!#"
                        title="Wishlist"
                        onClick={(e) => clickWishlist(e, state.product[12])}
                      >
                        <i className="bi bi-suit-heart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="caption-box">
                    <Link to="/ShopDetail" state={state.product[12]}>
                      {state.product[12].상품명.split("-")[0]}
                      <br />
                      {state.product[12].상품명.split("-")[1]}
                    </Link>
                    <strong>
                      {state.product[12].가격.toLocaleString("ko-KR")}원
                    </strong>
                  </div>
                </li>
                <li className="item3">
                  <div className="gap">
                    <Link to="/ShopDetail" state={state.product[1]}>
                      <img src={state.product[1].이미지[0]} alt="코스터" />
                    </Link>
                    <div className="wish-list">
                      <a
                        href="!#"
                        title="Wishlist"
                        onClick={(e) => clickWishlist(e, state.product[1])}
                      >
                        <i className="bi bi-suit-heart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="caption-box">
                    <Link to="/ShopDetail" state={state.product[1]}>
                      {state.product[1].상품명}
                    </Link>
                    <strong>
                      {state.product[1].가격.toLocaleString("ko-KR")}원
                    </strong>
                  </div>
                </li>
                <li className="item4">
                  <div className="gap">
                    <Link to="/ShopDetail" state={state.product[5]}>
                      <img src={state.product[5].이미지[0]} alt="라이터" />
                    </Link>
                    <div className="wish-list">
                      <a
                        href="!#"
                        title="Wishlist"
                        onClick={(e) => clickWishlist(e, state.product[5])}
                      >
                        <i className="bi bi-suit-heart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="caption-box">
                    <Link to="/ShopDetail" state={state.product[5]}>
                      {state.product[5].상품명}
                    </Link>
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
});
export default Section7Component;
