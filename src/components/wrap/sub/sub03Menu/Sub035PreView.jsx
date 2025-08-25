/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./scss/Sub035PreView.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";
import axios from "axios";

function Sub035PreView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);

    // `preorder_table_view.php`는 모든 필드를 반환하므로 추가적인 수정은 불필요
    axios
      .get("/jazzmyomyo/preorder_table_view.php", { params: { id } })
      .then((res) => {
        const { data } = res;
        
        if (!data || typeof data !== "object" || Array.isArray(data) || !data.item) {
          throw new Error("서버 응답 형식 오류");
        }
        const item = data.item;

        setPost({
          id: item.id || "",
          userId: item.user_id || "", 
          title: item.title || "사전주문",
          writer: item.writer_name || "익명", 
          reserveDate: item.reserve_date || "-", 
          time: item.reserve_time || "-", 
          people: item.people || "-",
          wine: item.wine || "",
          beverage: item.beverage || "",
          food: item.food || "",
          note: item.note || "",
          status: item.status || "상태없음",
          reply: item.reply || "",
          replyDate: item.reply_date || "", // <-- 1. reply_date 데이터 매핑
          writeDate: item.created_at ? item.created_at.split(" ")[0] : "-",
        });
      })
      .catch((e) => {
        setErr(e?.message || "데이터 로드 실패");
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
      
      if (!id) {
        dispatch(
          confirmModalAction({
            heading: "삭제 실패",
            explain: "유효한 예약 정보가 없습니다.",
            isON: true,
            isConfirm: false,
            message1: "확인",
          })
        );
        return;
      }
  
      axios
        .get("/jazzmyomyo/preorder_table_delete.php", {
          params: {
            id: id,
          }
        })
        .then((res) => {
          if (res.data.success) {
            dispatch(
              confirmModalAction({
                heading: "삭제되었습니다.",
                explain: "",
                isON: true,
                isConfirm: false,
                message1: "확인",
              })
            );
          } else {
            dispatch(
              confirmModalAction({
                heading: "삭제 실패",
                explain: res.data.message || "삭제 중 오류 발생",
                isON: true,
                isConfirm: false,
                message1: "확인",
              })
            );
          }
        })
        .catch((e) => {
          dispatch(
            confirmModalAction({
              heading: "삭제 실패",
              explain: e.message || "서버 오류 발생",
              isON: true,
              isConfirm: false,
              message1: "확인",
            })
          );
        });
    }
  }, [modal.isYes, post, dispatch, id, navigate]);
  

  useEffect(() => {
    if (modal.heading === "삭제되었습니다." && modal.isON) {
      navigate("/pre?deleted=" + id)
    }
  }, [modal.heading, modal.isON, navigate, id]);

  if (loading) {
    return (
      <div id="sub_preView">
        <div className="board-view" style={{ textAlign: "center", padding: 40 }}>
          불러오는 중…
        </div>
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
      <div id="sub_preView">
        <div className="board-view">
          <div id="sub_pre">
            <div className="paper" style={{ textAlign: "center", padding: 40 }}>
              <p>해당 게시글을 찾을 수 없습니다.</p>
              <button className="back-btn" onClick={() => navigate("/Pre")} style={{ marginTop: 16 }}>
                ← 목록으로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const user = JSON.parse(
    localStorage.getItem("jazzmyomyo_sign_in") || sessionStorage.getItem("jazzmyomyo_sign_in")
  );
  const currentUserId = user?.아이디;
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  
  const isAuthor = currentUserId === post.userId;
  
  const canModify = isAuthor || isAdmin;

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
            <li><strong>음료</strong><span>{post.beverage}</span></li>
            <li><strong>안주</strong><span>{post.food}</span></li>
            <li><strong>특이사항</strong><span>{post.note}</span></li>
          </ul>
          
          {post.reply && (
            <div className="admin-reply">
              <strong>관리자 답변</strong>
              {/* <-- 2. reply_date가 있을 경우 표시 */}
              <p>{post.reply}</p>
              {post.replyDate && <p className="reply-date">답변일: {post.replyDate}</p>}
            </div>
          )}
        </div>

        <div className="view-actions">
          <button className="back-btn" onClick={() => navigate("/pre")}>← 목록으로</button>
          
          {canModify && (
            <>
              <button className="edit-btn" onClick={() => navigate(`/preE/edit/${id}`)}>✏ 수정하기</button>
              <button className="delete-btn" onClick={onClickDelete}>삭제하기</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sub035PreView;