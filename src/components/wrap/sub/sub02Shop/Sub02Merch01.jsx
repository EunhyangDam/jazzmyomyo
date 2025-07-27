import React, { useState, useEffect } from "react";
import "./scss/Sub02Merch01.scss";
import { Link } from "react-router-dom";

function Sub02Merch01(props) {
  const [state, setState] = useState({
    product: [],
  });

  const [qty, setQty] = useState(1);

  const increase = () => setQty((prev) => prev + 1);
  const decrease = () => setQty((prev) => Math.max(1, prev - 1));

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
    <div id="sub02Merch01">
      <div id="wrap">
        <div className="title">
          <div className="line"></div>
          <Link to="/sub02Shop">
            <h2>shop</h2>
          </Link>
          <div className="line"></div>
        </div>
        <div className="content">
          <div className="category-name">
            <ul>
              <li>
                <a href="!#">
                  <span>굿즈</span>
                </a>
              </li>
              <li>
                <a href="!#">
                  <span>음반/LP</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="detail">
            <div className="top">
              <div className="left">
                <div className="img-box">
                  <div className="gap">
                    <img src={state.product[0].이미지[0]} alt="상품이미지" />
                  </div>
                </div>
              </div>
              <div className="right">
                <ul>
                  <li className="item-name">
                    <h2>{state.product[0].상품명}</h2>
                  </li>
                  <li className="item-price">
                    <em>{state.product[0].가격.toLocaleString("ko-KR")}원</em>
                  </li>
                  <li className="item-quantity">
                    <p>수량</p>
                    <div className="quantity-selector">
                      <button type="button" onClick={decrease}>
                        <i class="bi bi-dash"></i>
                      </button>
                      <input
                        type="number"
                        value={qty}
                        onChange={(e) =>
                          setQty(Math.max(1, Number(e.target.value)))
                        }
                        min="1"
                      />
                      <button type="button" onClick={increase}>
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                  </li>
                  <li className="cart-wish">
                    <div className="add-cart">
                      <a href="!#">장바구니에 추가</a>
                    </div>
                    <div className="add-wish">
                      <a href="!#" title="Wishlist">
                        <i className="bi bi-suit-heart"></i>
                      </a>
                    </div>
                  </li>
                  <li className="buy-now">
                    <a href="!#">바로 구매하기</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bottom">
              <h3>제품 설명</h3>
              <p>{state.product[0].상품명}</p>
              <p>{state.product[0].상품분류}</p>
              <p>{state.product[0].설명}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub02Merch01;
