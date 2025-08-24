import React, { useEffect, useRef, useState } from "react";
import "../scss/sub.scss";
import "./scss/Sub01AboutUs.scss";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import SplitText from "../../custom/SplitText";
export default function Sub01AboutUs(props) {
  const [hover, setHover] = useState(false);
  const [state, setState] = useState({
    list: [],
    rowIdx: 0,
  });
  /**--------------------------------------------------------------------------------- */
  useEffect(() => {
    fetch("./json/sub01/img.json", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setState({ ...state, list: res.list });
      })
      .catch((err) => {
        alert("ERROR");
        console.log(err);
      });
  }, []);
  /**--------------------------------------------------------------------------------- */
  /**#section 1 */
  const section1H2 = useRef();
  useGSAP(
    () => {
      gsap.from(".char", { opacity: 0, y: "150%", rotate: 90, stagger: 0.07 });
    },
    { scope: section1H2 }
  );
  const section1Txt = useRef();
  useGSAP(() => {
    gsap.from(section1Txt.current, {
      opacity: 0,
      y: "50%",
      duration: 0.6,
      delay: 0.07 * 10,
    });
  });
  /**#section 2 */
  const section2 = useRef();
  const section2Img = useRef();
  useEffect(() => {
    const eventHandler = (e) => {
      if (hover) return;
      gsap.to(section2Img.current, {
        left: e.clientX - section2.current.getBoundingClientRect().left,
        top: e.clientY - section2.current.getBoundingClientRect().top,
        duration: 0.2,
      });
    };
    window.addEventListener("mousemove", eventHandler);
    return () => window.removeEventListener("mousemove", eventHandler);
  }, []);
  /**#section 3 */
  const section3 = useRef();
  const section3Img = useRef();
  useGSAP(() => {
    const sections = gsap.utils.toArray(".sec");
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: section3.current,
        pin: true,
        scrub: 1,
        start: "center center",
        end: () => "+=" + section3.current.scrollWidth,
        onUpdate: (self) => {},
      },
    });
    ScrollTrigger.create({
      trigger: section3.current,
      pin: section3Img.current,
      start: "top top",
      end: () => "+=" + section3.current.scrollWidth,
    });
  }, []);
  /**#section 6 */
  const section6Content = useRef();
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: section6Content.current,
      pin: true,
      scrub: true,
      start: "top top",
      end: `+=${
        document.querySelector("#section6 .img-container").scrollHeight
      }`,
    });
  });
  /**--------------------------------------------------------------------------------- */
  const mouseEnterRow = (e, idx) => {
    setState({ ...state, rowIdx: idx });
  };
  /**--------------------------------------------------------------------------------- */
  useEffect(() => {}, []);
  return (
    <main id="sub01AboutUs" className="sub-page">
      <section id="section1" className="section">
        <div className="inner">
          <h2 ref={section1H2}>
            <SplitText text="JAZZMYOMYO" />
          </h2>
          <div className="text-container" ref={section1Txt}>
            <p>JAZZ AREA. YES, JAZZ, 그냥 음악이 아니라, 우리만의 리듬.</p>
            <p>
              우리는 음악과 사람, 그리고 순간이 만나는 공간입니다. 늘 변화하고,
              서로 다른 색들이 섞여 하나의 무드가 되는 곳이죠. 재즈묘묘는 함께
              만드는 가치에 믿음을 둡니다. 한 곡의 연주든, 한 잔의 술이든, 모든
              순간은 함께 호흡하는 사람들의 손끝에서 완성됩니다. 리가 묻는
              질문은 단순합니다. “이건 정말 우리의 이야기를 담고 있는가?” 이유
              없는 연주는 이곳에 없어요. 모든 음과 모든 순간에는 분명한 온기가
              있습니다.
            </p>
          </div>
        </div>
      </section>
      <section
        id="section2"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`section ${hover ? "active" : ""}`}
        ref={section2}>
        <div className="img-container" ref={section2Img}>
          <img src={`./img/sub01/pic${state.rowIdx + 1}.jpg`} alt="" />
        </div>
        {state.list.map((el, idx) => (
          <div
            className={`row row${idx + 1}`}
            onMouseEnter={(e) => mouseEnterRow(e, idx)}
            key={idx}>
            <div className="inner">
              <p>{el.left}</p>
              <p>{el.right}</p>
            </div>
          </div>
        ))}
      </section>
      <section id="section3" className="section">
        <div className="inner">
          <div className="img-container" ref={section3Img}>
            <img src="./img/sub01/hor-pic1.jpg" alt="" />
          </div>
          <div className="sec-container" ref={section3}>
            <div className="sec sec1">
              <p>Jazz</p>
              <p>MyoMyo</p>
              <p>Story</p>
            </div>
            <div className="sec sec2">
              <div className="col1">
                <p>2025</p>
              </div>
              <div className="col2">
                <p>
                  재즈묘묘
                  <br />
                  창업
                </p>
              </div>
              <div className="col3">
                <p>
                  2025년, 재즈묘묘가 문을 열었어요. 고양이처럼 느긋하게,
                  재즈처럼 자유로운 공간을 만들고 싶었죠. 친구들과 나누던 작은
                  웃음이 시작이었습니다.
                </p>
              </div>
            </div>
            <div className="sec sec3">
              <div className="col1">
                <p>2025</p>
              </div>
              <div className="col2">
                <p>
                  재즈묘묘
                  <br />
                  창업 직후
                </p>
              </div>
              <div className="col3">
                <p>
                  오픈 직후, 작은 공간이 점점 생기를 얻기 시작했습니다. 음악과
                  사람, 그리고 낯선 이들이 자연스럽게 어우러지면서 재즈묘묘는
                  단순한 술집이 아닌, 마음과 마음이 만나는 라운지로 자리 잡았죠.
                </p>
              </div>
            </div>
            <div className="sec sec4">
              <div className="col1">
                <p>2025</p>
              </div>
              <div className="col2">
                <p>
                  재즈묘묘
                  <br />
                  현재
                </p>
              </div>
              <div className="col3">
                <p>
                  지금, 재즈묘묘는 매일 밤 새로운 선율과 웃음으로 채워집니다.
                  손님 한 명 한 명이 공간의 일부가 되고, 고양이 감성과 재즈가
                  함께 흐르는 일상이 되었어요.
                </p>
              </div>
            </div>
            <div className="sec sec5">
              <div className="col1">
                <p>2025</p>
              </div>
              <div className="col2">
                <p>
                  재즈묘묘
                  <br />
                  가까운 미래
                </p>
              </div>
              <div className="col3">
                <p>
                  앞으로 재즈묘묘는 더 많은 사람과 음악, 이야기를 이어갈 겁니다.
                  매 순간이 작은 공연처럼, 매 밤이 특별한 경험처럼 느껴지는
                  곳으로 성장해 나갈 거예요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section4" className="section">
        <img src="./img/sub01/bg.png" alt="" />
      </section>
      <section id="section5" className="section">
        <div className="inner">
          <div className="title">
            <p>Jazz</p>
            <p className="myo">Myo</p>
            <p className="myo">Myo</p>
          </div>
          <div className="content">
            <p>
              재즈묘묘의 미션은 간단해요. 세상과 사람, 그리고 고양이까지 조금 더
              사랑하게 만드는 것. 방법은? 한 곡의 재즈, 한 잔의 술, 한 번의
              웃음이면 충분하죠.
            </p>
            <p>
              여기선 진지한 설교 대신, 느긋한 리듬과 장난기 있는 선율이
              흐릅니다. 라이브 공연에서든, 기념 굿즈에서든, 혹은 그냥 카운터에서
              건네는 농담 한마디에서든—당신은 이미 묘묘의 리듬에 발을 맞추게 될
              거예요.
            </p>
            <p>
              첫 방문 손님도 단골처럼 만드는 <Link>재즈 묘묘 마법</Link>
            </p>
          </div>
        </div>
      </section>
      <section id="section6" className="section">
        <div className="container" ref={section6Content}>
          <div className="content">
            <p>
              오픈 첫날 밤 이후
              <br />
              처음 맞는 이런 설렘
            </p>
            <p>
              그리고 우리는 하나가 됩니다.
              <br /> 여기는 재즈묘묘—음악이 골목과 마음속에서 살아 숨 쉬는 곳.
              <br /> 따뜻한 불빛 아래 작은 바 테이블부터, 골목 끝 숨은 무대까지.
              <br /> 우리는 재즈에 미친 도시처럼, 당신을 위해 준비되어 있습니다.
              <br />
              유명한 연주와 비밀스러운 잼세션이 공존하는 이곳에서,
              <br /> 우리의 문화와 골목, 그리고 재즈를 향한 순수한 사랑을 전
              세계와 나눕니다.
            </p>
          </div>
        </div>
        <div className="img-container">
          <div className="pic pic1">
            <img src="./img/sub01/last-pic1.jpg" alt="" />
          </div>
          <div className="pic pic2">
            <img src="./img/sub01/last-pic2.jpg" alt="" />
          </div>
          <div className="pic pic3">
            <img src="./img/sub01/last-pic3.jpg" alt="" />
          </div>
          <div className="pic pic4">
            <img src="./img/sub01/last-pic4.jpg" alt="" />
          </div>
          <div className="pic pic5">
            <img src="./img/sub01/last-pic5.jpg" alt="" />
          </div>
        </div>
      </section>
      <section id="section7" className="section">
        <div className="inner">
          <img src="./img/sub01/foot.png" alt="" />
        </div>
      </section>
    </main>
  );
}
