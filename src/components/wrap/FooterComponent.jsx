import React from 'react';
import './scss/FooterComponent.scss';
import { Link } from 'react-router-dom';

export default function FooterComponent() {
  return (

      <footer id="footer">
        {/* 상단 물결 */}
        <svg className="wave-svg first" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill="#1c2a2e">
      <animate
        attributeName="d"
        dur="2.7s"
        repeatCount="indefinite"
        calcMode="spline"
        keyTimes="0;0.5;1"
        keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
        values="
          M0,128L48,150C96,172,192,210,288,190C384,170,480,110,576,100C672,90,768,160,864,190C960,220,1056,250,1152,255C1248,260,1344,240,1392,230L1440,220L1440,0L0,0Z;
          M0,140L60,120C120,100,200,190,300,170C400,150,500,80,600,110C700,140,800,210,900,200C1000,190,1100,150,1200,180C1300,210,1400,160,1440,150L1440,0L0,0Z;
          M0,128L48,150C96,172,192,210,288,190C384,170,480,110,576,100C672,90,768,160,864,190C960,220,1056,250,1152,255C1248,260,1344,240,1392,230L1440,220L1440,0L0,0Z
        "
      />

      </path>
        </svg>

        <div className="footer-middle">
          <ul className="footer-columns">
            <li>
              <h4>The Meow Post</h4>
              <p>“Where jazz whispers and stories purr.”</p>
            </li>
            <li>
              <h4>News Letter</h4>
              <p>“Sign up for a monthly dose of cool and cozy.”</p>
            </li>
            <li>
              <h4>Live Myoments</h4>
              <p>“Snapshots of sound, soul, and soft paws.”</p>
            </li>
            <li>
              <h4>MyoMyo Picks</h4>
              <p>“A curated taste of jazz and charm.”</p>
            </li>
          </ul>
        </div>

        {/* 중간 물결 */}
        <svg className="wave-svg second" viewBox="0 0 1440 280" preserveAspectRatio="none">
          <path fill="#1c2a2e">
          <animate
            attributeName="d"
            dur="2.7s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
            values="
              M0,128L48,150C96,172,192,210,288,190C384,170,480,110,576,100C672,90,768,160,864,190C960,220,1056,250,1152,255C1248,260,1344,240,1392,230L1440,220L1440,0L0,0Z;
              M0,140L60,120C120,100,200,190,300,170C400,150,500,80,600,110C700,140,800,210,900,200C1000,190,1100,150,1200,180C1300,210,1400,160,1440,150L1440,0L0,0Z;
              M0,128L48,150C96,172,192,210,288,190C384,170,480,110,576,100C672,90,768,160,864,190C960,220,1056,250,1152,255C1248,260,1344,240,1392,230L1440,220L1440,0L0,0Z
            "
          />

          </path>
        </svg>

        <div className="footer-bottom">
          <div className="footer-links">
            <ul>
              <li>
                <h5>About us</h5>
                <a href="#">재즈묘묘</a>
                <a href="#">어바웃 묘묘</a>
                <a href="#">인테리어</a>
                <a href="#">스토리</a>
              </li>
              <li>
                <h5>Shop</h5>
                <a href="#">묘묘굿즈</a>
                <a href="#">LP/CD</a>
              </li>
              <li>
                <h5>Menu</h5>
                <a href="#">와인</a>
                <a href="#">주류&음료</a>
                <a href="#">플래터&핑거푸드</a>
                <a href="#">묘한세트</a>
                <a href="#">사전주문</a>
              </li>
              <li>
                <h5>Schedule</h5>
                <a href="#">월간 공연 캘린더</a>
                <a href="#">공연 상세 안내</a>
                <a href="#">아티스트, 게스트 소개</a>
                <a href="#">티켓 애매</a>
                <a href="#">대관 신청</a>
              </li>
              <li>
                <h5>Community</h5>
                <a href="#">공지사항</a>
                <a href="#">FAQ</a>
                <a href="#">SNS/뉴스레터 구독</a>
                <a href="#">지난 공연 갤러리</a>
                <a href="#">한줄후기</a>
              </li>
            </ul>
          </div>

          <div className="footer-bottom-inner">
            <div className="footer-info">
              <div className="categories">
              <a href="#">About us</a> / 
              <a href="#"> Shop</a> / 
              <a href="#"> Menu</a> / <span className="mobile-br"></span>
              <a href="#"> Schedule</a>
              <a href="#">/ Community</a>
              <Link to="/Mm">  /  회원관리 관리자페이지</Link>
              </div>
              <div className="address">
                주소 : 서울 마포구 동교로<span className="nowrap">23길&nbsp;14</span> 복합빌딩 B1층 재즈묘묘<br />
                운영시간 : 수~일 6PM~2AM (휴무일 대관 가능)<br />
                전화번호 : 02 - 500 - 5200
              </div>


              <div className="copy">© 2025 JazzMyomyo. All That Jazz, All That Meow.</div>
            </div>

            <div className="footer-logo">
              <img src="./img/footer/logo.png" alt="Jazz Myomyo" />
            </div>
          </div>
        </div>
      </footer>
  );
}