import React from "react";
import "./scss/Section7Component.scss";

export default function Section7Component(props) {
  return (
    <div id="section7Component" className="section">
      <section id="section7" className="shop">
        <div className="container">
          <div className="title">
            <div className="line"></div>
            <h2>shop</h2>
            <div className="line"></div>
          </div>
          <div className="content">
            <div className="left">
              <div className="myo">
                <img src="./img/section7/myomyopick_notail.png" alt="묘묘픽" />
              </div>
              <div className="pick">
                <div className="gap">
                  <a href="!#">
                    <img src="./img/md/doll_01_1.png" alt="묘묘전신인형" />
                  </a>
                </div>
                <div className="caption-box">
                  <h3>Best Seller</h3>
                  <a href="!#">coldplay lp</a>
                  <strong>$50.00</strong>
                </div>
              </div>
            </div>
            <div className="right">
              <ul className="item">
                <li className="item1">
                  <div className="gap">
                    <a href="!#">
                      <img src="./img/md/doll_01_1.png" alt="임시" />
                    </a>
                  </div>
                  <div className="caption-box">
                    <a href="!#">john lennon lp</a>
                    <strong>$50.00</strong>
                  </div>
                </li>
                <li className="item2">
                  <div className="gap">
                    <a href="!#">
                      <img src="./img/md/doll_01_1.png" alt="임시" />
                    </a>
                  </div>
                  <div className="caption-box">
                    <a href="!#">carpenters lp</a>
                    <strong>$50.00</strong>
                  </div>
                </li>
                <li className="item3">
                  <div className="gap">
                    <a href="!#">
                      <img src="./img/md/doll_01_1.png" alt="임시" />
                    </a>
                  </div>
                  <div className="caption-box">
                    <a href="!#">lauv lp</a>
                    <strong>$50.00</strong>
                  </div>
                </li>
                <li className="item4">
                  <div className="gap">
                    <a href="!#">
                      <img src="./img/md/doll_01_1.png" alt="임시" />
                    </a>
                  </div>
                  <div className="caption-box">
                    <a href="!#">john mayer lp</a>
                    <strong>$50.00</strong>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
