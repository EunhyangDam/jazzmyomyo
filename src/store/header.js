import { createSlice } from "@reduxjs/toolkit";

const header = createSlice({
  name: "헤더",
  initialState: {
    isMain: false,
  },
  reducers: {
    headerAction(state, action) {
      state.isMain = action.payload;
      console.log("페일로드", state.isMain);
    },
  },
});
export default header.reducer;
export const { headerAction } = header.actions;
