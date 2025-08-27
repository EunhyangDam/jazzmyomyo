import React, { useEffect, useState } from "react";
import "../scss/sub.scss";
import "./scss/Sub10Wishlist.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { wishAction } from "../../../../store/wishlist";
import SiteMapComponent from "../../custom/SiteMapComponent";
import useCustomA from "../../custom/useCustomA";
import { cartAction } from "../../../../store/cart";
import { confirmModalAction } from "../../../../store/confirmModal";
import axios from "axios";
export default function Sub10Wishilist(props) {
  const { onClickA } = useCustomA();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const list = useSelector((state) => state.wishlist);
  const cartAsset = useSelector((state) => state.cart.cart);
  const userID = useSelector((state) => state.signIn);

  const [state, setState] = useState({
    위시리스트: [],
  });
  const [data, setData] = useState({});
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      위시리스트: list.위시리스트,
    }));
  }, [list]);

  useEffect(() => {
    const formData = new FormData();
    formData.append("ID", userID.아이디);
    axios({ url: "/jazzmyomyo/user_info.php", method: "POST", data: formData })
      .then((res) => {
        switch (res.status) {
          case 200:
            setData(res.data);
            break;
          default:
            alert("a");
            break;
        }
      })
      .catch();
  }, [userID]);
  const clickWishDel = (e, data) => {
    let del = state.위시리스트.filter((el) => el.id !== data.id);
    setState({
      ...state,
      위시리스트: del,
    });
    dispatch(wishAction(del));
  };
  const clickProduct = (e, data) => {
    e.preventDefault();
    navigation(
      { hash: "", pathname: "/ShopDetail", search: `product=${data.id}` },
      { state: data }
    );
  };
  const clickCart = (e, data) => {
    e.preventDefault();
    let arr = cartAsset;
    if (arr.some((el) => el.id === data.id)) {
      dispatch(
        confirmModalAction({
          heading: "이미 추가된 상품입니다.",
          isON: true,
        })
      );
      return;
    }
    arr = [data, ...arr];
    dispatch(
      confirmModalAction({
        heading: "장바구니에 추가되었습니다.",
        isON: true,
      })
    );
    dispatch(cartAction(arr));
  };
  return (
    <div id="sub10Wishilist" className="sub-page">
      <div className="inner">
        <SiteMapComponent
          firstLink="/mp"
          firstName="마이페이지"
          secondLink="/Wishilist"
          secondName="찜리스트"
        />
        <div className="head">
          <ul>
            <li className="col col1">
              <h2 className="name">
                {userID.아이디 === "" ? (
                  <span>비회원</span>
                ) : (
                  <span>{userID.이름} 님</span>
                )}
              </h2>
              {userID.아이디 && <p className="email">{data.email}</p>}
              {userID.아이디 && <p>일반회원</p>}
            </li>
            {userID.아이디 && (
              <li className="col col2">
                <h3>나의 첫 방문일</h3>
                <p className="content">
                  {data.dateAt
                    .split(" ")[0]
                    .split("-")
                    .map((v, i) => (i === 0 ? v.slice(2) : v))
                    .join(".")}
                </p>
              </li>
            )}
            {userID.아이디 && (
              <li className="col col3">
                <h3>나의 감상횟수</h3>
                <p className="content">6회</p>
              </li>
            )}
            {userID.아이디 && (
              <li className="col col4">
                <h3>보유 티켓 수</h3>
                <p className="content">8장</p>
              </li>
            )}
          </ul>
        </div>
        <div className="body">
          <h3>
            찜 리스트 <span>({state.위시리스트.length})</span>
          </h3>
          {state.위시리스트.length >= 1 ? (
            <ul className="content">
              {state.위시리스트.map((el) => (
                <li
                  key={el.id}
                  data-key={el.id}
                  className={el.품절 && "sold-out"}
                >
                  <div className="img-container">
                    <a href="!#" onClick={(e) => clickProduct(e, el)}>
                      <img src={el.이미지[0]} alt={el.설명} />
                    </a>
                    <div className="x-box">
                      <button onClick={(e) => clickWishDel(e, el)}>
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                    <a
                      className="add-to-cart"
                      href="!#"
                      onClick={(e) => clickCart(e, el)}
                    >
                      <p>
                        <i className="fa-solid fa-cart-arrow-down"></i> Add to
                        cart
                      </p>
                    </a>
                  </div>
                  <h4>
                    <a href="!#" onClick={(e) => clickProduct(e, el)}>
                      {el.상품명}
                    </a>
                  </h4>
                  <p className="price">
                    <span>{el.가격.toLocaleString("ko-kr")}</span>원
                  </p>
                  <div className="box">
                    {el.신상품 && <span className="new">신상품</span>}
                    {el.품절 && <span className="sold-out">품절</span>}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty">
              <h3>
                찜 리스트에 상품이 없습니다<i className="fa-solid fa-paw"></i>
              </h3>
            </div>
          )}
        </div>
        {/* <div className="foot">
          <ul>
            <li className="pre">
              <button>
                <i className="bi bi-chevron-double-left"></i>
              </button>
              <button>
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>
            <li className="page">
              <button className="active">1</button>
            </li>
            <li className="next">
              <button>
                <i className="bi bi-chevron-double-right"></i>
              </button>
              <button>
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
