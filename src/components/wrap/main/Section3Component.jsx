import React from "react";
import "./scss/Section3Component.scss";
import ArtistModalComponent from "./ArtistModalComponent";

export default function Section3Component() {
  const [artists, setArtists] = React.useState([]);
  const [selectedArtist, setSelectedArtist] = React.useState(null);

  React.useEffect(() => {
    fetch("./json/section3/section3.json")
      .then((res) => {
        if (!res.ok) throw new Error("네트워크 오류");
        return res.json();
      })
      .then((data) => {
        setArtists(data.artistData);
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err);
      });
  }, []);

  return (
    <div id="section3Component" className="section">
      <div className="con-info">
        <div className="con-head">
          <h2>공연정보</h2>
          <p>묘~하게 빠져드는 공연 소식! 지금 재즈묘묘에서 확인해보세요</p>
        </div>

        <div className="con-grid">
          {artists.map((artist, idx) => (
            <div
              key={artist.id}
              className={`con-item item-${String.fromCharCode(97 + idx)}`}
              onClick={() => setSelectedArtist(artist)}
            >
              <img src={artist.posterImg} alt={artist.name} />
              <h3>{artist.title}</h3>
              <p>[공연일 : {artist.date}]</p>
            </div>
          ))}
        </div>
      </div>

      {selectedArtist && (
        <ArtistModalComponent
          artist={selectedArtist}
          onClose={() => setSelectedArtist(null)}
        />
      )}
    </div>
  );
}
