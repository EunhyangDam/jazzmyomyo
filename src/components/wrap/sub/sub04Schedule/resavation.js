import { createSlice } from "@reduxjs/toolkit";

const resavation = createSlice({
  name: "예약내용",
  initialState: {
    예약정보: [],
  },
  reducers: {
    addReservation(state, action){
        state.예약정보 = [action.payload, ...state.예약정보]
        localStorage.setItem('예약내역', JSON.stringify(state.예약정보));
    }
},
});
export default resavation.reducer;
export const { addReservation } = resavation.actions;
