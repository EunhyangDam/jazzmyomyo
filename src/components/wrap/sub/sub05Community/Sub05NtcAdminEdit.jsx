/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./scss/Sub05NtcAdminEdit.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";

function Sub05NtcAdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const [form, setForm] = useState({
    title: "",
    content: "",
    writer: "관리자",
    date: "",
    file: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const previewObjectUrlRef = useRef(null);
  const [currentFileId, setCurrentFileId] = useState("");
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const today = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}.${m}.${dd}`;
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const url = `${process.env.PUBLIC_URL || ""}/json/sub05/notice.json`;
        const res = await axios.get(url);
        const list = Array.isArray(res.data?.공지사항) ? res.data.공지사항 : [];
        const found = list.find((it) => String(it.idx) === String(id));
        if (!found) {
          dispatch(
            confirmModalAction({
              heading: "잘못된 접근입니다.",
              explain: "",
              isON: true,
              isConfirm: false,
              message1: "",
              message2: "",
            })
          );
          return;
        }
        setForm({
          title: found.subject ?? "",
          content: found.content ?? "",
          writer: found.writer ?? found.name ?? "관리자",
          date: found.date ?? today,
          file: null,
        });
      } catch {
        dispatch(
          confirmModalAction({
            heading: "잘못된 접근입니다.",
            explain: "",
            isON: true,
            isConfirm: false,
            message1: "",
            message2: "",
          })
        );
      }
    };
    if (id) load();
    else {
      dispatch(
        confirmModalAction({
          heading: "잘못된 접근입니다.",
          explain: "",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
    }
  }, [id, dispatch, today]);

  useEffect(() => {
    if (modal.heading === "수정되었습니다." && modal.isON) {
      dispatch(confirmModalYesNoAction(false));
      navigate(`/NtcAdminV/${id}`);
    }
    if (modal.heading === "잘못된 접근입니다." && modal.isON) {
      dispatch(confirmModalYesNoAction(false));
      navigate("/NtcAdmin");
    }
  }, [modal.heading, modal.isON, dispatch, navigate, id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onPickFile = () => {
    fileInputRef.current?.click();
  };

  const makeId = () => "img_" + Math.random().toString(36).slice(2, 10);

  const onFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setForm((p) => ({ ...p, file: f }));
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
      previewObjectUrlRef.current = null;
    }
    if (!f) {
      setPreviewUrl("");
      setCurrentFileId("");
      return;
    }
    const url = URL.createObjectURL(f);
    previewObjectUrlRef.current = url;
    setPreviewUrl(url);
    setCurrentFileId(makeId());
  };

  const insertAtCursor = (text) => {
    const el = textareaRef.current;
    if (!el) {
      setForm((p) => ({ ...p, content: (p.content || "") + text }));
      return;
    }
    const start = el.selectionStart ?? (form.content?.length || 0);
    const end = el.selectionEnd ?? (form.content?.length || 0);
    setForm((p) => ({
      ...p,
      content: (p.content || "").slice(0, start) + text + (p.content || "").slice(end),
    }));
    setTimeout(() => {
      el.focus();
      const pos = start + text.length;
      el.setSelectionRange(pos, pos);
    }, 0);
  };

  const onUpload = () => {
    const f = form.file;
    if (!f || !currentFileId) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      insertAtCursor(`\n<img src="${dataUrl}" alt="${f.name || "image"}" data-id="${currentFileId}" />\n`);
    };
    reader.readAsDataURL(f);
  };

  const onRemove = () => {
    setForm((p) => {
      let content = p.content || "";
      if (currentFileId) {
        const idr = currentFileId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp(`\\s*<img\\s+[^>]*data-id="${idr}"[^>]*>\\s*`, "g");
        content = content.replace(re, "");
      }
      return { ...p, file: null, content };
    });
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
      previewObjectUrlRef.current = null;
    }
    setPreviewUrl("");
    setCurrentFileId("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (previewObjectUrlRef.current) URL.revokeObjectURL(previewObjectUrlRef.current);
    };
  }, []);

  const onSubmit = (e) => {
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
    dispatch(
      confirmModalAction({
        heading: "수정되었습니다.",
        explain: "",
        isON: true,
        isConfirm: false,
        message1: "",
        message2: "",
      })
    );
  };

  return (
    <div id="Sub05NtcAdminEdit">
      <div className="container">
        <div className="sangdan">
          <Link to="/"><i className="bi bi-house-door-fill" /></Link>
          <span className="sep"><i className="bi bi-chevron-right" /></span>
          <span className="admin">관리자페이지</span>
          <span className="sep"><i className="bi bi-chevron-right" /></span>
          <span className="write">글수정</span>
        </div>

        <h2 className="page-title"><i className="bi bi-gear"></i> 공지사항 관리자</h2>

        <form className="content-box" onSubmit={onSubmit}>
          <div className="headbar">
            <input
              className="title-input"
              type="text"
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="제목을 입력하세요"
              aria-label="제목"
            />
            <div className="meta-row">
              <div className="meta-left">
                <span>작성자: {form.writer}</span>
                <span>수정일: {form.date || today}</span>
                <button type="button" className="badge file" onClick={onPickFile}>파일첨부</button>
                {form.file && <span className="file-name">{form.file.name}</span>}
              </div>
              <div className="meta-right">
                <button type="button" className="btn upload" onClick={onUpload}>업로드</button>
                <button type="button" className="btn upload" onClick={onRemove}>파일삭제</button>
                <button type="submit" className="btn submit">수정</button>
              </div>
            </div>
          </div>

          <div className="body">
            <div className="image">
              {previewUrl
                ? <img src={previewUrl} alt={form.file?.name || "preview"} style={{maxWidth:"100%", maxHeight:"100%", objectFit:"contain"}} />
                : (form.file ? "첨부 이미지 미리보기 자리" : "재즈묘묘 관련 이미지")}
            </div>
            <textarea
              ref={textareaRef}
              name="content"
              value={form.content}
              onChange={onChange}
              placeholder="내용을 입력하세요"
              aria-label="내용"
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

export default Sub05NtcAdminEdit;
