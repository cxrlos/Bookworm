import { createSlice } from '@reduxjs/toolkit';

import client from '../../api/client';

const initialState = {
  hasErrors: false,
  loading: false,
  shelf: [],
};

export const shelfSlice = createSlice({
  name: 'shelf',
  initialState,
  reducers: {
    clearShelf: state => {
      state.shelf = [];
    },
    getShelf: state => {
      state.loading = true;
    },
    getShelfSuccess: (state, { payload }) => {
      state.shelf = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getShelfFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getShelf,
  getShelfSuccess,
  getShelfFailure,
} = shelfSlice.actions;

export const shelfSelector = state => state.shelf;

export default shelfSlice.reducer;

export const fetchShelfById = shelfId => {
  return async dispatch => {
    dispatch(getShelf());
    try {
      const shelf = await client.getShelfById(shelfId);
      dispatch(getShelfSuccess(shelf));
    } catch (error) {
      dispatch(getShelfFailure());
    }
  };
};
