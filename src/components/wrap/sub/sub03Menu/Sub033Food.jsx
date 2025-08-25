import React, { useState } from "react";
import './scss/Sub033Food.scss';
import useCustomA from "../../custom/useCustomA";

export default function Sub033Food (){
    
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("platter");
  const { onClickA } = useCustomA();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const platters = [
    {
      title: "묘묘의\n클래식 소파\n플래터",
      price: "₩22,000",
      image: "./img/sub03Food/01-1set.png",
      desc: "구성: 치즈 2종, 구운 아몬드, 버터 크래커, 솔티 크래커, 꿀, 생햄",
      wine: "추천 와인: 샤블리",
      explain: "소파에 푹 파묻힌 묘묘처럼, 부드럽고 향긋한 조합!"
    },
    {
      title: "묘묘의\n달빛 야식\n플래터",
      price: "₩23,000",
      image: "./img/sub03Food/01-2set.png",
      desc: "구성: 그라나 파다노, 브리치즈, 프로슈토, 살라미, 딸기, 샤인머스캣, 무화과, 아몬드, 크래커, 벌꿀",
      wine: "추천 와인: 브뤼 로제",
      explain: "달빛 아래 재즈 솔로처럼, 살짝 반짝이는 밤 안주 세트"
    },
    {
      title: "묘묘의\n과일정원\n플래터",
      price: "₩25,000",
      image: "./img/sub03Food/01-3set.png",
      desc: "구성: 샤인머스캣, 멜론, 수박, 파인애플, 바나나, 사과칩, 블루베리, 코코넛칩, 오렌지",
      wine: "추천 와인: 스파클링 or 로제",
      explain: "재즈처럼 가볍고 달콤하게 입 안을 정리해주는 마무리"
    }
  ];

  const sides = [
    { title: "크래커 & 치즈 한입 세트", price: "₩10,000", image: "./img/sub03Food/01food.png", desc: "담백한 치즈와 고소한 크래커의 조화로 입맛을 살려줘요." },
    { title: "무화과 크림치즈 바이트", price: "₩9,000", image: "./img/sub03Food/02food.png", desc: "달콤한 무화과와 크림치즈가 입 안에서 사르르 녹아요." },
    { title: "트러플 감자튀김", price: "₩9,000", image: "./img/sub03Food/03food.png", desc: "바삭함 속 은은한 풍미, 와인에 빠질 수 없는 클래식." },
    { title: "트러플 초콜릿 & 견과 세트", price: "₩8,000", image: "./img/sub03Food/04food.png", desc: "진한 초콜릿과 고소한 견과류가 부드럽게 어우러져요." },
    { title: "프로슈토 멜론 스틱", price: "₩11,000", image: "./img/sub03Food/05food.png", desc: "짭짤한 생햄과 달콤한 멜론이 탱고를 춰요." },
    { title: "바나나 푸딩", price: "₩8,500", image: "./img/sub03Food/06food.png", desc: "달콤한 바나나와 부드러운 커스터드, 사랑스러운 디저트." },
    { title: "스모어딥", price: "₩10,500", image: "./img/sub03Food/07food.png", desc: "구운 마시멜로와 바삭한 비스킷, 바닐라향이 퍼져요." },
    { title: "재즈 나초", price: "₩9,000", image: "./img/sub03Food/08food.png", desc: "바삭한 나초와 치즈, 살사, 사워크림의 환상 조합." },
    { title: "하몽 살라미 샐러드", price: "₩14,000", image: "./img/sub03Food/09food.png", desc: "풍성한 고기와 치즈의 깊은 풍미가 느껴지는 샐러드." },
    { title: "페퍼로니 피자\n(40cm / 한판)", price: "₩8,000 /₩16,000", image: "./img/sub03Food/10slice.png", desc: "누구나 좋아 하는 클래식 페퍼로니 피자." },
    { title: "하와이안 피자\n(40cm / 한판)", price: "₩8,000 /₩16,000", image: "./img/sub03Food/10-2slice.png", desc: "달콤한 파인애플과 햄의 조화, 하와이안 리듬." },
    { title: "고르곤졸라 피자\n(40cm / 한판)", price: "₩8,000 /₩16,000", image: "./img/sub03Food/10-3slice.png", desc: "짭짤한 고르곤졸라와 꿀의 달콤한 하모니." }
  ];

  return (
    <div id="sub_food">
      <div className="food-header">
        <h2>FOOD</h2>
        <div className="food-tabs">
          <button className={activeTab === "platter" ? "on" : ""} onClick={() => setActiveTab("platter")}>플래터</button>
          <button className={activeTab === "side" ? "on" : ""} onClick={() => setActiveTab("side")}>핑거푸드</button>
        </div>
      </div>

      {activeTab === "platter" && (
        <section className="platter-section">
          {platters.map((item, index) => (
            <div className="platter-box" key={index}>
              <div className="platter-img">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="platter-desc">
                <h2>
                  {item.title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>{line}<br/></React.Fragment>
                  ))}
                  <span>{item.price}</span>
                </h2>
                <p className="desc"><strong>구성:</strong> {item.desc.replace("구성: ", "")}</p>
                <p><strong>추천 와인:</strong> {item.wine.replace("추천 와인: ", "")}</p>
                <p className="explain">{item.explain}</p>

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
        </section>
      )}

      {activeTab === "side" && (
        <section className="side-section">
          <div className="side-grid">
            {sides.map((item, index) => (
              <div className="side-box" key={index} onClick={() => handleItemClick(item)}>
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {modalOpen && selectedItem && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setModalOpen(false)}>×</button>
            <img src={selectedItem.image} alt={selectedItem.title} />
            <h3>{selectedItem.title}</h3>
            <p>{selectedItem.price}</p>
            <p className="desc">맛: {selectedItem.desc || "맛 설명이 아직 없어요."}</p>

            <button
              type="button"
              className="reserve-btn"
              onClick={(e) => { e.stopPropagation(); onClickA(e, "/pre"); }}
            >
              사전예약 바로가기
              <i className="bi bi-arrow-right-short" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
