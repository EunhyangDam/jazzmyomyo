import { createSlice } from "@reduxjs/toolkit";

const signIn = createSlice({
  name: "로그인",
  initialState: {
    아이디: "",
    이름: "",
    자동로그인: false,
  },
  reducers: {
    signInAction(state, action) {
      // 로그인

      state.아이디 = action.payload.아이디;
      state.이름 = action.payload.이름;
      state.자동로그인 = action.payload.자동로그인;

      // 자동로그인 true 이면 아니면 세션에 저장
      if (action.payload.자동로그인) {
        localStorage.setItem(
          "jazzmyomyo_sign_in",
          JSON.stringify(action.payload)
        );
      } else {
        sessionStorage.setItem(
          "jazzmyomyo_sign_in",
          JSON.stringify(action.payload)
        );
      }
    },
    logOutAction(state, action) {
      // 로그아웃 저장소 모두 삭제
      // 로컬스토레이지 삭제
      // 세션스토레이지 삭제
      localStorage.removeItem("jazzmyomyo_sign_in");
      sessionStorage.removeItem("jazzmyomyo_sign_in");
      state.아이디 = "";
      state.이름 = "";
      state.자동로그인 = false;
    },
  },
});

export default signIn.reducer;
export const { signInAction, logOutAction } = signIn.actions;
