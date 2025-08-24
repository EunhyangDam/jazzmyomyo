import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "장바구니",
  initialState: {
    cart: [],
    checkedProduct: [],
  },
  reducers: {
    cartAction(state, action) {
      let arr = action.payload.map((el) =>
        el.품절 === true ? { ...el, 수량: 0 } : { ...el }
      );
      state.cart = arr;
      console.log(state.cart);
      localStorage.setItem("장바구니", JSON.stringify(state.cart));
    },
    cartChkAction(state, action) {
      state.checkedProduct = action.payload;
    },
  },
});
export default cart.reducer;
export const { cartAction, cartChkAction } = cart.actions;
