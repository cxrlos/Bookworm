import { createSlice } from '@reduxjs/toolkit';

import client from '../../api/client';

const initialState = {
  hasErrors: false,
  readingSessions: [{ date: '2020-01-01', count: 0 }],
  loading: false,
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    addingReadingSession: state => {
      state.loading = true;
    },
    addReadingSessionSuccess: (state, { payload }) => {
      state.readingSessions = [...state.readingSessions, payload];
      state.loading = false;
      state.hasErrors = false;
    },
    addReadingSessionFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    getReadingSessions: state => {
      state.loading = true;
    },
    getReadingSessionsFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    getReadingSessionsSuccess: (state, { payload }) => {
      state.readingSessions = [...state.readingSessions, payload];
      state.loading = false;
      state.hasErrors = false;
    },
  },
});

export const {
  addingReadingSession,
  addReadingSessionSuccess,
  addReadingSessionFailure,
  getReadingSessions,
  getReadingSessionsFailure,
  getReadingSessionsSuccess,
} = statisticsSlice.actions;

export const statisticsSelector = state => state.statistics;

export default statisticsSlice.reducer;

export const fetchReadingSessions = () => {
  return async dispatch => {
    dispatch(getReadingSessions());
    try {
      const readingSessions = await client.getReadingSessions();
      dispatch(getReadingSessionsSuccess(readingSessions));
    } catch (error) {
      dispatch(getReadingSessionsFailure());
    }
  };
};

export const addReadingSession = ({ pagesRead, sessionDuration }) => {
  return async dispatch => {
    dispatch(addingReadingSession());
    try {
      const readingSession = {
        pagesRead,
        sessionDuration,
        day: new Date().toISOString().split('T')[0],
      };
      await client.addReadingSession(readingSession);
      dispatch(addReadingSessionSuccess({ pagesRead, sessionDuration }));
    } catch (error) {
      console.warn(error);
      dispatch(addReadingSessionFailure());
    }
  };
};
