import { React, useState } from "react";
import './scss/Sub032Drinks.scss';

const drinksData = {
  beer: [
    {
      name: "클라우드 생맥주 500ml",
      type: "한국 라거",
      desc: "크리미하고 시원한 기본기 있는 생맥주",
      price: "₩ 8,000",
      img: "./img/sub02Drinks/01beer.png",
      pairing: "감자튀김과 잘 어울려요"
    },
    {
      name: "버드와이저",
      type: "아메리칸 라거",
      desc: "깔끔하고 가벼운 목넘김",
      price: "₩ 7,000",
      img: "./img/sub02Drinks/03-02.png",
      pairing: "스파이시 윙과 찰떡"
    },
    {
      name: "허니문배 Draft 330ml",
      type: "배 사이더",
      desc: "배즙과 꿀의 달콤함, 깊고 깔끔한 피니시",
      price: "₩ 9,500",
      img: "./img/sub02Drinks/03-03.png",
      pairing: "달콤한 견과류와 잘 어울려요"
    },
    {
      name: "스텔라 아르투아 330ml",
      type: "벨기에 라거",
      desc: "청량감 + 고소한 곡물향, 부담 없이 즐겨요",
      price: "₩ 9,000",
      img: "./img/sub02Drinks/02beer.png",
      pairing: "치즈 나쵸와 환상궁합!"
    }

  ],
  cocktail: [
    {
      name: "깔루아밀크",
      type: "달콤한 / 리큐르 베이스",
      desc: "커피 리큐르 + 우유의 부드러운 조화",
      price: "₩ 11,000",
      img: "./img/sub02Drinks/4kkalua.png",
      pairing: "초콜릿 디저트와 찰떡!"
    },
    {
      name: "모스카토 선셋",
      type: "달콤한 / 스파클링 베이스",
      desc: "모스카토 와인 + 복숭아 + 레몬",
      price: "₩ 12,000",
      img: "./img/sub02Drinks/5moscato.png",
      pairing: "과일 플래터랑 최고 조합"
    },
    {
      name: "클래식 네그로니",
      type: "미디엄 / 진 베이스",
      desc: "쌉쌀+달콤+쌉쌀 세 겹의 여운",
      price: "₩ 12,500",
      img: "./img/sub02Drinks/6classsic.png",
      pairing: "감바스와 찰떡궁합"
    },
    {
      name: "마티니 드라이",
      type: "드라이 / 진+베르무트",
      desc: "깔끔하고 도도한 한 잔",
      price: "₩ 13,000",
      img: "./img/sub02Drinks/7martini.png",
      pairing: "올리브 안주와 환상의 짝꿍"
    }
  ],
  whisky: [
    {
      name: "글렌리벳 12년",
      type: "스카치 싱글몰트",
      desc: "부드럽고 견고한 기본기",
      price: "₩ 13,000 / ₩ 130,000",
      img: "./img/sub02Drinks/8whisky.png",
      pairing: "드라이 치즈와 최고"
    },
    {
      name: "제임슨",
      type: "아이리시 위스키",
      desc: "깔끔하고 부담 없는 부드러운 마무리",
      price: "₩ 14,000 / ₩ 140,000",
      img: "./img/sub02Drinks/9whisky.png",
      pairing: "훈제 햄과 완벽 페어링"
    },
    {
      name: "잭다니엘",
      type: "테네시 위스키",
      desc: "풍부한 바닐라 향과 부드러운 바디감",
      price: "₩ 12,000 / ₩ 120,000",
      img: "./img/sub02Drinks/10whisky.png",
      pairing: "바비큐 플래터와 찰떡"
    },
    {
      name: "발렌타인",
      type: "스카치 블렌디드",
      desc: "은은한 스모키 향과 밸런스",
      price: "₩ 15,000 / ₩ 150,000",
      img: "./img/sub02Drinks/10-1.png",
      pairing: "견과류 믹스와 조화로워요"
    }
  ],
  nonalcohol: [
    {
      name: "샤인머스캣 에이드",
      type: "과일 에이드",
      desc: "향긋하고 달콤한 무알콜 스파클링",
      price: "₩ 8,000",
      img: "./img/sub02Drinks/11muscat.png",
      pairing: "샐러드나 크래커와 어울려요"
    },
    {
      name: "복숭아 아이스티",
      type: "논알콜티",
      desc: "달콤하고 시원한 여름 티",
      price: "₩ 5,000",
      img: "./img/sub02Drinks/11jamong.png",
      pairing: "케이크류와 잘 어울림"
    },
    {
      name: "탄산음료",
      type: "제로콜라 / 콜라 / 스프라이트",
      desc: "기본에 충실한 시원한 탄산음료",
      price: "₩ 4,000",
      img: "./img/sub02Drinks/12coke.jpg",
      pairing: "버거류랑 찰떡궁합"
    },
    {
      name: "에비앙",
      type: "생수",
      desc: "맑고 깨끗한 프랑스 생수",
      price: "₩ 3,000",
      img: "./img/sub02Drinks/12water.png",
      pairing: "모든 음식과 조화로워요"
    }
  ]
};

export default function Sub032Drinks() {

  const [activeTab, setActiveTab] = useState('beer');

  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (key) => {
    setFlippedCards((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderSection = (id, title, data) => (
    <section id={id} className={`drink-section ${id}`}>
      <h2>{title}</h2>
      <div className="drink-grid">
        {data.slice(0, 4).map((item, idx) => {
          const key = `${id}-${idx}`;
          const flipped = flippedCards[key];

          return (
            <div
              className={`drink-card ${flipped ? 'flipped' : ''}`}
              key={key}
              onClick={() => toggleFlip(key)}
            >
              <div className="card-inner">
              <div className="card-front">
                  <img src={item.img} alt={item.name} />
              </div>
                <div className="card-back">
                  <h3>{item.name}</h3>
                  <p className="type">{item.type}</p>
                  <p className="desc">{item.desc}</p>
                  <p className="pairing">{item.pairing}</p>
                  <p className="price">{item.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <div id="sub_drinks">
      <h1 className="title">DRINKS</h1>
      <nav className="drink-nav">
        <ul>
          <li>
            <a
              href="#beer"
              className={activeTab === 'beer' ? 'active' : ''}
              onClick={() => setActiveTab('beer')}
            >
              맥주
            </a>
          </li>
          <li>
            <a
              href="#cocktail"
              className={activeTab === 'cocktail' ? 'active' : ''}
              onClick={() => setActiveTab('cocktail')}
            >
              칵테일
            </a>
          </li>
          <li>
            <a
              href="#whisky"
              className={activeTab === 'whisky' ? 'active' : ''}
              onClick={() => setActiveTab('whisky')}
            >
              위스키
            </a>
          </li>
          <li>
            <a
              href="#nonalcohol"
              className={activeTab === 'nonalcohol' ? 'active' : ''}
              onClick={() => setActiveTab('nonalcohol')}
            >
              무알콜
            </a>
          </li>
        </ul>
      </nav>


      {renderSection('beer', '맥주', drinksData.beer)}
      {renderSection('cocktail', '칵테일', drinksData.cocktail)}
      {renderSection('whisky', '위스키', drinksData.whisky)}
      {renderSection('nonalcohol', '무알콜 & 음료', drinksData.nonalcohol)}

      <button
        className="top-btn"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
          document.body.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        TOP
      </button>

    </div>
  );
}