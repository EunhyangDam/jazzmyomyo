/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./scss/Sub05NtcAdminView.scss";
import "../../scss/ConfirmModalComponent.scss";
import useCustomA from "../../custom/useCustomA.js";

function Sub05NtcAdminView() {
  const { onClickA } = useCustomA();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const DELETE_URL = "/jazzmyomyo/notice_table_delete.php";

  const [notice, setNotice] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const hitOnceRef = React.useRef(false);

  const [askOpen, setAskOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [toast, setToast] = React.useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1600);
  };

  const fmt = (s) =>
    !s
      ? ""
      : new Date(String(s).replace(" ", "T")).toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

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
        setNotice((p) => (p ? { ...p, views: n } : p));
      }
    } catch {}
  };

  const openNotExist = () => {
    showToast("존재하지 않는 글");
    navigate(-1);
  };

  React.useEffect(() => {
    if (location.state && (location.state.idx || location.state.id)) {
      const st = location.state;
      setNotice({
        id: st.idx ?? st.id,
        subject: st.subject ?? st.wSubject ?? "",
        date: st.date ?? st.wDate ?? "",
        updated: st.updated ?? st.wUpdate ?? "",
        writer: st.writer ?? st.wName ?? "",
        views: st.views ?? st.hit ?? st.wHit ?? 0,
        content: st.content ?? st.wContent ?? "",
      });
      setLoading(false);
    }

    const run = async () => {
      try {
        const res = await axios.get(
          `/jazzmyomyo/notice_table_select.php?_t=${Date.now()}`,
          { validateStatus: () => true }
        );
        const list = Array.isArray(res.data) ? res.data : [];
        const found = list.find((it) => String(it.idx) === String(id));
        if (!found) return openNotExist();

        const mapped = {
          id: found.idx,
          subject: found.wSubject ?? "",
          date: found.wDate ?? "",
          updated: found.wUpdate ?? "",
          writer: found.wName ?? "",
          views: found.wHit ?? 0,
          content: found.wContent ?? "",
        };
        setNotice(mapped);
        bumpHit(mapped.id);
      } catch {
        showToast("오류 발생");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id, location.key]);

  if (loading)
    return (
      <div id="Sub05NtcAdminView">
        <div className="container loading">로딩 중…</div>
      </div>
    );

  if (!notice)
    return (
      <div id="Sub05NtcAdminView">
        <div className="container">
          <div className="content-box empty">존재하지 않는 글입니다.</div>
        </div>
      </div>
    );

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

  const onClickDelete = () => {
    if (!notice?.id) {
      showToast("잘못된 글");
      return;
    }
    setAskOpen(true);
  };

  const onClickEdit = () => {
    navigate(`/ntcAdminE/${notice.id}`, { state: notice });
  };

  const confirmNo = () => setAskOpen(false);

  const confirmYes = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      const res = await axios.get(
        `${DELETE_URL}?idx=${notice.id}&_t=${Date.now()}`,
        {
          validateStatus: () => true,
          transformResponse: [(d) => d],
        }
      );
      const txt = String(res.data ?? "").trim();
      if (txt.startsWith("1")) {
        setAskOpen(false);
        showToast("삭제 완료");
        setTimeout(() => navigate(-1, { replace: true }), 250);
      } else {
        showToast("삭제 실패");
      }
    } catch {
      showToast("삭제 오류");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div id="Sub05NtcAdminView">
      <div className="container">
        <div className="sangdan">
          <a
            href="/mainComponent"
            aria-label="홈으로"
            onClick={(e) => onClickA(e, "/mainComponent")}
          >
            <i className="bi bi-house-door-fill" />
          </a>
          <span className="sep">
            <i className="bi bi-chevron-right" />
          </span>
          <span className="admin">관리자페이지</span>
        </div>

        <h2 className="page-title">
          <i className="bi bi-gear"></i> 공지사항 관리자
        </h2>

        <div className="content-box">
          <div className="headbar">
            <div className="title">{notice.subject}</div>
            <div className="meta-row">
              <div className="meta-left">
                <span>작성자: {notice.writer}</span>
                <span>등록일: {fmt(notice.date)}</span>
                <span>수정일: {notice.updated ? fmt(notice.updated) : "-"}</span>
                <span>조회수: {notice.views}</span>
              </div>
              <div className="meta-right">
                <button className="btn delete" onClick={onClickDelete}>
                  삭제
                </button>
                <button className="btn edit" onClick={onClickEdit}>
                  수정
                </button>
              </div>
            </div>
          </div>

          <div className="body">
            <div
              className="content-html"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          <div className="foot">
            <a
              href="/ntcAdmin"
              className="btn list"
              onClick={(e) => onClickA(e, "/ntcAdmin")}
            >
              목록
            </a>
          </div>
        </div>
      </div>

      {askOpen && (
        <div id="confirmModalComponent" onClick={confirmNo}>
          <div className="container">
            <div className="content" onClick={(e) => e.stopPropagation()}>
              <div className="col1 col">
                <div className="sentence">
                  <p className="heading">삭제할까요?</p>
                  <p className="explain">삭제 후 되돌릴 수 없습니다.</p>
                </div>

                <div className="button">
                  <button type="button" onClick={confirmNo}>
                    아니오
                  </button>
                  <button
                    type="button"
                    onClick={confirmYes}
                    disabled={deleting}
                  >
                    {deleting ? "삭제 중..." : "예"}
                  </button>
                </div>
              </div>

              <div className="col2 col">
                <i className="fa-solid fa-paw"></i>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: 30,
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,.8)",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: 6,
            fontSize: 13,
            zIndex: 10000,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

export default Sub05NtcAdminView;
