import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { wishAction } from "../../../../store/wishlist";
import { confirmModalYesNoAction } from "../../../../store/confirmModal";
import { confirmModalAction } from "../../../../store/confirmModal";
import "./scss/Sub04Artist.scss";

function Sub04Artist(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.wishlist.위시리스트);
  const isYes = useSelector((state) => state.confirmModal.isYes);

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


  // 즐겨찾기, 이름순, 최신순 재정렬
  useEffect(() => {

    let filtered = [...artists];

    // 즐겨찾기 모드일 경우
    if (sortType === "wish") {
     filtered = filtered.filter((a) => wishlist.includes(a.name));
    }

    // 검색 필터
    if (searchQuery) {
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.instrument.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 정렬
    if (sortType === "new") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortType === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    }

  setFiltered(filtered);
  setCurrentPage(1);

  }, [searchQuery, sortType, wishlist, artists]);


  // 동영상 출력
  const extractYoutubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:.*v=|v\/|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/
    );
    return match ? match[1] : null;
  };


  // 페이지네이션 계산
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);


  // 즐겨찾기 추가 & 로그인 여부
  const [pendingLike, setPendingLike] = useState(null);
  
  const 로그인정보 = useSelector((state) => state.signIn);
  const isLogin = 로그인정보?.아이디 !== '';
  
  console.log(로그인정보)
  
  // 로그인 여부 판단
  const onClickLikeArtist = (name) => {
    if (!isLogin) {
      setPendingLike(name);  // 나중에 사용할 이름 기억
      dispatch(confirmModalAction({
        heading: "로그인 해주세요!",
        explain: "로그인 페이지로 이동 할까요?",
        isON: true,
        isConfirm: true,
        message1: "예",
        message2: "아니오"
      }));
      return;
    }
  
    toggleLike(name);  // 로그인 되어 있을 경우 바로 토글
  };

  const toggleLike = (name) => {
    const isWished = wishlist.includes(name);
    const newList = isWished
      ? wishlist.filter((n) => n !== name)
      : [...wishlist, name];
  
    dispatch(wishAction(newList));
  };


  
  useEffect(() => {
    if (!isLogin && isYes !== null) {
      if (isYes) {
        navigate('/Lg');
      } else if (pendingLike) {
        // "아니오"를 눌렀을 때는 강제로 하트 해제
        const isWished = wishlist.includes(pendingLike);
        if (isWished) {
          dispatch(wishAction(wishlist.filter((n) => n !== pendingLike)));
        }
      }
      setPendingLike(null); // 초기화
        const obj = {
          heading: "",
          explain: "",
          isON: false,
          isConfirm: false,
          message1: "",
          message2: ""
        }
      dispatch(confirmModalAction(obj))  // 모달 닫기
    }
  }, [isYes]);  


  // 월간일정 페이지에서 여기로 이동
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
  
      // 딜레이를 주고 모달 열기 (페이지가 설정된 다음)
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
              <button
                className={sortType === "wish" ? "sort-btn active" : "sort-btn"}
                onClick={() => setSortType("wish")}
              >
                즐겨찾기
              </button>
            </div>
          </div>

          <ul className="artist-list">
            {paginated.map((item, idx) => (
              <li className="artist-card" key={idx}>
                <div className="card-inner">
                  <div className="img-box">
                    <img src={item.image} alt={item.name} />
                    <button 
                      className={`heart-button ${wishlist.includes(item.name) ? "on" : ""}`}
                      onClick={() => onClickLikeArtist(item.name)}
                    >
                      <i className={`bi ${wishlist.includes(item.name) ? "bi-heart-fill" : "bi-heart"}`}></i>
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
