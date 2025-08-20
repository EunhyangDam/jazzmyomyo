import { createSlice } from "@reduxjs/toolkit";

const daumPostcode = createSlice({
    name:'주소',
    initialState: {
       우편번호: '',
       검색주소: '',
       상세주소: '',
       isOpen: false
    },
    reducers: { // 리듀서의 액션메서드들
        daumPostcodeAction(state, action){

            // 로컬스토레이지 저장
            localStorage.setItem('daumPostcode', JSON.stringify(action.payload));

            state.우편번호 = action.payload.우편번호
            state.검색주소 = action.payload.검색주소
            state.상세주소 = action.payload.상세주소            
        },
        daumPostcodeOpenAction(state, action){
            state.isOpen = action.payload
        }  
    }
})

export default daumPostcode.reducer;   // 리듀서 내보내기 => index.js 사용한다.
export const {daumPostcodeAction, daumPostcodeOpenAction} = daumPostcode.actions;  // 액션들 내보내기 => 자식컴폰넌트에서 사용한다.