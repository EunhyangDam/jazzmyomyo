/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import "./scss/Sub05NtcView.scss";

function Sub05NtcView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [notice, setNotice] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const hitOnceRef = React.useRef(false);

  const fmt = (s) => {
    if (!s) return "";
    const d = new Date(String(s).trim().replace(" ", "T"));
    if (isNaN(d.getTime())) return String(s);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${y}.${m}.${day} ${hh}:${mm}:${ss}`;
  };

  const bumpHit = async (idx) => {
    if (hitOnceRef.current) return;
    hitOnceRef.current = true;
    try {
      const body = new URLSearchParams();
      body.append("mode", "hit");
      body.append("idx", String(idx));
      const res = await axios.post("/jazzmyomyo/notice_table_select.php", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        validateStatus: () => true,
      });
      const n = Number(res.data);
      if (!Number.isNaN(n) && n >= 0) {
        setNotice((p) => (p ? { ...p, hit: n } : p));
      }
    } catch {}
  };

  React.useEffect(() => {
    if (location.state && (location.state.idx || location.state.id)) {
      const st = location.state;
      const mapped = {
        idx: st.idx ?? st.id,
        subject: st.subject ?? st.wSubject ?? "",
        date: st.date ?? st.wDate ?? "",
        name: st.name ?? st.writer ?? st.wName ?? "",
        hit: st.hit ?? st.views ?? st.wHit ?? 0,
        content: st.content ?? st.wContent ?? "",
        file: st.file ?? st.wFile ?? "",
      };
      setNotice(mapped);
      setLoading(false);
      bumpHit(mapped.idx);
      return;
    }

    const run = async () => {
      try {
        const res = await axios.get(`/jazzmyomyo/notice_table_select.php?_t=${Date.now()}`, {
          validateStatus: () => true,
        });
        const list = Array.isArray(res.data) ? res.data : [];
        const found = list.find((it) => String(it.idx) === String(id));
        if (!found) {
          setNotice(null);
        } else {
          const mapped = {
            idx: found.idx,
            subject: found.wSubject ?? "",
            date: found.wDate ?? "",
            name: found.wName ?? "",
            hit: found.wHit ?? 0,
            content: found.wContent ?? "",
            file: found.wFile ?? "",
          };
          setNotice(mapped);
          bumpHit(mapped.idx);
        }
      } catch {
        setNotice(null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id, location.key]);

  if (loading) {
    return <div style={{ padding: "100px", textAlign: "center" }}>로딩 중…</div>;
  }
  if (!notice) {
    return <div style={{ padding: "100px", textAlign: "center" }}>존재하지 않는 글입니다.</div>;
  }

  const html = String(notice.content || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&lt;img\b([^&]*?)\/?&gt;/gi, (m, attrs) => {
      const srcMatch =
        attrs.match(/src\s*=\s*"([^"]*)"/i) || attrs.match(/src\s*=\s*'([^']*)'/i);
      const altMatch =
        attrs.match(/alt\s*=\s*"([^"]*)"/i) || attrs.match(/alt\s*=\s*'([^']*)'/i);
      const src = srcMatch ? srcMatch[1] : "";
      if (!/^\/|^https?:\/\//i.test(src)) return "";
      const alt = altMatch ? altMatch[1] : "";
      return `<img src="${src}" alt="${alt}">`;
    })
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br />");

  return (
    <div id="noticeView">
      <div className="container">
        <div className="sangdan">
          <Link to="/mainComponent" aria-label="홈으로">
            <i className="bi bi-house-door-fill" />
          </Link>
          <span className="sep"><i className="bi bi-chevron-right" /></span>
          <span>커뮤니티</span>
          <span className="sep"><i className="bi bi-chevron-right" /></span>
          <span className="notice">공지사항</span>
        </div>

        <h2 className="page-title">공지사항</h2>

        <div className="notice-box">
          <div className="notice-title">{notice.subject}</div>

          <div className="notice-meta">
            <div className="left">
              <span>작성자 : {notice.name || "관리자"}</span>
              <span>등록일 : {fmt(notice.date)}</span>
            </div>
            <div className="right">조회수 : {notice.hit}</div>
          </div>

          <div className="notice-body">
            {/* 필요시 대표 이미지 위치 */}
            {/* <div className="notice-image">재즈묘묘 이미지</div> */}
            <div
              className="notice-content-html"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          <div className="btn-wrap">
          <button onClick={() => navigate("/ntc")}>목록</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub05NtcView;
