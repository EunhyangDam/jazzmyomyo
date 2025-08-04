import { createSlice } from "@reduxjs/toolkit";

const confirmModal = createSlice({
  name: "컨펌 모달",
  initialState: {
    heading: "",
    explain: "",
    isON: false,
    isConfirm: false,
  },
  reducers: {
    confirmModalAction(state, action) {
      state.heading = action.payload.heading;
      state.explain = action.payload.explain;
      state.isON = action.payload.isON;
      state.isConfirm = action.payload.isConfirm;
    },
  },
});
export default confirmModal.reducer;
export const { confirmModalAction } = confirmModal.actions;
