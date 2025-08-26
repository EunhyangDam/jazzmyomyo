/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import "./scss/Sub05Ntc.scss";
import useCustomA from "../../custom/useCustomA";

function Sub05Ntc() {
  const { onClickA } = useCustomA();

  const [state, setState] = React.useState({
    공지사항: [],
    필터공지사항: [],
    검색: "",
    검색조건: "subject",
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const [loaded, setLoaded] = React.useState(false);

  // 페이지네이션 설정
  const itemsPerPage = 5;   // 한 페이지에 표시할 아이템 수
  const pageGroup = 3;      // 한 화면(그룹)에서 보여줄 페이지 번호 개수

  const cleanupRef = React.useRef(null);
  const CACHE_KEY = "ntc:list";

  const parseDate = (s) => {
    if (!s) return new Date(0);
    const v = String(s).trim().replace(" ", "T");
    const d = new Date(v);
    return isNaN(d.getTime()) ? new Date(0) : d;
  };

  const dateOnly = (s) => {
    if (!s) return "";
    const t = String(s).trim();
    const m = t.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    if (m) return `${m[1]}.${String(m[2]).padStart(2, "0")}.${String(m[3]).padStart(2, "0")}`;
    const p = t.split(/[ T]/)[0];
    const m2 = p.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
    if (m2) return `${m2[1]}.${String(m2[2]).padStart(2, "0")}.${String(m2[3]).padStart(2, "0")}`;
    return p;
  };

  // 캐시 로드
  React.useEffect(() => {
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
      if (cached && Array.isArray(cached)) {
        setState((p) => ({ ...p, 공지사항: cached, 필터공지사항: cached }));
        setLoaded(true);
      }
    } catch {}
  }, []);

  // 서버 로드
  React.useEffect(() => {
    let aborted = false;
    const fetchList = async () => {
      try {
        const url = `/jazzmyomyo/notice_table_select.php?_t=${Date.now()}`;
        const res = await axios.get(url, { validateStatus: () => true });
        if (aborted) return;

        const raw = Array.isArray(res.data) ? res.data : [];
        const list = raw
          .filter((r) => String(r.wDel ?? "0") !== "1")
          .sort((a, b) => {
            const d = parseDate(b.wDate) - parseDate(a.wDate);
            if (d !== 0) return d;
            return (b.idx ?? 0) - (a.idx ?? 0);
          })
          .map((item, i) => ({
            idx: item.idx,
            subject: item.wSubject,
            date: item.wDate,
            name: item.wName,
            hit: item.wHit,
            content: item.wContent,
            file: item.wFile,
            _rowId: `${item.idx}-${i}`,
          }));

        setState((p) => ({ ...p, 공지사항: list, 필터공지사항: list }));
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(list)); } catch {}
      } catch {
      } finally {
        if (!aborted) {
          const id = setTimeout(() => setLoaded(true), 0);
          cleanupRef.current = () => clearTimeout(id);
        }
      }
    };
    fetchList();
    return () => { aborted = true; cleanupRef.current?.(); };
  }, []);

  // 검색/필터
  const onChangeSearch = (e) => setState((p) => ({ ...p, 검색: e.target.value }));
  const onChangeFilter = (e) => setState((p) => ({ ...p, 검색조건: e.target.value }));

  const onSubmitSearch = (e) => {
    e.preventDefault();
    const q = (state.검색 || "").trim().toLowerCase();
    if (!q) {
      setState((p) => ({ ...p, 필터공지사항: p.공지사항 }));
      setCurrentPage(1);
      return;
    }
    const filtered = state.공지사항.filter((item) => {
      if (state.검색조건 === "subject") return String(item.subject ?? "").toLowerCase().includes(q);
      if (state.검색조건 === "date") return String(item.date ?? "").toLowerCase().includes(q);
      return false;
    });
    setState((p) => ({ ...p, 필터공지사항: filtered }));
    setCurrentPage(1);
  };

  const onKeyDownSearch = (e) => { if (e.key === "Enter") onSubmitSearch(e); };

  // 페이지네이션 계산 (그룹 방식)
  const totalItems = state.필터공지사항.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = state.필터공지사항.slice(indexOfFirst, indexOfLast);

  const currentGroup = Math.floor((currentPage - 1) / pageGroup);
  const groupStart = currentGroup * pageGroup + 1;
  const groupEnd = Math.min(groupStart + pageGroup - 1, totalPages);
  const groupPages = Array.from({ length: Math.max(0, groupEnd - groupStart + 1) }, (_, i) => groupStart + i);

  const goFirst = () => setCurrentPage(1);
  const goLast = () => setCurrentPage(totalPages);

  const isEmptyAll = state.공지사항.length === 0;
  const isEmptyFiltered = !isEmptyAll && totalItems === 0;
  const ready = loaded || state.공지사항.length > 0;

  return (
    <div id="sub05Ntc">
      <div className="container">
        <div className="sangdan">
          <a href="/mainComponent" aria-label="홈으로" onClick={(e) => onClickA(e, "/mainComponent")}>
            <i className="bi bi-house-door-fill" />
          </a>
          <span className="sep"><i className="bi bi-chevron-right" /></span>
          <span>커뮤니티</span>
          <span className="sep"><i className="bi bi-chevron-right" /></span>
          <span className="notice">공지사항</span>
        </div>

        <div className="title-row">
          <h2>공지사항</h2>
          <form className="search-form" onSubmit={onSubmitSearch}>
            <select value={state.검색조건} onChange={onChangeFilter} aria-label="검색조건 선택">
              <option value="">검색조건</option>
              <option value="subject">제목</option>
              <option value="date">날짜</option>
            </select>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={state.검색}
              onChange={onChangeSearch}
              onKeyDown={onKeyDownSearch}
              aria-label="공지사항 검색"
            />
            <button type="submit">검색</button>
          </form>
        </div>

        <div className="notice-list">
          <div className="list-header">
            <span className="col-num">번호</span>
            <span className="col-title">제목</span>
            <span className="col-date">날짜</span>
            <span className="col-writer">작성자</span>
            <span className="col-views">조회수</span>
          </div>

          <ul className="list-body">
            {!ready ? null : isEmptyAll ? (
              <li className="no-result">존재하는 글이 없습니다.</li>
            ) : isEmptyFiltered ? (
              <li className="no-result">검색 결과가 없습니다.</li>
            ) : (
              currentItems.map((item, idx) => {
                const runningNumber = totalItems - (indexOfFirst + idx);
                return (
                  <li key={item._rowId} className="row">
                    <span className="col-num">{runningNumber}</span>
                    <span className="col-title">
                      <a
                        href={`/ntcV/${item.idx}`}
                        onClick={(e) =>
                          onClickA(e, `/ntcV/${item.idx}`, {
                            idx: item.idx,
                            subject: item.subject,
                            date: item.date,
                            writer: item.name,
                            views: item.hit,
                            content: item.content,
                            file: item.file,
                          })
                        }
                      >
                        {item.subject}
                      </a>
                    </span>
                    <span className="col-date">{dateOnly(item.date)}</span>
                    <span className="col-writer">{item.name}</span>
                    <span className="col-views">{item.hit}</span>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        {ready && totalPages > 1 && (
          <div className="pagenation" role="navigation" aria-label="페이지네이션">
            {/* 맨처음 */}
            {currentPage > 1 && (
              <button onClick={goFirst} aria-label="첫 페이지">
                <i className="bi bi-chevron-double-left" />
              </button>
            )}

            {/* 이전 (1페이지씩) */}
            {currentPage > 1 && (
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} aria-label="이전 페이지">
                <i className="bi bi-chevron-left" />
              </button>
            )}

            {/* 현재 그룹의 페이지 번호들 */}
            {groupPages.map((n) => (
              <button
                key={`page-${n}`}
                className={currentPage === n ? "active" : ""}
                onClick={() => setCurrentPage(n)}
                aria-current={currentPage === n ? "page" : undefined}
              >
                {n}
              </button>
            ))}

            {/* 다음 (1페이지씩) */}
            {currentPage < totalPages && (
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} aria-label="다음 페이지">
                <i className="bi bi-chevron-right" />
              </button>
            )}

            {/* 맨끝 */}
            {currentPage < totalPages && (
              <button onClick={goLast} aria-label="마지막 페이지">
                <i className="bi bi-chevron-double-right" />
              </button>
            )}
          </div>
          )}


      </div>
    </div>
  );
}

export default Sub05Ntc;
