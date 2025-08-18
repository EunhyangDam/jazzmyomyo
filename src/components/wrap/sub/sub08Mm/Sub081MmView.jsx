/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./scss/Sub081MmView.scss";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";

function Sub081MmView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal);

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);


  useEffect(() => {
    const fromState = location.state?.member || location.state?.updatedMember;
    if (fromState && String(fromState.id) === String(id)) {
      setMember(fromState);
      setLoading(false);
    }
  }, [id, location.state]);

  useEffect(() => {
    const url = `${process.env.PUBLIC_URL || ""}/json/sub08/members.json?v=${Date.now()}`;


    setLoading((prev) => prev === true ? true : true);
    setErr(null);

    axios
      .get(url, { headers: { "Cache-Control": "no-cache" } })
      .then((res) => {
        const list =
          Array.isArray(res.data?.회원정보) ? res.data.회원정보 :
          Array.isArray(res.data?.members) ? res.data.members :
          Array.isArray(res.data)          ? res.data : [];

        const found = list.find((m) => String(m.id) === String(id));
        if (!found) {
          setMember(null);
          return;
        }


        const normalized = {
          ...found,
          consent: found.agree ?? found.consent ?? "", 
        };
        setMember(normalized);
      })
      .catch((e) => {
        const msg = e?.response
          ? `HTTP ${e.response.status} ${e.response.statusText}`
          : (e?.message || "데이터 로드 실패");
        setErr(msg);
        console.error("[MmView] fetch error:", msg, "url:", url);
      })
      .finally(() => setLoading(false));
  }, [id]);


  const goList = () => {
    navigate("/Mm", { state: member ? { updatedMember: member } : undefined });
  };


  const onAskDelete = () => {
    dispatch(
      confirmModalAction({
        heading: "정말 삭제하시겠습니까?",
        explain: "신중하게 생각하세요 (삭제 누르지마세요)",
        isON: true,
        isConfirm: true,
        message1: "예",
        message2: "아니오",
      })
    );
  };


  useEffect(() => {
    if (modal.isYes === true) {
      dispatch(confirmModalYesNoAction(false));
      navigate("/Mm"); 
    }
  }, [modal.isYes, dispatch, navigate]);


  if (loading) {
    return (
      <div id="sub081MmView">
        <div className="admin-wrap">
          <main className="main" style={{ padding: 40, textAlign: "center" }}>불러오는 중…</main>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div id="sub081MmView">
        <div className="admin-wrap">
          <main className="main" style={{ padding: 40, textAlign: "center", color: "#c00" }}>
            데이터를 불러오지 못했어요. ({err})
          </main>
        </div>
      </div>
    );
  }

  return (
    <div id="sub081MmView">
      <div className="admin-wrap">
        <aside className="sidebar">
          <h2>회원관리</h2>
          <ul>
            <li>
              <Link
                to="/Mm"
                state={member ? { updatedMember: member } : undefined}
              >
                회원리스트
              </Link>
            </li>
            <li><Link to="/MmGrade">회원등급설정</Link></li>
            <li><Link to="/MmSign">회원가입설정</Link></li>
            <li className="active"><Link to={`/MmView/${id}`}>회원상세</Link></li>
          </ul>
        </aside>

        <main className="main">
          <div className="page-header">
            <h1>회원 상세보기</h1>
          </div>

          {!member ? (
            <div className="member-detail">
              <p style={{ textAlign: "center" }}>해당 회원 정보를 찾을 수 없습니다.</p>
              <div className="btn-group">
                <button className="btn back" onClick={goList}>목록으로</button>
              </div>
            </div>
          ) : (
            <div className="member-detail">
              <ul>
                <li><strong>아이디</strong> {member.userId}</li>
                <li><strong>이름</strong> {member.name}</li>
                <li><strong>성별</strong> {member.gender}</li>
                <li><strong>생년월일</strong> {member.birth}</li>
                <li><strong>연락처</strong> {member.phone}</li>
                <li><strong>이메일</strong> {member.email}</li>
                <li><strong>주소</strong> {member.addr}</li>
                <li><strong>이메일 수신동의</strong> {member.consent ?? member.agree ?? "-"}</li>
                <li><strong>등급</strong> {member.grade}</li>
                <li><strong>상태</strong> {member.status}</li>
                <li><strong>가입일</strong> {member.joinedAt}</li>
              </ul>

              <div className="btn-group">
                <button className="btn back" onClick={goList}>목록으로</button>
                <Link to={`/MmEdit/${member.id}`} className="btn" state={{ member }}>
                  수정하기
                </Link>
                <button className="btn delete" onClick={onAskDelete}>
                  삭제하기
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Sub081MmView;
