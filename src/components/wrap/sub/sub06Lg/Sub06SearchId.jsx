import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { confirmModalAction } from "../../../../store/confirmModal";
import './scss/Sub06SearchId.scss'


function Sub06SearchId(props) {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalOn = useSelector((s) => s?.confirmModal?.isON); // 모달 닫힘 감지


  const [sp] = useSearchParams();
  const initialTab = sp.get("tab") === "findPw" ? "findPw" : "findId";
  const [tab, setTab] = React.useState(initialTab); // 'findId' | 'findPw'

  // URL이 SPA 내에서 바뀔 때도 반영(필요 시)
  React.useEffect(() => {
    const t = sp.get("tab") === "findPw" ? "findPw" : "findId";
    setTab(t);
  }, [sp]);

  const [timer, setTimer] = React.useState({ m: 2, s: 59 });

  const [state, setState] = React.useState({
    name: "",
    phone: "",
    codeServer: null,      // 발급된 인증번호(정수 6자리)
    codeInput: "",         // 입력한 인증번호
    codeBtnText: "인증번호",
    phoneError: "",
    codeVerified: false,
    loading: false
  });

  // 입력
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // 숫자만
      const onlyNum = value.replace(/[^0-9]/g, "");
      setState((p) => ({ ...p, phone: onlyNum, phoneError: "" }));
    } else if (name === "codeInput") {
      setState((p) => ({ ...p, codeInput: value.replace(/[^0-9]/g, "") }));
    } else {
      setState((p) => ({ ...p, [name]: value }));
    }
  };

  // 인증번호 발급
  const onClickSendCode = (e) => {
    e.preventDefault();
    const regPhone = /^01[0-9][0-9]{3,4}[0-9]{4}$/; // 하이픈 없이 10~11자리
    if (!regPhone.test(state.phone)) {
      setState((p) => ({ ...p, phoneError: "휴대폰 번호 형식을 확인해 주세요." }));
      dispatch(confirmModalAction({
        heading: "알람!",
        explain: "잘못된 휴대폰 번호 입니다. 확인 후 다시 시도해 주세요.",
        isON: true, isConfirm: false
      }));
      return;
    }
    const authenNum = Math.floor(Math.random() * 900000 + 100000); // 6자리
    dispatch(confirmModalAction({
      heading: String(authenNum),
      explain: "인증번호가 발급되었습니다.",
      isON: true, isConfirm: false
    }));
    setState((p) => ({ ...p, codeServer: authenNum, codeBtnText: "다른번호입력", codeVerified: false }));
  };

  // 다른번호입력
  const onClickResetPhone = (e) => {
    e.preventDefault();
    setState((p) => ({
      ...p,
      phone: "",
      codeServer: null,
      codeInput: "",
      codeBtnText: "인증번호",
      phoneError: "",
      codeVerified: false
    }));
  };

  // 타이머 (코드 발급되면 3분 카운트)
  React.useEffect(() => {
    if (state.codeServer === null) return;
    const end = new Date();
    end.setMinutes(end.getMinutes() + 3);
    const id = setInterval(() => {
      const diff = end - new Date();
      if (diff <= 0) {
        clearInterval(id);
        setState((p) => ({ ...p, codeServer: null, codeInput: "" }));
        dispatch(confirmModalAction({
          heading: "알람!",
          explain: "유효 시간이 만료되었습니다.\n다시 시도해 주세요.",
          isON: true, isConfirm: false
        }));
      } 
      else {
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimer({ m, s });
      }
    }, 1000);
    return () => clearInterval(id);
  }, [state.codeServer, dispatch]);

  // 인증번호 확인
  const onClickVerifyCode = (e) => {
    e.preventDefault();
    if (!state.codeServer) return;
    if (String(state.codeServer) === state.codeInput) {
      dispatch(confirmModalAction({
        heading: "확인!",
        explain: "인증번호가 확인 되었습니다.",
        isON: true, isConfirm: false
      }));
      setState((p) => ({ ...p, codeServer: null, codeVerified: true }));
    } else {
      dispatch(confirmModalAction({
        heading: "알람!",
        explain: "인증번호가 다릅니다. 확인 후 다시 시도 해 주세요.",
        isON: true, isConfirm: false
      }));
    }
  };

  // 아이디 찾기
  const onClickFindId = async (e) => {
    e.preventDefault();
    if (!state.name.trim()) {
      return dispatch(confirmModalAction({ heading: "알람!", explain: "이름을 입력해 주세요.", isON: true, isConfirm: false }));
    }
    if (!state.codeVerified) {
      return dispatch(confirmModalAction({ heading: "알람!", explain: "휴대폰 인증을 완료해 주세요.", isON: true, isConfirm: false }));
    }

    try {
      setState((p) => ({ ...p, loading: true }));
      const form = new FormData();
      form.append("mode", "findId");
      form.append("userName", state.name.trim());
      form.append("userHpDigits", state.phone); // 하이픈 없이

      const res = await axios.post("/jazzmyomyo/account_find.php", form);

      if (res?.data?.ok) {
        navigate(`/searchRs?name=${encodeURIComponent(state.name.trim())}&hp=${state.phone}`);
      } 
      
      else {
        dispatch(confirmModalAction({
          heading: "알람!",
          explain: res?.data?.msg || "조회 결과가 없습니다.",
          isON: true, isConfirm: false
        }));
      }
    } 
    
    catch (err) {
      dispatch(confirmModalAction({
        heading: "오류",
        explain: "서버 통신 중 문제가 발생했습니다.",
        isON: true, isConfirm: false
      }));
    } finally {
      setState((p) => ({ ...p, loading: false }));
    }
  };


  // 비번찾기 재설정
  const [pw, setPw] = React.useState({
    userId: "",
    phone: "",
    codeServer: null,
    codeInput: "",
    codeBtnText: "인증번호",
    codeVerified: false,
    loading: false,
    // 재설정 폼
    newPw: "",
    newPw2: "",
    show1: false,
    show2: false,
    findOk: false, 
  });
    const [pwTimer, setPwTimer] = React.useState({ m: 2, s: 59 });
  const [afterResetGoLogin, setAfterResetGoLogin] = React.useState(false);

  // 모달 닫히는 순간 감지 => 로그인 이동
  React.useEffect(() => {
    if (afterResetGoLogin && modalOn === false) {
      setAfterResetGoLogin(false);
      navigate("/lg"); 
    }
  }, [modalOn, afterResetGoLogin, navigate]);

  const onChangePw = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyNum = value.replace(/[^0-9]/g, "");
      setPw((p) => ({ ...p, phone: onlyNum }));
    } else {
      setPw((p) => ({ ...p, [name]: value }));
    }
  };

  const onClickPwSendCode = (e) => {
    e.preventDefault();
    const regPhone = /^01[0-9][0-9]{3,4}[0-9]{4}$/;
    if (!regPhone.test(pw.phone)) {
      return dispatch(
        confirmModalAction({
          heading: "알람!",
          explain: "휴대폰 번호 형식을 확인해 주세요.",
          isON: true,
          isConfirm: false,
        })
      );
    }
    const authenNum = Math.floor(Math.random() * 900000 + 100000);
    dispatch(
      confirmModalAction({
        heading: String(authenNum),
        explain: "인증번호가 발급되었습니다.",
        isON: true,
        isConfirm: false,
      })
    );
    setPw((p) => ({ ...p, codeServer: authenNum, codeBtnText: "다른번호입력", codeVerified: false }));
  };

  const onClickPwResetPhone = (e) => {
    e.preventDefault();
    setPw((p) => ({
      ...p,
      phone: "",
      codeServer: null,
      codeInput: "",
      codeBtnText: "인증번호",
      codeVerified: false,
    }));
  };

  React.useEffect(() => {
    if (pw.codeServer === null) return;
    const end = new Date();
    end.setMinutes(end.getMinutes() + 3);
    const id = setInterval(() => {
      const diff = end - new Date();
      if (diff <= 0) {
        clearInterval(id);
        setPw((p) => ({ ...p, codeServer: null, codeInput: "" }));
        dispatch(
          confirmModalAction({
            heading: "알람!",
            explain: "유효 시간이 만료되었습니다.\n다시 시도해 주세요.",
            isON: true,
            isConfirm: false,
          })
        );
      } else {
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setPwTimer({ m, s });
      }
    }, 1000);
    return () => clearInterval(id);
  }, [pw.codeServer, dispatch]);

  const onClickPwVerifyCode = (e) => {
    e.preventDefault();
    if (!pw.codeServer) return;
    if (String(pw.codeServer) === pw.codeInput) {
      dispatch(
        confirmModalAction({
          heading: "확인!",
          explain: "인증번호가 확인 되었습니다.",
          isON: true,
          isConfirm: false,
        })
      );
      setPw((p) => ({ ...p, codeServer: null, codeVerified: true }));
    } else {
      dispatch(
        confirmModalAction({
          heading: "알람!",
          explain: "인증번호가 다릅니다. 확인 후 다시 시도 해 주세요.",
          isON: true,
          isConfirm: false,
        })
      );
    }
  };

  // 1. 본인확인
  const onClickNextReset = async (e) => {
    e.preventDefault();
    if (!pw.userId.trim()) {
      return dispatch(
        confirmModalAction({ heading: "알람!", explain: "아이디를 입력해 주세요.", isON: true, isConfirm: false })
      );
    }
    if (!pw.codeVerified) {
      return dispatch(
        confirmModalAction({ heading: "알람!", explain: "휴대폰 인증을 완료해 주세요.", isON: true, isConfirm: false })
      );
    }
    try {
      setPw((p) => ({ ...p, loading: true }));
      const fd = new FormData();
      fd.append("mode", "findPw"); // 본인확인
      fd.append("userId", pw.userId.trim());
      fd.append("userHpDigits", pw.phone);
      const res = await axios.post("/jazzmyomyo/account_find.php", fd);
      if (res?.data?.ok) {
        setPw((p) => ({ ...p, findOk: true }));
      } else {
        dispatch(
          confirmModalAction({
            heading: "알람!",
            explain: res?.data?.msg || "일치하는 회원 정보가 없습니다.",
            isON: true,
            isConfirm: false,
          })
        );
      }
    } catch (err) {
      dispatch(
        confirmModalAction({
          heading: "오류",
          explain: "서버 통신 중 문제가 발생했습니다.",
          isON: true,
          isConfirm: false,
        })
      );
    } finally {
      setPw((p) => ({ ...p, loading: false }));
    }
  };

  // 2. 재설정
  const isPwValid = (v) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,20}$/.test(v);
  const canSubmitReset = isPwValid(pw.newPw) && pw.newPw === pw.newPw2;

  const onClickDoResetPw = async (e) => {
    e.preventDefault();
    if (!canSubmitReset) {
      return dispatch(
        confirmModalAction({
          heading: "알람!",
          explain: "비밀번호 조건을 확인하거나 두 비밀번호가 일치하는지 확인해 주세요.",
          isON: true,
          isConfirm: false,
        })
      );
    }
    try {
      setPw((p) => ({ ...p, loading: true }));
      const fd = new FormData();
      fd.append("mode", "resetPw");
      fd.append("userId", pw.userId.trim());
      fd.append("newPw", pw.newPw);
      const res = await axios.post("/jazzmyomyo/account_find.php", fd);
      if (res?.data?.ok) {
        // 완료 모달 => 닫힐 때 로그인 화면으로 이동
        setAfterResetGoLogin(true);
        dispatch(
          confirmModalAction({
            heading: "재설정 완료!",
            explain: "로그인 화면으로 돌아갑니다",
            isON: true,
            isConfirm: false,
          })
        );
      } else {
        dispatch(
          confirmModalAction({
            heading: "알람!",
            explain: res?.data?.msg || "업데이트에 실패했습니다.",
            isON: true,
            isConfirm: false,
          })
        );
      }
    } catch (err) {
      dispatch(
        confirmModalAction({
          heading: "오류",
          explain: "서버 통신 중 문제가 발생했습니다.",
          isON: true,
          isConfirm: false,
        })
      );
    } finally {
      setPw((p) => ({ ...p, loading: false }));
    }
  };









  return (
    <div id="sub06SearchId">
      
      <section className="container">
        <div className="tabs">
          <button className={tab === "findId" ? "on" : ""} onClick={() => setTab("findId")}>
            아이디 찾기
          </button>
          <button className={tab === "findPw" ? "on" : ""} onClick={() => setTab("findPw")}>
            비밀번호 찾기
          </button>
        </div>

        {tab === "findId" && (
          <form className="form">
            <h2>아이디 찾기</h2>
            <label>
              <span>
                이름
              </span>
              <div className="row">
                <input 
                  name="name" 
                  type="text" 
                  placeholder="이름을 입력해 주세요" 
                  value={state.name} 
                  onChange={onChange}
                />
                {state.name && (
                  <button
                    type="button"
                    className="clear"
                    onClick={() => setState((p) => ({ ...p, name: "" }))}
                  >
                    ×
                  </button>
                )}
              </div>
            </label>
            <label className="hp">
              <span>
                휴대폰 번호
              </span>
              <div className="row">
                <input 
                  name="phone" 
                  type="text" 
                  placeholder="하이픈 없이 입력" 
                  value={state.phone} 
                  onChange={onChange}
                />
                {state.codeBtnText === "인증번호" ? (
                  <button onClick={onClickSendCode} disabled={!state.phone}>인증번호</button>
                ) : (
                  <button onClick={onClickResetPhone}>다른번호입력</button>
                )}
              </div>
              {state.phoneError && <p className="err">{state.phoneError}</p>}
            </label>

            {state.codeServer !== null && (
              <div className="code">
                 <div className="input-with-timer">
                    <input
                      name="codeInput"
                      type="text"
                      placeholder="인증번호 6자리 숫자 입력"
                      value={state.codeInput}
                      maxLength={6}
                      onChange={onChange}
                    />
                    <div className="timer">
                      <span>{String(timer.m).padStart(2,"0")}</span> : <span>{String(timer.s).padStart(2,"0")}</span>
                    </div>
                  </div>
                  <button onClick={onClickVerifyCode}>인증확인</button>
              </div>
            )}
            <button className="primary" onClick={onClickFindId} disabled={state.loading}>아이디 찾기</button>
          </form>
        )}
        {/* 비밀번호 찾기 */}
        {tab === "findPw" && (
          <>
            {!pw.findOk && (
              <form className="form">
                <h2>비밀번호 찾기</h2>

                <label>
                  <span>
                    아이디
                  </span>
                  <div className="row">
                    <input
                      name="userId"
                      type="text"
                      placeholder="아이디를 입력해 주세요"
                      value={pw.userId}
                      onChange={onChangePw}
                    />
                    {pw.userId && (
                      <button type="button" className="clear" onClick={() => setPw((p) => ({ ...p, userId: "" }))}>
                        ×
                      </button>
                    )}
                  </div>
                </label>

                <label className="hp">
                  <span>
                    휴대폰 번호
                  </span>
                  <div className="row">
                    <input
                      name="phone"
                      type="text"
                      placeholder="하이픈 없이 입력"
                      value={pw.phone}
                      onChange={onChangePw}
                    />
                    {pw.codeBtnText === "인증번호" ? (
                      <button onClick={onClickPwSendCode} disabled={!pw.phone}>
                        인증번호
                      </button>
                    ) : (
                      <button onClick={onClickPwResetPhone}>다른번호입력</button>
                    )}
                  </div>

                  {pw.codeServer !== null && (
                    <div className="code">
                      <div className="input-with-timer">
                        <input
                          name="codeInput"
                          type="text"
                          placeholder="인증번호 6자리 숫자 입력"
                          value={pw.codeInput}
                          maxLength={6}
                          onChange={onChangePw}
                        />
                        <div className="timer">
                          <span>{String(pwTimer.m).padStart(2,"0")}</span> : <span>{String(pwTimer.s).padStart(2,"0")}</span>
                        </div>
                      </div>
                      <button onClick={onClickPwVerifyCode}>인증확인</button>
                    </div>
                  )}
                </label>

                <button className="primary" onClick={onClickNextReset} disabled={pw.loading}>
                  비밀번호 찾기
                </button>
              </form>
            )}

            {pw.findOk && (
              <form className="form reset-form">
                <h2>비밀번호 재설정</h2>
                <label>
                  새로운 비밀번호
                  <div className="row">
                    <input
                      name="newPw"
                      type={pw.show1 ? "text" : "password"}
                      placeholder="새로운 비밀번호를 입력해 주세요"
                      value={pw.newPw}
                      onChange={onChangePw}
                      maxLength={20}
                    />
                    <button className="eyes" type="button" onClick={() => setPw((p) => ({ ...p, show1: !p.show1 }))}>
                    {pw.show1 ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash"></i>}
                    </button>
                    {pw.newPw && (
                      <button type="button" className="clear" onClick={() => setPw((p) => ({ ...p, newPw: "" }))}>
                        ×
                      </button>
                    )}
                  </div>
                </label>
                <label>
                  비밀번호 재입력
                  <div className="row">
                    <input
                      name="newPw2"
                      type={pw.show2 ? "text" : "password"}
                      placeholder="비밀번호를 다시 입력해 주세요"
                      value={pw.newPw2}
                      onChange={onChangePw}
                      maxLength={20}
                    />
                    <button className="eyes" type="button" onClick={() => setPw((p) => ({ ...p, show2: !p.show2 }))}>
                      {pw.show2 ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash"></i>}
                    </button>
                    {pw.newPw2 && (
                      <button className="clear" type="button" onClick={() => setPw((p) => ({ ...p, newPw2: "" }))}>
                        × 
                      </button>
                    )}
                  </div>
                </label>
                <p className={`hint ${canSubmitReset ? "ok" : "warn"}`}>
                  8~20자, 영문/숫자 1개 이상 포함 · 두 비밀번호가 일치해야 합니다.
                </p>
                <div className="row gap">
                  <button className="primary" onClick={onClickDoResetPw} disabled={!canSubmitReset || pw.loading}>
                    비밀번호 재설정
                  </button>
                </div>
              </form>
            )}
          </>
        )}



      </section>
      



    </div>
  );
}

export default Sub06SearchId;
