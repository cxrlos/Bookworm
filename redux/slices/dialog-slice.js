import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogContent: null,
  isDialogVisible: false,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    closeDialog: state => {
      state.isDialogVisible = false;
      state.dialogContent = null;
    },
    openDialog: (state, { payload }) => {
      state.isDialogVisible = true;
      state.dialogContent = payload;
    },
  },
});

export const { closeDialog, openDialog } = dialogSlice.actions;

export const dialogSelector = state => state.dialog;

export default dialogSlice.reducer;
