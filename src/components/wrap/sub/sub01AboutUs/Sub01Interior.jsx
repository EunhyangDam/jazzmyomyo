import React from "react";
import "./scss/Sub01Interior.scss";
function Sub01Interior(props) {
  return (
    <main id="sub01Interior">
      <section id="section1" className="section">
        <div className="inner">
          <div className="img-container">
            <img src="./img/sub01/interior01.jpg" alt="" />
          </div>
          <div className="text-container">
            <h2>Purring Vibes, Flowing Jazz</h2>
            <p>
              매일 밤 이어지는 라이브 연주와 즉흥 잼세션을 통해 다양한 뮤지션과
              손님들이 교감하며
              <br />
              재즈를 중심으로 낯선 사람과 사람, 음악과 일상이 연결됩니다.
            </p>
          </div>
        </div>
      </section>
      <section id="section2" className="section">
        <div className="inner">
          <div className="img-container">
            <div className="col col1">
              <div className="container">
                <img src="./img/sub01/interior02.jpg" alt="" />
              </div>
            </div>
            <div className="col col2">
              <div className="container">
                <img src="./img/sub01/interior03.jpg" alt="" />
              </div>
            </div>
            <div className="col col3">
              <div className="container">
                <img src="./img/sub01/interior04.jpg" alt="" />
              </div>
            </div>
            <div className="col col4">
              <div className="container">
                <img src="./img/sub01/interior05.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="text-container">
            <h3>Playing Jazz, Creating Vibes</h3>
            <p>
              재즈묘묘는 고양이 감성과 재즈의 자유로움이 만나는 아지트예요
              <br />. 매일 밤 라이브 공연과 잼세션으로 손님과 뮤지션이
              자연스럽게 이어지고, 음악과 술, 그리고 대화가 어우러집니다. <br />
              우리는 그냥 술집이 아니라, 누구나 편하게 들러 잊지 못할 순간을
              만드는 작은 재즈 라운지입니다.
            </p>
          </div>
        </div>
      </section>
      <section id="section3" className="section">
        <div className="container">
          <div className="col1 col text-box">
            <h3 className="heading">입구</h3>
            <p className="text">
              재즈묘묘의 문은 따뜻한 오렌지 불빛으로 손님을 맞이합니다.
              <br />
              고양이 모양의 로고가 은은하게 빛나며, 작은 골목 끝에 숨어 있는
              비밀스러운 아지트 같은 느낌을 줍니다.
            </p>
          </div>
          <div className="col2 col">
            <div className="image image1">
              <img src="./img/sub01/interior06.jpg" alt="" />
            </div>
            <div className="image image2">
              <img src="./img/sub01/interior07.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section id="section4" className="section">
        <div className="container">
          <div className="col1 col">
            <div className="image image1">
              <img src="./img/sub01/interior08.jpg" alt="" />
            </div>
            <div className="image image2">
              <img src="./img/sub01/interior09.jpg" alt="" />
            </div>
          </div>
          <div className="col2 col text-box">
            <h3 className="heading">메인홀</h3>
            <p className="text">
              문을 열고 들어서면 가장 먼저 아담한 바와 테이블이 있는 메인홀이
              펼쳐집니다.
              <br />
              낮은 조명과 원목 테이블, 벽면을 채운 재즈 LP가 따뜻한 분위기를
              완성합니다.
              <br />
              이곳은 손님들이 술잔을 기울이며 음악을 가장 가까이서 즐길 수 있는
              자리입니다.
            </p>
          </div>
        </div>
      </section>
      <section id="section5" className="section">
        <div className="inner">
          <div className="row1">
            <img src="./img/sub01/interior10.jpg" alt="" />
          </div>
          <div className="row2">
            <h3 className="heading">스테이지</h3>
            <p className="text">
              홀 한쪽에는 작은 무대가 마련되어 있습니다.
              <br />
              피아노와 드럼, 콘트라베이스가 놓여 있으며, 매일 밤 뮤지션들이
              즉흥적으로 연주를 이어가는 공간입니다.
              <br />
              스테이지는 크지 않지만 관객과 연주자의 거리가 가까워, 공연장이자
              거실 같은 친밀함을 줍니다.
            </p>
          </div>
        </div>
      </section>
      <section id="section6" className="section">
        <div className="inner">
          <div className="col col1">
            <h3 className="heading">라운지 존</h3>
          </div>
          <div className="col col2">
            <div className="row row1">
              <img src="./img/sub01/interior11.jpg" alt="" />
            </div>
            <div className="row row2">
              <p
                className="text
              "
              >
                조금 더 안쪽으로 들어가면 소파와 쿠션이 놓인 라운지 존이
                있습니다. 이곳은 음악을 들으며 여유롭게 대화를 나누거나 혼자만의
                시간을 보낼 수 있는 공간입니다. 고양이 포스터와 재즈 사진이 걸려
                있어, 마치 누군가의 비밀스러운 서재에 들어온 듯한 기분을 줍니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Sub01Interior;
