import React from "react";
import "./scss/Sub07DeleteAccount.scss";
import { Link } from "react-router-dom";
function Sub07DeleteAccount(props) {
  return (
    <div id="sub07DeleteAccount">
      <div className="container">
        <div className="title">
          <Link to="/Mp">
            <h2>회원탈퇴</h2>
          </Link>
        </div>
        <div className="content">
          <h3>회원탈퇴 안내사항</h3>
          <ul>
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
              <h4>탈퇴하시겠습니까? </h4>
            </li>
            <li>
              <button>돌아가기</button>
              <button>탈퇴하기</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="modal">
        <div className="container">
          <h3>그동안 재즈묘묘를 이용해주셔서 감사합니다.</h3>
        </div>
      </div>
    </div>
  );
}

export default Sub07DeleteAccount;
