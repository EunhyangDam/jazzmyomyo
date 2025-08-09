import { createSlice } from "@reduxjs/toolkit";

const confirmModal = createSlice({
  name: "컨펌 모달",
  initialState: {
    heading: "",
    explain: "",
    isON: false,
    isConfirm: false,
    // 3개 추가
    message1: "",
    message2: "",
    isYes: false, // 응답이 예스/노
  },
  reducers: {
    confirmModalAction(state, action) {
      state.heading = action.payload.heading;
      state.explain = action.payload.explain;
      state.isON = action.payload.isON;
      state.isConfirm = action.payload.isConfirm;
      //2줄 추가
      state.message1 = action.payload.message1;
      state.message2 = action.payload.message2;
    },
    //액션 추가(export),
    confirmModalYesNoAction(state, action) {
      state.isYes = action.payload;
    },
  },
});
export default confirmModal.reducer;
export const { confirmModalAction, confirmModalYesNoAction } =
  confirmModal.actions;
