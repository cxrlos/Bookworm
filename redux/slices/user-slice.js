import { createSlice } from '@reduxjs/toolkit';

import client from '../../api/client';
import { submitForm, submitFormFailure, submitFormSuccess } from './form-slice';
import { openSnackBar } from './snack-bar-slice';

const initialState = {
  hasErrors: false,
  loading: false,
  user: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: state => {
      state.loading = true;
    },
    getUserFailure: state => {
      state.hasErrors = true;
      state.loading = false;
    },
    getUserSuccess: (state, { payload }) => {
      state.hasErrors = false;
      state.loading = false;
      state.user = payload;
    },
    updateUserSuccess: (state, { payload }) => {
      state.user = { ...state.user, ...payload };
    },
  },
});

export const { getUser, getUserFailure, getUserSuccess, updateUserSuccess } =
  userSlice.actions;

export const userSelector = state => state.user;

export default userSlice.reducer;

export const createUser = (values, { resetForm }) => {
  return async dispatch => {
    dispatch(submitForm());
    try {
      await client.createUser(values);
      dispatch(submitFormSuccess());
      dispatch(openSnackBar('auth/successful-registration'));
      resetForm();
    } catch (error) {
      dispatch(submitFormFailure());
      dispatch(openSnackBar(error.code));
    }
  };
};

export const fetchUser = () => {
  return async dispatch => {
    dispatch(getUser());
    try {
      const user = await client.getUser();
      dispatch(getUserSuccess(user));
    } catch (error) {
      console.warn(error);
      dispatch(getUserFailure());
    }
  };
};

export const signIn = (values, { resetForm }, navigation) => {
  return async dispatch => {
    dispatch(submitForm());
    try {
      await client.signIn(values);
      dispatch(submitFormSuccess());
      navigation.navigate('App');
      resetForm();
    } catch (error) {
      dispatch(submitFormFailure());
      dispatch(openSnackBar(error.code));
    }
  };
};

export const updateUser = values => {
  return async dispatch => {
    dispatch(submitForm());
    try {
      await client.updateUser(values);
      dispatch(updateUserSuccess(values));
      dispatch(submitFormSuccess());
      dispatch(openSnackBar('success'));
    } catch (error) {
      dispatch(submitFormFailure());
      dispatch(openSnackBar('error'));
    }
  };
};
