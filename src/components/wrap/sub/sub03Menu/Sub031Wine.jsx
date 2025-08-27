import React, { useState, useEffect, useRef } from "react";
import "./scss/Sub031Wine.scss";
import useCustomA from "../../custom/useCustomA";
import { useLocation } from "react-router-dom";

const wineData = {
  red: [
    { name: "Shiraz Whisper", desc: "풍부한 바디감과 스파이스 향의 레드 와인", food: "페퍼로니 피자", price: "₩40,000", img: "./img/sub01Wine/red01.png" },
    { name: "Merlot Charm", desc: "부드럽고 달콤한 레드 와인", food: "트러플 초콜릿", price: "₩42,000", img: "./img/sub01Wine/red02.jpg" },
    { name: "Cabernet Soul", desc: "깊은 탄닌과 블랙베리 향이 특징", food: "하몽살라미샐러드", price: "₩44,000", img: "./img/sub01Wine/red03.png" }
  ],
  white: [
    { name: "Chardonnay Dream", desc: "바닐라와 과일향이 어우러진 화이트 와인", food: "리코타 샐러드", price: "₩39,000", img: "/img/sub01Wine/white01.png" },
    { name: "Sauvignon Breeze", desc: "상큼하고 가벼운 바디감", food: "감바스", price: "₩41,000", img: "./img/sub01Wine/white02.png" },
    { name: "Riesling Light", desc: "은은한 단맛과 산미의 조화", food: "그릴드 치킨", price: "₩43,000", img: "./img/sub01Wine/white03.jpg" }
  ],
  sparkling: [
    { name: "Cava Estrella", desc: "깔끔한 산미와 은은한 단맛", food: "모둠 과일 플래터", price: "₩38,000", img: "./img/sub01Wine/sparkling01.jpg" },
    { name: "Crémant Rosé", desc: "로맨틱한 핑크빛의 스파클링", food: "딸기 타르트", price: "₩40,000", img: "./img/sub01Wine/sparkling02.jpg" },
    { name: "Prosecco Lush", desc: "가벼운 탄산과 상쾌함", food: "치즈 플래터", price: "₩42,000", img: "./img/sub01Wine/sparkling03.png" }
  ]
};

export default function Sub03Wine() {
  const { onClickA } = useCustomA();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("red");
  const containerRef = useRef(null);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const t = q.get("tab");
    if (t === "red" || t === "white" || t === "sparkling") setActiveTab(t);
    else setActiveTab("red");
  }, [location.search]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const items = root.querySelectorAll(".wine-item");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    items.forEach((el) => io.observe(el));
    requestAnimationFrame(() => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.85) el.classList.add("show");
      });
    });
    return () => io.disconnect();
  }, [activeTab]);

  const changeTab = (type) => {
    setActiveTab(type);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", type);
    window.history.replaceState(null, "", url.toString());
  };

  const onClickReserve = (e, tab) => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState(null, "", url.toString());
    onClickA(e, "/pre");
  };

  return (
    <div id="sub_wine" ref={containerRef}>
      <div className="wine-container">

        <nav className="breadcrumbs" aria-label="breadcrumb">
          <a href="/" className="home" onClick={(e) => onClickA(e, "/")}>
            <i className="bi bi-house-fill" aria-hidden="true" />
            <span className="sr">홈</span>
          </a>
          <span className="sep"><i className="bi bi-chevron-right" /></span>
          <a href="/" onClick={(e) => onClickA(e, "/menu")}>MENU</a>
          <span className="sep"><i className="bi bi-chevron-right" /></span>
          <strong>와인</strong>
        </nav>

        <h2 className="wine-title">WINE</h2>
        <p className="wine-event">9월 한 달간 한 잔 4,000원! (정가 5,500원)</p>

        <div className="wine-tabs">
          {["red", "white", "sparkling"].map((type) => (
            <button
              key={type}
              className={activeTab === type ? "on" : ""}
              onClick={() => changeTab(type)}
            >
              {type === "red" ? "레드" : type === "white" ? "화이트" : "스파클링"}
            </button>
          ))}
        </div>

        <div className="wine-list">
          {wineData[activeTab].map((wine, idx) => (
            <div
              className={`wine-item ${idx % 2 === 1 ? "reverse" : ""}`}
              key={`${activeTab}-${idx}`}
              style={{ transitionDelay: `${idx * 0.08}s` }}
            >
              <div className="wine-text">
                <h3>{wine.name}</h3>
                <p className="desc">{wine.desc}</p>
                <p className="food">어울리는 안주: {wine.food}</p>
                <p className="price">{wine.price}</p>
                <button
                  type="button"
                  className="reserve-btn"
                  onClick={(e) => onClickReserve(e, activeTab)}
                >
                  사전예약 바로가기
                  <i className="bi bi-arrow-right-short" aria-hidden="true" />
                </button>
              </div>
              <div className="wine-image">
                <img src={wine.img} alt={wine.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
