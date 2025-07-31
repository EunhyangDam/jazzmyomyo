import React from "react";
import "./scss/Section3Component.scss";



export default function Section3Component(props) {

  const [artists, setArtists] = React.useState([]);

  React.useEffect(() => {
    fetch("/json/section3/section3.json") // public 폴더 기준
      .then((res) => {
        if (!res.ok) throw new Error("네트워크 오류");
        return res.json();
      })
      .then((data) => {
        setArtists(data.artistData);
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err);
      });
  }, []);


  return (
    <div id="section3Component" className="section">
      <div className="con-info">
        {/* 공연정보 헤드 텍스트 */}
        <div className="con-head">
          <h2>공연정보</h2>
          <p>묘~하게 빠져드는 공연 소식! 지금 재즈묘묘에서 확인해보세요</p>
        </div>

        {/* 공연 목록 */}
        <div className="con-grid">
          {/* 포스터1 */}
          <div className="con-item item-a">
            <img src="./img/poster1.png" alt="" />
            <h3>가리온 X 재즈묘묘 : 모두의 마이크</h3>
            <p>[공연일 : 2025년 07월 25일]</p>
          </div>

          {/* 포스터2 */}
          <div className="con-item item-b">
            <img src="./img/poster2.jpg" alt="" />
            <h3>천진우 단독콘서트 : 오싹 오싹 공포의 인간쓰레기</h3>
            <p>[공연일 : 2025년 08월 17일]</p>
          </div>

          {/* 포스터3 */}
          <div className="con-item item-c">
            <img src="./img/poster3.jpg" alt="" />
            <h3>FRIDAY Ahn Dayoung & Marrakech</h3>
            <p>[공연일 : 2025년 08월 15일]</p>
          </div>

          {/* 포스터4 */}
          <div className="con-item item-d">
            <img src="./img/poster4.jpg" alt="" />
            <h3>기쿠하시 단독콘서트 : 섬광 퍼레이드</h3>
            <p>[공연일 : 2025년 08월 14일]</p>
          </div>

          {/* 포스터5 */}
          <div className="con-item item-e">
            <img src="./img/poster5.jpg" alt="" />
            <h3>2025 CMYK : 아사달 & 투모로우</h3>
            <p>[공연일 : 2025년 08월 08일]</p>
          </div>

          {/* 포스터6 */}
          <div className="con-item item-f">
            <img src="./img/poster6.jpg" alt="" />
            <h3>적란운 단독콘서트 : 회색지대</h3>
            <p>[공연일 : 2025년 07월 18일]</p>
          </div>

          {/* 포스터7 */}
          <div className="con-item item-g">
            <img src="./img/poster7.jpg" alt="" />
            <h3>베리코이버니 단독콘서트 : Dream Hacker</h3>
            <p>[공연일 : 2025년 06월 27일]</p>
          </div>

          {/* 포스터8 */}
          <div className="con-item item-h">
            <img src="./img/poster8.jpg" alt="" />
            <h3>오이스터 단독콘서트 : What If We Missed</h3>
            <p>[공연일 : 2025년 05월 10일]</p>
          </div>

          {/* 포스터9 */}
          <div className="con-item item-i">
            <img src="./img/poster9.jpg" alt="" />
            <h3>Paloalto 단독콘서트 : JAZZHOP</h3>
            <p>[공연일 : 2025년 06월 14일]</p>
          </div>

          {/* 포스터10 */}
          <div className="con-item item-j">
            <img src="./img/poster10.jpg" alt="" />
            <h3>김승주 단독 콘서트 : Hint</h3>
            <p>[공연일 : 2025년 04월 04일]</p>
          </div>

          {/* 포스터11 */}
          <div className="con-item item-k">
            <img src="./img/poster11.jpg" alt="" />
            <h3>고고학 단독 콘서트 : 파도</h3>
            <p>[공연일 : 2025년 04월 03일]</p>
          </div>

          {/* 포스터12 */}
          <div className="con-item item-l">
            <img src="./img/poster12.jpg" alt="" />
            <h3>이글루베이 단독 콘서트 : 영혼상점</h3>
            <p>[공연일 : 2025년 03월 06일]</p>
          </div>
        </div>
      </div>
    </div>
  );
}
