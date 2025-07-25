import React from "react";
import "./scss/Section6Component.scss";
export default function Section6Component(props) {
  return (
    <div id="section6Component">
      <div className="inner">
        <div className="left">
          <h2>
            <span>재즈 묘묘.</span>
            <i className="fa-solid fa-angles-left"></i>
            <span className="line"></span>
            <i className="fa-solid fa-angles-right"></i>
            <span>묘원.</span>
          </h2>
          <p>재즈 묘묘의 다양한 소식을 만나보세요!</p>
          <dl>
            <dt>개인정보 수집 및 이용에 관한 동의</dt>
            <dd>수집·이용 목적: 뉴스레터 발송</dd>
            <dd>수집 항목: 이름, 이메일 주소</dd>
            <dd>보유 및 이용 기간: 수신거부 의사 전달시까지</dd>
            <dd>
              개인정보 수집 및 이용 동의를 거부하실 수 있습니다. 다만, 동의하지
              않을 경우 뉴스레터를 받으실 수 없습니다. 개인정보는 위 수집·이용
              목적 이외의 다른 용도로 사용하지 않습니다.
            </dd>
          </dl>
        </div>
        <div className="right">
          <form action="POST">
            <ul>
              <li>
                <p>이름*</p>
                <input type="text" />
              </li>
              <li>
                <p>이메일*</p>
                <input type="text" />
              </li>
              <li>
                <p>연락처*</p>
                <input type="text" />
              </li>
            </ul>
            <button type="submit">구독하기</button>
            <input type="checkbox" name="chkbox" id="chkbox" />
            <p>개인정보 수집 및 활용에 동의합니다.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
