import React from "react";
import "./scss/Section6Component.scss";
export default function Section6Component(props) {
  return (
    <div id="section6Component">
      <div className="inner">
        <div className="left">
          <h2>
            <span>재즈 묘묘.</span>
            <span></span>
            <span>묘원.</span>
          </h2>
          <p>재즈 묘묘의 다양한 소식을 만나보세요!</p>
          <dl>
            <dt>개인정보 수집 및 이용에 관한 동의</dt>
            <dd>수집·이용 목적: 뉴스레터 발송</dd>
            <dd>수집·이용 목적: 뉴스레터 발송</dd>
            <dd>수집·이용 목적: 뉴스레터 발송</dd>
            <dd>수집·이용 목적: 뉴스레터 발송</dd>
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
                <p>이름*</p>
                <input type="text" />
              </li>
              <li>
                <p>이름*</p>
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
