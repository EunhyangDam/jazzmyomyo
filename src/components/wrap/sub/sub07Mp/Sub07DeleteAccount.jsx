import React from "react";
import "./scss/Sub07DeleteAccount.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import SiteMapComponent from "../../custom/SiteMapComponent";
import useCustomA from "../../custom/useCustomA";
import { logOutAction } from "../../../../store/signIn";

function Sub07DeleteAccount(props) {
  const { onClickA } = useCustomA();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //돌아가기 버튼 클릭 => 마이 페이지로 이동
  const onClickGoBack = (e) => {
    e.preventDefault();
    navigate("/Mp");
  };

  const onClickDeleteAccount = (e) => {
    e.preventDefault();

    const obj = {
      heading: "탈퇴하시겠습니까?",
      explain: "그동안 재즈묘묘를 이용해주셔서 감사합니다.",
      isON: true,
      isConfirm: true,
      // 3개 추가
      message1: "아니오",
      message2: "예",
      isYes: false, // 응답이 예스/노
    };

    dispatch(confirmModalAction(obj));

    dispatch(logOutAction(null));
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div id="sub07DeleteAccount">
      <div className="container">
        <SiteMapComponent
          firstLink="/Mp"
          firstName="마이페이지"
          secondLink="./"
          secondName="회원탈퇴"
        />
        <div className="title">
          <a href="/!#" onClick={(e) => onClickA(e, "/mp")}>
            <h2>My Page</h2>
          </a>
        </div>
        <div className="content">
          <Sub07MpSideMenu />
          <div className="right">
            <div className="bg-img">
              <div className="notice">
                <ul>
                  <li>
                    <h3>회원탈퇴 안내사항</h3>
                  </li>
                  <li>
                    <p>
                      탈퇴일로부터 14일간 재가입이 불가능하며, 동일 아이디로의
                      재가입은 불가능합니다.
                    </p>
                    <p>
                      회원 정보는 삭제되나 1:1문의, 상품 문의, 상품 리뷰,
                      게시물과 댓글은 삭제되지 않습니다.
                    </p>
                  </li>
                  <li>
                    <button onClick={onClickGoBack}>돌아가기</button>
                    <button onClick={onClickDeleteAccount}>탈퇴하기</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07DeleteAccount;
