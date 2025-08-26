/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./scss/Sub035PreAdmin.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useCustomA from "../../custom/useCustomA";

export default function Sub035PreAdmin() {
  const { onClickA } = useCustomA();
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
          const cleanStatus = (it.status ?? "상태없음").trim();

          return {
            id: it.idx ?? i + 1,
            title: it.title || "(제목 없음)",
            author: it.writer_name ?? "",
            date: it.reserveDate ?? "",
            created: it.wDate ?? "",
            status: cleanStatus,
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

  if (loading) {
    return (
      <section id="sub_pre_admin">
        <div className="clipboard">
          <div className="clip" />
          <div className="paper">
          

            <h1>사전 예약 게시판 (관리자)</h1>
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
      <section id="sub_pre_admin">
        <div className="clipboard">
          <div className="clip" />
          <div className="paper">
            <h1>사전 예약 게시판 (관리자)</h1>
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
    <section id="sub_pre_admin">
      <div className="clipboard">
        <div className="clip"></div>
        <div className="paper">
        <nav className="breadcrumbs" aria-label="breadcrumb">
            <a href="/" className="home" onClick={(e) => onClickA(e, "/")}> 
              <i className="bi bi-house-fill" aria-hidden="true" />
              <span className="sr"></span>
            </a>
            <span className="sep"><i className="bi bi-chevron-right" /></span>
            <a href="/menu" onClick={(e) => onClickA(e, "/menu")}>MENU</a>
            <span className="sep"><i className="bi bi-chevron-right" /></span>
            <strong>사전예약(관리자용)</strong>
          </nav>
          <h1>사전 예약 게시판 (관리자)</h1>

          {currentPosts.length === 0 && (
            <div className="card" style={{ textAlign: "center", color: "#666" }}>
              등록된 예약이 없습니다.
            </div>
          )}

          {currentPosts.map((post) => (
            <div key={post.id} className="card">
              <a
                href={`/preV/view/${post.id}`}
                className="card-title"
                onClick={(e) => onClickA(e, `/preV/view/${post.id}`)}
              >
                {post.title || "(제목 없음)"}
              </a>

              <p className="card-type">
                <span
                  className={`type-label ${
                    post.status === "예약완료"
                      ? "complete"
                      : post.status === "예약중"
                      ? "progress"
                      : post.status === "예약취소"
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
                <strong>작성일:</strong>{" "}
                {post.created ? post.created.split(" ")[0] : "-"}
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
    </section>
  );
}
