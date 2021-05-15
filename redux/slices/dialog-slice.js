import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDialogVisible: false,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    closeDialog: state => {
      state.isDialogVisible = false;
    },
    openDialog: state => {
      state.isDialogVisible = true;
    },
  },
});

export const { closeDialog, openDialog } = dialogSlice.actions;

export const dialogSelector = state => state.dialog;

export default dialogSlice.reducer;
