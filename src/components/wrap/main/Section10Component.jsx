import React, { useRef } from "react";
import "./scss/Section10Component.scss";
import useCustomA from "../custom/useCustomA";

export default function Section10Component() {
  const { onClickA } = useCustomA();
  const slides = [
    {
      no: "No.1",
      title: "클래식 나잇 듀오라묘",
      wine: "Mystic Merlot (레드)",
      items: ["묘묘의 클래식 소파 플래터", "트러플 감자튀김"],
      img: "./img/main_menu/set01.png",
      price: "52,000",
    },
    {
      no: "No.2",
      title: "문라이트 로맨틱라묘",
      wine: "Brut Rosé (화이트)",
      items: ["묘묘의 달빛 야식 플래터", "프로슈토 멜론 스틱", "바나나 푸딩"],
      img: "./img/main_menu/set02.png",
      price: "73,000",
    },
    {
      no: "No.3",
      title: "묘묘의 깊은밤을\n날아서",
      wine: "Shiraz Whisper (레드)",
      items: ["페퍼로니 피자", "하몽 살라미 샐러드"],
      img: "./img/main_menu/set03.png",
      price: "55,000",
    },
    {
      no: "No.4",
      title: "묘묘의\n달달한게 딱 좋아",
      wine: "Moscato Dream (스파클링)",
      items: ["무화과 크림치즈 바이트", "트러플 초콜릿 & 견과"],
      img: "./img/main_menu/set04.png",
      price: "47,000",
    },
  ];

  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    scrollRef.current.classList.add("active");
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    scrollRef.current.classList.remove("active");
  };

  const handleMouseUp = () => {
    isDown.current = false;
    scrollRef.current.classList.remove("active");
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section id="section10">
      <div className="horizontal-wrapper">
        <div className="horizontal-title">
          <h2>이달의 묘묘's Pick!</h2>
          <p>
            재즈엔 뭘 곁들여야 할지 잘 모르시겠다구요?
            <br />그럴 땐 고민 말고 묘묘를 따라오세요!
            <br />분위기까지 챙긴 조합을 추천해드릴게요.
          </p>
        </div>

        <div
          className="horizontal-scroll"
          ref={scrollRef}
          style={{
            cursor: `url("/img/main_menu/cursor-cat.png") 8 8, grab`,
          }}
        >
          {slides.map((slide, i) => (
            <div className="slide" key={i}>
              <img
                src={slide.img}
                alt={slide.title}
                style={{ cursor: `url("/img/main_menu/cursor-cat.png") 8 8, default` }}
              />
              <div
                className="info"
                style={{ cursor: `url("/img/main_menu/cursor-cat.png") 8 8, grab` }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <h3>{slide.no}</h3>

                {/* Fragment 제거: \n 줄바꿈을 CSS로 처리 */}
                <h4 className="title" style={{ whiteSpace: "pre-line" }}>
                  {slide.title}
                </h4>

                <ul>
                  <li>- {slide.wine}</li>
                  {slide.items.map((item, j) => (
                    <li key={j}>- {item}</li>
                  ))}
                </ul>

                <p className="price">₩{slide.price}</p>

                <div className="detail-links">
                  <a
                    href={i < 2 ? "/set" : "/food"}
                    onClick={(e) => onClickA(e, i < 2 ? "/set" : "/food")}
                    className="link-item"
                    style={{ cursor: `url("/img/main_menu/cursor-cat2.png") 8 8, pointer` }}
                  >
                    <i className="bi bi-box-arrow-in-right"></i>
                    <span>상세보기</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
