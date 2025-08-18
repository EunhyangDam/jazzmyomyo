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
    // 1) 목록에서 state로 온 경우 바로 사용 (추가 요청 X)
    if (location.state && location.state.idx) {
      setNotice(location.state);
      setLoading(false);
      return;
    }

    // 2) 직접 접근: JSON에서 찾아오기 (리스트와 동일한 axios 패턴)
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

  if (loading) return <div style={{ padding: "100px", textAlign: "center" }}>로딩 중…</div>;
  if (!notice) return <div style={{ padding: "100px", textAlign: "center" }}>존재하지 않는 글입니다.</div>;

  return (
    <div id="noticeView">
      <div className="breadcrumb">
        <Link to="/"><i className="bi bi-house"></i></Link> &gt; <Link to="/Ntc">공지사항</Link> 
      </div>

      <div className="container">
        <h2>공지사항</h2>

        <div className="content-box">
          <div className="notice-header">
            <div className="title">{notice.subject}</div>
            <div className="notice-meta">
              <span>작성자 : {notice.name}</span>
              <span>등록일 : {notice.date}</span>
              <span>조회수 : {notice.hit}</span>
            </div>
          </div>

          <div className="notice-body">
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
