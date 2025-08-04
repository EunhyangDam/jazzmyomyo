import React, { useState, useEffect } from "react";
import "./scss/Sub02Shop.scss";
import { Link, useSearchParams } from "react-router-dom";

function Sub02Shop(props) {
  const [state, setState] = useState({
    product: [],
  });

  const [필터상품, set필터상품] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const 필터링 = (카테고리) => {
    if (카테고리 === "전체") {
      set필터상품(state.product); // 전체 보기
    } else {
      const 결과 = state.product.filter((item) => item.상품분류 === 카테고리);
      set필터상품(결과); // 해당 카테고리만 보기
    }
  };

  useEffect(() => {
    if (state.product.length > 0) {
      if (category) {
        const 결과 = state.product.filter((item) => item.상품분류 === category);
        set필터상품(결과);
      } else {
        set필터상품(state.product);
      }
    }
  }, [category, state.product]);

  useEffect(() => {
    fetch("/json/product.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setState({
          product: data.product,
        });
        set필터상품(data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!state.product || state.product.length < 24) return <div>Loading…</div>;
  return (
    <div id="sub02Shop">
      <div id="wrap">
        <div className="title">
          <a href="/Shop">
            <h2>shop</h2>
          </a>
        </div>
        <div className="content">
          <div className="category-name">
            <ul>
              <li>
                <button onClick={() => 필터링("굿즈")}>
                  <span>굿즈</span>
                </button>
              </li>
              <li>
                <button onClick={() => 필터링("음반")}>
                  <span>음반/LP</span>
                </button>
              </li>
            </ul>
          </div>
          <ul className="item">
            {필터상품.map((item, idx) => (
              <li
                className={`item${idx + 1}`}
                key={item.상품명}
                data-key={item.상품명}
              >
                <div className="gap">
                  <Link to={`/ShopDetail`}>
                    <img
                      src={
                        item.이미지.length > 1 ? item.이미지[0] : item.이미지
                      }
                      alt={item.상품명}
                    />
                  </Link>
                  <div className="wish-list">
                    <a href="!#" title="Wishlist">
                      <i className="bi bi-suit-heart"></i>
                    </a>
                  </div>
                </div>
                <div className="caption-box">
                  <Link to={`/ShopDetail`}>
                    {item.상품명.includes("-") ? (
                      <>
                        <span>{item.상품명.split("-")[1]}</span>
                        <br />
                        <em>{item.상품명.split("-")[0]}</em>
                      </>
                    ) : (
                      <span>{item.상품명.split("-")[0]}</span>
                    )}
                  </Link>

                  <strong>
                    {item.가격.length > 1
                      ? `${Math.min(...item.가격).toLocaleString(
                          "ko-KR"
                        )} - ${Math.max(...item.가격).toLocaleString(
                          "ko-KR"
                        )}원`
                      : `${item.가격.toLocaleString("ko-KR")}원`}
                  </strong>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sub02Shop;
