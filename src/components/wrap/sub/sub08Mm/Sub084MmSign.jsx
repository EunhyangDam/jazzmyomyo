import React, { useEffect, useState } from "react";
import "./scss/Sub084MmSign.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  confirmModalAction,
  confirmModalYesNoAction,
} from "../../../../store/confirmModal";

import useCustomA from "../../custom/useCustomA";

const STORAGE_KEY = "mm_signup_settings";
const DEFAULT_SETTING = {
  approval: "자동 승인",
  defaultGrade: "일반회원",
  emailAgree: "Y",
};

function Sub084MmSign() {
  const { onClickA } = useCustomA();

  const [approval, setApproval] = useState(DEFAULT_SETTING.approval);
  const [defaultGrade, setDefaultGrade] = useState(
    DEFAULT_SETTING.defaultGrade
  );
  const [emailAgree, setEmailAgree] = useState(DEFAULT_SETTING.emailAgree);

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

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
              <a href="/mm" onClick={(e) => onClickA(e, "/mm")}>
                회원리스트
              </a>
            </li>
            <li>
              <a href="/mmGrade" onClick={(e) => onClickA(e, "/mmGrade")}>
                회원등급설정
              </a>
            </li>
            <li className="active">
              <a href="/mmSign" onClick={(e) => onClickA(e, "/mmSign")}>
                회원가입설정
              </a>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="page-header">
            <h1>회원가입 설정</h1>
          </div>

          <div className="join-settings">
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
              <div className="form-check">
                <input
                  type="radio"
                  id="gradeAdmin"
                  name="defaultGrade"
                  checked={defaultGrade === "관리자"}
                  onChange={() => setDefaultGrade("관리자")}
                />
                <label htmlFor="gradeAdmin">관리자</label>
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
