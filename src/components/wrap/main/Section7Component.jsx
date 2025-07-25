import React, { useState, useEffect } from "react";
import "./scss/Section7Component.scss";
import { Link } from "react-router-dom";

export default function Section7Component(props) {
  const [state, setState] = useState({
    product: [],
  });

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

  if (!state.product || state.product.length < 24) return <div>Loading…</div>;
  return (
    <div id="Section7Component">
      <section id="section7" className="shop">
        <div className="container">
          <div className="title">
            <div className="line"></div>
            <h2>shop</h2>
            <div className="line"></div>
          </div>
          <div className="content">
            <div className="left">
              <div className="myo">
                <img src="./img/section7/myomyopick_notail.png" alt="묘묘픽" />
              </div>
              <div className="pick">
                <div className="gap">
                  <Link to="./Sub02Merch03">
                    <img
                      src={state.product[3].이미지[1]}
                      alt={state.product[3].상품명}
                    />
                    <div className="wish-list">
                    {/* 위시리스트 컴포넌트 연결해야함 */}
                      <a href="!#" title="Wishlist">    
                        <i className="bi bi-suit-heart"></i> 
                      </a>
                  </div>
                  </Link>
                  
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
            <div className="right">
              <ul className="item">
                <li className="item1">
                  <div className="gap">
                    <a href="!#">
                      <img src={state.product[23].이미지[0]} alt="카펜터스" />
                    </a>
                    <div className="wish-list">
                      <a href="!#" title="Wishlist">  
                        <i className="bi bi-suit-heart"></i> 
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
                      <a href="!#" title="Wishlist">  
                        <i className="bi bi-suit-heart"></i> 
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
                      <a href="!#" title="Wishlist">  
                        <i className="bi bi-suit-heart"></i> 
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
                      <a href="!#" title="Wishlist">  
                        <i className="bi bi-suit-heart"></i> 
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
