import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./scss/Sub082MmEdit.scss";

// fallback 더미 (직접 주소 진입 대비)
const dummyMembers = [
  {
    id: 1, userId: "myomyo", name: "김묘묘", gender: "여", birth: "2000-01-01",
    phone: "010-1234-5678", email: "blue3@email.com", addr: "서울시 중구 장충동",
    consent: "Y", grade: "일반회원", status: "정상", joinedAt: "2025-07-07"
  },
  {
    id: 2, userId: "catlover", name: "이냥냥", gender: "여", birth: "1998-03-12",
    phone: "010-9876-5432", email: "nyang2@email.com", addr: "부산시 해운대구 우동",
    consent: "Y", grade: "단골회원", status: "정상", joinedAt: "2025-06-15"
  },
  {
    id: 6, userId: "coffeeholic", name: "정커피", gender: "여", birth: "1999-12-25",
    phone: "010-7777-8888", email: "coffee@email.com", addr: "광주시 서구 치평동",
    consent: "Y", grade: "일반회원", status: "탈퇴", joinedAt: "2025-02-01"
  },
];

function Sub082MmEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const memberFromState = location.state?.member;
  const fallback = dummyMembers.find((m) => String(m.id) === String(id));

  const [form, setForm] = useState(() => ({
    id: memberFromState?.id ?? fallback?.id ?? Number(id),
    userId: memberFromState?.userId ?? fallback?.userId ?? "",
    name: memberFromState?.name ?? fallback?.name ?? "",
    gender: memberFromState?.gender ?? fallback?.gender ?? "여",
    birth: memberFromState?.birth ?? fallback?.birth ?? "",
    phone: memberFromState?.phone ?? fallback?.phone ?? "",
    email: memberFromState?.email ?? fallback?.email ?? "",
    addr: memberFromState?.addr ?? fallback?.addr ?? "",
    consent: memberFromState?.consent ?? fallback?.consent ?? "Y",
    grade: memberFromState?.grade ?? fallback?.grade ?? "일반회원",
    status: memberFromState?.status ?? fallback?.status ?? "정상",
    joinedAt: memberFromState?.joinedAt ?? fallback?.joinedAt ?? "",
  }));

  useEffect(() => {
    if (!memberFromState && fallback) setForm((prev) => ({ ...prev, ...fallback }));
  }, [memberFromState, fallback]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

// 저장 핸들러만 수정
const onSave = () => {
  console.log("회원 수정 저장:", form);
  alert("회원 정보가 저장되었습니다.");

  // 상세로 이동 + 업데이트 데이터 함께 전달
  navigate(`/MmView/${form.id}`, { state: { member: form, updatedMember: form } });
};


  const onCancel = () => navigate(`/MmView/${form.id}`);

  return (
    <div id="Sub082MmEdit">
      <div className="admin-wrap">
        {/* 사이드바 */}
        <aside className="sidebar">
          <h2>회원관리</h2>
          <ul>
            <li><Link to="/Mm">회원리스트</Link></li>
            <li><Link to="/MmGrade">회원등급설정</Link></li>
            <li><Link to="/MmSign">회원가입설정</Link></li>
            <li className="active"><Link to={`/MmEdit/${id}`}>회원수정</Link></li>
          </ul>
        </aside>

        {/* 메인 */}
        <main className="main">
          <div className="page-header">
            <h1>회원 정보 수정</h1>
          </div>

          <div className="edit-form">
            <div className="grid">
              <div className="form-group">
                <label htmlFor="userId">아이디</label>
                <input id="userId" name="userId" value={form.userId} onChange={onChange} />
              </div>

              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input id="name" name="name" value={form.name} onChange={onChange} />
              </div>

              <div className="form-group">
                <label htmlFor="gender">성별</label>
                <select id="gender" name="gender" value={form.gender} onChange={onChange}>
                  <option value="여">여</option>
                  <option value="남">남</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="birth">생년월일</label>
                <input id="birth" name="birth" value={form.birth} onChange={onChange} placeholder="YYYY-MM-DD" />
              </div>

              <div className="form-group">
                <label htmlFor="phone">연락처</label>
                <input id="phone" name="phone" value={form.phone} onChange={onChange} placeholder="010-0000-0000" />
              </div>

              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input id="email" name="email" value={form.email} onChange={onChange} type="email" />
              </div>

              <div className="form-group full">
                <label htmlFor="addr">주소</label>
                <input id="addr" name="addr" value={form.addr} onChange={onChange} />
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
                <label htmlFor="grade">등급</label>
                <select id="grade" name="grade" value={form.grade} onChange={onChange}>
                  <option>일반회원</option>
                  <option>단골회원</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">상태</label>
                <select id="status" name="status" value={form.status} onChange={onChange}>
                  <option>정상</option>
                  <option>휴면</option>
                  <option>탈퇴</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="joinedAt">가입일</label>
                <input id="joinedAt" name="joinedAt" value={form.joinedAt} onChange={onChange} disabled />
              </div>
            </div>

            <div className="btn-group">
              <button className="btn back" onClick={onCancel}>취소</button>
              <button className="btn" onClick={onSave}>저장</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Sub082MmEdit;