import { createSlice } from '@reduxjs/toolkit';

import client from '../../api/client';

const initialState = {
  hasErrors: false,
  library: {},
  loading: false,
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    getLibrary: state => {
      state.loading = true;
    },
    getLibrarySuccess: (state, { payload }) => {
      state.library = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getLibraryFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getLibrary,
  getLibrarySuccess,
  getLibraryFailure,
} = librarySlice.actions;

export const librarySelector = state => state.library;

export default librarySlice.reducer;

export const fetchLibrary = () => {
  return async dispatch => {
    dispatch(getLibrary());
    try {
      const library = await client.getLibrary();
      dispatch(getLibrarySuccess(library));
    } catch (error) {
      dispatch(getLibraryFailure());
    }
  };
};
