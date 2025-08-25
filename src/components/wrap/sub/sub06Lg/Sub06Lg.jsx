import React from "react";
import "./scss/Sub06Lg.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInAction } from "../../../../store/signIn";
import { Link, useNavigate } from "react-router-dom";
import { confirmModalAction } from "../../../../store/confirmModal";

function Sub06Lg(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    아이디: "",
    비밀번호: "",
    자동로그인: false,
  });

  const onChangeRememberMe = (e) => {
    setState({
      ...state,
      자동로그인: e.target.checked ? true : false,
    });
  };

  const onChangeUserId = (e) => {
    setState({
      ...state,
      아이디: e.target.value,
    });
  };

  const onChangeUserPw = (e) => {
    setState({
      ...state,
      비밀번호: e.target.value,
    });
  };

  const onSubmitLoginForm = (e) => {
    e.preventDefault();

    // 유효성검사 아이디, 비밀번호 공백이 아니면 전송 불가
    if (state.아이디 === "") {
      const obj = {
        heading: "알람!",
        explain: "아이디를 입력하세요.",
        isON: true,
        isConfirm: false,
      };
      dispatch(confirmModalAction(obj));
      return;
    }

    if (state.비밀번호 === "") {
      const obj = {
        heading: "알람!",
        explain: "비밀번호를 입력 하세요.",
        isON: true,
        isConfirm: false,
      };
      dispatch(confirmModalAction(obj));
      return;
    }

    const formData = new FormData();
    formData.append("userId", state.아이디);
    formData.append("userPw", state.비밀번호);

    axios({
      url: "/jazzmyomyo/sign_in.php",
      method: "POST",
      data: formData, withCredentials: true, // 세션 쿠키 저장 (PHPSESSID)
    })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          if (res.data === 0) {
            const obj = {
              heading: "로그인 실패",
              explain: "아이디를 확인해 주세요.",
              isON: true,
              isConfirm: false,
            };
            dispatch(confirmModalAction(obj));
            navigate("/SignUp");
          } else if (res.data === -1) {
            const obj = {
              heading: "로그인 실패",
              explain: "비밀번호를 확인해 주세요.",
              isON: true,
              isConfirm: false,
            };
            dispatch(confirmModalAction(obj));
          } else {
            const obj = {
              heading: "로그인 성공",
              explain: " ",
              isON: true,
              isConfirm: false,
            };
            dispatch(confirmModalAction(obj));

             // [여기 추가!!] ---------------------------------
            // 관리자 아이디면 role=admin, 아니면 user
            localStorage.setItem("role", res.data.아이디 === "jazzmyomyo" ? "admin" : "user");
            // -----------------------------------------------

            // 로그인 정보 리덕스 signIn.js
            // 자동로그인 정보 res.data {}
            dispatch(
              signInAction({ ...res.data, 자동로그인: state.자동로그인 })
            );

            // 메인페이지로 이동
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div id="sub06Lg">
      <section id="login" className="section login">
        <div className="container">
          <div className="content">
            {/* <!-- Left: 로그인 폼 --> */}
            <div className="login-left">
              <h1 className="page-title">Login</h1>

              <form className="login-form" onSubmit={onSubmitLoginForm}>
                <div className="login-box">
                  <label for="uid" className="sr-only">
                    아이디
                  </label>
                  <input
                    type="text"
                    name="userId"
                    id="userId"
                    value={state.아이디}
                    onChange={onChangeUserId}
                  />
                </div>

                <div className="login-box">
                  <label for="upw" className="sr-only">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    name="userPw"
                    id="userPw"
                    value={state.비밀번호}
                    onChange={onChangeUserPw}
                  />
                </div>

                <div className="form-utils">
                  <label className="check">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                      value={state.자동로그인}
                      onChange={onChangeRememberMe}
                    />
                    <span className="box" aria-hidden="true"></span>
                    로그인상태유지
                  </label>

                  <div className="find">
                    <a href="/find-id">아이디</a>
                    <span className="bar">|</span>
                    <a href="/find-password">비밀번호 찾기</a>
                  </div>
                </div>

                <button type="submit" className="btn-login">
                  <span>로그인</span>
                </button>
              </form>
            </div>

            {/* <!-- Right: 회원가입 CTA 일러스트 --> */}
            <div className="login-right">
              <Link to="/signUp" className="signup-cat">
                <div className="gap">
                  <img
                    src="img/login_cat.png"
                    alt="레코드 위 고양이 일러스트"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sub06Lg;
