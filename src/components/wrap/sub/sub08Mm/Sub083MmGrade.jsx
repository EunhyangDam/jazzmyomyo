import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./scss/Sub083MmGrade.scss";

const STORAGE_KEY = "mm_grades";
const DEFAULT_GRADES = [
  { name: "일반회원", condition: "누구나 가입 즉시", benefit: "기본 혜택 제공" },
  { name: "단골회원", condition: "총 주문금액 10만원 이상", benefit: "10% 할인 쿠폰 제공" },
];

function Sub083MmGrade() {
  const [grades, setGrades] = useState(DEFAULT_GRADES);

  // 초기 로드: 저장된 게 있으면 사용, 없으면 기본값 저장
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setGrades(JSON.parse(raw));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_GRADES));
      }
    } catch (e) {
      console.warn("Failed to read grades from localStorage", e);
    }
  }, []);

  const updateField = (index, field, value) => {
    setGrades((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const onSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(grades));
      alert("등급 설정이 저장되었습니다.");
    } catch (e) {
      alert("저장 중 오류가 발생했습니다.");
      console.error(e);
    }
  };

  return (
    <div id="sub083MmGrade">
      <div className="admin-wrap">
        {/* 사이드바 */}
        <aside className="sidebar">
          <h2>회원관리</h2>
          <ul>
            <li>
              <Link to="/Mm">회원리스트</Link>
            </li>
            <li className="active">
              <Link to="/MmGrade">회원등급설정</Link>
            </li>
            <li>
              <Link to="/MmSign">회원가입설정</Link>
            </li>
          </ul>
        </aside>

        {/* 메인 */}
        <main className="main">
          <div className="page-header">
            <h1>회원등급 설정</h1>
          </div>

          <div className="grade-form">
            <table>
              <thead>
                <tr>
                  <th>등급명</th>
                  <th>조건</th>
                  <th>혜택</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((g, i) => (
                  <tr key={g.name}>
                    <td>
                      {/* 등급명 고정하려면 disabled 추가 */}
                      <input
                        type="text"
                        value={g.name}
                        onChange={(e) => updateField(i, "name", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={g.condition}
                        onChange={(e) => updateField(i, "condition", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={g.benefit}
                        onChange={(e) => updateField(i, "benefit", e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="btn" onClick={onSave}>
              등급 설정 저장
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Sub083MmGrade;