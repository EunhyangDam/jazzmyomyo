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
  }, []);
  return (
    <div id="section1" className="section">
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
