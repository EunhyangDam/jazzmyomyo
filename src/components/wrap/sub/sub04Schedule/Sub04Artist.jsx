import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";
import "./scss/Sub04Artist.scss";
import SiteMapComponent from "../../custom/SiteMapComponent";

const LS_KEY = "myomyo_wishlist"; //  로컬 스토리지 키


function Sub04Artist(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  로컬스토리지 기반 위시리스트
  const [wishlist, setWishlist] = useState([]);

  // 확인 모달 응답
  const isYes = useSelector((state) => state.confirmModal.isYes);

  const [artists, setArtists] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortType, setSortType] = useState("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const itemsPerPage = 12;

  //  위시리스트 로드(초기 1회)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setWishlist(parsed);
      }
    } catch (e) {
      console.warn("wishlist load error:", e);
    }
  }, []);

  // 아티스트 데이터 로드
  useEffect(() => {
    fetch("./json/sub04/artist-data.json")
      .then((res) => res.json())
      .then((data) => {
        setArtists(data);
        setFiltered(data);
      });
  }, []);

  // 즐겨찾기/검색/정렬 가공
  useEffect(() => {
    let arr = [...artists];

    // 즐겨찾기 모드
    if (sortType === "wish") {
      arr = arr.filter((a) => wishlist.includes(a.name));
    }

    // 검색 필터
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      arr = arr.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.instrument.toLowerCase().includes(q)
      );
    }

    // 정렬
    if (sortType === "new") {
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortType === "name") {
      arr.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    }

    setFiltered(arr);
    setCurrentPage(1);
  }, [searchQuery, sortType, wishlist, artists]);

  // 동영상 ID 추출
  const extractYoutubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:.*v=|v\/|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/
    );
    return match ? match[1] : null;
  };

  // 페이지네이션
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  //  위시리스트 저장 헬퍼
  const saveWishlist = (next) => {
    setWishlist(next);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn("wishlist save error:", e);
    }
  };

  // 로그인 여부
  const 로그인정보 = useSelector((state) => state.signIn);
  const isLogin = 로그인정보?.아이디 !== "";

  // 하트 클릭 시 로그인 유도
  const [pendingLike, setPendingLike] = useState(null);

  const onClickLikeArtist = (name) => {
    if (!isLogin) {
      setPendingLike(name);
      dispatch(
        confirmModalAction({
          heading: "로그인 해주세요!",
          explain: "로그인 페이지로 이동 할까요?",
          isON: true,
          isConfirm: true,
          message1: "예",
          message2: "아니오",
        })
      );
      return;
    }
    toggleLike(name);
  };

  //  로컬스토리지 기반 토글
  const toggleLike = (name) => {
    const isWished = wishlist.includes(name);
    const next = isWished
      ? wishlist.filter((n) => n !== name)
      : [...wishlist, name];
    saveWishlist(next);
  };

  // 모달 응답에 따른 처리 (비로그인일 때)
  useEffect(() => {
    if (!isLogin && isYes !== null) {
      if (isYes) {
        navigate("/Lg");
      } else if (pendingLike) {
        // "아니오" 눌렀을 때 강제로 하트 해제 (이미 켜져 있었다면)
        const isWished = wishlist.includes(pendingLike);
        if (isWished) {
          const next = wishlist.filter((n) => n !== pendingLike);
          saveWishlist(next);
        }
      }
      setPendingLike(null);

      // 모달 닫기
      const obj = {
        heading: "",
        explain: "",
        isON: false,
        isConfirm: false,
        message1: "",
        message2: "",
      };
      dispatch(confirmModalAction(obj));
    }
  }, [isYes]); // eslint-disable-line react-hooks/exhaustive-deps

  // 월간일정 → 아티스트 페이지 인입 처리
  const [searchParams] = useSearchParams();
  const targetArtist = searchParams.get("artist");

  useEffect(() => {
    if (!targetArtist || artists.length === 0) return;

    const index = artists.findIndex(
      (a) => a.name.toLowerCase() === targetArtist.toLowerCase()
    );

    if (index !== -1) {
      const page = Math.floor(index / itemsPerPage) + 1;
      setCurrentPage(page);

      setTimeout(() => {
        setSelected(artists[index]);
      }, 100);
    }
  }, [targetArtist, artists]);  
  


  return (
    <div id="sub04Artist">
      <main id="artist" className="artist-section">
        <div className="artist-header">
          <div className="content">
            <div className="breadcrumb">
              <SiteMapComponent
                firstLink="/monthly"
                firstName="Schedule"
                secondLink="./"
                secondName="아티스트 정보"
              />
            </div>
            <h2 className="section-title">아티스트 정보</h2>
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
              <button
                className={sortType === "wish" ? "sort-btn active" : "sort-btn"}
                onClick={() => setSortType("wish")}
              >
                즐겨찾기
              </button>
            </div>
          </div>

          <ul className="artist-list">
            {paginated.map((item, idx) => {
              const isWished = wishlist.includes(item.name);
              return (
                <li className="artist-card" key={idx}>
                  <div className="card-inner">
                    <div className="img-box">
                      <img src={item.image} alt={item.name} />
                      <button
                        className={`heart-button ${isWished ? "on" : ""}`}
                        onClick={() => onClickLikeArtist(item.name)}
                      >
                        <i className={`bi ${isWished ? "bi-heart-fill" : "bi-heart"}`}></i>
                      </button>
                    </div>
                  </div>
                  <div className="title-contents">
                    <span className="instrument">{item.instrument}</span>
                    <a
                      href="!#"
                      className="arrow"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelected(item);
                      }}
                    >
                      <i className="fa fa-arrow-right"></i>
                    </a>
                    <h3 className="name">{item.name}</h3>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
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
                  className={currentPage === i + 1 ? "page-btn active" : "page-btn"}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
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
                    <p className="modal-social">{selected.social?.join(", ")}</p>
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
