import React from "react";
import "./scss/Section1Component.scss";
export default function Section1Component(props) {
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
            <div className="img-container">
              <img src="./img/1-1.jpg" alt="" />
            </div>
            <div className="img-container">
              <img src="./img/1-2.jpg" alt="" />
            </div>
            <div className="img-container">
              <img src="./img/1-3.jpg" alt="" />
            </div>
          </div>
          <div className="heading heading2">
            <span className="charm">Charm</span>
          </div>
          <div className="pic pic2">
            <div className="img-container">
              <img src="./img/2-1.jpg" alt="" />
            </div>
            <div className="img-container">
              <img src="./img/2-2.jpg" alt="" />
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
