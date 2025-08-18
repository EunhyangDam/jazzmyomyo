import React from "react";
import axios from "axios";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";
import "./scss/Sub05NtcAdminView.scss";

function Sub05NtcAdminView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const [notice, setNotice] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const mapToView = React.useCallback((raw) => {
    if (!raw) return null;
    return {
      id: raw.idx,
      title: raw.subject,
      date: raw.date,
      writer: raw.name,
      views: raw.hit,
      content: raw.content || "",
    };
  }, []);

  React.useEffect(() => {
    if (location.state && (location.state.idx || location.state.id)) {
      const raw = {
        idx: location.state.idx ?? location.state.id,
        subject: location.state.subject ?? location.state.title,
        date: location.state.date,
        name: location.state.name ?? location.state.writer,
        hit: location.state.hit ?? location.state.views,
        content: location.state.content,
      };
      setNotice(mapToView(raw));
      setLoading(false);
      return;
    }

    const fetchOne = async () => {
      try {
        const url = `${process.env.PUBLIC_URL || ""}/json/sub05/notice.json`;
        const res = await axios.get(url);
        const list = Array.isArray(res.data?.공지사항) ? res.data.공지사항 : [];
        const found = list.find((it) => String(it.idx) === String(id));
        setNotice(mapToView(found));
      } catch (e) {
        console.error(e);
        setNotice(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOne();
  }, [id, location.state, mapToView]);

  const onClickDeleteBtn = (e) => {
    e.preventDefault();
    dispatch(
      confirmModalAction({
        heading: "정말 삭제하시겠습니까?",
        explain: "삭제 후에는 되돌릴 수 없습니다.",
        isON: true,
        isConfirm: true,
        message1: "예",
        message2: "아니오",
      })
    );
  };

  React.useEffect(() => {
    if (modal.isYes === true) {
      dispatch(confirmModalYesNoAction(false));
      dispatch(
        confirmModalAction({
          heading: "삭제되었습니다",
          explain: "",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
    }
  }, [modal.isYes, dispatch]);

  React.useEffect(() => {
    if (modal.heading === "삭제되었습니다" && modal.isON) {
      navigate("/NtcAdmin");
    }
  }, [modal.heading, modal.isON, navigate]);

  if (loading) {
    return (
      <div id="Sub05NtcAdminView">
        <div className="container" style={{ padding: "100px", textAlign: "center" }}>
          로딩 중…
        </div>
      </div>
    );
  }

  return (
    <div id="Sub05NtcAdminView">
      <div className="breadcrumb">
        <Link to="/"><i className="bi bi-house"></i></Link> &gt; <Link to="/NtcAdmin">공지사항</Link>
      </div>

      <div className="container">
        <h2>공지사항</h2>

        {!notice ? (
          <div className="content-box" style={{ padding: "80px", textAlign: "center" }}>
            존재하지 않는 글입니다.
          </div>
        ) : (
          <div className="content-box">
            <div className="notice-header">
              <div className="title">{notice.title}</div>
              <div className="notice-meta">
                <span>작성자 : {notice.writer}</span>
                <span>등록일 : {notice.date}</span>
                <span>조회수 : {notice.views}</span>
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
              <div className="left-actions">
                <Link to={`/NtcAdminE/${notice.id}`} className="edit-btn">수정</Link>
                <button onClick={onClickDeleteBtn} className="delete-btn">삭제</button>
              </div>
              <div className="right-actions">
                <button className="list-btn" onClick={() => navigate("/NtcAdmin")}>목록</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sub05NtcAdminView;
