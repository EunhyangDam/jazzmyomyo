import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "장바구니",
  initialState: {
    cart: [],
    checkedProduct: [],
    subTotal: 0,
    discountTotal: 0,
    shipping: 0,
    total: 0,
  },
  reducers: {
    cartAction(state, action) {
      let arr = action.payload.map((el) =>
        el.품절 === true ? { ...el, 수량: 0 } : { ...el }
      );
      state.cart = arr;
      localStorage.setItem("장바구니", JSON.stringify(state.cart));
    },
    cartChkAction(state, action) {
      state.checkedProduct = action.payload;

      const cart = state.checkedProduct.map((el) => ({
        ...el,
        판매가: Math.round(el.정가 * (1 - el.할인율)),
        할인가: Math.round(el.정가 * el.할인율 * el.수량),
        총판매가: Math.round(el.정가 * (1 - el.할인율) * el.수량),
      }));

      let 총판매가 = 0;
      let 총할인가 = 0;
      let 배송비 = 0;
      let 토탈 = 0;

      cart.forEach((el) => {
        총판매가 += el.총판매가;
        총할인가 += +el.할인가;
        배송비 = 총판매가 < 50000 ? 2500 : 0;
        토탈 = 배송비 + 총판매가;
      });
      state.subTotal = 총판매가;
      state.discountTotal = 총할인가;
      state.shipping = 배송비;
      state.total = 토탈;
      localStorage.setItem(
        "cart_checked_product",
        JSON.stringify(state.checkedProduct)
      );
    },
  },
});
export default cart.reducer;
export const { cartAction, cartChkAction } = cart.actions;
