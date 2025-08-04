import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "장바구니",
  initialState: {
    cart: [],
  },
  reducers: {
    cartAction(state, action) {
      state.cart = action.payload;
      localStorage.setItem("장바구니", JSON.stringify(state.cart));
      console.log(state.cart);
    },
  },
});
export default cart.reducer;
export const { cartAction } = cart.actions;
