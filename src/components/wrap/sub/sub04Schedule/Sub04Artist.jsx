import React from "react";
import { useEffect, useState } from "react";
import "./scss/Sub04Artist.scss";

function Sub04Artist(props) {
  const [artists, setArtists] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortType, setSortType] = useState("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const itemsPerPage = 12;

  useEffect(() => {
    fetch("./json/sub04/artist-data.json")
      .then((res) => res.json())
      .then((data) => {
        setArtists(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let filtered = [...artists];
    if (searchQuery) {
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.instrument.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortType === "new") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    }
    setFiltered(filtered);
    setCurrentPage(1);
  }, [searchQuery, sortType, artists]);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const extractYoutubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:.*v=|v\/|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/
    );
    return match ? match[1] : null;
  };

  return (
    <div id="sub04Artist">
      <main id="artist" className="artist-section">
        <div className="artist-header">
          <div className="content">
            <div className="breadcrumb">
              <span>
                <i className="material-icons">home</i>
              </span>{" "}
              &gt;
              <span>Schedule</span> &gt;
              <strong>ARTIST</strong>
            </div>
            <h2 className="section-title">ARTIST</h2>
          </div>
        </div>

        <div className="container">
          <div className="sort-search-area">
            <div className="search-box">
              <input
                type="text"
                placeholder="아티스트/팀 이름으로 검색해보세요"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              <button className="btn-search">
                <i className="fa fa-search"></i>
              </button>
            </div>
            <div className="sort-options">
              <button
                className={sortType === "new" ? "sort-btn active" : "sort-btn"}
                onClick={() => setSortType("new")}
              >
                최신순
              </button>
              <button
                className={sortType === "name" ? "sort-btn active" : "sort-btn"}
                onClick={() => setSortType("name")}
              >
                이름순
              </button>
            </div>
          </div>

          <ul className="artist-list">
            {paginated.map((artist, i) => (
              <li className="artist-card" key={i}>
                <div className="card-inner">
                  <div className="img-box">
                    <img src={artist.image} alt={artist.name} />
                    <button className="heart">
                      <i className="fa fa-heart-o"></i>
                    </button>
                  </div>
                </div>
                <div className="title-contents">
                  <span className="instrument">{artist.instrument}</span>
                  <a
                    href="!#"
                    className="arrow"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelected(artist);
                    }}
                  >
                    <i className="fa fa-arrow-right"></i>
                  </a>
                  <h3 className="name">{artist.name}</h3>
                </div>
              </li>
            ))}
          </ul>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <i className="fa fa-angle-double-left"></i>
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <i className="fa fa-angle-left"></i>
            </button>

            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={
                    currentPage === i + 1 ? "page-btn active" : "page-btn"
                  }
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <i className="fa fa-angle-right"></i>
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <i className="fa fa-angle-double-right"></i>
            </button>
          </div>
        </div>

        {selected && (
          <div className="modal active">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setSelected(null)}>
                ✕
              </button>
              <div className="modal-body">
                <div className="top">
                  <div className="top-left">
                    <img
                      src={selected.image}
                      alt={selected.name}
                      className="modal-image"
                    />
                    <div className="instrument-tags">
                      {selected.instruments?.map((ins, i) => (
                        <span key={i}>{ins}</span>
                      ))}
                    </div>
                  </div>
                  <div className="top-right">
                    <h2 className="modal-name">{selected.name}</h2>
                    <p
                      className="modal-desc"
                      dangerouslySetInnerHTML={{
                        __html: String(selected.description || "").replace(
                          /\n/g,
                          "<br />"
                        ),
                      }}
                    ></p>
                    <p className="modal-social">
                      {selected.social?.join(", ")}
                    </p>
                  </div>
                </div>

                <h3>BAND MEMBER</h3>
                <div className="bottom">
                  <div className="bottom-left">
                    <div className="modal-members">
                      <div className="member-list">
                        {selected.members?.map((m, i) => (
                          <button key={i}>{m}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bottom-right">
                    <div className="modal-videos">
                      <div className="video-list">
                        {selected.videos?.map((url, i) => {
                          const id = extractYoutubeId(url);
                          return id ? (
                            <iframe
                              key={i}
                              src={`https://www.youtube.com/embed/${id}`}
                              frameBorder="0"
                              allowFullScreen
                            ></iframe>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Sub04Artist;
