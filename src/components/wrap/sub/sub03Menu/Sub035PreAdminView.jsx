/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./scss/Sub035PreView.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";

function Sub035PreAdminView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const url = `${process.env.PUBLIC_URL || ""}/json/sub03/preorder.json`; 
    setLoading(true);
    setErr(null);

    axios
      .get(url)
      .then((res) => {
        const arr = Array.isArray(res.data?.예약신청) ? res.data.예약신청 : [];
        const found = arr.find((it) => String(it.idx) === String(id));
        if (!found) {
          setPost(null);
          return;
        }
        setPost({
          title: found.title ?? "",
          writer: found.author ?? "",
          reserveDate: found.reserveDate ?? "",
          writeDate: found.writeDate ?? "",
          time: found.time ?? "",
          people: found.people ?? "",
          wine: found.wine ?? "",
          food: found.food ?? "",
          note: found.note ?? "",
          status: found.status ?? "",
          reply: found.reply ?? "",
        });
      })
      .catch((e) => {
        const msg =
          e?.response ? `HTTP ${e.response.status} ${e.response.statusText}` : (e?.message || "데이터 로드 실패");
        console.error("[PreAdminView] fetch error:", msg, "url:", url);
        setErr(msg);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const onClickDelete = () => {
    dispatch(
      confirmModalAction({
        heading: "정말 이 글을 삭제하시겠습니까?",
        explain: "삭제 후에는 되돌릴 수 없습니다.",
        isON: true,
        isConfirm: true,
        message1: "예",
        message2: "아니오",
      })
    );
  };

  useEffect(() => {
    if (modal.isYes === true) {
      dispatch(confirmModalYesNoAction(false));
      dispatch(
        confirmModalAction({
          heading: "삭제되었습니다.",
          explain: "",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
    }
  }, [modal.isYes, dispatch]);

  useEffect(() => {
    if (modal.heading === "삭제되었습니다." && modal.isON) {
      navigate("/PreAdmin");
    }
  }, [modal.heading, modal.isON, navigate]);

  if (loading) {
    return (
      <div id="sub_preView">
        <div className="board-view" style={{ textAlign: "center", padding: 40 }}>불러오는 중…</div>
      </div>
    );
  }

  if (err) {
    return (
      <div id="sub_preView">
        <div className="board-view" style={{ textAlign: "center", padding: 40, color: "#c00" }}>
          데이터를 불러오지 못했어요. ({err})
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div id="sub_pre">
        <div className="paper" style={{ textAlign: "center", padding: 40 }}>
          <p>해당 게시글을 찾을 수 없습니다.</p>
          <button className="back-btn" onClick={() => navigate("/PreAdmin")} style={{ marginTop: 16 }}>
            ← 목록으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="sub_preView">
      <div className="board-view">
        <div className="view-header">
          <h2>{post.title}</h2>
          <div className="view-meta">
            작성자: {post.writer} | 예약일: {post.reserveDate} | 작성일: {post.writeDate}
          </div>
        </div>

        <div className="view-body">
          <ul className="info-table">
            <li><strong>시간</strong><span>{post.time}</span></li>
            <li><strong>인원</strong><span>{post.people}</span></li>
            <li><strong>와인</strong><span>{post.wine}</span></li>
            <li><strong>안주</strong><span>{post.food}</span></li>
            <li><strong>특이사항</strong><span>{post.note || "-"}</span></li>
          </ul>

          {post.reply && (
            <div className="admin-reply">
              <strong>관리자 답변</strong>
              <p>{post.reply}</p>
            </div>
          )}
        </div>

        <div className="view-actions">
          <button className="back-btn" onClick={() => navigate("/PreAdmin")}>← 목록으로</button>
          <button className="edit-btn" onClick={() => navigate(`/PreAdminE/edit/${id}`)}>✏ 수정하기</button>
          <button className="delete-btn" onClick={onClickDelete}>삭제하기</button>
        </div>
      </div>
    </div>
  );
}

export default Sub035PreAdminView;
