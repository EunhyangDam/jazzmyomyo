/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./scss/Sub082MmEdit.scss";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  confirmModalAction,
  confirmModalYesNoAction,
} from "../../../../store/confirmModal";

function Sub082MmEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const normalizeStatus = (s) => (s === "휴먼" ? "휴면" : s || "정상");
  const toForm = (m) => ({
    id: m.id ?? Number(id),
    userId: m.userId ?? "",
    name: m.name ?? "",
    gender: m.gender ?? "여",
    birth: m.birth ?? "",
    phone: m.phone ?? "",
    email: m.email ?? "",
    addr: m.addr ?? "",

    consent: m.consent ?? m.agree ?? "Y",

    grade: m.grade === "VIP회원" ? "일반회원" : m.grade ?? "일반회원",
    status: normalizeStatus(m.status),
    joinedAt: m.joinedAt ?? "",
  });

  // 1) state로 넘어온 값 먼저 적용(깜빡임 최소화)
  useEffect(() => {
    const fromState = location.state?.member || location.state?.updatedMember;
    if (fromState && String(fromState.id) === String(id)) {
      setForm(toForm(fromState));
      setLoading(false);
    }
  }, [id, location.state]);

  // 2) JSON에서 해당 회원 로드 (최상위 키: 회원정보)
  useEffect(() => {
    const url = `${
      process.env.PUBLIC_URL || ""
    }/json/sub08/members.json?v=${Date.now()}`;
    setLoading(true);
    setErr(null);

    axios
      .get(url, { headers: { "Cache-Control": "no-cache" } })
      .then((res) => {
        const list = Array.isArray(res.data?.회원정보)
          ? res.data.회원정보
          : Array.isArray(res.data?.members)
          ? res.data.members
          : Array.isArray(res.data)
          ? res.data
          : [];
        const found = list.find((m) => String(m.id) === String(id));
        if (!found) {
          setForm(null);
          return;
        }
        setForm(toForm(found));
      })
      .catch((e) => {
        const msg = e?.response
          ? `HTTP ${e.response.status} ${e.response.statusText}`
          : e?.message || "데이터 로드 실패";
        setErr(msg);
        console.error("[MmEdit] fetch error:", msg, "url:", url);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    // 실제 저장(파일/DB)은 없음. 모달만 띄우고 상세로 이동하며 state로 전달
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

  useEffect(() => {
    if (modal.heading === "수정되었습니다." && modal.isON) {
      dispatch(confirmModalYesNoAction(false));
      navigate(`/MmView/${form.id}`, {
        state: { member: form, updatedMember: form },
      });
    }
  }, [modal.heading, modal.isON, navigate, form, dispatch]);

  const onCancel = () => navigate(`/MmView/${form?.id ?? id}`);

  if (loading) {
    return (
      <div id="Sub082MmEdit">
        <div className="admin-wrap">
          <main className="main" style={{ padding: 40, textAlign: "center" }}>
            불러오는 중…
          </main>
        </div>
      </div>
    );
  }
  if (err) {
    return (
      <div id="Sub082MmEdit">
        <div className="admin-wrap">
          <main
            className="main"
            style={{ padding: 40, textAlign: "center", color: "#c00" }}
          >
            데이터를 불러오지 못했어요. ({err})
          </main>
        </div>
      </div>
    );
  }
  if (!form) {
    return (
      <div id="Sub082MmEdit">
        <div className="admin-wrap">
          <main className="main" style={{ padding: 40, textAlign: "center" }}>
            해당 회원 정보를 찾을 수 없습니다.
            <div style={{ marginTop: 16 }}>
              <button className="btn back" onClick={() => navigate("/Mm")}>
                목록으로
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div id="Sub082MmEdit">
      <div className="admin-wrap">
        <aside className="sidebar">
          <h2>회원관리</h2>
          <ul>
            <li>
              <Link to="/mm">회원리스트</Link>
            </li>
            <li>
              <Link to="/mmGrade">회원등급설정</Link>
            </li>
            <li>
              <Link to="/mmSign">회원가입설정</Link>
            </li>
            <li className="active">
              <Link to={`/mmEdit/${form.id}`}>회원수정</Link>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="page-header">
            <h1>회원 정보 수정</h1>
          </div>

          <div className="edit-form">
            <div className="grid">
              <div className="form-group">
                <label htmlFor="userId">아이디</label>
                <input
                  id="userId"
                  name="userId"
                  value={form.userId}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">성별</label>
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={onChange}
                >
                  <option value="여">여</option>
                  <option value="남">남</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="birth">생년월일</label>
                <input
                  id="birth"
                  name="birth"
                  value={form.birth}
                  onChange={onChange}
                  placeholder="YYYY-MM-DD"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">연락처</label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="010-0000-0000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  type="email"
                />
              </div>

              <div className="form-group full">
                <label htmlFor="addr">주소</label>
                <input
                  id="addr"
                  name="addr"
                  value={form.addr}
                  onChange={onChange}
                />
              </div>

              <div className="form-group radio-group">
                <label>이메일 수신동의</label>
                <div className="form-inline">
                  <label className="radio">
                    <input
                      type="radio"
                      name="consent"
                      value="Y"
                      checked={form.consent === "Y"}
                      onChange={onChange}
                    />
                    <span>동의함</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="consent"
                      value="N"
                      checked={form.consent === "N"}
                      onChange={onChange}
                    />
                    <span>동의하지 않음</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>등급</label>
                <div className="form-inline">
                  <label className="radio">
                    <input
                      type="radio"
                      name="grade"
                      value="일반회원"
                      checked={form.grade === "일반회원"}
                      onChange={onChange}
                    />
                    <span>일반회원</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="grade"
                      value="단골회원"
                      checked={form.grade === "단골회원"}
                      onChange={onChange}
                    />
                    <span>단골회원</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>상태</label>
                <div className="form-inline">
                  <label className="radio">
                    <input
                      type="radio"
                      name="status"
                      value="정상"
                      checked={form.status === "정상"}
                      onChange={onChange}
                    />
                    <span>정상</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="status"
                      value="휴면"
                      checked={form.status === "휴면"}
                      onChange={onChange}
                    />
                    <span>휴면</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="status"
                      value="탈퇴"
                      checked={form.status === "탈퇴"}
                      onChange={onChange}
                    />
                    <span>탈퇴</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="joinedAt">가입일</label>
                <input
                  id="joinedAt"
                  name="joinedAt"
                  value={form.joinedAt}
                  onChange={onChange}
                  disabled
                />
              </div>
            </div>

            <div className="btn-group">
              <button className="btn back" onClick={onCancel}>
                취소
              </button>
              <button className="btn" onClick={onSave}>
                저장
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Sub082MmEdit;
