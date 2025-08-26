/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import './scss/Sub034Set.scss';
import useCustomA from "../../custom/useCustomA";

const setData = [
  {
    id: 0,
    images: [
      './img/sub04Set/set01.png',
      './img/sub04Set/fry.png',
      './img/sub04Set/set1.png',
    ],
    captions: ['묘묘의 클래식 소파 플래터', '트러플 감자튀김', '추천합니다'],
    title: '[클래식 나잇 듀오라묘]',
    tagline: '첫 재즈바 데이트에 딱',
    items: [
      '• 묘묘의 클래식 소파 플래터 (₩21,000)',
      '• 트러플 감자튀김 (₩9,000)',
    ],
    wine: '[레드] Chablis (₩38,000) – 은은한 탄닌, 부라타와 찰떡',
    originPrice: '₩68,000',
    salePrice: '₩58,000',
    image: './img/sub04Set/set1.png',
  },
  {
    id: 1,
    images: [
      './img/sub04Set/set02.png',
      './img/sub04Set/melon.png',
      './img/sub04Set/banana.png',
    ],
    captions: ['묘묘의 달빛 야식 플래터', '프로슈토 멜론 스틱', '바나나 푸딩'],
    title: '[문라이트 로맨틱라묘]',
    tagline: '공연 즐기면서 로맨틱하게',
    items: [
      '• 묘묘의 달빛 야식 플래터 (₩22,000)',
      '• 프로슈토 멜론 스틱 (₩10,000)',
      '• 바나나 푸딩 (₩7,000)',
    ],
    wine: '[화이트] Brut Rosé (₩36,000)',
    originPrice: '₩75,000',
    salePrice: '₩65,000',
    image: './img/sub04Set/set2.png',
  },
  {
    id: 2,
    images: [
      './img/sub04Set/set03.png',
      './img/sub04Set/08food.png',
      './img/sub04Set/chocoletamond.png',
    ],
    captions: ['모둠 과일 플래터', '재즈 나초', '트러플 초콜릿&견과'],
    title: '[샤르르 달콤하묘]',
    tagline: '친구들과 수다·사진·재즈!',
    items: [
      '• 모둠 과일 플래터 (₩20,000)',
      '• 재즈 나초 (₩8,000)',
      '• 트러플 초콜릿&견과 (₩8,000)',
    ],
    wine: '[스파클링] Cava Estrella (₩40,000) – 산미+은은한 단맛으로 과일, 견과, 나초 모두 커버',
    originPrice: '₩76,000',
    salePrice: '₩68,000',
    image: './img/sub04Set/set3.png',
  },
];

export default function Sub034Set() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const { onClickA } = useCustomA();
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      },
      { threshold: 0.2 }
    );
    const targets = wrapRef.current.querySelectorAll('.fade-up');
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const openModal = (index) => {
    setCurrent(index);
    setIsModalOpen(true);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + setData.length) % setData.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % setData.length);
  };

  const prev = setData[(current - 1 + setData.length) % setData.length];
  const main = setData[current];
  const next = setData[(current + 1) % setData.length];

  return (
    <div id="sub_set" ref={wrapRef}>
      <div className="set-container">

        <nav className="breadcrumbs" aria-label="breadcrumb">
          <a href="/" className="home" onClick={(e) => onClickA(e, "/")}>
            <i className="bi bi-house-fill" aria-hidden="true" />
            <span className="sr">홈</span>
          </a>
          <span className="sep"><i className="bi bi-chevron-right" /></span>
          <a href="/" onClick={(e) => onClickA(e, "/menu")}>MENU</a>
          <span className="sep"><i className="bi bi-chevron-right" /></span>
          <strong>묘한세트</strong>
        </nav>

        <section className="set-header fade-up" style={{ transitionDelay: '0.04s' }}>
          <h2>MYOHAN SET</h2>
          <p>묘한세트 : 플래터 + 안주 + 와인을 조합한 시그니처 세트</p>
          <p>
            2~3인이 핑거푸드만으로도 충분히 즐길 수 있도록, 베스트 조합의
            플래터·안주·와인을 한 번에 묶은 세트 메뉴입니다.
          </p>
          <p className="highlight">※ 표기 가격은 10% 할인된 세트가입니다.</p>
        </section>

        <div className="set-list">
          {setData.map((set, idx) => (
            <div
              className={`set-item ${idx % 2 === 1 ? 'row-reverse' : ''} fade-up`}
              key={set.id}
              style={{ transitionDelay: `${0.1 + idx * 0.08}s` }}
            >
              <div
                className="set-img"
                onClick={() => openModal(idx)}
                style={{ cursor: 'url(/img/main_menu/cursor-cat.png), auto' }}
              >
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
                  <span className="origin">{set.originPrice}</span> →{' '}
                  <span className="sale">{set.salePrice}</span>
                </p>
                <button
                  type="button"
                  className="reserve-btn"
                  onClick={(e) => onClickA(e, "/pre")}
                  aria-label="사전예약 바로가기"
                >
                  사전예약 바로가기
                  <i className="bi bi-arrow-right-short" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-thumb left" onClick={handlePrev}>
            <img src={prev.image} alt="prev" />
          </div>
          <div className="modal-arrow left" onClick={handlePrev}>
            <i className="bi bi-chevron-left"></i>
          </div>

          <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="modal-images">
              {main.images.map((img, i) => (
                <div className="img-item" key={i}>
                  <img src={img} alt={`image-${i}`} />
                  <div className="img-caption">{main.captions[i]}</div>
                </div>
              ))}
            </div>
            <div className="modal-desc">
              {main.title} <br />
              {main.tagline}
            </div>
            <div className="modal-wine">{main.wine}</div>
            <div className="modal-price">
              <span className="origin">{main.originPrice}</span>
              <span className="sale">{main.salePrice}</span>
            </div>
            <button
              type="button"
              className="reserve-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClickA(e, "/pre");
              }}
              aria-label="사전예약 바로가기"
            >
              사전예약 바로가기
              <i className="bi bi-arrow-right-short" aria-hidden="true" />
            </button>
          </div>

          <div className="modal-arrow right" onClick={handleNext}>
            <i className="bi bi-chevron-right"></i>
          </div>
          <div className="modal-thumb right" onClick={handleNext}>
            <img src={next.image} alt="next" />
          </div>
        </div>
      )}
    </div>
  );
}
