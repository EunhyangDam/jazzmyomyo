import React from "react";
import { Link } from "react-router-dom";
import "./scss/Section13Component.scss"

export default function Section13Component(props) {
  const 공지 = [
    '묘묘 굿즈샵 1차 재입고 안내',
    '여름 한정 신메뉴 "재즈베리 하이볼" 출시',
    '8월 정기 공연 세션 공개!',
    '재즈묘묘 정기 휴무 안내'
  ];

  const 질문 = [
    '공연 중에도 음료 및 음식 주문이 가능한가요?',
    '연주자와 대화할 수 있나요?',
    '공연 중 사진 촬영이 가능한가요?',
    '미성년자도 입장이 가능한가요?'
  ];

  return (
    <div id="section13Component" className="section">
      <div className="container">

        {/* 공지사항 */}
        <div className="box">
          <h3>묘하게 중요한 소식들</h3>
          <ul>
            {공지.map((item, index) => (
              <li key={index}>
                <Link to="/ntc" className="text-wrap">   {/* 공지 클릭 시 공지사항 전체로 이동 */}
                  <span className="tag">[공지]</span>
                  <span className="text">{item}</span>
                </Link>
                <Link to="/ntc" className="more">more &gt;</Link>  {/* more 클릭 시 공지사항 전체로 이동 */}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="box">
          <h3>자주 묻는 묘한 질문들</h3>
          <ul>
            {질문.map((item, index) => (
              <li key={index}>
                <Link to="/faq" className="text-wrap">   {/* FAQ 클릭 시 FAQ 전체로 이동 */}
                  <span className="tag">[FAQ]</span>
                  <span className="text">{item}</span>
                </Link>
                <Link to="/faq" className="more">more &gt;</Link> {/*  more 클릭 시 FAQ 전체로 이동 */}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
