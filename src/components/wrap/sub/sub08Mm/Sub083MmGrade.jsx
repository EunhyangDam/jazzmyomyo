import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./scss/Sub083MmGrade.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  confirmModalAction,
  confirmModalYesNoAction,
} from "../../../../store/confirmModal";

const STORAGE_KEY = "mm_grades";
const DEFAULT_GRADES = [
  {
    name: "일반회원",
    condition: "누구나 가입 즉시",
    benefit: "기본 혜택 제공",
  },
  {
    name: "단골회원",
    condition: "총 주문금액 10만원 이상",
    benefit: "10% 할인 쿠폰 제공",
  },
];

function Sub083MmGrade() {
  const [grades, setGrades] = useState(DEFAULT_GRADES);

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setGrades(JSON.parse(raw));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_GRADES));
      }
    } catch (e) {
      dispatch(
        confirmModalAction({
          heading: "저장소를 읽는 중 오류가 발생했습니다.",
          explain: "",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
      console.warn("Failed to read grades from localStorage", e);
    }
  }, [dispatch]);

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
      dispatch(
        confirmModalAction({
          heading: "등급 설정이 저장되었습니다.",
          explain: "",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
    } catch (e) {
      dispatch(
        confirmModalAction({
          heading: "저장 중 오류가 발생했습니다.",
          explain: "잠시 후 다시 시도해주세요.",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
      console.error(e);
    }
  };

  // (선택) 모달 닫힌 뒤 내부 상태 초기화
  useEffect(() => {
    if (
      (modal.heading === "등급 설정이 저장되었습니다." ||
        modal.heading === "저장 중 오류가 발생했습니다." ||
        modal.heading === "저장소를 읽는 중 오류가 발생했습니다.") &&
      modal.isON === false
    ) {
      dispatch(confirmModalYesNoAction(false));
    }
  }, [modal.heading, modal.isON, dispatch]);

  return (
    <div id="sub083MmGrade">
      <div className="admin-wrap">
        <aside className="sidebar">
          <h2>회원관리</h2>
          <ul>
            <li>
              <Link to="/mm">회원리스트</Link>
            </li>
            <li className="active">
              <Link to="/mmGrade">회원등급설정</Link>
            </li>
            <li>
              <Link to="/mmSign">회원가입설정</Link>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="page-header">
            <h1>회원등급 설정</h1>
          </div>

          <div className="grade-form">
            <div className="grade-head" aria-hidden="true">
              <div className="col col-name">등급명</div>
              <div className="col col-condition">조건</div>
              <div className="col col-benefit">혜택</div>
            </div>

            <ul className="grade-list" role="list">
              {grades.map((g, i) => (
                <li className="grade-row" key={`${g.name}-${i}`}>
                  <div className="col col-name" data-label="등급명">
                    <input
                      type="text"
                      value={g.name}
                      onChange={(e) => updateField(i, "name", e.target.value)}
                    />
                  </div>

                  <div className="col col-condition" data-label="조건">
                    <input
                      type="text"
                      value={g.condition}
                      onChange={(e) =>
                        updateField(i, "condition", e.target.value)
                      }
                    />
                  </div>

                  <div className="col col-benefit" data-label="혜택">
                    <input
                      type="text"
                      value={g.benefit}
                      onChange={(e) =>
                        updateField(i, "benefit", e.target.value)
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>

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
