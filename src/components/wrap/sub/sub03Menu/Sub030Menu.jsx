import React from "react";
import './scss/Sub030Menu.scss';
import { Link } from "react-router-dom";

function Sub030Menu() {
  const wineData = [
    {
      group: "레드 와인 (Red)",
      items: [
        { name: "Chablis", price: "₩35,000" },
        { name: "Argento Malbec", price: "₩42,000" },
        { name: "Shiraz Whisper", price: "₩46,000" },
      ]
    },
    {
      group: "화이트 와인 (White)",
      items: [
        { name: "Riesling Touch", price: "₩39,000" },
        { name: "Brut Rosé", price: "₩45,000" },
        { name: "Petit Chablis", price: "₩41,000" },
      ]
    },
    {
      group: "스파클링 와인 (Sparkling)",
      items: [
        { name: "Moscato Dream", price: "₩48,000" },
        { name: "Crémant Rosé", price: "₩52,000" },
        { name: "Cava Estrella", price: "₩40,000" },
      ]
    },
  ];

  const drinkData = [
    {
      group: "맥주 (Beer)",
      items: [
        { name: "클라우드 생맥주 500ml", price: "₩8,000" },
        { name: "스텔라 아르투아 330ml", price: "₩9,000" },
        { name: "허니문배 Draft 330ml", price: "₩8,500" },
        { name: "흑맥주", price: "₩9,000" },
      ]
    },
    {
      group: "칵테일 (Cocktail)",
      items: [
        { name: "깔루아밀크", price: "₩10,000" },
        { name: "모스카토 선셋", price: "₩11,000" },
        { name: "클래식 네그로니", price: "₩12,000" },
        { name: "마티니 드라이", price: "₩12,000" },
      ]
    },
    {
      group: "위스키 (Whisky)",
      items: [
        { name: "글렌리벳 12년", price: "₩14,000" },
        { name: "제임슨", price: "₩13,000" },
        { name: "잭다니엘", price: "₩13,000" },
        { name: "시바스대갈", price: "₩14,000" },
      ]
    },
    {
      group: "무알콜 / 음료 (Non-Alcoholic)",
      items: [
        { name: "샤인머스캣 에이드", price: "₩7,000" },
        { name: "자몽에이드", price: "₩7,000" },
        { name: "탄산음료", price: "₩3,000" },
        { name: "에비앙", price: "₩4,000" },
      ]
    },
  ];

  const platterItems = [
    { name: "묘묘의 클래식 소파 플래터", price: "₩28,000" },
    { name: "묘묘의 달빛 야식 플래터", price: "₩26,000" },
    { name: "묘묘의 과일정원 플래터", price: "₩20,000" },
    { name: "크래커 & 치즈 한입 세트", price: "₩8,000" },
    { name: "무화과 크림치즈 바이트", price: "₩8,000" },
    { name: "트러플 감자튀김", price: "₩8,000" },
    { name: "트러플 초콜릿 & 견과 세트", price: "₩8,000" },
    { name: "프로슈토 멜론 스틱", price: "₩8,000" },
    { name: "바나나 푸딩", price: "₩6,000" },
    { name: "스모어딥", price: "₩6,000" },
    { name: "재즈 나초", price: "₩8,000" },
    { name: "하몽 살라미 샐러드", price: "₩10,000" },
    { name: "피자 1조각 (40cm)", price: "₩8,000" },
    { name: "피자 한판", price: "₩18,000" },
  ];

  const setItems = [
    { name: "클래식 나잇 듀오라묘", price: "₩64,000" },
    { name: "문라이트 로맨틱라묘", price: "₩70,000" },
    { name: "샤르르 달콤하묘", price: "₩68,000" },
  ];

  return (
    <div id="sub_menu">
      <div className="clipboard">
        <div className="clip"></div>
        <div className="paper">
          <h1>묘묘의 메뉴판</h1>
          <p className="subtitle">Jazz와 어울리는 한 잔, 그리고 한 입</p>

          <nav className="menu-nav">
              <Link to="/Wine"><span>WINE</span></Link>
              <Link to="/Drinks"><span>DRINKS</span></Link>
              <Link to="/Food"><span>FOOD</span></Link>
              <Link to="/Set"><span>MYOHAN SET</span></Link>
              <Link to="/Pre"><span>PRE-OREDER</span></Link>
          </nav>

          <div className="paper-sections">
            <div className="section" id="wine">
              <h2>
                <Link to='/Wine'>와인</Link>
                </h2>
              {wineData.map((group, idx) => (
                <div className="subgroup" key={idx}>
                  <h3>{group.group}</h3>
                  <ul className="menu-ul">
                    {group.items.map((item, i) => (
                      <li className="menu-title" key={i}>
                        <span>{item.name}</span><span>{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="section" id="drink">
              <h2> 
              <Link to='/Drinks'>주류 & 음료</Link>
              </h2>
              {drinkData.map((group, idx) => (
                <div className="subgroup" key={idx}>
                  <h3>{group.group}</h3>
                  <ul className="menu-ul">
                    {group.items.map((item, i) => (
                      <li className="menu-title" key={i}>
                        <span>{item.name}</span><span>{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="section" id="platter">
              <h2>
              <Link to='/Food'>플래터 & 핑거푸드</Link>
              </h2>
              <ul className="menu-ul">
                {platterItems.map((item, idx) => (
                  <li className="menu-title" key={idx}>
                    <span>{item.name}</span><span>{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="section" id="set">
              <h2>
              <Link to='/Set'>묘한세트</Link>  
              </h2>
              <ul className="menu-ul">
                {setItems.map((item, idx) => (
                  <li className="menu-title" key={idx}>
                    <span>{item.name}</span><span>{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="section" id="preorder">
              <h2>
                <Link to='/Pre'>사전주문</Link>
              </h2>
              <p>공연 전 미리 음식을 준비해서<br/> 여유롭게 즐기세요!</p>
            </div>

            <div className="section logo-section">
              <img src="./img/footer/logo3.png" alt="묘묘 로고" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub030Menu;