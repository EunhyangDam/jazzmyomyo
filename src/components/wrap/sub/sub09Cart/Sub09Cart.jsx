import React, { useEffect, useState } from "react";
import "../scss/sub.scss";
import "./scss/Sub09Cart.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartAction, cartChkAction } from "../../../../store/cart";
import SiteMapComponent from "../../custom/SiteMapComponent";
import useCustomA from "../../custom/useCustomA";
function Sub09Cart(props) {
  const { onClickA } = useCustomA();
  const cartAsset = useSelector((state) => state.cart.cart);
  const checkAsset = useSelector((state) => state.cart.checkedProduct);
  const userID = useSelector((state) => state.signIn.아이디);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [state, setState] = useState({
    product: [],
    check: [],
  });
  useEffect(() => {
    let arr = cartAsset;
    arr = arr.map((el) => (el.품절 === true ? { ...el, 수량: 0 } : { ...el }));
    setState({
      ...state,
      product: arr,
      check: checkAsset,
    });
  }, [cartAsset, checkAsset]);

  const dispatchCondition = (frontData) => {
    dispatch(cartAction(frontData));
  };
  /**전체 삭제*/
  const clickClean = () => {
    dispatchCondition([]);
  };
  /**선택 삭제 */
  const clickSelectDel = (e) => {
    e.preventDefault();
    let arr = cartAsset.filter(
      (el) => !state.check.map((el) => el.id).includes(el.id)
    );
    dispatch(cartAction(arr));
  };
  /**체크 이벤트*/
  const changeChk = (e, data) => {
    let arr = state.check;
    if (e.target.checked) {
      arr = [data, ...arr];
    } else {
      arr = state.check.filter((el) => el.id !== data.id);
    }
    setState({
      ...state,
      check: arr,
    });
    dispatch(cartChkAction(arr));
  };
  /**전체 선택 */
  const changeAll = (e) => {
    let arr = [];
    if (e.target.checked) {
      arr = cartAsset;
    }
    setState({
      ...state,
      check: arr,
    });
    dispatch(cartChkAction(arr));
  };
  /**이전으로 돌아가기 */
  const clickPrev = (e) => {
    e.preventDefault();
    navigation(-1);
  };

  /**증감 */
  const clickMinus = (e, data) => {
    e.preventDefault();
    let change = state.product.map((el) =>
      el.id === data.id
        ? { ...el, 수량: el.수량 - 1 <= 1 ? 1 : el.수량 - 1 }
        : { ...el }
    );
    dispatchCondition(change);
  };
  const clickPlus = (e, data) => {
    e.preventDefault();
    let change = state.product.map((el) =>
      el.id === data.id ? { ...el, 수량: el.수량 + 1 } : { ...el }
    );
    dispatchCondition(change);
  };
  return (
    <div id="sub09Cart" className="sub-page">
      <div className="inner">
        <SiteMapComponent firstLink="/Cart" firstName="장바구니" />
        <div className="body">
          <dl>
            <dt>
              <div className="col col1">
                <input
                  type="checkbox"
                  id="allChk"
                  name="allChk"
                  onChange={changeAll}
                  checked={
                    state.product.length === state.check.length &&
                    state.product.length > 0
                  }
                />
              </div>
              <div className="col col2">상품정보</div>
              <div className="col col3">수량</div>
              <div className="col col4">배송구분</div>
              <div className="col col5">주문금액</div>
            </dt>
            {state.product.map((el, idx) => (
              <dd className={el.품절 ? "sold-out" : ""} key={el.id}>
                <div className="col col1">
                  <input
                    type="checkbox"
                    id={`check${idx + 1}`}
                    name={`check${idx + 1}`}
                    onChange={(e) => changeChk(e, el)}
                    checked={state.check.map((el) => el.id).includes(el.id)}
                  />
                </div>
                <div className="col col2">
                  <div className="img-container">
                    <img src={el.이미지[0]} alt="" />
                  </div>
                  <div className="txt-container">
                    <h3>{el.상품명}</h3>
                    <div className="bottom">
                      <div className="box">
                        {el.신상품 && <span className="new">신상품</span>}
                        {el.품절 && <span className="sold-out">품절</span>}
                      </div>
                      <p>{el.옵션.length > 0 && "옵션:"}</p>
                    </div>
                  </div>
                </div>
                <div className="col col3">
                  <div className="container">
                    <button
                      className={el.수량 > 1 ? "active" : ""}
                      onClick={(e) => clickMinus(e, el)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name={`inputNumber${el.idx}`}
                      id={`inputNumber${el.idx}`}
                      value={el.수량}
                      readOnly
                    />
                    <button
                      className={el.수량 > 0 && "active"}
                      onClick={(e) => clickPlus(e, el)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col col4">기본배송</div>
                <div className="col col5">
                  <span>{(el.가격 * el.수량).toLocaleString("ko-kr")}</span>원
                </div>
              </dd>
            ))}
          </dl>
          <div className="btn-box">
            <button onClick={clickSelectDel}>선택 상품 삭제</button>
            <button onClick={clickClean}>전체 삭제</button>
          </div>
        </div>
        <div className="foot">
          <div className="container">
            <button onClick={clickPrev}>이전화면</button>
            <button onClick={(e) => onClickA(e, "/purchase")}>
              선택 상품 주문하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub09Cart;
