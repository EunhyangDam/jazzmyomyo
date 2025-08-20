import React from "react";
import "./scss/Sub01MyoMyo.scss";
function Sub01MyoMyo(props) {
  return (
    <main id="sub01MyoMyo">
      <div className="inner">
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
          <div className="right">
            <div className="row row1">
              <p className="heading">묘묘(Myomyo)</p>
              <p>
                시크한 장난꾸러기 묘묘가 재즈바에 나타났어요!
                <br />
                묘묘는 온음표 모양의 노란 눈을 가진 게으름뱅이예요. 무언가
                마음에 들지 않으면 날카롭게 하악질을 당할지도 몰라요!
                <br />
                하지만 2분 쉼표 모자와 1분 쉼표 넥타이를 정중하게 맨 변덕스러운
                신사랍니다.
              </p>
            </div>
            <div className="row row2">
              <p>사이트에서 다양하게 둔갑한 묘묘를 찾아보세요!</p>
              <div className="img-container">
                <div className="col col1">
                  <div className="container">
                    <img src="./img/sub01/myo1.png" alt="" />
                  </div>
                </div>
                <div className="col col2">
                  <div className="container">
                    <img src="./img/sub01/myo2.png" alt="" />
                  </div>
                </div>
                <div className="col col3">
                  <div className="container">
                    <img src="./img/sub01/myo3.png" alt="" />
                  </div>
                </div>
                <div className="col col4">
                  <div className="container">
                    <img src="./img/sub01/myo4.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text">猫猫</div>
      </div>
    </main>
  );
}

export default Sub01MyoMyo;
