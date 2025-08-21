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
    검색: "",
  });
  let [필터상품, set필터상품] = useState([]);
  let [필터상품2, set필터상품2] = useState([]); // 신상품, 품절 정렬용
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
    fetch("./json/product.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setState({
          product: data.product,
        });
        set필터상품(data.product);
        set필터상품2(data.product);
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

  // 검색버튼
  // 폼제출 이벤트
  const onSubmitSearch = (e) => {
    e.preventDefault(); // 화면 이동 방지

    if (state.검색 === "") {
      set필터상품(state.product);
      setState({
        ...state,
        검색: "",
      });
    } else if (state.검색 !== "") {
      let 검색상품 = state.product;

      검색상품 = [
        ...검색상품.filter(
          (item) =>
            item.설명.includes(state.검색) ||
            item.상품명.includes(state.검색) ||
            item.상품분류.includes(state.검색)
        ),
      ];

      set필터상품(검색상품);
    }
  };

  const onChangeSearchText = (e) => {
    setState({
      ...state,
      검색: e.target.value,
    });
  };

  // 상품 정렬

  // 신상품 & 품절
  const onClickNewItem = (e) => {
    e.preventDefault();

    필터상품 = [...필터상품2.filter((item) => item.신상품 === true)];

    set필터상품(필터상품);
  };

  const onClickSoldOut = (e) => {
    e.preventDefault();

    필터상품 = [...필터상품2.filter((item) => item.품절 === true)];

    set필터상품(필터상품);
  };

  // 가격 정렬
  const onClickHighPrice = (e) => {
    e.preventDefault();

    필터상품 = [...필터상품].sort((a, b) => b.정가 - a.정가);

    set필터상품(필터상품);
  };
  const onClickLowPrice = (e) => {
    e.preventDefault();
    필터상품 = [...필터상품].sort((a, b) => a.정가 - b.정가);

    set필터상품(필터상품);
  };

  if (!state.product || state.product.length < 24) return <div>Loading…</div>;
  return (
    <div id="sub02Shop">
      <div id="wrap">
        <div className="title">
          <Link to="/shop">
            <h2>shop</h2>
          </Link>
        </div>
        <div className="content">
          <div className="category-name">
            <ul>
              <li>
                <NavLink to="/shop?category=굿즈">
                  <span>굿즈</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop?category=음반">
                  <span>음반/LP</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="search-box">
            <form onSubmit={onSubmitSearch}>
              <input
                type="text"
                name="search"
                id="search"
                value={state.검색}
                placeholder="검색어를 입력하세요"
                onChange={onChangeSearchText}
              />
              <button type="submit">검색</button>
            </form>
          </div>
          <div className="filtering">
            <button onClick={onClickNewItem}>신상품</button>
            <i>|</i>
            <button onClick={onClickHighPrice}>높은 가격순</button>
            <i>|</i>
            <button onClick={onClickLowPrice}>낮은 가격순</button>
            <i>|</i>
            <button onClick={onClickSoldOut}>품절상품</button>
          </div>
          <ul className="item">
            {필터상품.map((item, idx) => (
              <li
                className={`item${idx + 1}`}
                key={item.상품명}
                data-key={item.상품명}
              >
                <div className="gap">
                  <Link to="/shopDetail" state={item}>
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
                  <Link to="/shopDetail" state={item}>
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
