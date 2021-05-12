import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  readingStatus: '',
  time: 0,
  updatingProgress: false,
};

export const readingSlice = createSlice({
  name: 'reading',
  initialState,
  reducers: {
    incrementTime: state => {
      state.time += 1;
    },
    resetTime: state => {
      state.time = 0;
      state.readingStatus = '';
    },
    setReadingStatus: (state, { payload }) => {
      state.readingStatus = payload;
    },
    setUpdatingProgress: (state, { payload }) => {
      state.updatingProgress = payload;
    },
  },
});

export const {
  incrementTime,
  resetTime,
  setReadingStatus,
  setUpdatingProgress,
} = readingSlice.actions;

export const readingSelector = state => state.reading;

export default readingSlice.reducer;
