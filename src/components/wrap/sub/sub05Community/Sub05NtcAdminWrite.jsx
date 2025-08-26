import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./scss/Sub05NtcAdminWrite.scss";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";
import axios from "axios";
import useCustomA from "../../custom/useCustomA.js";

function Sub05NtcAdminWrite() {
  const { onClickA } = useCustomA();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useSelector 안에서 빈 객체 직접 리턴하지 않고 밖에서 fallback 처리
  const signin = useSelector((s) => s.signin);
  const singin = useSelector((s) => s.singin);
  const auth = signin || singin || {};

  const wId = auth.userId || auth.아이디 || "jazzmyomyo";
  const wName = auth.userName || auth.이름 || "관리자";

  const [form, setForm] = useState({
    title: "",
    content: "",
    writer: "관리자",
    date: "",
    file: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const previewObjectUrlRef = useRef(null);
  const fileInputRef = useRef(null);
  const titleRef = useRef(null);
  const textareaRef = useRef(null);

  const today = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}.${m}.${dd}`;
  }, []);

  useEffect(() => {
    setForm((prev) => ({ ...prev, date: today }));
  }, [today]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onPickFile = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setForm((p) => ({ ...p, file: f }));
    if (previewObjectUrlRef.current) URL.revokeObjectURL(previewObjectUrlRef.current);
    if (!f) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(f);
    previewObjectUrlRef.current = url;
    setPreviewUrl(url);
  };

  const onRemove = () => {
    setForm((p) => ({ ...p, file: null }));
    if (previewObjectUrlRef.current) URL.revokeObjectURL(previewObjectUrlRef.current);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      dispatch(
        confirmModalAction({
          heading: "제목과 내용을 입력해주세요.",
          isON: true,
          isConfirm: false,
        })
      );
      titleRef.current?.focus();
      return;
    }

    const fd = new FormData();
    fd.append("wSubject", form.title);

    const safeContent = form.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    fd.append("wContent", safeContent);

    fd.append("wId", wId);
    fd.append("wName", wName);
    if (form.file) fd.append("file", form.file);

    try {
      const res = await axios.post("/jazzmyomyo/notice_table_insert.php", fd);
      const body = String(res.data ?? "").replace(/\uFEFF/g, "").trim();
      if (res.status === 200 && (body === "1" || body.includes("성공"))) {
        dispatch(
          confirmModalAction({
            heading: "등록되었습니다.",
            isON: true,
            isConfirm: false,
          })
        );
        setForm({ title: "", content: "", writer: "관리자", date: today, file: null });
        setPreviewUrl("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        navigate("/ntcAdmin");
      } else {
        dispatch(
          confirmModalAction({
            heading: "작성 실패",
            explain: body || "서버 응답 없음",
            isON: true,
            isConfirm: false,
          })
        );
      }
    } catch (err) {
      dispatch(
        confirmModalAction({
          heading: "통신 오류",
          explain: err?.message || "서버 연결 실패",
          isON: true,
          isConfirm: false,
        })
      );
    }
  };

  return (
    <div id="Sub05NtcAdminWrite">
      <div className="container">
        <div className="sangdan">
          <a
            href="/"
            onClick={(e) => onClickA(e, "/")}
            aria-label="홈으로"
          >
            <i className="bi bi-house-door-fill" />
          </a>
          <i className="bi bi-chevron-right" />
          <span>관리자페이지</span>
          <i className="bi bi-chevron-right" />
          <span>글쓰기</span>
        </div>

        <h2 className="page-title"><i className="bi bi-gear" /> 공지사항 관리자</h2>

        <form className="content-box" onSubmit={onSubmit}>
          <div className="headbar">
            <input
              ref={titleRef}
              className="title-input"
              type="text"
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="제목을 입력하세요"
            />
            <div className="meta-row">
              <div className="meta-left">
                <span>작성자: {form.writer}</span>
                <span>등록일: {form.date}</span>
                <button type="button" className="badge file" onClick={onPickFile}>파일첨부</button>
                <button type="button" className="badge delete" onClick={onRemove}>파일삭제</button>
                {form.file && <span className="file-name">{form.file.name}</span>}
              </div>
              <div className="meta-right">
                <button type="submit" className="btn submit">등록</button>
              </div>
            </div>
          </div>

          <div className="body">
            <div className="image">
              {previewUrl ? (
                <img src={previewUrl} alt="미리보기" style={{ maxWidth: "100%", maxHeight: "100%" }} />
              ) : (
                "미리보기 이미지가 없습니다."
              )}
            </div>
            <textarea
              ref={textareaRef}
              name="content"
              value={form.content}
              onChange={onChange}
              placeholder="내용을 입력하세요"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              hidden
            />
          </div>

          <div className="foot">
            <button type="button" className="btn list" onClick={() => navigate(-1)}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sub05NtcAdminWrite;
