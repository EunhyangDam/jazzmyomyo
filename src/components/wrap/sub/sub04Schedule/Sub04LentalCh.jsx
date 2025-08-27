import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";
import "./scss/Sub04LentalCh.scss"


export default function Sub04LentalCh(){

  const dispatch = useDispatch();

  const [mode, setMode] = useState("form"); // form | result
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "" });


  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const clearName = () => setForm((s) => ({ ...s, name: "" }));
  const clearPhone = () => setForm((s) => ({ ...s, phone: "" }));

  const asDate = (s) => (s ? String(s).slice(0, 10) : "");

  const onSubmit = (e) => {
    e.preventDefault();
  
    // 입력 검증
    if (!form.name.trim() || !String(form.phone || "").replace(/\D+/g, "")) {
      const obj = {
        heading: "다시 확인해주세요",
        explain: " ",
        isON: true,
        isConfirm: false,
      };
      dispatch(confirmModalAction(obj));
      return;
    }
  
    setLoading(true);
  
    // FormData 로 전송
    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("phone", String(form.phone).replace(/\D+/g, ""));
  
    axios({
      url: "/jazzmyomyo/lental_search_api.php",
      method: "POST",
      data: formData,
      withCredentials: true,
    })
      .then((res) => {
  
        if (res.status === 200) {
          const data = res.data || {};
          const list = Array.isArray(data.rows) ? data.rows : [];
  
          if (data.ok === 1 && list.length > 0) {
            const normalized = list.map((r) => {
              const baseName = (r.name ?? form.name ?? "신청자").toString().trim();
              const fromApi  = (r.file_orig_name || r.filename || r.fileName || "").toString().trim();
              // 확장자 우선순위: API 원본 > .pdf 기본
              const ext = (fromApi.match(/\.[A-Za-z0-9]{2,5}$/)?.[0]) || ".pdf";
              const display = sanitizeFileName(fromApi || `${baseName}_대관신청서${ext}`);
              return {
                id: r.id ?? null,
                name: baseName,
                email: r.email ?? "",
                created_at: r.created_at ?? r.createdAt ?? "",
                displayFileName: display,  // ▼ 버튼 표시 & 저장 파일명에 사용
                download_url:
                  r.download_url ??
                  (r.id ? `/jazzmyomyo/lental_download.php?id=${encodeURIComponent(String(r.id))}` : "#"),
              };
            });
            setRows(normalized);
            setMode("result"); // 페이지 내 전환
          } else {
            const obj = {
              heading: "다시 확인해주세요",
              explain: " ",
              isON: true,
              isConfirm: false,
            };
            dispatch(confirmModalAction(obj));
          }
        } else {
          const obj = {
            heading: "다시 확인해주세요",
            explain: " ",
            isON: true,
            isConfirm: false,
          };
          dispatch(confirmModalAction(obj));
        }
      })
      .catch((err) => {
        console.error("[대관신청 조회 오류]", err);
        const obj = {
          heading: "다시 확인해주세요",
          explain: " ",
          isON: true,
          isConfirm: false,
        };
        dispatch(confirmModalAction(obj));
      })
      .finally(() => setLoading(false));
  };

  const goBack = () => {
    setMode("form");
    setRows([]);
  };


  const handleDownload = (row) => {
    const id = row.id ?? null;
    const token = row.token ?? row.fileToken ?? null;
    if (!id && !token) {
      dispatch(confirmModalAction({ heading: "다시 확인해주세요", explain: " ", isON: true, isConfirm: false }));
      return;
    }
  
    axios({
      url: "/jazzmyomyo/lental_download.php",
      method: "GET",
      responseType: "blob",
      withCredentials: true,
      params: id ? { id } : { token },
    })
      .then((res) => {
        // 1) 확장자 결정 (MIME → 확장자, 없으면 원본/기본값)
        // 버튼에 보이는 텍스트를 그대로 저장 파일명으로 사용
        let filename = (row.displayFileName || "").toString().trim();
        if (!filename) {
          // 혹시 대비: 버튼 텍스트가 비어 있으면 안전하게 다시 생성
          const mime = res.headers["content-type"] || "";
          let ext = mime.includes("pdf") ? ".pdf"
                  : mime.includes("officedocument.wordprocessingml") ? ".docx"
                  : mime.includes("msword") ? ".doc"
                  : mime.includes("spreadsheetml") ? ".xlsx"
                  : mime.includes("excel") ? ".xls" : ".pdf";
          filename = sanitizeFileName(`${(row.name||"신청자")}_대관신청서${ext}`);
        }  
        // 3) Blob 저장
        const blob = new Blob([res.data]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename; // ← 저장창에 이 이름으로 표시 (한글 OK)
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error("[다운로드 오류]", err?.response || err);
        dispatch(confirmModalAction({ heading: "다시 확인해주세요", explain: " ", isON: true, isConfirm: false }));
      });
  };
  
  // 헬퍼 (컴포넌트 안에 함께)
  const sanitizeFileName = (s) => s.replace(/[\\/:*?"<>|]/g, "_").replace(/\s+/g, " ").trim();


    return(
      <div id="Sub04LentalCh">
        <div className="container">
              <ul>
                <li className="order4">
                  <div>
                    {/* ===== 폼 화면 ===== */}
                    {mode === "form" && (
                      <div className="search-form-card">
                        <h3 className="hero-title">대관신청 조회</h3>

                        <form className="search-form" onSubmit={onSubmit} autoComplete="off">
                          {/* 이름 */}
                          <div className="field">
                            <label htmlFor="name">이름</label>
                            <div className="input-wrap">
                              <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="신청시 입력한 이름을 입력해주세요"
                                value={form.name}
                                onChange={onChange}
                              />
                              {form.name && (
                                <button
                                  type="button"
                                  className="btn-clear"
                                  aria-label="이름 지우기"
                                  onClick={clearName}
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          </div>

                          {/* 연락처 */}
                          <div className="field">
                            <label htmlFor="phone">연락처</label>
                            <div className="input-wrap">
                              <input
                                id="phone"
                                name="phone"
                                type="text"
                                placeholder="신청시 연락처를 입력해주세요"
                                value={form.phone}
                                onChange={onChange}
                                inputMode="numeric"
                              />
                              {form.phone && (
                                <button
                                  type="button"
                                  className="btn-clear"
                                  aria-label="연락처 지우기"
                                  onClick={clearPhone}
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          </div>

                          <button className="btn-submit" type="submit" disabled={loading}>
                            {loading ? "조회 중..." : "대관 이력 조회"}
                          </button>
                        </form>
                      </div>
                    )}

                    {/* ===== 결과 화면 ===== */}
                    {mode === "result" && (
                      <div className="table search-result">
                        <div className="head-box">
                          <ul className="column-box">
                            <li className="col col1"><h3>신청일</h3></li>
                            <li className="col col2"><h3>대관신청서</h3></li>
                            <li className="col col3"><h3>이메일</h3></li>
                          </ul>
                        </div>

                        <div className="list-box">
                          <ul>
                            {rows.map((row, i) => (
                              <li key={row.id ?? i}>
                                <ul className="column-contents card-row">
                                  <li className="col col1" data-label="신청일">
                                    <h3>{asDate(row.created_at) || "-"}</h3>
                                  </li>
                                  <li className="col col2" data-label="대관신청서">
                                    {(row.id || row.token || row.fileToken) ? (
                                      <button 
                                        type="button" 
                                        className="btn-download" 
                                        onClick={() => handleDownload(row)}
                                      >
                                         {row.displayFileName}
                                      </button>
                                    ) : (
                                      <span className="dim">파일없음</span>
                                    )}
                                  </li>
                                  <li className="col col3" data-label="이메일">
                                    <h3>{row.email || "-"}</h3>
                                  </li>
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="result-actions">
                          <button type="button" className="btn-back" onClick={goBack}>
                            다시 조회
                          </button>
                        </div>
                      </div>
                    )}
                    {/* ===== // 결과 ===== */}
                  </div>
                </li>
              </ul>
            </div>
    </div>
  )
}