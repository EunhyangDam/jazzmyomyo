import { createSlice } from "@reduxjs/toolkit";

const header = createSlice({
  name: "헤더",
  initialState: {
    isMain: false,
  },
  reducers: {
    headerAction(state, action) {
      state.isMain = action.payload;
    },
  },
});
export default header.reducer;
export const { headerAction } = header.actions;
