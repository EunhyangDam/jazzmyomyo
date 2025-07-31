import React, { useState } from 'react';
import './scss/Sub034Set.scss';

const setData = [
  {
    id: 0,
    images: [
      './img/sub04Set/set01.png',
      './img/sub04Set/set02.png',
      './img/sub04Set/set03.png'
    ],
     captions: [
    '모둠 과일 플래터',
    '재즈 나초',
    '트러플 초콜릿&견과'
    ],
    title: '클래식 나잇 듀오라묘',
    tagline: '첫 재즈바 데이트에 딱',
    items: [
      '• 묘묘의 클래식 소파 플래터 (₩21,000)',
      '• 트러플 감자튀김 (₩9,000)'
    ],
    wine: '[레드] Chablis (₩38,000) – 은은한 탄닌, 부라타와 찰떡',
    originPrice: '₩68,000',
    salePrice: '₩58,000',
    image: './img/sub04Set/set01.png'
  },
  {
    id: 1,
    images: [
      './img/sub04Set/set01.png',
      './img/sub04Set/set02.png',
      './img/sub04Set/set03.png'
    ],
     captions: [
    '모둠 과일 플래터',
    '재즈 나초',
    '트러플 초콜릿&견과'
    ],
    title: '문라이트 로맨틱라묘',
    tagline: '공연 즐기면서 로맨틱하게',
    items: [
      '• 묘묘의 달빛 야식 플래터 (₩22,000)',
      '• 프로슈토 멜론 스틱 (₩10,000)',
      '• 바나나 푸딩 (₩7,000)'
    ],
    wine: '[화이트] Brut Rosé (₩36,000)',
    originPrice: '₩75,000',
    salePrice: '₩65,000',
    image: './img/sub04Set/set02.png'
  },
  {
    id: 2,
    images: [
      './img/sub04Set/set01.png',
      './img/sub04Set/set02.png',
      './img/sub04Set/set03.png'
    ],
         captions: [
    '모둠 과일 플래터',
    '재즈 나초',
    '트러플 초콜릿&견과'
    ],
    title: '샤르르 달콤하묘',
    tagline: '친구들과 수다·사진·재즈!',
    items: [
      '• 모둠 과일 플래터 (₩20,000)',
      '• 재즈 나초 (₩8,000)',
      '• 트러플 초콜릿&견과 (₩8,000)'
    ],
    wine: '[스파클링] Cava Estrella (₩40,000) – 산미+은은한 단맛으로 과일, 견과, 나초 모두 커버',
    originPrice: '₩76,000',
    salePrice: '₩68,000',
    image: './img/sub04Set/set03.png'
  }
];

export default function Sub034Set() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const openModal = (index) => {
    setCurrent(index);
    setIsModalOpen(true);
  };


const prev = setData[(current - 1 + setData.length) % setData.length];
const main = setData[current];
const next = setData[(current + 1) % setData.length];

  return (
    <div id="sub_set">
      <section className="set-header">
        <h2>MYOHAN SET</h2>
        <p>묘한세트 : 플래터 + 안주 + 와인을 조합한 시그니처 세트</p>
        <p>2~3인이 핑거푸드만으로도 충분히 즐길 수 있도록, 베스트 조합의 플래터·안주·와인을 한 번에 묶은 세트 메뉴입니다.</p>
        <p className="highlight">※ 표기 가격은 10% 할인된 세트가입니다.</p>
      </section>

      <div className="set-list">
        {setData.map((set, idx) => (
          <div className={`set-item ${idx % 2 === 1 ? 'row-reverse' : ''}`}>
            <div className="set-img" onClick={() => openModal(idx)}> {/* ✅ 여기에만 onClick */}
                <img src={set.image} alt={set.title} />
            </div>
            <div className="set-text">
              <h3>{set.title}</h3>
              <p className="tagline">{set.tagline}</p>
              <ul>
                {set.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="wine">{set.wine}</p>
              <p className="price">
                <span className="origin">{set.originPrice}</span> → <span className="sale">{set.salePrice}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
            <img
            className="modal-thumb left"
            src={prev.image}
            alt="prev"
            onClick={(e) => {
                e.stopPropagation();
                setCurrent((current - 1 + setData.length) % setData.length);
            }}
            />

            <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="modal-images">
  {main.images.map((src, i) => (
    <div className="img-item" key={i}>
      <img src={src} alt={`modal-${i}`} />
      <p className="img-caption">{main.captions[i]}</p>
    </div>
  ))}
</div>
            <h3>{main.title}</h3>
            <p className="modal-desc">{main.tagline}</p>
            <ul>
                {main.items.map((item, i) => (
                <li key={i}>{item}</li>
                ))}
            </ul>
            <p>{main.wine}</p>
            <p className="price">
                <span className="origin">{main.originPrice}</span> → <span className="sale">{main.salePrice}</span>
            </p>
            </div>

            <img
            className="modal-thumb right"
            src={next.image}
            alt="next"
            onClick={(e) => {
                e.stopPropagation();
                setCurrent((current + 1) % setData.length);
            }}
            />
        </div>
    )}

    </div>
  );
}