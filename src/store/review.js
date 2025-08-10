import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("리뷰")) || [];
const review = createSlice({
  name: "리뷰",
  initialState: {
    review: saved,
  },
  reducers: {
    reviewAction(state, action) {
      state.review = action.payload;
      localStorage.setItem("리뷰", JSON.stringify(state.review));
    },
  },
});
export default review.reducer;
export const { reviewAction } = review.actions;
