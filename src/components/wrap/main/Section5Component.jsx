import React, { useState, useRef, useEffect } from "react";
import "./scss/Section5Component.scss";

export default function Section5Component(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const startX = useRef(0);
  const endX = useRef(0);

  // 아티스트 사진
  const artistData = [
    { name: "Parade", image: "./img/공연일정_포스터_섬광.jpg" },
    { name: "회색지대", image: "./img/공연일정_포스터_회색지대.jpg" },
    { name: "Oyster", image: "./img/공연일정_포스터_oyster.jpg" },
  ];

  const isMobile = window.innerWidth <= 440;

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = endX.current - startX.current;
    const threshold = 50;

    if (diff > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (diff < -threshold && currentIndex < artistData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const slideTrack = slideRef.current;
    if (!slideTrack) return;

    const card = slideTrack.querySelector(".artist-card");
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const marginRight = parseInt(getComputedStyle(card).marginRight) || 0;
    const offset = (cardWidth + marginRight) * currentIndex;

    slideTrack.style.transform = `translateX(-${offset}px)`;
  }, [currentIndex]);

  return (
    <div id="section5Component" className="section">
      <section id="section5" className="artist-section">
        <div className="container">
          <h2 className="artist-title">Artist</h2>
          <div className="content">
            <div
              className="artist-list"
              onTouchStart={isMobile ? handleTouchStart : null}
              onTouchMove={isMobile ? handleTouchMove : null}
              onTouchEnd={isMobile ? handleTouchEnd : null}>
              <div className="slide-track" ref={slideRef}>
                {artistData.map((artist, idx) => (
                  <div key={idx} className="artist-card">
                    <div className="img-box">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="img"
                      />
                    </div>
                    <div className="name">{artist.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {isMobile && (
              <div className="indicator">
                {artistData.map((_, idx) => (
                  <div
                    key={idx}
                    className={`dot ${
                      currentIndex === idx ? "active" : ""
                    }`}></div>
                ))}
              </div>
            )}

            <ul className="link-list">
              <li>
                <a href="#">모든 Artist</a>
              </li>
              <li>
                <a href="#">weekly Artist</a>
              </li>
              <li>
                <a href="#">more</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
