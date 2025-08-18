import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./scss/Sub081MmView.scss";

import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";

const dummyMembers = [
  { id: 1, userId: "myomyo", name: "김묘묘", gender: "여", birth: "2000-01-01", phone: "010-1234-5678", email: "blue3@email.com", addr: "서울시 중구 장충동", consent: "Y", grade: "일반회원", status: "정상", joinedAt: "2025-07-07" },
  { id: 2, userId: "catlover", name: "이냥냥", gender: "여", birth: "1998-03-12", phone: "010-9876-5432", email: "nyang2@email.com", addr: "부산시 해운대구 우동", consent: "Y", grade: "단골회원", status: "정상", joinedAt: "2025-06-15" },
  { id: 3, userId: "jazzman", name: "박재즈", gender: "남", birth: "1995-09-20", phone: "010-1111-2222", email: "jazzman@email.com", addr: "서울시 마포구 서교동", consent: "N", grade: "일반회원", status: "정상", joinedAt: "2025-05-30" },
  { id: 4, userId: "winequeen", name: "최와인", gender: "여", birth: "1992-07-05", phone: "010-3333-4444", email: "winequeen@email.com", addr: "인천시 연수구 송도동", consent: "Y", grade: "일반회원", status: "정상", joinedAt: "2025-04-25" },
  { id: 5, userId: "guitarcat", name: "한기타", gender: "남", birth: "1988-11-11", phone: "010-5555-6666", email: "guitarcat@email.com", addr: "대구시 수성구 범어동", consent: "N", grade: "일반회원", status: "정상", joinedAt: "2025-03-18" },
  { id: 6, userId: "coffeeholic", name: "정커피", gender: "여", birth: "1999-12-25", phone: "010-7777-8888", email: "coffee@email.com", addr: "광주시 서구 치평동", consent: "Y", grade: "단골회원", status: "정상", joinedAt: "2025-02-01" },
];

function Sub081MmView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.confirmModal); 

  const updatedFromEdit = location.state?.updatedMember;
  const memberFromState = location.state?.member;

  const member =
    updatedFromEdit ??
    memberFromState ??
    dummyMembers.find((m) => String(m.id) === String(id));


  useEffect(() => {
    if (updatedFromEdit) {
      try {
        sessionStorage.setItem("updatedMember", JSON.stringify(updatedFromEdit));
      } catch {}
    }
  }, [updatedFromEdit]);

  const goList = () => {
    navigate("/Mm", { state: { updatedMember: member } });
  };

  const onAskDelete = () => {
    dispatch(
      confirmModalAction({
        heading: "정말 삭제하시겠습니까?",
        explain: "신중하게 생각하세요",
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
                <li><strong>이메일 수신동의</strong> {member.consent}</li>
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