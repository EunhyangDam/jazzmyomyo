import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import './scss/Sub05NtcView.scss';

const dummyData = {
  1: {
    title: "감성재즈바 재즈묘묘 오픈!",
    date: "2025.06.10",
    writer: "관리자",
    views: 988,
    content: `안녕하세요, 재즈묘묘입니다.

홍보도 연주도 쉬어 가는 공간, 재즈가 흐르는 고양이와 벽!
드디어 재즈바 재즈묘묘가 오픈했습니다.

앞으로 많은 사랑 부탁드려요!
고양이처럼 조용히, 재즈처럼 깊게 만나봐요.`,
  },
  2: {
    title: "재즈묘묘 정기 휴무 안내",
    date: "2025.07.01",
    writer: "관리자",
    views: 967,
    content: `안녕하세요, 재즈묘묘입니다.

정기 휴무일은 매주 월요일입니다.
공연, 예약 및 운영은 화요일부터 일요일까지 가능합니다.

늘 좋은 음악과 함께 기다릴게요.`,
  },
  3: {
    title: "8월 정기 공연 세션 공개",
    date: "2025.07.17",
    writer: "관리자",
    views: 612,
    content: `8월 재즈 공연 라인업이 나왔어요!

• 8/5(화) – 루디밴드
• 8/12(화) – 임주환 트리오
• 8/19(화) – 묘묘재즈하우스
• 8/26(화) – 재즈앤젤스

매주 화요일 저녁 8시, 묘묘에서 만나요 🎷`,
  },
  4: {
    title: "여름 한정 신메뉴 “수박화채” 출시예정!",
    date: "2025.08.01",
    writer: "관리자",
    views: 586,
    content: `무더운 여름을 위한 상큼한 수박화채!

수박+사이다+복숭아 등 여러과일이 들어간 재즈묘묘만의 여름 스폐셜 화채를 출시 할 예정입니다.
시원한 안주와 함께 즐겨보세요 🍹`,
  },
  5: {
    title: "묘묘 키링 1차 재입고 안내",
    date: "2025.08.07",
    writer: "관리자",
    views: 281,
    content: `안녕하세요, 재즈묘묘입니다.

많은 분들의 성원에 힘입어 묘묘 키링 1차 재입고가 완료되었습니다!
앞으로도 고양이와 재즈의 아름다운 조화를 전하기 위해 최선을 다하겠습니다.

궁금하신 사항은 언제든 문의주세요.
감사합니다.`,
  },
};

function NoticeView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const notice = dummyData[id];

  if (!notice) {
    return <div style={{ padding: "100px", textAlign: "center" }}>존재하지 않는 글입니다.</div>;
  }

  return (
    <div id="noticeView">
        <div className="breadcrumb">
          <Link to="/"><i className="bi bi-house"></i></Link> &gt; 공지사항
        </div>
      <div className="container">

        <h2>공지사항</h2>

        <div className="content-box">
          <div className="notice-header">
            <div className="title">{notice.title}</div>
            <div className="notice-meta">
              <span>작성자 : {notice.writer}</span>
              <span>등록일 : {notice.date}</span>
              <span>조회수 : {notice.views}</span>
            </div>
          </div>

          <div className="notice-body">
            <p>
              {notice.content.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div className="btn-wrap">
            <button onClick={() => navigate(-1)}>목록</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeView;