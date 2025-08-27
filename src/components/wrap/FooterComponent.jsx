import React from "react";
import "./scss/FooterComponent.scss";
import useCustomA from "./custom/useCustomA";


export default function FooterComponent({ footerClass = "footer--default", isAdmin }) {
  
const{onClickA} = useCustomA();


  return (
    <footer id="footer" className={footerClass} aria-label="사이트 푸터">
      {/* 상단 물결 */}
      <svg
        className="wave-svg first"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill="currentColor">
          <animate
            attributeName="d"
            dur="5.5s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
            values="
              M0,180L60,200C120,220,240,260,360,250C480,240,600,180,720,160C840,140,960,200,1080,220C1200,240,1320,200,1380,190L1440,180L1440,0L0,0Z;
              M0,160L60,140C120,120,240,180,360,170C480,160,600,100,720,140C840,180,960,240,1080,230C1200,220,1320,160,1380,150L1440,140L1440,0L0,0Z;
              M0,180L60,200C120,220,240,260,360,250C480,240,600,180,720,160C840,140,960,200,1080,220C1200,240,1320,200,1380,190L1440,180L1440,0L0,0Z
            "
          />
        </path>
      </svg>

      {/* 중간 밴드 */}
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

      {/* 하단 물결 */}
      <svg
        className="wave-svg second"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path>
          <animate
            attributeName="d"
            dur="5.5s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
            values="
              M0,170L60,190C120,210,240,240,360,230C480,220,600,160,720,150C840,140,960,200,1080,210C1200,220,1320,190,1380,180L1440,170L1440,0L0,0Z;
              M0,150L60,130C120,110,240,170,360,165C480,160,600,110,720,135C840,160,960,220,1080,215C1200,210,1320,160,1380,150L1440,140L1440,0L0,0Z;
              M0,170L60,190C120,210,240,240,360,230C480,220,600,160,720,150C840,140,960,200,1080,210C1200,220,1320,190,1380,180L1440,170L1440,0L0,0Z
            "
          />
        </path>
      </svg>

      <div className="footer-bottom">
        <div className="footer-links">
          <ul>
            <li>
              <h5>About us</h5>
              <a href="!#" onClick={(e)=>onClickA(e, '/aboutUs' )}>재즈묘묘</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/myoMyo' )}>어바웃 묘묘</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/interior' )}>인테리어</a>
            </li>
            <li>
              <h5>Shop</h5>
              <a href="!#" onClick={(e)=>onClickA(e, '/shop' )}>묘묘굿즈</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/shop' )}>LP/CD</a>
            </li>
            <li>
              <h5>Menu</h5>
              <a href="!#" onClick={(e)=>onClickA(e, '/wine' )}>와인</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/drinks' )}>주류&음료</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/food' )}>플래터&핑거푸드</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/set' )}>묘한세트</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/pre' )}>사전주문</a>
            </li>
            <li>
              <h5>Schedule</h5>
              <a href="!#" onClick={(e)=>onClickA(e, '/monthly' )}>캘린더</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/artist' )}>아티스트 정보</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/buyTicket' )}>티켓 예매</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/lental' )}>대관 신청</a>
            </li>
            <li>
              <h5>Community</h5>
              <a href="!#" onClick={(e)=>onClickA(e, '/ntc' )}>공지사항</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/faq' )}>FAQ</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/faq' )}>1:1문의</a>
              <a href="!#" onClick={(e)=>onClickA(e, '/rev' )}>공연후기</a>
            </li>
          </ul>
        </div>

        <div className="footer-bottom-inner">
          <div className="footer-info">
            <div className="categories">
              <span className="CT">Categories</span><br />
              <a href="!#" onClick={(e)=>onClickA(e, '/aboutUs' )}>About us</a> |<a href="!#" onClick={(e)=>onClickA(e, 'shop' )}> Shop</a> |
              <a href="!#" onClick={(e)=>onClickA(e, '/menu' )}> Menu</a> | <span className="mobile-br"></span>
              <a href="!#" onClick={(e)=>onClickA(e, '/monthly' )}> Schedule</a> |<a href="!#" onClick={(e)=>onClickA(e, '/ntc' )}> Community</a>
              {isAdmin && (
  <>
     <br /> <a href="!#" onClick={(e) => onClickA(e, "/mm")}> 회원관리 관리자페이지</a>
  </>
)}
            </div>

            <div className="address">
              주소 : 서울 마포구 동교로
              <span className="nowrap">23길&nbsp;14</span> 복합빌딩 B1층
              재즈묘묘
              <br />
              운영시간 : 수~일 6PM~2AM (휴무일 대관 가능)
              <br />
              전화번호 : 02 - 500 - 5200
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
