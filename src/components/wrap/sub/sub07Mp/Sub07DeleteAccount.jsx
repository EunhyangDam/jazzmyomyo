import React from "react";
import "./scss/Sub07DeleteAccount.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";
function Sub07DeleteAccount(props) {
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
      explain:
        "탈퇴일로부터 14일간 재가입이 불가능하며, 동일 아이디로의 재가입은 불가능합니다.회원 정보는 삭제되나 1:1문의, 상품 문의, 상품 리뷰, 게시물과 댓글은 삭제되지 않습니다.",
      isON: true,
      isConfirm: true,
      // 3개 추가
      message1: "아니오",
      message2: "예",
      isYes: false, // 응답이 예스/노
    };

    dispatch(confirmModalAction(obj));
  };

  return (
    <div id="sub07DeleteAccount">
      <div className="container">
        <div className="title">
          <Link to="/Mp">
            <h2>회원탈퇴</h2>
          </Link>
        </div>
        <div className="content">
          <div className="menu">
            <ul>
              <li>
                <h2>메뉴</h2>
              </li>
              <li className="sub-title">
                <h3>계정관리</h3>
              </li>
              <li>
                <Link to="/MyProfile">회원정보 확인</Link>
              </li>
              <li>
                <Link to="/EditProfile">회원정보 수정</Link>
              </li>
              <li>
                <Link to="/AddressList">배송지 관리</Link>
              </li>
              <li>
                <Link to="/DeleteAccount">회원 탈퇴</Link>
              </li>

              <li className="sub-title">
                <h3>이용내역</h3>
              </li>
              <li>
                <Link to="/MyOrder">티켓예매 내역</Link>
              </li>
              <li>
                <Link to="/MyOrder">사전주문 내역</Link>
              </li>
              <li>
                <Link to="/MyOrder">주문/ 배송조회</Link>
              </li>
              <li>
                <Link to="/MyOrder">대관신청 내역</Link>
              </li>
              <li className="sub-title">
                <h3>게시판</h3>
              </li>
              <li>
                <Link to="/Ntc">공지사항</Link>
              </li>
              <li>
                <Link to="/Faq">FAQ</Link>
              </li>
              <li>
                <Link to="/Rev">작성 후기</Link>
              </li>
            </ul>
          </div>
          <div className="right">
            <div className="bg-img"></div>
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
                    회원 정보는 삭제되나 1:1문의, 상품 문의, 상품 리뷰, 게시물과
                    댓글은 삭제되지 않습니다.
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
  );
}

export default Sub07DeleteAccount;
