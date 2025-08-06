import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "장바구니",
  initialState: {
    cart: [],
  },
  reducers: {
    cartAction(state, action) {
      let arr = action.payload.map((el) =>
        el.품절 === true ? { ...el, 수량: 0 } : { ...el }
      );
      state.cart = arr;
      localStorage.setItem("장바구니", JSON.stringify(state.cart));
    },
  },
});
export default cart.reducer;
export const { cartAction } = cart.actions;
