import { createSlice } from "@reduxjs/toolkit";

const wishlist = createSlice({
  name: "찜 리스트",
  initialState: {
    위시리스트: [],
    isOn: false,
  },
  reducers: {
    wishAction(state, action) {
      state.위시리스트 = action.payload;
      localStorage("위시리스트", JSON.stringify(state.위시리스트));
    },
  },
});
export default wishlist.reducer;
export const { wishAction } = wishlist.actions;
