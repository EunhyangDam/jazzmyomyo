import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./scss/Sub07MyOrderTk.scss";
import Sub07MpSideMenu from "./Sub07MpSideMenu";
import SiteMapComponent from "../../custom/SiteMapComponent";
import { confirmModalAction, confirmModalYesNoAction } from "../../../../store/confirmModal";


function Sub07MyOrderTk(props) {
  const dispatch = useDispatch();
  
  
  const signIn = useSelector(s => s.signIn ?? s.sign_in ?? {});
  const userId = signIn.아이디 || signIn.userId || signIn.id || "";
  
  const isYes = useSelector((state) => state.confirmModal.isYes);
  const [pendingCancel, setPendingCancel] = useState({ id: null, label: "" });


  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [openId, setOpenId] = useState(null); // 상세 토글


  const [sort, setSort] = useState("latest"); 

  // 날짜/시간 포맷 유틸
  const fmtDate = (d) => d ?? "";
  const fmtTime = (t) => (t ? t.slice(0, 5) : ""); // "HH:MM:SS" -> "HH:MM"

  useEffect(() => {
    axios.get("/jazzmyomyo/reservations_list.php", {
      params: { limit: 100, offset: 0, userId }, 
    })
    .then(({status, data}) => {
      if (status === 200 && data?.ok) {
        setRows(data.rows ?? []);
      } else {
        setErr(data?.msg ?? "목록을 불러오지 못했습니다.");
      }
    })
    .catch(e => setErr(e.message))
    .finally(() => setLoading(false));
  }, [userId]);


  // 예약순, 취소건만, 공연일순
  const toDateTime = (d, t) => {
    if (!d) return 0;
    const hhmmss = (t || '00:00:00').slice(0, 8);
    return new Date(`${d}T${hhmmss}`).getTime();
  };

  const toCreatedTime = (s) => {
    if (!s) return 0;
    const iso = s.includes(' ') ? s.replace(' ', 'T') : s;
    return new Date(iso).getTime();
  };

  const sortedRows = React.useMemo(() => {
    let arr = [...rows];
    if (sort === "latest") {
      // 예약한 날짜(createdAt) 기준 최신순
      arr.sort((a, b) => toCreatedTime(b.createdAt) - toCreatedTime(a.createdAt));
    } else if (sort === "schedule") {
      // 공연일정순 (scheduleDate + timeStart 기준)
      arr.sort((a, b) => toDateTime(a.scheduleDate, a.timeStart) - toDateTime(b.scheduleDate, b.timeStart));
    } else if (sort === "canceled") {
      arr = arr.filter((r) => r.orderStatus === "canceled");
    }
    return arr;
  }, [rows, sort]);




  // “예약취소” 버튼 클릭 → 확인 모달 오픈
  const onClickCancel = (item) => {
    const explainText = `${fmtDate(item.scheduleDate)}, ${fmtTime(item.timeStart)}, ${item.productName}, ${item.peopleCount}명`;
    setPendingCancel({ id: item.id, label: explainText });

    // 이전 응답 리셋
    dispatch(confirmModalYesNoAction(false));

    // 네가 지정한 포맷으로 모달 오픈
    dispatch(
      confirmModalAction({
        heading: "예약취소",
        explain: `${explainText} 이 공연을 취소하겠습니까?`,
        isON: true,
        isConfirm: true,
        message1: "예",
        message2: "아니오",
      })
    );
  };

   // 모달에서 “예”를 누른 경우 → 서버에 취소 요청 → 완료 모달 → 목록 즉시 반영
  useEffect(() => {
    if (isYes && pendingCancel.id) {
      // 1) 서버에 취소 요청
      const body = new URLSearchParams();
      body.append('id', String(pendingCancel.id));
      body.append('userId', String(userId));

      axios.post("/jazzmyomyo/reservations_cancel.php", body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(({status, data}) => {
        if (status === 200 && data?.ok) {
          // 2) 로컬 목록 즉시 반영 (다시 GET해도 되고, 아래처럼 부분 업데이트도 가능)
          setRows(prev =>
            prev.map(row =>
              row.id === pendingCancel.id
                ? { ...row, orderStatus: "canceled" } // 또는 백엔드가 돌려준 상태값 사용
                : row
            )
          );

          // 3) 완료 모달
          dispatch(
            confirmModalAction({
              heading: "예약 취소",
              explain: "예약이 취소되었습니다.",
              isON: true,
              isConfirm: false, // 확인만 있는 모달
              message1: "확인",
              message2: "",
            })
          );
        } else {
          // 실패 시 에러 모달
          dispatch(
            confirmModalAction({
              heading: "오류",
              explain: data?.msg ?? "취소 처리에 실패했습니다.",
              isON: true,
              isConfirm: false,
              message1: "확인",
              message2: "",
            })
          );
        }
      })
      .catch((e) => {
        dispatch(
          confirmModalAction({
            heading: "오류",
            explain: e.message ?? "취소 처리 중 오류가 발생했습니다.",
            isON: true,
            isConfirm: false,
            message1: "확인",
            message2: "",
          })
        );
      })
      .finally(() => {
        setPendingCancel({ id: null, label: "" });
        // 다음 요청을 위해 예/아니오 응답 리셋
        dispatch(confirmModalYesNoAction(false));
      });
    } else if (isYes === false && pendingCancel.id) {
      // “아니오” 선택 시 대기상태만 해제
      setPendingCancel({ id: null, label: "" });
      dispatch(confirmModalYesNoAction(false));
    }
  }, [isYes]);




  return (
    <div id="sub07MyOrderTk">
      <div className="container">
        <div className="title">
          <Link to="/myOrder">
            <h2>My Order</h2>
          </Link>
        </div>

        <SiteMapComponent
          firstLink="/mp"
          firstName="마이페이지"
          secondLink="./"
          secondName="예매내역"
        />

        <div className="content">
          <Sub07MpSideMenu />

          <div className="order">
            <ul>
              <li className="order2">
                <div>
                  <div className="sub-title">
                    <h3>예매 내역</h3>
                  </div>

                  <div className="order-controls">
                    <label>
                      <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="latest">예약순</option>
                        <option value="schedule">공연일정순</option>
                        <option value="canceled">취소된 예약</option>
                      </select>
                      정렬
                    </label>
                  </div>

                  {/* 상태 표시 */}
                  {loading && <p className="state">불러오는 중…</p>}
                  {!loading && err && <p className="state error">{err}</p>}
                  {!loading && !err && rows.length === 0 && (
                    <p className="state empty">예매 내역이 없습니다.</p>
                  )}

                  {/* 목록 */}
                  {!loading && !err && rows.length > 0 && (
                    <div className="table">
                      <div className="head-box">
                        <ul className="column-title">
                          <li className="col col1"><h3>공연일자</h3></li>
                          <li className="col col2"><h3>공연시간</h3></li>
                          <li className="col col3"><h3>공연상세</h3></li>
                          <li className="col col4"><h3>관람인원</h3></li>
                          <li className="col col5"><h3>예약취소</h3></li>
                        </ul>
                      </div>

                      <div className="list-box">
                        <ul>
                          {sortedRows.map((item) => {
                            const baseURL = process.env.PUBLIC_URL || "";
                            const posterSrc = item.poster
                              ? `${baseURL}/${String(item.poster).replace(/^\.\//, "").replace(/^\/+/, "")}`
                              : `${baseURL}/img/artist_poster_right.jpg`;
                            return (
                              <li key={item.id}>
                                <ul className="column-contents">
                                  <li className="col col1">
                                    <h3>{fmtDate(item.scheduleDate)}</h3>
                                  </li>
                                  <li className="col col2">
                                    <h3>{fmtTime(item.timeStart)} ~</h3>
                                  </li>
                                  <li
                                    className="col col3"
                                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                                  >
                                    <h3>{item.productName}</h3>
                                  </li>
                                  <li className="col col4">
                                    <em>{item.peopleCount}명</em>
                                  </li>
                                  <li className="col col5">
                                    {item.orderStatus === "canceled" ? (
                                      <span className="canceled-label">취소완료</span>
                                    ) : (
                                      <button onClick={() => onClickCancel(item)}>예약취소</button>
                                    )}
                                  </li>
                                </ul>
                                  
                                {openId === item.id && (
                                  <div className="detail reservation-detail">
                                    {/* 왼쪽 : 포스터 */}
                                    <div className="rd-left">
                                      <div className="poster">
                                        <img
                                          src={posterSrc}
                                          alt={item.artistName || "공연 포스터"}
                                          onError={(e) => {
                                            e.currentTarget.src = `${baseURL}/img/artist_poster_right.jpg`;;
                                          }}
                                        />
                                      </div>
                                      <p className="artist-name">{item.artistName || "아티스트"}</p>
                                    </div>
                                        
                                    {/* 가운데 : 텍스트 정보 */}
                                    <div className="rd-middle">
                                      <p>
                                        <strong>공연명 :</strong> <span>{item.productName}</span>
                                      </p>
                                      <p>
                                        <strong>공연시간 : </strong> <span>{fmtTime(item.timeStart)}{item.timeEnd ? ` ~ ${fmtTime(item.timeEnd)}` : ""}</span>
                                      </p>
                                      <p>
                                        <strong>관람인원: </strong> <span>{item.peopleCount}명</span>
                                      </p>
                                    </div>
                                        
                                    {/* 오른쪽 : 고양이 + 말풍선 */}
                                    <div className="rd-right">
                                      <div
                                        className={`speech ${
                                          item.orderStatus === "canceled" ? "cancel" : "reserved"
                                        }`}
                                      >
                                        {item.orderStatus === "canceled" ? "예약취소" : "예약중!"}
                                      </div>
                                      <div className="cat">
                                        {/* 고양이 이미지는 네가 넣을 이미지 경로로 교체 */}
                                        <img src="/img/resavation_check_cat.png" alt="" />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>    
    </div>
  );
}

export default Sub07MyOrderTk;
