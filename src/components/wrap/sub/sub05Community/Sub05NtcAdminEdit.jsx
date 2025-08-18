/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./scss/Sub05NtcAdminEdit.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";

function Sub05NtcAdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        
        const url = `${process.env.PUBLIC_URL || ""}/json/sub05/notice.json`;
        const res = await axios.get(url);
        const list = Array.isArray(res.data?.공지사항) ? res.data.공지사항 : [];

        const found = list.find((it) => String(it.idx) === String(id));
        if (!found) {
          dispatch(confirmModalAction({
            heading: "잘못된 접근입니다.",
            explain: "",
            isON: true,
            isConfirm: false,
            message1: "",
            message2: "",
          }));
          return;
        }

        setForm({
          title: found.subject ?? "",
          content: found.content ?? "",
        });
      } catch (e) {
        console.error(e);
        dispatch(confirmModalAction({
          heading: "잘못된 접근입니다.",
          explain: "",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        }));
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
    else {
      dispatch(confirmModalAction({
        heading: "잘못된 접근입니다.",
        explain: "",
        isON: true,
        isConfirm: false,
        message1: "",
        message2: "",
      }));
      setLoading(false);
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (
      (modal.heading === "잘못된 접근입니다." || modal.heading === "수정되었습니다.") &&
      modal.isON
    ) {
      dispatch(confirmModalYesNoAction(false));
      if (id) navigate(`/NtcAdminV/${id}`);
      else navigate("/NtcAdmin");
    }
  }, [modal.heading, modal.isON, dispatch, navigate, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      dispatch(confirmModalAction({
        heading: "제목과 내용을 모두 입력해주세요.",
        explain: "",
        isON: true,
        isConfirm: false,
        message1: "",
        message2: "",
      }));
      return;
    }

    // TODO: 백엔드 연동 시 여기서 저장 API 호출
    dispatch(confirmModalAction({
      heading: "수정되었습니다.",
      explain: "",
      isON: true,
      isConfirm: false,
      message1: "",
      message2: "",
    }));
  };

  if (loading) {
    return (
      <div id="Sub05NtcAdminEdit" style={{ padding: 60, textAlign: "center" }}>
        로딩 중…
      </div>
    );
  }

  return (
    <div id="Sub05NtcAdminEdit">
      <div className="breadcrumb">
        <i className="bi bi-house"></i> &gt; <Link to="/NtcAdmin">공지사항</Link> &gt; 글수정
      </div>

      <h2>공지사항 수정</h2>

      <form className="write-form" onSubmit={handleSubmit}>
        <label>제목</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
        />

        <label>내용</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
        />

        <div className="btn-group">
          <button type="submit">수정</button>
          <button type="button" onClick={() => navigate(-1)}>취소</button>
        </div>
      </form>
    </div>
  );
}

export default Sub05NtcAdminEdit;
