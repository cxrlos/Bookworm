import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  readingStatus: null,
  sessionDuration: null,
  time: 0,
};

export const readingSlice = createSlice({
  name: 'reading',
  initialState,
  reducers: {
    clearSessionDuration: state => {
      state.sessionDuration = null;
    },
    incrementTime: state => {
      state.time += 1;
    },
    resetTime: state => {
      state.time = 0;
      state.readingStatus = null;
    },
    setReadingStatus: (state, { payload }) => {
      state.readingStatus = payload;
    },
    setSessionDuration: (state, { payload }) => {
      state.sessionDuration = payload;
    },
  },
});

export const {
  clearSessionDuration,
  incrementTime,
  resetTime,
  setReadingStatus,
  setSessionDuration,
} = readingSlice.actions;

export const readingSelector = state => state.reading;

export default readingSlice.reducer;
