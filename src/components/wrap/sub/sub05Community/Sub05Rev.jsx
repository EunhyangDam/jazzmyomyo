import React, { useEffect, useState } from "react";
import "./scss/Sub05Rev.scss";
import { useNavigate } from "react-router-dom";
import SiteMapComponent from "../../custom/SiteMapComponent";
import axios from "axios";

function Sub05Rev(props) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    isOpen: false,
    selectedId: null,
    후기: [],
    필터목록:[],
    페이지번호:[]
  });



// 페이지네이션 

const [page, setPage]=React.useState(1);
    
// 계산에만 사용하는 일반 변수 선언
const list = 9; // 한페이지당 게시글 개수 
const 시작번호 = (page -1) * list; 
const 끝번호 = 시작번호 + list; 
const 슬라이스 = state.필터목록.slice( 시작번호 , 끝번호 ) // 한페이지 단위로 5줄씩 배열 저장
const 총페이지수 = Math.ceil(state.필터목록.length / list );
const 페이지그룹 = 5;
const 현재그룹번호 = Math.floor((page-1)/페이지그룹);
const 총그룹수 = Math.ceil(총페이지수/페이지그룹);
const 그룹시작= (현재그룹번호 *페이지그룹)+ 1;
const 그룹끝= Math.min ((그룹시작+페이지그룹-1) , 총페이지수 )
const 페이지번호 = [...Array(그룹끝 - 그룹시작 +1)].map((item,i)=>그룹시작+i)

const onClickPage = (e,n)=>{
  e.preventDefault()
  setPage(n)

}

useEffect(() => {
  const total = Math.ceil(state.필터목록.length / list);
  if (total === 0) return;
  if (page > total) setPage(total);
}, [state.필터목록.length, page]);

/// 
  // 후기 불러오기
  useEffect(() => {
    fetchReviews();
  }, []);

  // 하트 업데이트
  // 하트 클릭 (DB 수정 작업 필요)
  const onClickRevHeart = (idx) => {
    const formData = new FormData();
    formData.append("idx", idx);

    axios({
      url: "/jazzmyomyo/review_table_update.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          const serverHeart = Number(res.data);
          if (serverHeart >= 0) {
            // 하트가 성공적으로 반영됐을 때, 전체 후기 다시 조회해서 최신화
            fetchReviews();
          } else {
            console.log("하트 실패");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchReviews = () => {
    axios({
      url: "/jazzmyomyo/review_table_select.php",
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200 && res.data !== 0) {
          let 후기 = res.data;
          후기 = [...후기].sort((a, b) => b.wDate.localeCompare(a.wDate));
          setState((prev) => ({
            ...prev,
            후기: 후기,
            필터목록: 후기
          }));
        }
      })
      .catch((err) => console.log(err));
  };
  // 글쓰기 이동
  const onClickRevWriteBtn = (e) => {
    e.preventDefault();
    navigate("/RevWrite");
  };

  // 모달 열기
  const onClickGap = (id) => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      selectedId: id,
    }));
  };

  // 모달 닫기
  const onClickModalClose = (e) => {
    e.stopPropagation();
    setState((prev) => ({
      ...prev,
      isOpen: false,
      selectedId: null,
    }));
  };

  // 선택된 후기 & 현재 index
  const selectedReview =
    state.후기.find((r) => r.idx === state.selectedId) || null;
  const currentIndex =
    state.selectedId !== null
      ? state.후기.findIndex((r) => r.idx === state.selectedId)
      : -1;

  // Prev, Next
  const onClickPrev = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setState((prev) => ({
        ...prev,
        selectedId: state.후기[currentIndex - 1].idx,
      }));
    }
  };

  const onClickNext = (e) => {
    e.stopPropagation();
    if (currentIndex !== -1 && currentIndex < state.후기.length - 1) {
      setState((prev) => ({
        ...prev,
        selectedId: state.후기[currentIndex + 1].idx,
      }));
    }
  };

  return (
    <div id="sub05Rev">
      <div className="container">
        <SiteMapComponent
          firstLink=""
          firstName="커뮤니티"
          secondLink="./"
          secondName="공연 후기"
        />
        <div className="title">
          <h2>공연 후기</h2>
          <h3>
            재즈묘묘의 밤을 기억하는 한 줄의 마음들이 이곳에 포근히 쌓여갑니다.
          </h3>
        </div>

        <div className="content">
          <div className="top">
            <button onClick={onClickRevWriteBtn}>나도 한줄 후기 남기기</button>
            <h4>
              <i className="bi bi-bell-fill"></i>
              <span>후기는 최근 업데이트된 순서로 노출됩니다.</span>
            </h4>
          </div>

          <div className="review-box">
            <ul>
              {슬라이스.map((item) => (
                <li key={item.idx}>
                  <div className="gap" onClick={() => onClickGap(item.idx)}>
                    <div className="row1">
                      <p>{item.wContent}</p>
                    </div>
                    <div className="row2">{item.wName}</div>
                    <div className="row3">{item.wDate.slice(0, 10)}</div>
                    <div className="row4">
                      <em>{item.wSubject}</em>
                      <span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onClickRevHeart(item.idx);
                          }}
                        >
                          <i className="bi bi-suit-heart-fill"></i>
                        </button>
                        <b>{item.Heart}</b>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pagination-box" style={{paddingTop:'100px'}} >
          {/* 버튼 위치 */}
          {/* 처음 */}
          { 현재그룹번호 > 0 &&
            <button className="icon1" onClick={(e)=>onClickPage(e,1)} ><i className="bi bi-chevron-bar-left"></i></button>  
          }  
          {/* 이전 */}
          { 그룹시작 >1 &&    
              <button className="icon2" onClick={(e)=>onClickPage(e, 그룹시작-1)}><i className="bi  bi-chevron-left"></i></button>  
          }
              <ul>
                  {
                      페이지번호.map((n)=>
                          <li key={n} data-key={n}>
                              <a 
                                  href="!#" 
                                  title={n} 
                                  className={page === n? " on": ''}
                                  onClick={(e)=>onClickPage(e,n)}
                              >{n}</a>
                          </li>)
                  }
              </ul>      
              {/* 다음 */}
              { 그룹끝 < 총페이지수 && 
              <button className="icon2" onClick={(e)=>onClickPage(e, 그룹끝+1)}><i className="bi bi-chevron-right"></i></button>   
              }
              { 현재그룹번호 < (총그룹수 -1) &&
              <button className="icon1" onClick={(e)=>onClickPage(e, 총페이지수)} ><i className="bi bi-chevron-bar-right"></i></button>   
            }
           </div>
        </div>
      </div>

      {/* 모달 */}
      {state.isOpen && selectedReview && (
        <div
          className={`modal ${state.isOpen ? " on" : ""}`}
          onClick={onClickModalClose}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="nav prev">
              {currentIndex > 0 && (
                <i className="bi bi-chevron-left" onClick={onClickPrev}></i>
              )}
            </div>

            <div className="center-box">
              <div className="title">
                <h2>묘원의 공연 후기</h2>
              </div>
              <div className="content">
                <div className="gap">
                  <div className="row1">
                    <p>{selectedReview?.wContent}</p>
                  </div>
                  <div className="row2">{selectedReview?.wName}</div>
                  <div className="row3">
                    {selectedReview?.wDate.slice(0, 10)}
                  </div>
                  <div className="row4">
                    <em>{selectedReview?.wSubject}</em>
                    <span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedReview) {
                            onClickRevHeart(selectedReview.idx);
                          }
                        }}
                      >
                        <i className="bi bi-suit-heart-fill"></i>
                      </button>
                      <b>{selectedReview?.Heart}</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav next">
              {currentIndex !== -1 && currentIndex < state.후기.length - 1 && (
                <i className="bi bi-chevron-right" onClick={onClickNext}></i>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sub05Rev;
