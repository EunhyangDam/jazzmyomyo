import React from "react";
import "./scss/Sub07EditProfile.scss";
import { Link } from "react-router-dom";
function Sub07EditProfile(props) {
  return (
    <div id="sub07EditProfile">
      <div className="container">
        <div className="title">
          <Link to="/Mp">
            <h2>My Page</h2>
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
                <Link to="/DeleteAccount">회원 탈퇴</Link>
              </li>
              <li className="sub-title">
                <h3>이용내역</h3>
              </li>
              <li>
                <Link to="/MyOrder">예매내역 확인</Link>
              </li>
              <li>
                <Link to="/MyOrder">주문내역 확인</Link>
              </li>
              <li>
                <Link to="/MyOrder">대관신청 확인</Link>
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
          <div className="user-info">
            <div className="head">
              <h3>회원 정보 확인</h3>
            </div>
            <div className="main">
              <ul>
                <li className="user-ID">
                  <div className="left">
                    <span>아이디</span>
                  </div>
                  <div className="right">
                    <p>myomyo</p>
                  </div>
                </li>
                <li className="user-PW">
                  <div className="left">
                    <span>비밀번호</span>
                  </div>
                  <div className="right">
                    <p>1234*</p>
                  </div>
                </li>
                <li className="user-PW2">
                  <div className="left">
                    <span>비밀번호 확인</span>
                  </div>
                  <div className="right">
                    <p>1234*</p>
                  </div>
                </li>
                <li className="user-name">
                  <div className="left">
                    <span>이름</span>
                  </div>
                  <div className="right">
                    <p>김묘묘</p>
                  </div>
                </li>
                <li className="user-mobile-number">
                  <div className="left">
                    <span>휴대전화번호</span>
                  </div>
                  <div className="right">
                    <p>010-1234-5678</p>
                  </div>
                </li>
                <li className="user-address">
                  <div className="left">
                    <span>주소</span>
                  </div>
                  <div className="right">
                    <p>서울시 영등포구 주소</p>
                  </div>
                </li>
                <li className="user-email">
                  <div className="left">
                    <span>이메일</span>
                  </div>
                  <div className="right">
                    <p>myomyo@naver.com</p>
                  </div>
                </li>
                <li className="birthday">
                  <div className="left">
                    <span>생년월일</span>
                  </div>
                  <div className="right">
                    <p>1997-03-30</p>
                  </div>
                </li>
                <li className="user-email-agree">
                  <div className="left">
                    <span>이메일 수신 동의</span>
                  </div>
                  <div className="right">
                    <input type="checkbox" />
                    <span>동의</span>
                    <input type="checkbox" /> <span>미동의</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="foot">
              <button>수정취소</button>
              <button>수정완료</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub07EditProfile;
