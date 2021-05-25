import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSnackBarVisible: false,
  snackBarMessage: null,
};

export const snackBarSlice = createSlice({
  name: 'snackBar',
  initialState,
  reducers: {
    closeSnackBar: state => {
      state.isSnackBarVisible = false;
    },
    openSnackBar: (state, { payload }) => {
      state.isSnackBarVisible = true;
      state.snackBarMessage = payload;
    },
  },
});

export const { closeSnackBar, openSnackBar } = snackBarSlice.actions;

export const snackBarSelector = state => state.snackBar;

export default snackBarSlice.reducer;
