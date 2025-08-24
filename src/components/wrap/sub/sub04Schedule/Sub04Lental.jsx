import React from "react";
import "./scss/Sub04Lental.scss";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { confirmModalAction } from "../../../../store/confirmModal";
import SiteMapComponent from "../../custom/SiteMapComponent"


function Sub04Lental(props) {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
      이름:'',
      연락처:'',
      이메일:'', 
  });
  const [file, setFile] = React.useState(null);
  const [isDragOver, setIsDragOver] = React.useState(false);


  const scrollBtnRef = useRef(null);
  const navRef = useRef(null); // 네비게이션 전체 영역
 
  // 해당 영역으로 이동
  useEffect(() => {
    const navLinks = navRef.current?.querySelectorAll("a"); // ref 기반으로 찾기
    const scrollBtn = scrollBtnRef.current;

    if (!navLinks || !scrollBtn) return; // DOM이 아직 안 잡힌 경우 방지

    const handleClick = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href")?.replace("!", "");
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        const offset = targetEl.offsetTop;
        window.scrollTo({
          top: offset - 80,
          behavior: "smooth",
        });
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add("visible");
      } else {
        scrollBtn.classList.remove("visible");
      }
    };

    const handleTopClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    navLinks.forEach((link) => link.addEventListener("click", handleClick));
    window.addEventListener("scroll", handleScroll);
    scrollBtn.addEventListener("click", handleTopClick);

    return () => {
      navLinks.forEach((link) =>
        link.removeEventListener("click", handleClick)
      );
      window.removeEventListener("scroll", handleScroll);
      scrollBtn.removeEventListener("click", handleTopClick);
    };
  }, []);


  // 폼데이터 제출


  const onChangeName =(e) => {
    setState(s => ({ ...s, 이름: e.target.value }))
  };
  const onChangePh =(e) => {
    setState(s => ({ ...s, 연락처: e.target.value }))
  };
  const onChangeEmail=(e) => {
    setState(s => ({ ...s, 이메일: e.target.value }))
  };  

  const onChangeFile = (e) => {
      setFile(e.target.files?.[0] ?? null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
  
    // 유효성 검사 (순서대로 첫 누락 항목 모달)
    if (!state.이름.trim()) {
      dispatch(
        confirmModalAction({
          heading: "알림!",
          explain: "이름을 입력해주세요",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
      return;
    }

    if (!state.연락처.trim()) {
      dispatch(
        confirmModalAction({
          heading: "알림!",
          explain: "연락처를 입력해주세요",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
      return;
    }

    if (!state.이메일.trim()) {
      dispatch(
        confirmModalAction({
          heading: "알림!",
          explain: "이메일을 입력해주세요",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
      return;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRx.test(state.이메일.trim())) {
      dispatch(
        confirmModalAction({
          heading:"알림!", 
          explain:"올바른 이메일 형식을 입력해주세요.", 
          isON:true, 
          isConfirm:false 
        })
      );
      return;
    }

    if (!file) {
      dispatch(
        confirmModalAction({
          heading: "알림!",
          explain: "파일을 업로드 해주세요",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        })
      );
      return;
    }  
      // 전송
      const formData = new FormData(formEl); 

      axios({
        url: "/jazzmyomyo/lental_table.php",   
        method: "POST",
        data: formData,                         
      })
      .then(({ status, data }) => {
        if (status === 200 && (data?.ok === true || data?.ok === 1)) {
          formEl.reset();
          setState({ 이름: '', 연락처: '', 이메일: '' });
          setFile(null);
          const obj = {
            heading: "제출성공!",
            explain:"신청이 완료되었습니다",
            isON: true,
            isConfirm: false,
          }
          dispatch(confirmModalAction(obj));            
        } 
        else {
          const obj = {
            heading: "제출실패",
            explain:"다시 시도해주세요",
            isON: true,
            isConfirm: false,
          }
          dispatch(confirmModalAction(obj));            
        }
      })
        .catch((err) => console.loog(err));
  };
  
 



  return (
    <div id="sub04Lental">
      <header id="header">
        <div className="container">
          <div className="breadcrumb">
            <SiteMapComponent
              firstLink="/monthly"
              firstName="Schedule"
              secondLink="./"
              secondName="대관신청"
            />

          </div>

          <h1 className="page-title">대관신청</h1>

          <nav className="rental-scroll-nav" ref={navRef}>
            <ul>
              <li className="active">
                <a href="#rental-process">대관절차</a>
              </li>
              <li>
                <a href="#rental-fee">대관료</a>
              </li>
              <li>
                <a href="#rental-download">대관자료</a>
              </li>
              <li>
                <a href="#rental-apply">대관신청</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section id="rental-process" className="section1">
        <div className="container">
          {/* <!-- 대관 Process --> */}
          <div className="process-area">
            <h2>대관 Process</h2>

            <ul className="process-list">
              <li>
                <div className="step-title">대관신청</div>
                <div className="step-number">1</div>
              </li>
              <li>
                <div className="step-title">대관심의</div>
                <div className="step-number">2</div>
              </li>
              <li>
                <div className="step-title">승인통보</div>
                <div className="step-number">3</div>
              </li>
              <li>
                <div className="step-title">대관계약</div>
                <div className="step-number">4</div>
              </li>
              <li>
                <div className="step-title">홍보물 게시</div>
                <div className="step-number">5</div>
              </li>
              <li>
                <div className="step-title">공연준비</div>
                <div className="step-number">6</div>
              </li>
              <li>
                <div className="step-title">대관료 정산</div>
                <div className="step-number">7</div>
              </li>
              <li>
                <div className="step-title">공연진행</div>
                <div className="step-number">8</div>
              </li>
            </ul>

            {/* <!-- 모바일용 step 설명 (기본은 숨김 처리, 모바일에서만 표시) --> */}
            <div className="mobile-process">
              <div className="step-box">
                <div className="step-label">step 1</div>
                <div className="step-content">
                  <h4>대관신청</h4>
                  <p>
                    재즈묘묘 홈페이지에서 신청양식 다운로드 후 제출해주세요!
                  </p>
                </div>
              </div>
              <div className="step-box">
                <div className="step-label">step 2</div>
                <div className="step-content">
                  <h4>대관심의 & 승인통보</h4>
                  <p>승인되면 이메일 또는 연락처로 안내드립니다!</p>
                </div>
              </div>
              <div className="step-box">
                <div className="step-label">step 3</div>
                <div className="step-content">
                  <h4>대관계약 & 공연 진행</h4>
                  <p>계약 완료 후 공연 홍보 및 실행으로 마무리됩니다!</p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- 대관 정보 --> */}
          <div className="info-box">
            <h3 className="info-title">대관 정보</h3>
            <ul className="info-list">
              <li>
                <strong>대관공고</strong>
                <p>별도의 공고 없이 수시 대관 접수</p>
              </li>
              <li>
                <strong>신청방법</strong>
                <p>홈페이지 대관안내 - 대관신청서 작성 후 접수</p>
              </li>
              <li>
                <strong>대관심의 및 통보</strong>
                <p>
                  승인 여부 및 제출 필요 서류 개별 통보 (메일, 문자 또는 유선
                  통보)
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="rental-fee" className="section2">
        <div className="container">
          <h2 className="section-title">대관료</h2>

          {/* <!-- 요금 테이블 --> */}
          <div className="fee-table">
            <div className="row header">
              <div className="time hour">
                <p>12:00 ~ 18:00</p>
              </div>
              <div className="time hour">
                <p>18:00 ~ 23:00</p>
              </div>
            </div>
            <div className="row price">
              <div className="time fee">
                <p>시간당</p>
                <strong>40,000원</strong>
              </div>
              <div className="time fee">
                <p>시간당</p>
                <strong>60,000원</strong>
              </div>
            </div>
          </div>
          <p className="fee-note">
            * 공연시간 내 대관은 추가비용이 있으니 문의 부탁드립니다
          </p>

          {/* <!-- 모바일용 step 설명 (기본은 숨김 처리, 모바일에서만 표시) --> */}
          <div className="mobile-fee-table">
            <div className="fee-card">
              <div className="fee-time">12:00 ~ 18:00</div>
              <div className="fee-price">
                시간당 <strong>40,000원</strong>
              </div>
            </div>
            <div className="fee-card">
              <div className="fee-time">18:00 ~ 23:00</div>
              <div className="fee-price">
                시간당 <strong>60,000원</strong>
              </div>
            </div>
            <p className="fee-note">
              * 공연시간 내 대관은 추가비용이 있으니 문의 부탁드립니다
            </p>
          </div>

          {/* <!-- 안내사항 --> */}
          <div className="guide-box">
            <h3>안내사항</h3>
            <ul>
              <li>
                <strong>최소 대관 시간: 2시간 이상</strong>
                <dl>
                  <dd>이용요금은 [시작시간] 및 [종료시간]으로 계약됩니다</dd>
                  <dd>
                    쥰비 및 새팅, 장비 철수 및 장소 원상복구 시간은 계약 시간에
                    포함 되어있습니다
                  </dd>
                  <dd>
                    계약된 시간을 초과할 경우 추가 결제가 발생할 수 있습니다
                  </dd>
                </dl>
              </li>
              <li>
                <strong>기본 대관료에 포함되는 내용</strong>
                <dl>
                  <dd>
                    피커 2대, 마이크 2대, 오디오믹서 1대 포함한 기본 음향 장비
                  </dd>
                  <dd>
                    스탠딩 조명 2개 (색상 조절 가능) 등의 간단한 무대 조명
                  </dd>
                  <dd>
                    간단한 공간 안내 및 세팅 지원 : 입장 전 10분 간 직원 간단한
                    세팅을 도와드립니다
                  </dd>
                </dl>
              </li>
              <li>
                <strong>음식물 반입</strong>
                <dl>
                  <dd>음식 및 주류 반입은 사전 협의 필수입니다</dd>
                </dl>
              </li>
            </ul>
          </div>

          {/* <!-- 주의사항 --> */}
          <div className="caution-box">
            <h3>주의사항</h3>
            <ul>
              <li>
                <p>
                  기본 항목외의 기타 장비 사용은 대관료에 포함되지 않으며, 필요
                  시 사전 협의 및 별도 비용 청구됩니다
                </p>
              </li>
              <li>
                <p>
                  현장 상황에 따라 추가 비용이 발생할 수 있으며, 사전 확인이
                  필수입니다.
                </p>
              </li>
              <li>
                <p>
                  세부 사항은 내부 대관규정에 따릅니다. 신청 전 반드시
                  대관규정을 확인하여 주시기 바랍니다. (대관규정은 대관신청서와
                  함께 다운로드 할 수 있습니다.)
                </p>
              </li>
              <li>
                <p>
                  행사장 내부 구조변경(책상/의자 등) 시 원상복구를 원칙으로
                  합니다.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="rental-download" className="section3">
        <div className="container">
          <h2 className="section-title">대관자료</h2>
          <div className="download-table">
            <ul>
              <li>
                <dl>
                  <dd>
                    <p>공간도면</p>
                  </dd>
                  <dd>
                    <a href="/downLoad/스튜디오 평면도.pdf" download="재즈묘묘_공간도면.pdf">
                      공간도면
                      <i className="material-icons">insert_drive_file</i>
                    </a>
                  </dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dd>
                    <p>대관 신청서</p>
                  </dd>
                  <dd>
                    <a href="/downLoad/jazz_Myomyo_rental_hall.docx" download="재즈묘묘_대관신청서.docx">
                      대관 신청서
                      <i className="material-icons">insert_drive_file</i>
                    </a>
                  </dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dd>
                    <p>대관 규약</p>
                  </dd>
                  <dd>
                    <a href="/downLoad/jazz_myomyo_rental_regulations.hwp" download="재즈묘묘_대관규약.hwp">
                      대관 규약
                      <i className="material-icons">insert_drive_file</i>
                    </a>
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="rental-apply" className="section4">
        <div className="container">
          <h2 className="section-title">대관신청</h2>
          <p className="apply-notice">
            대관신청 전 반드시 대관규약 확인 후 신청 바랍니다.
          </p>

          <div className="apply-box">
            {/* <!-- 왼쪽 --> */}
            <div className="contact-info">
              <h3>대관문의</h3>
              <ul>
                <li>
                  <p>재즈묘묘 02-1223-4567</p>
                </li>
                <li>
                  <p>문의 가능 시간 11:00 ~ 18:00</p>
                </li>
                <li>
                  <p>(월, 화는 휴무입니다)</p>
                </li>
                <li>
                  <p>jazzmyomyo@gmail.com</p>
                </li>
              </ul>
            </div>

            {/* <!-- 오른쪽 --> */}
            <form 
              onSubmit={handleSubmit} 
              className="apply-form"
              encType="multipart/form-data"
            >
              <div className="form-inner">
                {/* <!-- 왼쪽 필드 영역 --> */}
                <div className="form-fields">
                  <div className="form-group">
                    <label>신청자정보</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="이름 및 단체명"
                      value={state.이름}
                      onChange={onChangeName}
                      />
                  </div>
                  <div className="form-group">
                    <label>전화번호</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={state.연락처}
                      onChange={onChangePh}
                      placeholder="연락처 입력"
                      />
                  </div>
                  <div className="form-group">
                    <label>이메일</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={state.이메일}
                      onChange={onChangeEmail}
                      placeholder="이메일 입력"
                    />
                  </div>
                </div>

                {/* <!-- 오른쪽 업로드 영역 --> */}
                <div 
                  className={`upload-box ${isDragOver ? "dragover" : ""}`} 
                  onClick={() => document.getElementById("file").click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    setFile(e.dataTransfer.files[0]);
                  }}
                >
                  <input 
                    type="file" 
                    id="file" 
                    name="file" 
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={onChangeFile} 
                  />
                  <p>
                    <i className="material-icons">insert_drive_file</i>
                    {file ? file.name : "파일을 업로드 해주세요 (PDF)"}
                  </p>
                  {file && (
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setFile(null);
                      const input = document.getElementById("file");
                      if (input) input.value = ""; 
                    }}
                  >
                    <i>×</i><span>삭제</span>
                  </button>
                )}
                </div>
              </div>              
              <button type="submit" className="submit-btn">
                신청서 제출
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* <!-- TOP button --> */}
      <button id="scrollToTop" className="scroll-top-btn" ref={scrollBtnRef}>
        <img src="./img/toTop_btn.png" alt="맨 위로" />
      </button>
    </div>
  );
}

export default Sub04Lental;
