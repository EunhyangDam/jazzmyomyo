import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./scss/Sub083MmGrade.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";

const STORAGE_KEY = "mm_grades";

// 이름만 잠글 시스템 등급들
const BUILT_IN = new Set(["일반회원", "단골회원", "관리자"]);

const REQUIRED = [
  { name: "일반회원", condition: "누구나 가입 즉시", benefit: "기본 혜택 제공" },
  { name: "관리자",   condition: "관계자만 가능",   benefit: "" },
];

const ensureRequired = (list) => {
  const map = new Map((list || []).map((g) => [g.name, { ...g }]));
  REQUIRED.forEach((r) => { if (!map.has(r.name)) map.set(r.name, { ...r }); });
  const arr = Array.from(map.values());
  arr.sort((a, b) => {
    const ra = a.name === "일반회원" ? -1 : a.name === "관리자" ? 1 : 0;
    const rb = b.name === "일반회원" ? -1 : b.name === "관리자" ? 1 : 0;
    return ra - rb;
  });
  return arr;
};

function Sub083MmGrade() {
  const [grades, setGrades] = useState([]);
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const loadFromServer = async () => {
    try {
      const { data } = await axios.get("/jazzmyomyo/grade_table_select.php", { timeout: 10000 });
      if (!Array.isArray(data)) throw new Error("목록 형식이 아님");
      const rows = data.map((r) => ({
        name: r.name ?? r.gradeName ?? "",
        condition: r.condition ?? "",
        benefit: r.benefit ?? "",
      }));
      const normalized = ensureRequired(rows);
      setGrades(normalized);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch (e) {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setGrades(ensureRequired(JSON.parse(raw)));
      dispatch(confirmModalAction({
        heading: "서버에서 불러오지 못했습니다.",
        explain: e?.message || "",
        isON: true, isConfirm: false,
      }));
    }
  };

  useEffect(() => {
    loadFromServer();
  }, []);

  const updateField = (index, field, value) => {
    setGrades((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleDelete = (index) => {
    if (BUILT_IN.has(grades[index].name)) return;
    setGrades((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setGrades((prev) => [...prev, { name: "", condition: "", benefit: "" }]);
  };

  const handleDeleteOne = () => {
    setGrades((prev) => {
      const lastIdx = [...prev]
        .map((g, i) => ({ g, i }))
        .filter(({ g }) => !BUILT_IN.has(g.name))
        .map(({ i }) => i)
        .pop();
      if (lastIdx === undefined) {
        dispatch(confirmModalAction({
          heading: "삭제할 등급이 없습니다.",
          explain: "‘일반회원’·‘단골회원’·‘관리자’는 삭제할 수 없습니다.",
          isON: true, isConfirm: false,
        }));
        return prev;
      }
      return prev.filter((_, i) => i !== lastIdx);
    });
  };

  const onSave = async () => {
    try {
      const cleaned = grades.filter((g) => (g.name || g.condition || g.benefit).trim?.() !== "");
      const payload = ensureRequired(cleaned);

      const formData = new FormData();
      formData.append("grades", JSON.stringify(payload));
      formData.append("autoReassign", "1");

      const res = await axios.post("/jazzmyomyo/grade_table_update.php", formData);

      if (res.data === "OK") {
        await loadFromServer();
        dispatch(confirmModalAction({ heading: "등급 설정이 저장되었습니다.", isON: true, isConfirm: false }));
        return;
      }

      if (Array.isArray(res.data)) {
        const rows = res.data.map((r) => ({
          name: r.name ?? r.gradeName ?? "",
          condition: r.condition ?? "",
          benefit: r.benefit ?? "",
        }));
        const normalized = ensureRequired(rows);
        setGrades(normalized);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        dispatch(confirmModalAction({ heading: "등급 설정이 저장되었습니다.", isON: true, isConfirm: false }));
        return;
      }

      throw new Error(String(res.data || "저장 실패"));
    } catch (e) {
      dispatch(confirmModalAction({
        heading: "저장 중 오류가 발생했습니다.",
        explain: e?.message || "서버 오류",
        isON: true, isConfirm: false,
      }));
      console.error(e);
    }
  };

  return (
    <div id="sub083MmGrade">
      <div className="admin-wrap">
        <aside className="sidebar">
          <h2>회원관리</h2>
          <ul>
            <li><Link to="/mm">회원리스트</Link></li>
            <li className="active"><Link to="/mmGrade">회원등급설정</Link></li>
            <li><Link to="/mmSign">회원가입설정</Link></li>
          </ul>
        </aside>

        <main className="main">
          <div className="page-header">
            <h1>회원등급 설정</h1>
          </div>

          <div className="grade-form">
            <div className="grade-head">
              <div className="col col-name">등급명</div>
              <div className="col col-condition">조건</div>
              <div className="col col-benefit">혜택</div>
              <div className="col col-delete"></div>
            </div>

            <ul className="grade-list">
              {grades.map((g, i) => (
                <li className="grade-row" key={`${g.name}-${i}`}>
                  <div className="col col-name" data-label="등급명">
                    <input
                      type="text"
                      value={g.name}
                      onChange={(e) => updateField(i, "name", e.target.value)}
                      readOnly={BUILT_IN.has(g.name)}
                      title={BUILT_IN.has(g.name) ? "이 등급명은 수정할 수 없습니다." : ""}
                      className={BUILT_IN.has(g.name) ? "grade-name-locked" : ""}
                    />
                  </div>
                  <div className="col col-condition" data-label="조건">
                    <input
                      type="text"
                      value={g.condition}
                      onChange={(e) => updateField(i, "condition", e.target.value)}
                    />
                  </div>
                  <div className="col col-benefit" data-label="혜택">
                    <input
                      type="text"
                      value={g.benefit}
                      onChange={(e) => updateField(i, "benefit", e.target.value)}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="grade-actions">
              <button className="btn add" onClick={handleAdd}>등급 추가</button>
              <button className="btn del" onClick={handleDeleteOne}>등급 삭제</button>
              <button className="btn save" onClick={onSave}>등급 설정 저장</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Sub083MmGrade;
