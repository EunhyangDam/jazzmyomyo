import React from "react";
import "./scss/Page404Component.scss";
import { Link } from "react-router-dom";

function Page404Component(props) {
  return (
    <div id="Page404Component">
      <main id="main">
        <div className="container">
          <div className="top">
            <div className="left">
              <div className="row1">
                <img src="./img/page404/qm.png" alt="물음표" />
              </div>
              <div className="row2">
                <img src="./img/page404/myo_shadow.png" alt="묘묘둥절" />
              </div>
            </div>
            <div className="right">
              <div className="caption-box">
                <ul>
                  <li>
                    <h2>묘묘가 길을 잃었어요...</h2>
                  </li>
                  <li>
                    <h3>404 Error</h3>
                    <h4>Page Not Found</h4>
                  </li>
                  <li>
                    <Link to="/" className="button">
                      홈으로 돌아가기
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page404Component;
