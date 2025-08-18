import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./scss/Sub084MmSign.scss";

import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";

const STORAGE_KEY = "mm_signup_settings";
const DEFAULT_SETTING = {
  approval: "자동 승인",
  defaultGrade: "일반회원",
  emailAgree: "Y",
};

function Sub084MmSign() {
  const [approval, setApproval] = useState(DEFAULT_SETTING.approval);
  const [defaultGrade, setDefaultGrade] = useState(DEFAULT_SETTING.defaultGrade);
  const [emailAgree, setEmailAgree] = useState(DEFAULT_SETTING.emailAgree);

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  // 초기 로드: 저장된 값 복원 / 없으면 기본값 저장
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        setApproval(s.approval ?? DEFAULT_SETTING.approval);
        setDefaultGrade(s.defaultGrade ?? DEFAULT_SETTING.defaultGrade);
        setEmailAgree(s.emailAgree ?? DEFAULT_SETTING.emailAgree);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTING));
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
      console.warn("Failed to read signup settings from localStorage", e);
    }
  }, [dispatch]);

  const onSave = () => {
    const payload = { approval, defaultGrade, emailAgree };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

      dispatch(
        confirmModalAction({
          heading: "회원가입 설정이 저장되었습니다.",
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

  // 모달 닫힌 뒤 내부 초기화 (선택)
  useEffect(() => {
    if (
      (modal.heading === "회원가입 설정이 저장되었습니다." ||
        modal.heading === "저장 중 오류가 발생했습니다." ||
        modal.heading === "저장소를 읽는 중 오류가 발생했습니다.") &&
      modal.isON === false
    ) {
      dispatch(confirmModalYesNoAction(false));
    }
  }, [modal.heading, modal.isON, dispatch]);

  return (
    <div id="sub084MmSign">
      <div className="admin-wrap">
        <aside className="sidebar">
          <h2>회원관리</h2>
          <ul>
            <li>
              <Link to="/Mm">회원리스트</Link>
            </li>
            <li>
              <Link to="/MmGrade">회원등급설정</Link>
            </li>
            <li className="active">
              <Link to="/MmSign">회원가입설정</Link>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="page-header">
            <h1>회원가입 설정</h1>
          </div>

          <div className="join-settings">
            {/* 가입 승인 방식: 라디오 버튼 */}
            <div className="form-group">
              <label>가입 승인 방식</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="approvalAuto"
                  name="approval"
                  checked={approval === "자동 승인"}
                  onChange={() => setApproval("자동 승인")}
                />
                <label htmlFor="approvalAuto">자동 승인</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="approvalAdmin"
                  name="approval"
                  checked={approval === "관리자 승인"}
                  onChange={() => setApproval("관리자 승인")}
                />
                <label htmlFor="approvalAdmin">관리자 승인</label>
              </div>
            </div>

            {/* 기본 회원 등급: 라디오 버튼 */}
            <div className="form-group">
              <label>기본 회원 등급</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="gradeNormal"
                  name="defaultGrade"
                  checked={defaultGrade === "일반회원"}
                  onChange={() => setDefaultGrade("일반회원")}
                />
                <label htmlFor="gradeNormal">일반회원</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="gradeRegular"
                  name="defaultGrade"
                  checked={defaultGrade === "단골회원"}
                  onChange={() => setDefaultGrade("단골회원")}
                />
                <label htmlFor="gradeRegular">단골회원</label>
              </div>
            </div>

            {/* 이메일 수신 여부 기본값 (기존 그대로) */}
            <div className="form-group">
              <label>이메일 수신 여부 기본값</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="emailY"
                  name="emailAgree"
                  checked={emailAgree === "Y"}
                  onChange={() => setEmailAgree("Y")}
                />
                <label htmlFor="emailY">동의함</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="emailN"
                  name="emailAgree"
                  checked={emailAgree === "N"}
                  onChange={() => setEmailAgree("N")}
                />
                <label htmlFor="emailN">동의하지 않음</label>
              </div>
            </div>

            <button className="btn" onClick={onSave}>
              설정 저장
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Sub084MmSign;