// store/inquiry.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

/* 로컬스토리지 유틸  */
const LS_KEY = "jazzmyomyo_inquiry_list";

function loadFromLS() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveToLS(list) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {}
}

/*  초기 상태  */
const initialState = {
  list: loadFromLS(),  
  last: null,          // 최근 전송건
  error: null,         // 최근 에러 메시지(있으면)
};

/*  슬라이스  */
const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {
    addInquiry: {
      reducer(state, action) {
        const it = action.payload;
        state.list.push(it);
        state.last = it;
        state.error = null;
        saveToLS(state.list);
      },
      prepare({ idx, subject, email, content, createdAt }) {
        return {
          payload: {
            idx: Number(idx ?? 0) || undefined,
            subject,
            email,
            content,
            createdAt: createdAt || new Date().toISOString(),
            cid: nanoid(),
          },
        };
      },
    },

    // 최근 에러 저장
    setError(state, action) {
      state.error = action.payload || "unknown error";
    },

    // 최근 성공 / 에러 초기화
    clearStatus(state) {
      state.last = null;
      state.error = null;
    },

    // idx(서버 PK)나 cid(클라 id)로 삭제
    removeInquiry(state, action) {
      const key = action.payload;
      state.list = state.list.filter(
        (x) => x.idx !== key && x.cid !== key
      );
      saveToLS(state.list);
    },

    // 전체 초기화
    reset(state) {
      state.list = [];
      state.last = null;
      state.error = null;
      saveToLS(state.list);
    },
  },
});

export const inquiryAction = inquirySlice.actions;

/*  셀렉터  */
export const selectInquiryList = (state) => state.inquiry.list;
export const selectInquiryLast = (state) => state.inquiry.last;
export const selectInquiryError = (state) => state.inquiry.error;

export default inquirySlice.reducer;
