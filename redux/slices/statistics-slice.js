import { createSlice } from '@reduxjs/toolkit';

import client from '../../api/client';

const initialState = {
  hasErrors: false,
  loading: false,
  readingSessions: [],
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    addingReadingSession: state => {
      state.loading = true;
    },
    addReadingSessionSuccess: (state, { payload }) => {
      const readingSession = state.readingSessions.find(
        session => session.date === payload.date
      );
      if (readingSession) {
        state.readingSessions = state.readingSessions.map(session =>
          session.date === payload.date
            ? {
                ...session,
                pagesRead: payload.pagesRead + readingSession.pagesRead,
              }
            : session
        );
      } else {
        state.readingSessions = [...state.readingSessions, payload];
      }
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
      state.readingSessions = [
        { date: '2020-01-01', pagesRead: 0, timeRead: 0 },
        ...payload,
      ];
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
      console.warn(error);
      dispatch(getReadingSessionsFailure());
    }
  };
};

export const addReadingSession = ({ pagesRead, timeRead }) => {
  return async dispatch => {
    dispatch(addingReadingSession());
    try {
      const date = new Date().toISOString().split('T')[0];
      const readingSession = {
        date,
        pagesRead,
        timeRead,
      };
      await client.addReadingSession(readingSession);
      dispatch(
        addReadingSessionSuccess({
          date,
          pagesRead,
          timeRead,
        })
      );
    } catch (error) {
      console.warn(error);
      dispatch(addReadingSessionFailure());
    }
  };
};
