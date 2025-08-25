/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./scss/Sub035Pre.scss";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Sub03Pre() {
  const navigate = useNavigate();
  const location = useLocation();

  const deletedId = (() => {
    const p = new URLSearchParams(location.search);
    return Number(p.get("deleted")) || null;
  })();

  const itemsPerPage = 5;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLocalModal, setShowLocalModal] = useState(false);

  const parseDate = (s) => {
    if (!s) return new Date(0);
    return new Date(String(s).replace(/\./g, "-"));
  };

  useEffect(() => {
    setLoading(true);

    axios
      .get("/jazzmyomyo/preorder_table_select.php", {
        params: { page: 1, pageSize: 200 },
      })
      .then(({ data }) => {
        if (!Array.isArray(data)) {
          throw new Error("서버 응답 형식 오류");
        }

        let mapped = data.map((it, i) => {
          return {
            id: it.idx ?? i + 1,
            title: it.title || "(제목 없음)",
            author: it.writer_name ?? "익명",
            date: it.reserveDate ?? "",
            created: it.wDate ?? "",
            // 'status' 필드명으로 통일하여 사용
            status: it.status ?? "상태없음",
          };
        });

        if (deletedId !== null) {
          mapped = mapped.filter((item) => item.id !== deletedId);
        }

        const sorted = mapped.sort((a, b) => {
          const d = parseDate(b.created) - parseDate(a.created);
          if (d !== 0) return d;
          return (b.id ?? 0) - (a.id ?? 0);
        });

        setPosts(sorted);
        setCurrentPage(1);
      })
      .catch((e) => setErr(e?.message || "데이터 로드 실패"))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / itemsPerPage));
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  const goToPrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const goToNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);

  const handleWriteClick = () => {
    const isLoggedIn = (() => {
      const userInfo = JSON.parse(localStorage.getItem("jazzmyomyo_sign_in")) || JSON.parse(sessionStorage.getItem("jazzmyomyo_sign_in"));
         
      console.log('userInfo:', userInfo);
      console.log('isLoggedIn:', !!(userInfo && userInfo.아이디));
      
      return !!(userInfo && userInfo.아이디);
    })();
    
    if (!isLoggedIn) {
      setShowLocalModal(true);
      return;
    }
  
    navigate("/preW");
  };

  const handleModalConfirm = () => {
    setShowLocalModal(false);
    navigate("/lg");
  };

  const handleModalClose = () => {
    setShowLocalModal(false);
  };

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setShowLocalModal(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  if (loading) {
    return (
      <section id="sub_pre">
        <div className="clipboard">
          <div className="clip" />
          <div className="paper">
            <h1>사전 예약 게시판</h1>
            <p style={{ textAlign: "center", padding: "40px 0" }}>
              불러오는 중…
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (err) {
    return (
      <section id="sub_pre">
        <div className="clipboard">
          <div className="clip" />
          <div className="paper">
            <h1>사전 예약 게시판</h1>
            <p
              style={{ color: "#c00", textAlign: "center", padding: "40px 0" }}
            >
              데이터를 불러오지 못했어요. ({err})
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sub_pre">
      <div className="clipboard">
        <div className="clip"></div>
        <div className="paper">
          <h1>사전 예약 게시판</h1>

          <button className="write-button" onClick={handleWriteClick}>
            사전주문신청
          </button>

          {currentPosts.length === 0 && (
            <div className="card" style={{ textAlign: "center", color: "#666" }}>
              등록된 예약이 없습니다.
            </div>
          )}

          {currentPosts.map((post) => (
            <div key={post.id} className="card">
              <Link to={`/preV/view/${post.id}`} className="card-title">
                {post.title || "(제목 없음)"}
              </Link>

              <p className="card-type">
                <span
                  className={`type-label ${
                    post.status === "예약완료"
                      ? "complete"
                      : post.status === "예약중"
                      ? "progress"
                      : post.status === "주문취소"
                      ? "cancel"
                      : ""
                  }`}
                >
                  {post.status || "상태없음"}
                </span>
              </p>

              <p>
                <strong>작성자:</strong> {post.author || "-"}
              </p>
              <p>
                <strong>예약일:</strong> {post.date || "-"}
              </p>
              <p>
                <strong>작성일:</strong> {post.created ? post.created.split(" ")[0] : "-"}
              </p>
            </div>
          ))}

          <div className="pagination">
            <button onClick={goToPrev} disabled={currentPage === 1}>
              이전
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button onClick={goToNext} disabled={currentPage === totalPages}>
              다음
            </button>
          </div>
        </div>
      </div>

      {showLocalModal && (
        <div id="confirmModalComponent" onClick={handleModalClose}>
          <div className="container" onClick={(e) => e.stopPropagation()}>
            <div className="content">
              <div className="col1 col">
                <div className="sentence">
                  <p className="heading">로그인 필요</p>
                  <p className="explain">사전 주문은 로그인 후에 이용하실 수 있어요.</p>
                </div>
                <div className="button">
                  <button onClick={handleModalConfirm}>확인</button>
                </div>
              </div>
              <div className="col2 col">
                <i className="fa-solid fa-paw"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}