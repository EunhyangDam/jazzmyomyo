import React, { useState, useEffect } from "react";
import "./scss/Sub02ShopDetail.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../../../store/cart";
import { wishAction } from "../../../../store/wishlist";
import { confirmModalAction } from "../../../../store/confirmModal";

function Sub02ShopDetail(props) {
  const location = useLocation();
  const dispatch = useDispatch();

  const wishAsset = useSelector((state) => state.wishlist.위시리스트);
  const cartAsset = useSelector((state) => state.cart.cart);

  const [state, setState] = useState({
    product: [],
  });
  const [product, setProduct] = useState({
    data: {},
  });

  /**로케이션 데이터 불러오기 */
  useEffect(() => {
    setProduct({
      data: location.state,
    });
    // eslint-disable-next-line
  }, []);
  // 배송안내 관련
  const [delivery, setDelivery] = useState({
    delivery: [],
  });

  const [openIndex, setOpenIndex] = useState(null);
  const toggleSections = [
    "교환 및 반품이 불가능한 경우",
    "반복 반품",
    "반품 방법",
    "환불",
  ];
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // + /- 버튼 클릭이벤트
  const onClickIncrementBtn = (e) => {
    e.preventDefault();
    // state.product[0].수량 = state.product[0].수량 + 1 <= 불가

    setState((prev) => ({
      ...prev,
      product: prev.product.map((item, index) =>
        index === 0 ? { ...item, 수량: item.수량 + 1 } : item
      ),
    }));
  };
  const onClickDecrementBtn = (e) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      product: prev.product.map((item, index) =>
        index === 0 ? { ...item, 수량: Math.max(1, item.수량 - 1) } : item
      ),
    }));
  };
  const onChangeNumber = () => {};

  useEffect(() => {
    fetch("./json/product.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setState((prev) => ({
          ...prev,
          product: data.product,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("/json/sub02/delivery.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setDelivery((prev) => ({
          ...prev,
          delivery: data.delivery,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const clickWishlist = (e) => {
    e.preventDefault();
    let arr = wishAsset;
    let isCliked = false;
    arr.map((el) => el.id).includes(product.data.id) && (isCliked = true);
    if (!isCliked) {
      arr = [product.data, ...arr];
    } else {
      arr = arr.filter((el) => el.id !== product.data.id);
    }
    dispatch(wishAction(arr));
  };
  const cartWish = (e) => {
    e.preventDefault();
    let arr = cartAsset;
    let isClicked = false;
    arr.map((el) => el.id).includes(product.data.id) && (isClicked = true);
    if (!isClicked) {
      arr = [product.data, ...arr];
      let obj = {
        heading: "장바구니에 추가되었습니다.",
        explain: "",
        isON: true,
        isConfirm: false,
      };
      dispatch(confirmModalAction(obj));
    } else {
      let obj = {
        heading: "이미 추가된 상품입니다.",
        explain: "",
        isON: true,
        isConfirm: false,
      };
      dispatch(confirmModalAction(obj));
    }
    dispatch(cartAction(arr));
  };
  const selectEvent = (e) => {
    alert(e.target.value);
  };
  //카테고리 밑줄 표시
  const isGoods = product.data.상품분류 === "굿즈";
  const isDisc = product.data.상품분류 === "음반";

  if (!state.product || state.product.length < 24) return <div>Loading…</div>;
  return (
    <div id="sub02ShopDetail">
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
                <a href="/Shop?category=굿즈">
                  <span className={isGoods ? "on" : ""}>굿즈</span>
                </a>
              </li>
              <li>
                <a href="Shop?category=음반">
                  <span className={isDisc ? "on" : ""}>음반/LP</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="detail">
            <div className="top">
              <div className="left">
                <div className="img-box">
                  <div className="gap">
                    <img src={product.data.이미지[0]} alt="상품이미지" />
                  </div>
                </div>
              </div>
              <div className="right">
                <ul>
                  <li className="item-name">
                    <h2>{product.data.상품명}</h2>
                  </li>
                  <li className="item-price">
                    <em>{product.data.가격.toLocaleString("ko-KR")}원</em>
                  </li>

                  <li className="item-quantity">
                    <p>수량</p>
                    <div className="quantity-selector">
                      <div className="selector-box">
                        <button type="button" onClick={onClickDecrementBtn}>
                          <i className="bi bi-dash"></i>
                        </button>
                        <input
                          type="text"
                          value={state.product[0].수량}
                          onChange={onChangeNumber}
                          min="1"
                        />
                        <button type="button" onClick={onClickIncrementBtn}>
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                  {product.data.옵션?.length > 0 && (
                    <li className="select-option">
                      <select name="option" id="option" onChange={selectEvent}>
                        {product.data.옵션.map((item) => (
                          <option value={item} key={item} data-key={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </li>
                  )}

                  <li className="cart-wish">
                    <div className="add-cart">
                      <a href="!#" onClick={cartWish}>
                        장바구니에 추가
                      </a>
                    </div>
                    <div className="add-wish">
                      <a href="!#" title="Wishlist" onClick={clickWishlist}>
                        <i
                          className={`bi bi-suit-heart${
                            wishAsset
                              .map((el) => el.id)
                              .includes(product.data.id)
                              ? "-fill"
                              : ""
                          }`}></i>
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
              <div className="description">
                <h3>[제품 설명]</h3>
                <p>상품명 : {product.data.상품명}</p>
                <p>상품분류 : {product.data.상품분류}</p>
                <p>상품소개 : {product.data.설명}</p>
                <div className="img-box">
                  {product.data.이미지.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`상품이미지 ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="delivery-box">
              <ul>
                {delivery.delivery.map((item, idx) => {
                  const title = Object.keys(item)[0]; // 타이틀
                  const contents = Object.values(item)[0]; // 텍스트
                  const isToggleSection = toggleSections.includes(title); // 아코디언 여부 확인
                  const isOpen = openIndex === idx;

                  return (
                    <li
                      key={idx}
                      className={isToggleSection ? "plus" : "delivery"}>
                      <div
                        className="delivery-title"
                        onClick={() => isToggleSection && handleToggle(idx)}>
                        <h3>[{title}]</h3>
                        {/* eslint-disable-next-line */}
                        {isToggleSection && (
                          <a
                            href="#"
                            className="icon"
                            onClick={(e) => e.preventDefault()}>
                            {isOpen ? (
                              <i className="bi bi-dash" />
                            ) : (
                              <i className="bi bi-plus" />
                            )}
                          </a>
                        )}
                      </div>

                      {/* 아코디언 내용 */}
                      {(!isToggleSection || isOpen) && (
                        <div className="content">
                          {contents.map((item, i) => (
                            <p key={i}>
                              {item.includes("'주문내역'") ? (
                                <>
                                  - 주문한 내용 및 배송 현황은&nbsp;
                                  <a
                                    href="!#"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    '주문내역'
                                  </a>
                                  &nbsp;에서 확인할 수 있습니다.
                                </>
                              ) : (
                                item
                              )}
                            </p>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub02ShopDetail;
