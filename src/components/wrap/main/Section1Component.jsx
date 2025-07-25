import React from "react";
import "./scss/Section1Component.scss";
export default function Section1Component(props) {
  const [state, setState] = React.useState({
    slide1: [],
    slide2: [],
  });
  React.useEffect(() => {
    fetch("./json/section1/slide.json")
      .then((res) => res.json())
      .then((data) => {
        setState({
          slide1: data.slide1,
          slide2: data.slide2,
        });
      })
      .catch((err) => alert(err));

    const pic1 = document.querySelector(".pic1 .wrapper");
    const pic2 = document.querySelector(".pic2 .wrapper");
    let cnt1 = 0;
    let cnt2 = 0;

    const mainSlide = () => {
      pic1.style.top = `${cnt1 * -100}%`;
      pic2.style.top = `${cnt2 * -100}%`;
      pic1.style.transition = "top 1s";
      pic2.style.transition = "top 1s";
    };
    const countUp = () => {
      cnt1++;
      if (cnt1 > 2) cnt1 = 0;
      cnt2++;
      if (cnt2 > 1) cnt2 = 0;
      mainSlide();
    };
    setInterval(countUp, 3000);
    const mouseMove = (e) => {
      let centerX = window.innerWidth / 2;
      let centerY = window.innerHeight / 2;
      let moveX = (e.clientX - centerX) / 20; // 중심으로부터 거리 비율
      let moveY = (e.clientY - centerY) / 20;
      document.documentElement.style.setProperty("--x", `${moveX}px`);
      document.documentElement.style.setProperty("--y", `${moveY}px`);
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);
  return (
    <div id="section1Component" className="section">
      <div className="inner">
        <div className="heading-container">
          <div className="heading heading1">
            <span className="culture">Culture</span>
            <span className="leads">Leads</span>
            <div className="notice">
              고양이 발로 연주한 음악들, 너무 진지하게 보지 말기!
              <br />
              Cat vibes only. Don’t read too much into it!
            </div>
          </div>
          <div className="pic pic1">
            <div className="view-box">
              <div className="wrapper">
                {state.slide1.map((el) => (
                  <div className="img-container" key={el.id} data-key={el.id}>
                    <img src={`./img/1-${el.img}`} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="heading heading2">
            <span className="charm">Charm</span>
          </div>
          <div className="pic pic2">
            <div className="view-box">
              <div className="wrapper">
                {state.slide2.map((el) => (
                  <div className="img-container" key={el.id} data-key={el.id}>
                    <img src={`./img/2-${el.img}`} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="heading heading3">
            <span className="follow">Follow</span>
          </div>
        </div>
        <p>(scroll to explore)</p>
      </div>
    </div>
  );
}
