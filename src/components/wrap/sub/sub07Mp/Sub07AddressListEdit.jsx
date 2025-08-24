import React, { useState } from "react";
import "./scss/Sub07AddressListEdit.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import SiteMapComponent from "../../custom/SiteMapComponent";
import useCustomA from "../../custom/useCustomA";
import { useDispatch, useSelector } from "react-redux";
import { daumPostcodeOpenAction } from "../../../../store/daumPostcode";
import { confirmModalAction } from "../../../../store/confirmModal";
import axios from "axios";

function Sub07AddressListEdit(props) {
  const { onClickA } = useCustomA();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = useSelector((state) => state.signIn.아이디);

  const { address } = location.state;

  // 주소 가져오기
  const daumPostcode = useSelector((state) => state.daumPostcode);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    idx: address.idx,
    아이디: address.userId,
    기본배송지: address.deliveryDefault,
    메모: address.memo,
    이름: address.recipient,
    연락처: address.deliveryHp,
    배송요청: address.deliveryRequest,
    우편번호: address.zipCode,
    주소1: address.deliveryaddress1,
    주소2: address.deliveryaddress2,
  });

  React.useEffect(() => {
    setState({
      ...state,
      아이디: userId,
    });
  }, [userId]);

  React.useEffect(() => {
    // 주소 상태변수에 저장
    if (daumPostcode.검색주소 !== "") {
      setState({
        ...state,

        우편번호: daumPostcode.우편번호,
        주소1: daumPostcode.검색주소,
        주소2: daumPostcode.상세주소,
      });
    }
  }, [daumPostcode.우편번호, daumPostcode.검색주소, daumPostcode.상세주소]);

  // 1. 기본배송지 여부
  const onChangeDeliveryDefault = (e) => {
    setState({
      ...state,
      기본배송지: e.target.checked ? 1 : 0,
    });
  };

  // 1-1. 배송지 이름
  const onChangeDeliveryMemo = (e) => {
    setState({
      ...state,
      메모: e.target.value,
    });
  };

  // 2. 이름
  const onChangeRecipient = (e) => {
    setState({
      ...state,
      이름: e.target.value,
    });
  };

  // 3. 연락처
  const onChangeDeliveryHp = (e) => {
    setState({
      ...state,
      연락처: e.target.value,
    });
  };

  // 4. 배송요청 메시지
  const onChangeDeliveryRequest = (e) => {
    setState({
      ...state,
      배송요청: e.target.value,
    });
  };

  //5. 주소 우편번호 => 다음에서 가져옴

  //6. 주소1
  // const onChangeDeliveryAddress1 = (e) => {
  //   setState({
  //     ...state,
  //     주소1: e.target.value,
  //   });
  // };

  //7. 주소2
  const onChangeDeliveryAddress2 = (e) => {
    setState({
      ...state,
      주소2: e.target.value,
    });
  };

  // 7-1 주소검색 버튼 클릭 이벤트
  const onClickAddressSearch = (e) => {
    e.preventDefault();
    dispatch(daumPostcodeOpenAction(true));
  };

  // 7-2 주소 재검색 버튼 클릭 이벤트
  const onClickArressReSerch = (e) => {
    e.preventDefault();
    dispatch(daumPostcodeOpenAction(true));
  };

  // 작성 취소 버튼 클릭 => 배송지 관리로 이동
  const onClickCancelEdit = (e) => {
    navigate("/addressList");
  };

  // 배송지 추가 폼 제출
  const onSubmitAddAddress = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("idx", state.idx);
    formData.append("userId", state.아이디);

    formData.append("deliveryDefault", state.기본배송지);
    formData.append("memo", state.메모);
    formData.append("recipient", state.이름);
    formData.append("deliveryHp", state.연락처);
    formData.append("deliveryRequest", state.배송요청);
    formData.append("zipCode", state.우편번호);
    formData.append("deliveryaddress1", state.주소1);
    formData.append("deliveryaddress2", state.주소2);

    axios({
      url: "/jazzmyomyo/delivery_table_update.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data === 1) {
            let obj = {
              heading: "배송지가 수정되었습니다.",
              explain: "",
              isON: true,
              isConfirm: false,
            };
            dispatch(confirmModalAction(obj));

            setState({
              ...state,
              아이디: "",
              기본배송지: 0,
              메모: "",
              이름: "",
              연락처: "",
              배송요청: "",
              우편번호: "",
              주소1: null,
              주소2: null,
            });

            setTimeout(() => navigate("/addressList"), 1000);
          } else {
            dispatch(
              confirmModalAction({
                heading: "오류가 발생했어요! /n다시 시도해보세요",
                explain: "",
                isON: true,
                isConfirm: false,
              })
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="Sub07AddressListEdit">
      <div className="container">
        <SiteMapComponent
          firstLink="/Mp"
          firstName="마이페이지"
          secondLink="./"
          secondName="배송지 관리"
        />
        <div className="title">
          <a href="/!#" onClick={(e) => onClickA(e, "/mp")}>
            <h2>My Page</h2>
          </a>
        </div>
        <div className="content">
          <Sub07MpSideMenu />
          <div className="address-box">
            <form autoComplete="off" onSubmit={onSubmitAddAddress}>
              <div className="head">
                <h3>배송지 수정</h3>
              </div>
              <div className="main">
                <ul>
                  <li className="row1">
                    <div className="gap default">
                      <label htmlFor="deliveryDefault">
                        <strong>기본 배송지</strong> <i>*</i>
                        <input
                          type="checkbox"
                          name="deliveryDefault"
                          id="deliveryDefault"
                          className="delivery-default"
                          onChange={onChangeDeliveryDefault}
                          checked={state.기본배송지 === 1}
                        />
                      </label>
                    </div>
                    <div className="gap memo">
                      <label htmlFor="deliveryMemo">
                        <strong>배송지 이름</strong>
                      </label>

                      <input
                        type="text"
                        name="deliveryMemo"
                        id="deliveryMemo"
                        className="input-text"
                        placeholder="(ex.집, 회사...)"
                        maxLength={50}
                        onChange={onChangeDeliveryMemo}
                        value={state.메모}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="gap">
                      <label htmlFor="userId">
                        <strong>이름</strong> <i>*</i>
                      </label>

                      <input
                        type="text"
                        name="recipient"
                        id="recipient"
                        className="input-text"
                        placeholder="이름을 입력해주세요"
                        maxLength={50}
                        onChange={onChangeRecipient}
                        value={state.이름}
                      />
                    </div>
                  </li>

                  <li>
                    <div className="gap">
                      <label htmlFor="deliveryHp">
                        <strong>연락처</strong> <i>*</i>
                      </label>

                      <input
                        type="text"
                        name="deliveryHp"
                        id="deliveryHp"
                        className="input-text"
                        placeholder="휴대폰 번호를 입력해주세요"
                        maxLength={13}
                        onChange={onChangeDeliveryHp}
                        value={state.연락처}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="gap">
                      <label htmlFor="deliveryRequest">
                        <strong>배송요청</strong> <i>*</i>
                      </label>

                      <input
                        type="text"
                        name="deliveryRequest"
                        id="deliveryRequest"
                        className="input-text"
                        placeholder="배송 요청사항을 입력해주세요"
                        maxLength={100}
                        onChange={onChangeDeliveryRequest}
                        value={state.배송요청}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="gap">
                      <label htmlFor="userId">
                        <strong>우편번호</strong> <i>*</i>
                      </label>

                      <input
                        type="text"
                        name="zipCode"
                        id="zipCode"
                        className="input-text"
                        placeholder="우편번호는 자동으로 입력됩니다"
                        maxLength={50}
                        value={state.우편번호}
                        readOnly
                      />
                    </div>
                  </li>

                  <li className="row row7 block1">
                    {state.주소1 === null && (
                      <div className="gap address-find">
                        <label>
                          <strong>주소</strong> <i>*</i>
                        </label>
                        <a href="!#" onClick={onClickAddressSearch}>
                          <i className="bi bi-search"></i> <span>주소검색</span>
                        </a>
                      </div>
                    )}
                    {state.주소1 !== null && (
                      <>
                        <div className="gap address-completed  address-completed1">
                          <label htmlFor="userId">
                            <strong>주소1</strong> <i>*</i>
                          </label>

                          <input
                            type="text"
                            name="deliveryAddress1"
                            id="deliveryAddress1"
                            className="input-text"
                            placeholder="주소1를 입력해주세요"
                            maxLength={250}
                            value={state.주소1}
                            readOnly
                          />
                          <button onClick={onClickArressReSerch}>
                            <i className="bi bi-search"></i> 재검색
                          </button>
                        </div>

                        <div className="gap address-completed address-completed2">
                          <label htmlFor="userId">
                            <strong>주소2</strong> <i>*</i>
                          </label>

                          <input
                            type="text"
                            name="deliveryAddress2"
                            id="deliveryAddress2"
                            className="input-text"
                            placeholder="주소2를 입력해주세요"
                            maxLength={250}
                            onChange={onChangeDeliveryAddress2}
                            value={state.주소2}
                          />
                        </div>
                      </>
                    )}
                  </li>
                </ul>
              </div>
              <div className="foot">
                <button onClick={onClickCancelEdit}>수정 취소</button>
                <button type="submit">수정 완료</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07AddressListEdit;
