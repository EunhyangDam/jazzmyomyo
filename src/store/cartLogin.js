import { createSlice } from "@reduxjs/toolkit";

const cartLogin = createSlice({
  name: "장바구니(로그인)",
  initialState: {
    cart: [],
  },
  reducers: {
    cartLoginAction(state, action) {
      let arr = action.payload.map((el) =>
        el.품절 === true ? { ...el, 수량: 0 } : { ...el }
      );
      state.cart = arr;
    },
  },
});
export default cartLogin.reducer;
export const { cartLoginAction } = cartLogin.actions;
