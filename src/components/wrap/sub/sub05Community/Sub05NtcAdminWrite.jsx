import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./scss/Sub05NtcAdminWrite.scss";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";

function Sub05NtcAdminWrite() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      dispatch(
        confirmModalAction({
          heading: "제목과 내용을 모두 입력해주세요.",
          explain: "",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
      return;
    }

    // TODO: 실제 POST 성공 시점에 아래 디스패치 호출
    dispatch(
      confirmModalAction({
        heading: "등록되었습니다.",
        explain: "",
        isON: true,
        isConfirm: false,
        message1: "",
        message2: "",
      })
    );
  };

  useEffect(() => {
    if (modal.heading === "등록되었습니다." && modal.isON) {
      dispatch(confirmModalYesNoAction(false));
      navigate("/NtcAdmin");
    }
  }, [modal.heading, modal.isON, dispatch, navigate]);

  return (
    <div id="Sub05NtcAdminWrite">
      {/* breadcrumb도 컨테이너 폭에 맞춰 정렬 */}
      <div className="breadcrumb">
        <Link to="/"><i className="bi bi-house"></i></Link> &gt;{" "}
        <Link to="/NtcAdmin">공지사항</Link> &gt; 글쓰기
      </div>

      <div className="container">
        <h2>공지사항 글쓰기</h2>

        <form className="write-form" onSubmit={handleSubmit}>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />

          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
          />

          <div className="btn-group">
            <button type="submit" className="primary">등록</button>
            <button type="button" className="ghost" onClick={() => navigate(-1)}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sub05NtcAdminWrite;
