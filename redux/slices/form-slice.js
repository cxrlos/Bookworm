import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPasswordVisible: false,
  submitting: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    hidePassword: state => {
      state.isPasswordVisible = false;
    },
    showPassword: state => {
      state.isPasswordVisible = true;
    },
    submitForm: state => {
      state.submitting = true;
    },
    submitFormFailure: state => {
      state.submitting = false;
    },
    submitFormSuccess: state => {
      state.submitting = false;
    },
  },
});

export const {
  hidePassword,
  showPassword,
  submitForm,
  submitFormFailure,
  submitFormSuccess,
} = formSlice.actions;

export const formSelector = state => state.form;

export default formSlice.reducer;
