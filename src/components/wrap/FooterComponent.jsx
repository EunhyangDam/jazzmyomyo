import React from "react";
import "./scss/FooterComponent.scss";

export default function FooterComponent() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <svg
          className="wave-svg first"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none">
          <path
            fill="#1c2a2e"
            d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,112C672,107,768,149,864,181.3C960,213,1056,235,1152,240C1248,245,1344,235,1392,229.3L1440,224L1440,0L0,0Z"
          />
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
        <svg
          className="wave-svg mid"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none">
          <path
            fill="#512b2b"
            d="M0,160L48,149.3C96,139,192,117,288,112C384,107,480,117,576,138.7C672,160,768,192,864,192C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L0,320Z"
          />
        </svg>

        <svg
          className="wave-svg second"
          viewBox="0 0 1440 250"
          preserveAspectRatio="none">
          <path
            fill="#512b2b"
            d="M0,96L48,106.7C96,117,192,139,288,160C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,90.7C1248,64,1344,64,1392,64L1440,64L1440,320L0,320Z"
          />
        </svg>
      </div>

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
              <a href="#">About us</a> / <a href="#">Shop</a> /{" "}
              <a href="#">Menu</a> /<span className="mobile-br"></span>{" "}
              <a href="#">Schedule</a> / <a href="#">Community</a>
            </div>
            <div className="address">
              주소 : 서울 마포구 동교로23길 12 복합빌딩 B1층 재즈묘묘
              <br />
              운영시간 : 주~월 6PM~2AM (매주 9시 입장 / 2차 자유)
              <br />
              전화번호 : 02 - 2111 - 2000
            </div>
            <div className="copy">
              © 2025 JazzMyomyo. All That Jazz, All That Meow.
            </div>
          </div>

          <div className="footer-logo">
            <img src="./img/footer/logo.png" alt="Jazz Myomyo" />
          </div>
        </div>
      </div>
    </footer>
  );
}
