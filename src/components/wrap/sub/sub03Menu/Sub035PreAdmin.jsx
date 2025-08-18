/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./scss/Sub035Pre.scss";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Sub035PreAdmin() {
  const itemsPerPage = 5;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const url = `${process.env.PUBLIC_URL || ""}/json/sub03/preorder.json`;
    setLoading(true);
    setErr(null);

    axios
      .get(url)
      .then((res) => {
        const arr = Array.isArray(res.data?.예약신청) ? res.data.예약신청 : [];
        const mapped = arr.map((it, i) => ({
          id: it.idx ?? i + 1,
          title: it.title ?? "",
          author: it.author ?? "",
          date: it.reserveDate ?? "",
          created: it.writeDate ?? "",
          type: it.status ?? "", 
        }));
        
        const sorted = mapped.sort((a, b) => {
          const ad = new Date((a.created || "").replaceAll(".", "-"));
          const bd = new Date((b.created || "").replaceAll(".", "-"));
          const diff = bd - ad;
          return diff !== 0 ? diff : (b.id - a.id);
        });
        setPosts(sorted);
        setCurrentPage(1);
      })
      .catch((e) => {
        const msg =
          e?.response ? `HTTP ${e.response.status} ${e.response.statusText}` : (e?.message || "데이터 로드 실패");
        setErr(msg);
        console.error("[AdminList] fetch error:", msg, "url:", url);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / itemsPerPage));
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  const goToPrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const goToNext = () => currentPage < totalPages && setCurrentPage((p) => p + 1);

  if (loading) {
    return (
      <section id="sub_pre">
        <div className="clipboard">
          <div className="clip" />
          <div className="paper">
            <h1>사전 예약 게시판(관리자)</h1>
            <p style={{ textAlign: "center", padding: "40px 0" }}>불러오는 중…</p>
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
            <h1>사전 예약 게시판 (관리자)</h1>
            <p style={{ color: "#c00", textAlign: "center", padding: "40px 0" }}>
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
          <h1 className="h1Admin">사전 예약 게시판 (관리자)</h1>

          <Link to="/PreAdminW" className="write-button">사전주문신청</Link>

          {currentPosts.length === 0 && (
            <div className="card" style={{ textAlign: "center", color: "#666" }}>
              등록된 예약이 없습니다.
            </div>
          )}

          {currentPosts.map((post) => (
            <div key={post.id} className="card">
              <Link to={`/PreAdminV/view/${post.id}`} className="card-title">
                {post.title || "(제목 없음)"}
              </Link>

              <p className="card-type">
                <span
                  className={`type-label ${
                    post.type === "예약완료"
                      ? "complete"
                      : post.type === "예약중"
                      ? "progress"
                      : "cancel"
                  }`}
                >
                  {post.type || "상태없음"}
                </span>
              </p>

              <p><strong>작성자:</strong> {post.author || "-"}</p>
              <p><strong>예약일:</strong> {post.date || "-"}</p>
              <p><strong>작성일:</strong> {post.created || "-"}</p>
            </div>
          ))}

          <div className="pagination">
            <button onClick={goToPrev} disabled={currentPage === 1}>이전</button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={goToNext} disabled={currentPage === totalPages}>다음</button>
          </div>
        </div>
      </div>
    </section>
  );
}
