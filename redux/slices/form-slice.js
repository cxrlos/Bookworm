import { createSlice } from '@reduxjs/toolkit';

import client from '../../api/client';

const initialState = {
  editing: false,
  isSnackBarVisible: false,
  loading: false,
  pagesRead: 0,
  saving: false,
  snackBarMessage: null,
  userInfo: {},
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    closeSnackBar: state => {
      state.isSnackBarVisible = false;
    },
    enterEditMode: state => {
      state.editing = true;
    },
    exitEditMode: state => {
      state.editing = false;
    },
    getUserInfo: state => {
      state.loading = true;
    },
    getUserInfoSuccess: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getUserInfoFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    saveForm: state => {
      state.saving = true;
    },
    saveFormSuccess: (state, { payload }) => {
      state.userInfo = { ...state.userInfo, ...payload };
      state.saving = false;
      state.editing = false;
      state.snackBarMessage = 'success';
      state.isSnackBarVisible = true;
    },
    saveFormFailure: state => {
      state.saving = false;
      state.snackBarMessage = 'error';
      state.isSnackBarVisible = true;
    },
  },
});

export const {
  closeSnackBar,
  enterEditMode,
  exitEditMode,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFailure,
  saveForm,
  saveFormSuccess,
  saveFormFailure,
} = formSlice.actions;

export const formSelector = state => state.form;

export default formSlice.reducer;

export const updateUserInfo = form => {
  return async dispatch => {
    dispatch(saveForm());
    try {
      await client.updateUserInfo(form);
      dispatch(saveFormSuccess(form));
    } catch (error) {
      console.warn(error);
      dispatch(saveFormFailure());
    }
  };
};

export const fetchUserInfo = () => {
  return async dispatch => {
    dispatch(getUserInfo());
    try {
      const userInfo = await client.getUserInfo();
      dispatch(getUserInfoSuccess(userInfo));
    } catch (error) {
      console.warn(error);
      dispatch(getUserInfoFailure());
    }
  };
};
