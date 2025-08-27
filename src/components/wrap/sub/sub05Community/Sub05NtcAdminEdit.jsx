/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./scss/Sub05NtcAdminEdit.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";

import useCustomA from "../../custom/useCustomA";

function Sub05NtcAdminEdit() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector((s) => s.confirmModal);
  const { onClickA } = useCustomA();

  const [form, setForm] = useState({
    title: "",
    content: "",
    writer: "관리자",
    createdAt: "",
    updatedAt: "",
    file: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const previewObjectUrlRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const [clearImage, setClearImage] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${y}-${m}-${dd} ${hh}:${mi}:${ss}`;
  }, []);

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

  useEffect(() => {
    const state = location.state;
    if (state && (state.idx || state.id)) {
      setForm({
        title: state.subject ?? state.wSubject ?? "",
        content: state.content ?? state.wContent ?? "",
        writer: state.writer ?? state.wName ?? "관리자",
        createdAt: state.wDate ?? state.date ?? "",
        updatedAt: state.wUpdate ?? "",
        file: null,
      });
    }

    const load = async () => {
      try {
        const res = await axios.get(`/jazzmyomyo/notice_table_select.php?_t=${Date.now()}`, {
          validateStatus: () => true,
        });
        const list = Array.isArray(res.data) ? res.data : [];
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
        setForm((p) => ({
          ...p,
          title: found.wSubject ?? "",
          content: found.wContent ?? "",
          writer: found.wName ?? "관리자",
          createdAt: found.wDate ?? "",
          updatedAt: found.wUpdate ?? "",
          file: null,
        }));
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
  }, [id]);

  useEffect(() => {
    if (modal.heading === "수정되었습니다." && modal.isON) {
      dispatch(confirmModalYesNoAction(false));
      navigate(`/ntcAdminV/${id}?r=${Date.now()}`);
    }
    if (modal.heading === "잘못된 접근입니다." && modal.isON) {
      dispatch(confirmModalYesNoAction(false));
      navigate("/ntcAdmin");
    }
  }, [modal.heading, modal.isON]);

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
    setClearImage(false);
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
      previewObjectUrlRef.current = null;
    }
    if (!f) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(f);
    previewObjectUrlRef.current = url;
    setPreviewUrl(url);
  };

  const onDeleteFile = () => {
    if (form.file || previewUrl) {
      setForm((p) => ({ ...p, file: null }));
      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
        previewObjectUrlRef.current = null;
      }
      setPreviewUrl("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setForm((p) => ({
      ...p,
      content: String(p.content || "").replace(/<img\b[^>]*>\s*/gi, ""),
    }));
    setClearImage(true);
  };

  useEffect(() => {
    return () => {
      if (previewObjectUrlRef.current) URL.revokeObjectURL(previewObjectUrlRef.current);
    };
  }, []);

  const onSubmit = async (e) => {
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
    try {
      const fd = new FormData();
      fd.append("idx", String(id));
      fd.append("wSubject", form.title);
      fd.append("wContent", form.content);
      fd.append("clear_file", clearImage ? "1" : "0");
      if (form.file) fd.append("file", form.file);

      const res = await axios.post("/jazzmyomyo/notice_table_update.php", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        validateStatus: () => true,
      });

      if (String(res.data).trim() === "1") {
        setForm((p) => ({ ...p, updatedAt: today }));
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
      } else {
        dispatch(
          confirmModalAction({
            heading: "수정 실패",
            explain: "잠시 후 다시 시도해주세요.",
            isON: true,
            isConfirm: false,
            message1: "",
            message2: "",
          })
        );
      }
    } catch {
      dispatch(
        confirmModalAction({
          heading: "수정 실패",
          explain: "네트워크 오류입니다.",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
    }
  };

  return (
    <div id="Sub05NtcAdminEdit">
      <div className="container">
        <div className="sangdan">
          <a
            href="/"
            onClick={(e) => onClickA(e, "/")}
          >
            <i className="bi bi-house-door-fill" />
          </a>
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
                <span>등록일: {fmt(form.createdAt)}</span>
                <span>수정일: {form.updatedAt ? fmt(form.updatedAt) : "-"}</span>
                <button type="button" className="badge file" onClick={onPickFile}>파일첨부</button>
                <button type="button" className="badge delete" onClick={onDeleteFile}>파일삭제</button>
                {form.file && <span className="file-name">{form.file.name}</span>}
              </div>
              <div className="meta-right">
                <button type="submit" className="btn submit">수정</button>
              </div>
            </div>
          </div>

          <div className="body">
            <div className="image">
              {previewUrl
                ? <img src={previewUrl} alt={form.file?.name || "preview"} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                : "재즈묘묘 관련 이미지"}
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
