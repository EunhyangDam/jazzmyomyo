import React, { useEffect, useState } from "react";
import "../scss/sub.scss";
import "./scss/Sub10Wishlist.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { wishAction } from "../../../../store/wishlist";
export default function Sub10Wishilist(props) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.wishlist);
  const [state, setState] = useState({
    위시리스트: [],
  });
  useEffect(() => {
    setState({
      ...state,
      위시리스트: list.위시리스트,
    });
  }, [list]);
  const clickWishDel = (e, data) => {
    let del = state.위시리스트.filter((el) => el.id !== data.id);
    setState({
      ...state,
      위시리스트: del,
    });
    dispatch(wishAction(del));
  };
  return (
    <div id="sub10Wishilist" className="sub-page">
      <div className="inner">
        <div className="site">
          <Link to="./">
            <i className="bi bi-house-fill"></i>
          </Link>
          <i>&gt;</i>
          <Link to="./">마이페이지</Link>
          <i>&gt;</i>
          <Link to="./Sub10Wishilist" className="now">
            찜리스트
          </Link>
        </div>
        <div className="head">
          <ul>
            <li className="col col1">
              <h2 className="name">
                <span>묘묘</span> 님
              </h2>
              <p className="email">myomyocat@gmail.com</p>
              <p>일반회원</p>
            </li>
            <li className="col col2">
              <h3>나의 첫 방문일</h3>
              <p className="content">2025.09.10</p>
            </li>
            <li className="col col3">
              <h3>나의 감상횟수</h3>
              <p className="content">6회</p>
            </li>
            <li className="col col4">
              <h3>보유 티켓 수</h3>
              <p className="content">8장</p>
            </li>
          </ul>
        </div>
        <div className="body">
          <h3>
            찜 리스트 <span>({state.위시리스트.length})</span>
          </h3>
          {state.위시리스트.length >= 1 ? (
            <ul className="content">
              {state.위시리스트.map((el) => (
                <li key={el.id} data-key={el.id}>
                  <div className="img-container">
                    <Link to="/">
                      <img src={el.이미지[0]} alt={el.설명} />
                    </Link>
                    <div className="x-box">
                      <button onClick={(e) => clickWishDel(e, el)}>
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                  </div>
                  <h4>{el.상품명}</h4>
                  <p className="price">
                    <span>{el.가격.toLocaleString("ko-kr")}</span>원
                  </p>
                  <div className="box">
                    <span className="new">신상품</span>
                    <span className="sold-out">품절</span>
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
        <div className="foot">
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
        </div>
      </div>
    </div>
  );
}
