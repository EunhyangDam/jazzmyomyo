import React, { useEffect } from "react";
import "./scss/Sub06SignUp.scss";
import { useDispatch, useSelector } from "react-redux";
import { confirmModalAction } from "../../../../store/confirmModal";
import { daumPostcodeOpenAction } from "../../../../store/daumPostcode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Sub06SignUp(props) {
  // 네비게이트
  const navigate = useNavigate();

  // 주소 가져오기
  const daumPostcode = useSelector((state) => state.daumPostcode);

  // 입력상자 휴대폰 선택자 선언
  const userHpRef = React.useRef(); // 유즈래프() 훅

  // 컨펌모달 디스패치선언
  const dispatch = useDispatch();

  const [타이머, set타이머] = React.useState({
    분: 2,
    초: 59,
  });

  const [state, setState] = React.useState({
    아이디: "",
    아이디오류메시지: "",
    아이디중복확인: false, // 중복된 아이디가 없으면 true

    비밀번호: "",
    비밀번호오류메시지: "",

    비밀번호확인: "",
    비밀번호확인오류메시지: "",

    이름: "",
    이름오류메시지: "",

    이메일: "",
    이메일오류메시지: "",
    이메일중복확인: false, // 중복된이메일이 없으면 true

    휴대폰: "",
    휴대폰오류메시지: "",
    인증번호받기: true, // 기본 true 버튼 사용 불가 disabled
    인증번호: null, // 6자리 정수로 발급
    인증번호입력: "",
    버튼텍스트: "인증번호받기",
    휴대폰인증번호성공: false, // 인증성공하면 true

    주소1: null, // 우편번호 주소1
    주소2: null,

    // 선택
    성별: "선택안함",

    // 선택
    생년: "",
    생월: "",
    생일: "",
    생년월일오류메시지: "",

    // 필수
    이용약관동의: [],
    이용약관동의필수항목갯수: null, // 필수 3개

    이용약관: [
      "이용약관 동의(필수)",
      "개인정보 수집∙이용 동의(필수)",
      "마케팅 광고 활용을 위한 수집 및 이용 동의(선택)",
      "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
      "SNS",
      "이메일",
      "본인은 만 14세 이상입니다.(필수)",
    ],
  });

  // 주소 들어오면
  useEffect(() => {
    if (daumPostcode.검색주소 !== "") {
      setState({
        ...state,
        주소1: `${daumPostcode.우편번호} ${daumPostcode.검색주소}`,
        주소2: daumPostcode.상세주소,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daumPostcode]);

  // 1. 아이디
  const onChangeUserId = (e) => {
    const regExp1 = /^(.){6,}$/g;
    const regExp2 = /[a-z]+[0-9a-z]*/gi;
    const regExp3 = /[`~!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|]/g;
    const regExp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;

    let 아이디 = e.target.value.trim();
    let 아이디오류메시지 = "";

    아이디 = 아이디.replace(regExp3, "");

    if (
      regExp1.test(아이디) === true &&
      regExp2.test(아이디) === true &&
      regExp4.test(아이디) === false
    ) {
      아이디오류메시지 = "";
    } else {
      아이디오류메시지 = "6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합";
    }
    setState({
      ...state,
      아이디: 아이디,
      아이디오류메시지: 아이디오류메시지,
    });
  };

  // 1-2. 아이디 중복검사
  const onClickUserIdCheck = (e) => {
    e.preventDefault();

    if (state.아이디 === "") {
      dispatch(
        confirmModalAction({
          heading: "알람!",
          explain: "아이디를 입력하세요.",
          isON: true,
          isConfirm: false,
        })
      );
      return;
    }

    const formData = new FormData();
    formData.append("userId", state.아이디);
    axios({
      url: "/jazzmyomyo/id_duplicate_check.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          if (res.data === 1) {
            dispatch(
              confirmModalAction({
                heading: "알람!",
                explain:
                  "사용할 수 없는 아이디 입니다.\n다른아이디를 사용하세요.",
                isON: true,
                isConfirm: false,
              })
            );
            setState({
              ...state,
              아이디중복확인: false,
            });
          }
          if (res.data === 0) {
            dispatch(
              confirmModalAction({
                heading: "",
                explain: "사용가능한 아이디 입니다.",
                isON: true,
                isConfirm: false,
              })
            );
            setState({
              ...state,
              아이디중복확인: true,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 2. 비밀번호
  const onChangeUserPw1 = (e) => {
    let 비밀번호 = e.target.value.trim();
    let 비밀번호오류메시지 = "";

    const regExp1 = /^(.){10,}$/g;
    const regExp2 =
      /^(?![a-zA-Z]+$)(?!\d+$)(?![!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]+$)[a-zA-Z0-9!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]$/;
    const regExp3 = /(\d)\1\1/g;
    const regExp4 = /\s/g;

    if (regExp1.test(비밀번호) === false) {
      비밀번호오류메시지 = "최소 10자 이상";
    } else if (regExp2.test(비밀번호) === true) {
      비밀번호오류메시지 =
        "영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합";
    } else if (regExp3.test(비밀번호) === true) {
      비밀번호오류메시지 = "동일한 숫자 3개 이상 연속 사용 불가";
    } else if (regExp4.test(비밀번호) === true) {
      비밀번호오류메시지 = "공백문자 사용 불가";
    }

    setState({
      ...state,
      비밀번호: 비밀번호,
      비밀번호오류메시지: 비밀번호오류메시지,
    });
  };

  // 3. 비밀번호 확인
  const onChangeUserPw2 = (e) => {
    let 비밀번호확인 = e.target.value.trim();
    let 비밀번호확인오류메시지 = "";

    if (state.비밀번호 === 비밀번호확인) {
      비밀번호확인오류메시지 = "";
    } else {
      비밀번호확인오류메시지 = "동일한 비밀번호를 입력";
    }
    setState({
      ...state,
      비밀번호확인: 비밀번호확인,
      비밀번호확인오류메시지: 비밀번호확인오류메시지,
    });
  };

  // 4. 이름
  const onChangeUserName = (e) => {
    let 이름 = e.target.value.trim();
    let 이름오류메시지 = "";
    const regExp = /[`~!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|]/g;

    // 검사 test 조건문
    이름 = 이름.replace(regExp, "");

    if (이름 === "") {
      이름오류메시지 = "이름을 입력해 주세요.";
    } else {
      이름오류메시지 = "";
    }

    setState({
      ...state,
      이름: 이름,
      이름오류메시지: 이름오류메시지,
    });
  };

  // 5. 이메일
  const onChangeUserEmail = (e) => {
    let 이메일 = e.target.value.trim();
    let 이메일오류메시지 = "";
    const regExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/gi;

    if (regExp.test(이메일) === true) {
      이메일오류메시지 = "";
    } else {
      이메일오류메시지 = "이메일 형식으로 입력해 주세요.";
    }

    setState({
      ...state,
      이메일: 이메일,
      이메일오류메시지: 이메일오류메시지,
    });
  };

  // 5-2. 이메일중복확인
  const onClickUserEmailCheck = (e) => {
    e.preventDefault();

    if (state.이메일 === "") {
      dispatch(
        confirmModalAction({
          heading: "알람!",
          explain: "이메일을 입력하세요.",
          isON: true,
          isConfirm: false,
        })
      );
      return;
    }

    // 데이터베이스 서브에서 이메일중복확인 + PHP
    // email_duplicate_check.php
    // 폼데이터 보내기
    const formData = new FormData();
    formData.append("userEmail", state.이메일);
    formData.append("userId", state.아이디 || "");

    axios({
      url: "/jazzmyomyo/email_duplicate_check.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          let 이메일중복확인 = false;
          if (res.data === 1) {
            dispatch(
              confirmModalAction({
                heading: "알람!",
                explain:
                  "사용할 수 없는 이메일 입니다.\n다른 이메일을 입력하세요.",
                isON: true,
                isConfirm: false,
              })
            );
            이메일중복확인 = false;
          } else if (res.data === 0) {
            dispatch(
              confirmModalAction({
                heading: "",
                explain: "사용할 수 있는 이메일 입니다.",
                isON: true,
                isConfirm: false,
              })
            );
            이메일중복확인 = true;
          }
          setState({
            ...state,
            이메일중복확인: 이메일중복확인,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 6 휴대폰
  const onChangeUserHp = (e) => {
    let 휴대폰 = e.target.value.trim();
    let 휴대폰오류메시지 = "";
    let 인증번호받기 = true;

    const regExp = /[^0-9]/g;

    휴대폰 = 휴대폰.replace(regExp, "");

    if (휴대폰 === "") {
      휴대폰오류메시지 = "휴대폰 번호를 입력해 주세요.";
      인증번호받기 = true;
    } else {
      휴대폰오류메시지 = "";
      인증번호받기 = false;
    }

    setState({
      ...state,
      휴대폰: 휴대폰,
      휴대폰오류메시지: 휴대폰오류메시지,
      인증번호받기: 인증번호받기,
    });
  };

  // 6-3 인증번호버튼 클릭 이벤트(휴대폰 번호 제한규칙 검사) 통과되면 => 인증번호발급
  const onClickDisabled = (e) => {
    e.preventDefault();
    if (state.버튼텍스트 === "다른번호입력") {
      setState({
        ...state,
        휴대폰: "",
        휴대폰오류메시지: "",
        인증번호받기: true,
        인증번호: null,
        인증번호입력: "",
        버튼텍스트: "인증번호받기",
      });
      userHpRef.current.focus();
    } else {
      // 버튼텍스트=> 인증번호받기
      const regExp1 = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g;
      let authenNum = null;

      if (regExp1.test(state.휴대폰) === true) {
        authenNum = Math.floor(Math.random() * 900000 + 100000);

        // 컨펌모달 구현하기
        const obj = {
          heading: `${authenNum}`,
          explain: "인증번호가 발급되었습니다.",
          isON: true,
          isConfirm: false,
          message1: "",
          message2: "",
        };
        dispatch(confirmModalAction(obj));
      } else {
        // 컨펌모달 구현하기
        const obj = {
          heading: "알람!",
          explain: "잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.",
          isON: true,
          isConfirm: false,
        };
        dispatch(confirmModalAction(obj));
      }

      setState({
        ...state,
        인증번호: authenNum,
      });
    }
  };

  // 6-3-1 타이머 카운트
  React.useEffect(() => {
    if (state.인증번호 !== null) {
      let 시작시간 = new Date(); // 현재(지금) 초기값
      시작시간.setMinutes(시작시간.getMinutes() + 3); // 초기 설정값

      const timer = () => {
        if (new Date() > 시작시간) {
          const obj = {
            heading: "알람!",
            explain: "유효 시간이 만료되었습니다.\n다시 시도해 주세요.",
            isON: true,
            isConfirm: false,
          };
          dispatch(confirmModalAction(obj));

          clearInterval(setId);
        } else {
          const 남은시간 = 시작시간 - new Date();
          let 분 = (남은시간 / (1000 * 60)) % 60; // 분 나머지
          let 초 = (남은시간 / 1000) % 60; // 초 나머지
          set타이머({
            분: Math.floor(분),
            초: Math.floor(초),
          });
        }
      };

      const setId = setInterval(timer, 1000); // 1초간격으로 타이머함수 호출 실행
      return () => clearInterval(setId); // 타이머 버블링 제거
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.인증번호]); // 로딩시 state.인증번호=null, 인증번호 발급되면 2번 실행 정수 6자리

  // 6-4  인증번호(정수)  입력상자 온체인지 이벤트
  const onChangeUserHpAuthen = (e) => {
    setState({
      ...state,
      // 인증번호입력: Number(e.target.value)  // 문자형숫자 => 숫자형 변환
      인증번호입력: parseInt(e.target.value), // 문자형숫자 => 숫자형 변환
    });
  };

  // 6-5  인증번호 확인 버튼 클릭 이벤트
  const onClickUserHpAuthen = (e) => {
    e.preventDefault();

    let 인증번호 = null;
    let 버튼텍스트 = "";
    let 휴대폰인증번호성공 = false;

    if (state.인증번호입력 === state.인증번호) {
      const obj = {
        heading: "확인!",
        explain: "인증번호가 확인 되었습니다.",
        isON: true,
        isConfirm: false,
      };
      dispatch(confirmModalAction(obj));
      인증번호 = null;
      버튼텍스트 = "다른번호입력";
      휴대폰인증번호성공 = true;
    } else {
      const obj = {
        heading: "알람!",
        explain: "인증번호가 다릅니다. 확인 후 다시 시도 해 주세요.",
        isON: true,
        isConfirm: false,
      };
      dispatch(confirmModalAction(obj));
      인증번호 = state.인증번호;
      버튼텍스트 = state.버튼텍스트;
    }

    // 1 인증번호입력상자 숨김
    // 2 버튼 텍스트 변경
    setState({
      ...state,
      인증번호: 인증번호,
      버튼텍스트: 버튼텍스트,
      휴대폰인증번호성공: 휴대폰인증번호성공,
    });
  };

  // 7-1 주소검색 버튼 클릭 이벤트
  const onClickAddressSearch = (e) => {
    e.preventDefault();
    dispatch(daumPostcodeOpenAction(true));
  };

  // 7-2 주소 재검색 버튼 클릭 이벤트
  const onClickArressReSerch = (e) => {
    e.preventDefault();
    dispatch(daumPostcodeOpenAction(true));
  };

  // 7-3 주소1 온체인지 이벤트
  const onChangeUserAddress1 = (e) => {
    setState({
      ...state,
      주소1: e.target.value.trim(),
    });
  };
  // 7-3 주소2 온체인지 이벤트
  const onChangeUserAddress2 = (e) => {
    setState({
      ...state,
      주소2: e.target.value.trim(),
    });
  };

  // 8 성별 이벤트
  const onChangeUserGender = (e) => {
    setState({
      ...state,
      성별: e.target.value,
    });
  };

  // 9-2 생년월일 입력 체크 함수 => if 조건문 switch() { case 조건: break; }
  useEffect(() => {
    let 생년월일오류메시지 = "";

    if (state.생년 === "" && state.생월 === "" && state.생일 === "") {
      생년월일오류메시지 = "";
    } else {
      const 현재년도 = new Date().getFullYear();
      const 생년 = Number(state.생년);
      const 생월 = Number(state.생월);
      const 생일 = Number(state.생일);

      // 스위치 케이스
      switch (true) {
        case String(생년).length < 4: // 문자열 길이
          생년월일오류메시지 = "태어난 년도 4자리를 정확하게 입력해주세요.";
          break;
        case 생년 > 현재년도:
          생년월일오류메시지 =
            "미래의 년도  생년월일이 미래로 입력 되었습니다.";
          break;
        case 생년 >= 현재년도 - 14:
          생년월일오류메시지 = "만 14세 미만은 가입이 불가합니다.";
          break;
        case 생년 < 현재년도 - 100:
          생년월일오류메시지 =
            "생년월일을 다시 확인해주세요. 죄송합니다. 100세 초과는 가입불가합니다.";
          break;
        case 생월 < 1 || 생월 > 12:
          생년월일오류메시지 = "태어난 월을 정확하게 입력해주세요.";
          break;
        case 생일 < 1 || 생일 > new Date(생년, 생월, 0).getDate():
          생년월일오류메시지 = "태어난 일을 정확하게 입력해주세요.";
          break;
        default:
          생년월일오류메시지 = "";
          break;
      }
    }

    setState({
      ...state,
      생년월일오류메시지: 생년월일오류메시지,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.생년, state.생월, state.생일]);

  // 9-1 생년 생월 생일 통합 코딩정리(리팩토링)
  const onChangeBirth = (e) => {
    let 생년월일 = e.target.value.trim();

    console.log(e);
    console.log(e.target);
    console.log(e.target.dataset.name);

    const regExp = /[^0-9]/g;
    생년월일 = 생년월일.replace(regExp, "");
    setState({
      ...state,
      [e.target.dataset.name]: 생년월일, // [생년] / [생월] / [생일]
    });
  };

  // 10 이용약관동의
  // 10-1 전체체크 구현
  const onChangeChkAll = (e) => {
    setState({
      ...state,
      이용약관동의: e.target.checked ? state.이용약관 : [],
    });
  };

  // 10-2 개별체크 chk1 ~ chk7
  const onChangeChk = (e) => {
    // 현재 체크한 값(value)을  [이용약관동의] 에 누적 저장
    let 이용약관동의 = state.이용약관동의;

    if (e.target.checked) {
      // 체크되면 추가
      이용약관동의 = [...이용약관동의, e.target.value];
    } else {
      // 체크 해제하면 삭제
      이용약관동의 = 이용약관동의.filter((item) => item !== e.target.value);
    }

    // 추가 내용
    // 1 "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)" 체크하면 => SNS, 이메일 두개 체크된다.
    if (e.target.checked) {
      // 체크되면
      if (
        e.target.value === "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)"
      ) {
        if (
          이용약관동의.includes("SNS") === false &&
          이용약관동의.includes("이메일") === false
        ) {
          이용약관동의 = [...이용약관동의, "SNS", "이메일"];
        } else if (
          이용약관동의.includes("SNS") === true &&
          이용약관동의.includes("이메일") === false
        ) {
          이용약관동의 = [...이용약관동의, "이메일"];
        } else if (
          이용약관동의.includes("SNS") === false &&
          이용약관동의.includes("이메일") === true
        ) {
          이용약관동의 = [...이용약관동의, "SNS"];
        }
      } else if (e.target.value === "SNS") {
        if (이용약관동의.includes("이메일") === true) {
          이용약관동의 = [
            ...이용약관동의,
            "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
          ];
        }
      } else if (e.target.value === "이메일") {
        if (이용약관동의.includes("SNS") === true) {
          이용약관동의 = [
            ...이용약관동의,
            "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
          ];
        }
      }
    } else {
      // 체크해제되면
      if (
        e.target.value === "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)"
      ) {
        이용약관동의 = 이용약관동의.filter((item) => item !== "SNS");
        이용약관동의 = 이용약관동의.filter((item) => item !== "이메일");
      } else if (e.target.value === "SNS") {
        이용약관동의 = 이용약관동의.filter(
          (item) => item !== "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)"
        );
      } else if (e.target.value === "이메일") {
        이용약관동의 = 이용약관동의.filter(
          (item) => item !== "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)"
        );
      }
    }

    setState({
      ...state,
      이용약관동의: 이용약관동의,
    });
  };

  // 10-3 이용약관동의 필수 항목 카운트
  useEffect(() => {
    const cnt = state.이용약관동의.filter((item) =>
      item.includes("필수")
    ).length;

    setState({
      ...state,
      이용약관동의필수항목갯수: cnt,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.이용약관동의]);

  // 폼전송 클릭 이벤트 onSubmit() 함수
  const onSubmitSignUpForm = (e) => {
    e.preventDefault();

    // 1. state 모든 속성 비구조화 변수 정리
    const {
      아이디,
      아이디중복확인,
      비밀번호,
      비밀번호확인,
      이름,
      이메일,
      이메일중복확인,
      휴대폰,
      휴대폰인증번호성공,
      주소1,
      주소2,
      이용약관동의,
      이용약관동의필수항목갯수,
    } = state;

    const switchData = [
      { 조건: 아이디 === "", 메시지: "아이디를 입력하세요" },
      { 조건: 아이디중복확인 === false, 메시지: "아이디 중복검사 하세요" },
      { 조건: 비밀번호 === "", 메시지: "비밀번호를 입력하세요" },
      {
        조건: 비밀번호 !== 비밀번호확인,
        메시지:
          "비밀번호와 비밀번호확인 번호는 일치해야 합니다.\n다시 입력하고 시도하세요",
      },
      { 조건: 이름 === "", 메시지: "이름을 입력하세요" },
      { 조건: 이메일 === "", 메시지: "이메일을 입력하세요" },
      {
        조건: 이메일중복확인 === false,
        메시지: "이메일중복확인 검사를 하세요",
      },
      { 조건: 휴대폰 === "", 메시지: "휴대폰 번호를 하세요" },
      {
        조건: 휴대폰인증번호성공 === false,
        메시지: "휴대폰 인증받기를 클릭 하세요",
      },
      {
        조건: 주소1 === null || 주소2 === null,
        메시지: "주소를 검색하여 등록하세요",
      },
      {
        조건: 이용약관동의필수항목갯수 < 3,
        메시지: "이용약관동의 필수 3개를 선택하세요",
      },
    ];
    for (const { 조건, 메시지 } of switchData) {
      if (조건) {
        const obj = {
          heading: "알람!",
          explain: 메시지,
          isON: true,
          isConfirm: false,
        };
        dispatch(confirmModalAction(obj));
        return;
      }
    }

    // 폼데이터
    const 휴대폰형식포멧 = 휴대폰.replace(
      /^(\d){3}(\d){3,4}(\d){4}$/g,
      "$1-$2-$3"
    );
    const 주소 = `${주소1} ${주소2}`;
    const 생년월일 = `${state.생년}-${state.생월}-${state.생일}`;
    const appendData = [
      { 필드: "userId", 키: 아이디 },
      { 필드: "userPw", 키: 비밀번호 },
      { 필드: "userName", 키: 이름 },
      { 필드: "userEmail", 키: 이메일 },
      { 필드: "userHp", 키: 휴대폰형식포멧 },
      { 필드: "userAddress", 키: 주소 },
      { 필드: "userGender", 키: state.성별 },
      { 필드: "userBirth", 키: 생년월일 },
      { 필드: "userService", 키: 이용약관동의 },
    ];

    const formData = new FormData();
    appendData.forEach(({ 필드, 키 }) => {
      formData.append(필드, 키);
    });

    axios({
      url: "/jazzmyomyo/signup_insert.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          let obj = {};
          if (res.data === 1) {
            obj = {
              heading: "묘묘!",
              explain: "회원가입을 축하한다묘",
              isON: true,
              isConfirm: false,
            };
            dispatch(confirmModalAction(obj));

            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else if (res.data === 0) {
            obj = {
              heading: "알람!",
              explain: "회원가입을 실패했습니다.\n확인하고 다시 시도해주세요",
              isON: true,
              isConfirm: false,
            };
            dispatch(confirmModalAction(obj));
          }
        }
      })
      .catch((err) => {
        console.log("axios 실패");
        console.log(err);
      });
  };

  return (
    <main id="sub06SignUp">
      <section id="section1">
        <div className="container">
          <div className="title">
            <h2>회원가입</h2>
            <p>
              <i>*</i>
              <strong>필수입력사항</strong>
            </p>
          </div>
          <div className="content">
            <form onSubmit={onSubmitSignUpForm} autoComplete="off">
              <ul>
                <li className="row row1 block1">
                  <div className="gap">
                    <label htmlFor="userId">
                      <strong>아이디</strong> <i>*</i>
                    </label>
                    <input
                      type="text"
                      name="userId"
                      id="userId"
                      className="input-text"
                      placeholder="아이디를 입력해주세요"
                      maxLength={16}
                      onChange={onChangeUserId}
                      value={state.아이디}
                    />
                    <button onClick={onClickUserIdCheck}>중복확인</button>
                    {state.아이디오류메시지 !== "" && (
                      <p>{state.아이디오류메시지}</p>
                    )}
                  </div>
                </li>
                <li className="row row2 block1">
                  <div className="gap">
                    <label htmlFor="userPw1">
                      <strong>비밀번호</strong> <i>*</i>
                    </label>
                    <input
                      type="password"
                      name="userPw1"
                      id="userPw1"
                      className="input-text"
                      placeholder="비밀번호를 입력해주세요"
                      onChange={onChangeUserPw1}
                      value={state.비밀번호}
                    />
                    {state.비밀번호오류메시지 !== "" && (
                      <p>{state.비밀번호오류메시지}</p>
                    )}
                  </div>
                </li>
                <li className="row row3 block1">
                  <div className="gap">
                    <label htmlFor="userPw2">
                      <strong>비밀번호확인</strong> <i>*</i>
                    </label>
                    <input
                      type="password"
                      name="userPw2"
                      id="userPw2"
                      className="input-text"
                      placeholder="비밀번호를 한번 더 입력해주세요"
                      onChange={onChangeUserPw2}
                      value={state.비밀번호확인}
                    />
                    {state.비밀번호확인오류메시지 !== "" && (
                      <p>{state.비밀번호확인오류메시지}</p>
                    )}
                  </div>
                </li>
                <li className="row row4 block1">
                  <div className="gap">
                    <label htmlFor="userName">
                      <strong>이름</strong> <i>*</i>
                    </label>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      className="input-text"
                      placeholder="이름를 입력해주세요"
                      value={state.이름}
                      onChange={onChangeUserName}
                    />
                    {state.이름오류메시지 !== "" && (
                      <p>{state.이름오류메시지}</p>
                    )}
                  </div>
                </li>
                <li className="row row5 block1">
                  <div className="gap">
                    <label htmlFor="userEmail">
                      <strong>이메일</strong> <i>*</i>
                    </label>
                    <input
                      type="text"
                      name="userEmail"
                      id="userEmail"
                      className="input-text"
                      placeholder="이메일를 입력해주세요"
                      onChange={onChangeUserEmail}
                      value={state.이메일}
                    />
                    <button onClick={onClickUserEmailCheck}>중복확인</button>
                    {state.이메일오류메시지 !== "" && (
                      <p>{state.이메일오류메시지}</p>
                    )}
                  </div>
                </li>
                <li className="row row6 block1">
                  <div className="gap">
                    <label htmlFor="userHp">
                      <strong>휴대폰</strong> <i>*</i>
                    </label>
                    <input
                      type="text"
                      name="userHp"
                      id="userHp"
                      className="input-text"
                      placeholder="숫자만 입력해주세요."
                      onChange={onChangeUserHp}
                      value={state.휴대폰}
                      ref={userHpRef}
                    />
                    <button
                      className={state.인증번호받기 ? "on" : ""}
                      disabled={state.인증번호받기}
                      onClick={onClickDisabled}
                    >
                      {state.버튼텍스트}
                    </button>
                    {state.휴대폰오류메시지 !== "" && (
                      <p>{state.휴대폰오류메시지}</p>
                    )}
                  </div>
                  {state.인증번호 !== null && (
                    <div className="gap">
                      <input
                        type="text"
                        name="userHpAuthen"
                        id="userHpAuthen"
                        className="input-text"
                        placeholder="숫자만 입력해주세요."
                        onChange={onChangeUserHpAuthen}
                        value={state.인증번호입력}
                      />
                      <div className="timer-box">
                        <span>{String(타이머.분).padStart(2, "0")}</span>
                        <i>:</i>
                        <span>{String(타이머.초).padStart(2, "0")}</span>
                      </div>
                      <button onClick={onClickUserHpAuthen}>
                        인증번호확인
                      </button>
                      <p>
                        인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은
                        휴대폰 번호 차단 여부를 확인해주세요. (컬리 1644-1107)
                      </p>
                    </div>
                  )}
                </li>
                <li className="row row7 block1">
                  {state.주소1 === null && (
                    <div className="gap address-find">
                      <label htmlFor="userAddress1">
                        <strong>주소</strong> <i>*</i>
                      </label>
                      <a href="!#" onClick={onClickAddressSearch}>
                        <i className="bi bi-search"></i> <span>주소검색</span>
                      </a>
                      <p style={{ color: "#444" }}>
                        배송지에 따라 상품 정보가 달라질 수 있습니다.
                      </p>
                    </div>
                  )}
                  {state.주소1 !== null && (
                    <>
                      <div className="gap address-completed  address-completed1">
                        <label htmlFor="userAddress1">
                          <strong>주소</strong> <i>*</i>
                        </label>
                        <input
                          type="text"
                          name="userAddress1"
                          id="userAddress1"
                          className="input-text"
                          placeholder="검색주소"
                          value={state.주소1}
                          onChange={onChangeUserAddress1}
                        />
                        <button onClick={onClickArressReSerch}>
                          <i className="bi bi-search"></i> 재검색
                        </button>
                      </div>
                      <div className="gap address-completed address-completed2">
                        <input
                          type="text"
                          name="userAddress2"
                          id="userAddress2"
                          className="input-text"
                          placeholder="나머지 주소를 입력해주세요."
                          value={state.주소2}
                          onChange={onChangeUserAddress2}
                        />
                        <p style={{ color: "#444" }}>
                          배송지에 따라 상품 정보가 달라질 수 있습니다.
                        </p>
                      </div>
                    </>
                  )}
                </li>
                <li className="row row8 block1">
                  <div className="gap">
                    <label htmlFor="userMale">
                      <strong>성별</strong>{" "}
                    </label>
                    <div className="gender-box">
                      <label>
                        <input
                          type="radio"
                          name="userGender"
                          id="userMale"
                          onChange={onChangeUserGender}
                          value={"남자"}
                          checked={state.성별.includes("남자")}
                        />{" "}
                        <em>남자</em>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="userGender"
                          id="userFemale"
                          onChange={onChangeUserGender}
                          value={"여자"}
                          checked={state.성별.includes("여자")}
                        />{" "}
                        <em>여자</em>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="userGender"
                          id="userNone"
                          onChange={onChangeUserGender}
                          value={"선택안함"}
                          checked={state.성별.includes("선택안함")}
                        />{" "}
                        <em>선택안함</em>
                      </label>
                    </div>
                  </div>
                </li>
                <li className="row row9 block1">
                  <div className="gap">
                    <label htmlFor="userYear">
                      <strong>생년월일</strong> <i>*</i>
                    </label>
                    <div className="birth-box">
                      <ul>
                        <li>
                          <input
                            type="text"
                            name="userYear"
                            id="userYear"
                            placeholder="YYYY"
                            maxLength={4}
                            data-name="생년"
                            value={state.생년}
                            onChange={onChangeBirth}
                          />
                        </li>
                        <li>
                          <i>/</i>
                        </li>
                        <li>
                          <input
                            type="text"
                            name="userMonth"
                            id="userMonth"
                            placeholder="MM"
                            maxLength={2}
                            data-name="생월"
                            value={state.생월}
                            onChange={onChangeBirth}
                          />
                        </li>
                        <li>
                          <i>/</i>
                        </li>
                        <li>
                          <input
                            type="text"
                            name="userDate"
                            id="userDate"
                            placeholder="DD"
                            maxLength={2}
                            data-name="생일"
                            value={state.생일}
                            onChange={onChangeBirth}
                          />
                        </li>
                      </ul>
                    </div>
                    {state.생년월일오류메시지 !== "" && (
                      <p>{state.생년월일오류메시지}</p>
                    )}
                  </div>
                </li>
                <li className="row row10 line"></li>
                <li className="row row11 block2">
                  <div className="gap">
                    <label htmlFor="chkAll">
                      <strong>
                        이용약관동의<i>*</i>
                      </strong>{" "}
                    </label>
                    <div className="check-box">
                      <ul>
                        <li>
                          <label>
                            <input
                              type="checkbox"
                              name="chkAll"
                              id="chkAll"
                              onChange={onChangeChkAll}
                              checked={
                                state.이용약관동의.length ===
                                state.이용약관.length
                              }
                              value="전체 동의합니다."
                            />
                            <em>전체 동의합니다.</em>
                          </label>
                          <p>
                            선택항목에 동의하지 않은 경우도 회원가입 및 일반적인
                            서비스를 이용할 수 있습니다.
                          </p>
                        </li>
                        {state.이용약관.map((item, idx) => (
                          <li
                            key={item}
                            data-key={item}
                            style={{
                              ...(item.includes("SNS")
                                ? {
                                    float: "left",
                                    width: "auto",
                                    margin: "0 30px 0 40PX",
                                  }
                                : {}),
                              ...(item.includes("이메일")
                                ? { float: "left", width: "auto" }
                                : {}),
                              ...(item.includes("본인")
                                ? { clear: "left" }
                                : {}),
                            }}
                          >
                            <label>
                              <input
                                type="checkbox"
                                name={`chk${idx + 1}`}
                                id={`chk${idx + 1}`}
                                value={item}
                                checked={state.이용약관동의.includes(item)}
                                onChange={onChangeChk}
                              />
                              <em>{item.split("(")[0]}</em>
                            </label>
                            <span>
                              {item.includes("SNS") || item.includes("이메일")
                                ? ""
                                : "("}
                              {item.split("(")[1]}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="button-box">
                <button type="submit">가입하기</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Sub06SignUp;
