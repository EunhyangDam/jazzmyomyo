import React, { useState, useEffect } from "react";
import "./scss/Sub02Shop.scss";
import { Link } from "react-router-dom";

function Sub02Shop(props) {
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
    <div id="sub02Shop">
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
                <Link to="/car">
                  <span>굿즈</span>
                </Link>
              </li>
              <li>
                <Link to="/car">
                  <span>음반/LP</span>
                </Link>
              </li>
            </ul>
          </div>
          <ul className="item">
            {state.product.map((item, idx) => (
              <li
                className={`item${idx + 1}`}
                key={item.상품명}
                data-key={item.상품명}
              >
                <div className="gap">
                  <Link to={`/sub02Merch${String(idx + 1).padStart(2, "0")}`}>
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
                  <Link to={`/sub02Merch${String(idx + 1).padStart(2, "0")}`}>
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
