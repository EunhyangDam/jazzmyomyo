import React, { useState, useEffect } from "react";
import "./scss/Sub02Shop.scss";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { wishAction } from "../../../../store/wishlist";

function Sub02Shop(props) {
  const dispatch = useDispatch();
  const wishlistAsset = useSelector((state) => state.wishlist.위시리스트);
  const [state, setState] = useState({
    product: [],
  });
  const [필터상품, set필터상품] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

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

  const clickWishlist = (e, data) => {
    e.preventDefault();
    let arr = wishlistAsset;
    if (arr.some((el) => el.id === data.id)) {
      arr = arr.filter((el) => el.id !== data.id);
    } else {
      arr = [data, ...arr];
    }
    dispatch(wishAction(arr));
  };

  if (!state.product || state.product.length < 24) return <div>Loading…</div>;
  return (
    <div id="sub02Shop">
      <div id="wrap">
        <div className="title">
          <Link to="/Shop">
            <h2>shop</h2>
          </Link>
        </div>
        <div className="content">
          <div className="category-name">
            <ul>
              <li>
                <NavLink to="/Shop?category=굿즈">
                  <span>굿즈</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/Shop?category=음반">
                  <span>음반/LP</span>
                </NavLink>
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
                  <Link to="/ShopDetail" state={item}>
                    <img
                      src={
                        item.이미지.length > 1 ? item.이미지[0] : item.이미지
                      }
                      alt={item.상품명}
                    />
                  </Link>
                  <div className="wish-list">
                    <a
                      href="!#"
                      title="Wishlist"
                      onClick={(e) => clickWishlist(e, item)}
                    >
                      <i
                        className={`bi bi-suit-heart${
                          wishlistAsset.map((el) => el.id).includes(item.id)
                            ? "-fill"
                            : ""
                        }`}
                      ></i>
                    </a>
                  </div>
                </div>
                <div className="caption-box">
                  <Link to="/ShopDetail" state={item}>
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
