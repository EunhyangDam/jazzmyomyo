import React from "react";
import "./scss/Section10Component.scss";

export default function Section10Component() {
  const slides = [
    {
      no: "No.1",
      title: "클래식 나잇 듀오라묘",
      wine: "Mystic Merlot (레드 와인)",
      items: ["묘묘의 클래식 소파 플래터", "트러플 감자튀김"],
      img: "./img/main_menu/set01.png",
      price: "52,000",
    },
    {
      no: "No.2",
      title: "문라이트\n로맨틱라묘",
      wine: "Brut Rosé",
      items: ["묘묘의 달빛 야식 플래터", "프로슈토 멜론 스틱", "바나나 푸딩"],
      img: "./img/main_menu/set02.png",
      price: "52,000",
    },
    {
      no: "No.3",
      title: "묘묘의 깊은밤을 날아서",
      wine: "ShiShiraz Whisper (레드)",
      items: ["페퍼로니 피자", "하몽 살라미 샐러드"],
      img: "./img/main_menu/set03.png",
      price: "52,000",
    },
    {
      no: "No.4",
      title: "묘묘의\n달달한게\n딱 좋아",
      wine: "Moscato Dream (스파클링)",
      items: ["무화과 크림치즈 바이트", "트러플 초콜릿 & 견과"],
      img: "./img/main_menu/set04.png",
      price: "52,000",
    },
  ];

  return (
    <section id="section10">
      <div className="menu-intro">
        <div className="container">
          <div className="left-box-wrapper">
            <div className="left-box">
              <h2>
                이달의
                <br /> 묘묘's Pick!
              </h2>
              <p>
                재즈엔 뭘 곁들여야 할지 잘 모르시겠다구요?
                <br />
                그럴 땐 고민 말고 묘묘를 따라오세요!
                <br />
                분위기까지 챙긴 맛있는 조합을 추천해드릴게요.
              </p>
              <button className="view-more-button">
                <i className="bi bi-circle-fill"></i>
                VIEW MORE
              </button>
            </div>
          </div>

          <div className="right-box">
            {slides.map((slide, i) => (
              <div className="slide" key={i}>
                <div className="slide-inner">
                  <div className="image-box">
                    <img src={slide.img} alt={slide.title} />
                  </div>
                  <div className="info-box">
                    <div className="top">
                      <h3 className="set-title">
                        <span className="no">{slide.no}</span>
                        <br />
                        <span className="title">
                          {i === 1 || i === 3
                            ? slide.title.split("\n").map((line, idx) => (
                                <React.Fragment key={idx}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))
                            : slide.title}
                        </span>
                      </h3>
                      <ul>
                        {slide.items.map((item, j) => (
                          <li key={j}> - {item}</li>
                        ))}
                      </ul>
                    </div>
                    {slide.price && <div className="price">₩{slide.price}</div>}
                    <div className="detail-links">
                      <div className="link-item">
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>상세보기</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
