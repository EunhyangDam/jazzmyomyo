import React, { useEffect, useMemo, useState } from "react";
import "./scss/Sub05Faq.scss";
import SiteMapComponent from "../../custom/SiteMapComponent";

// 키워드 텍스트 포인트 주기
function formatAnswer(raw) {
  if (!raw) return "";
  const keywords = ["공연정보", "공연예약 페이지", "SHOP", "19세 이상"];
  const esc = (s) => s.replace(/([.*+?^${}()|[\]\\])/g, "\\$1");
  const pattern = new RegExp(`(${keywords.map(esc).join("|")})`, "g");
  return raw.replace(pattern, "<strong class='hl'>$1</strong>");
}

export default function Sub05Faq(props) {
  const [items, setItems] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    fetch("/json/sub05/faq.json")
      .then((res) => {
        if (!res.ok) throw new Error("네트워크 오류");
        return res.json();
      })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((e) => console.error("FAQ load error:", e));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.question.toLowerCase().includes(q) ||
        it.answer.toLowerCase().includes(q)
    );
  }, [items, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
    setOpenId(null);
  }, [query]);

  const toggle = (id) => setOpenId((p) => (p === id ? null : id));
  const goFirst = () => setPage(1);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const goLast = () => setPage(totalPages);

  return (
    <div id="sub05Faq">
      {/* 상단 페이지 경로 */}
      <SiteMapComponent
        firstLink="/Ntc"
        firstName="커뮤니티"
        secondLink="/Faq"
        secondName="FAQ"
      />

      <section className="head">
        <h2 className="title">FAQ</h2>

        <form className="search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="FAQ 검색"
          />
          <button type="submit">검색</button>
        </form>
      </section>

      {/* FAQ 리스트 */}
      <ul className="faq-list">
        {current.map((item, idx) => {
          const isOpen = openId === item.id;
          const order = (page - 1) * perPage + (idx + 1);
          return (
            <li key={item.id} className={`faq-item ${isOpen ? "open" : ""}`}>
              <button
                className="q-row"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`answer-${item.id}`}
              >
                <div className="q-left">
                  <span className="q-index">Q{order}.</span>
                  <span className="q-text">{item.question}</span>
                </div>
                <i
                  className={`bi ${
                    isOpen ? "bi-chevron-up" : "bi-chevron-down"
                  }`}
                  aria-hidden
                />
              </button>

              <div
                id={`answer-${item.id}`}
                className="a-panel"
                style={{ height: isOpen ? "auto" : 0 }}
              >
                <div className="a-inner">
                  <span className="a-badge">A.</span>
                  <p
                    className="a-text"
                    dangerouslySetInnerHTML={{
                      __html: formatAnswer(item.answer),
                    }}
                  />
                </div>
              </div>
            </li>
          );
        })}
        {current.length === 0 && (
          <li className="empty">검색 결과가 없습니다.</li>
        )}
      </ul>

      {/* pagination */}
      <div className="pagination">
        <button onClick={goFirst} disabled={page === 1} aria-label="첫 페이지">
          «
        </button>
        <button onClick={goPrev} disabled={page === 1} aria-label="이전 페이지">
          ‹
        </button>
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              className={`num ${p === page ? "active" : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          );
        })}
        <button
          onClick={goNext}
          disabled={page === totalPages}
          aria-label="다음 페이지"
        >
          ›
        </button>
        <button
          onClick={goLast}
          disabled={page === totalPages}
          aria-label="마지막 페이지"
        >
          »
        </button>
      </div>
    </div>
  );
}
