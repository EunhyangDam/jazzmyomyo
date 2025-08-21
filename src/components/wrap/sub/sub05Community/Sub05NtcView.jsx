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

  React.useEffect(() => {
    if (location.state && location.state.idx) {
      setNotice(location.state);
      setLoading(false);
      return;
    }

    axios({
      url: "./json/sub05/notice.json",
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          const list = Array.isArray(res.data?.공지사항) ? res.data.공지사항 : [];
          const found = list.find((it) => String(it.idx) === String(id));
          setNotice(found || null);
        }
      })
      .catch((err) => {
        console.error(err);
        setNotice(null);
      })
      .finally(() => setLoading(false));
  }, [id, location.state]);

  if (loading)
    return <div style={{ padding: "100px", textAlign: "center" }}>로딩 중…</div>;
  if (!notice)
    return <div style={{ padding: "100px", textAlign: "center" }}>존재하지 않는 글입니다.</div>;

  return (
    <div id="noticeView">
      <div className="container">

        <div className="sangdan">
          <Link to="/mainComponent">
            <i className="bi bi-house-door-fill" />
          </Link>
          <span className="sep"><i class="bi bi-chevron-right"></i></span>
          <span>커뮤니티</span>
          <span className="sep"><i class="bi bi-chevron-right"></i></span>
          <span className="notice">공지사항</span>
        </div>

        <h2 className="page-title">공지사항</h2>

        <div className="notice-box">
          <div className="notice-title">{notice.subject}</div>

          <div className="notice-meta">
            <div className="left">
              <span>작성자 : {notice.name}</span>
              <span>등록일 : {notice.date}</span>
            </div>
            <div className="right">조회수 : {notice.hit}</div>
          </div>

          <div className="notice-body">
            <div className="notice-image">재즈묘묘 외부 or 내부등 관련 이미지</div>
            <p>
              {(notice.content || "").split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div className="btn-wrap">
            <button onClick={() => navigate(-1)}>목록</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub05NtcView;
