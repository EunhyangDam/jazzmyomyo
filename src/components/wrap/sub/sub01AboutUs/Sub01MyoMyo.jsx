import React from "react";
import "./scss/Sub01MyoMyo.scss";
function Sub01MyoMyo(props) {
  return (
    <main id="sub01MyoMyo">
      <div className="title">
        <p>About Myomyo</p>
        <h2>
          재즈묘묘의 마스코트,
          <br />
          묘묘에 대해 소개할게요!
        </h2>
      </div>
      <div className="content">
        <div className="myomyo">
          <img src="./img/sub01/myomyo.png" alt="" />
        </div>
      </div>
    </main>
  );
}

export default Sub01MyoMyo;
