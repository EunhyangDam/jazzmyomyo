import React, { useState, useRef, useEffect, forwardRef } from "react";
import "./scss/Section5Component.scss";
import { Link} from "react-router-dom";

const Section5Component = forwardRef((props, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const startX = useRef(0);
  const endX = useRef(0);

  // 아티스트 사진
  const artistData = [
    { name: "Parade", image: "./img/artist_poster_right.jpg" },
    { name: "회색지대", image: "./img/artist_poster_grayarea.jpg" },
    { name: "Oyster", image: "./img/artist_poster_oyster.jpg" },
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
    <div id="section5Component" className="section" ref={ref}>
      <section id="section5" className="artist-section">
        <div className="container">
          <h2 className="artist-title">Artist</h2>
          <div className="content">
            <div
              className="artist-list"
              onTouchStart={isMobile ? handleTouchStart : null}
              onTouchMove={isMobile ? handleTouchMove : null}
              onTouchEnd={isMobile ? handleTouchEnd : null}
            >
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
                    className={`dot ${currentIndex === idx ? "active" : ""}`}
                  ></div>
                ))}
              </div>
            )}

            <ul className="link-list">
              <li>
                <Link to="/artist">모든 Artist</Link>
              </li>
              <li>
                <Link to="/artist">weekly Artist</Link>
              </li>
              <li>
                <Link to="/artist">more</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
});
export default Section5Component;
