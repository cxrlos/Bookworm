import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adding: false,
  currentPage: undefined,
  isSnackBarVisible: false,
  removing: false,
  selectedShelf: '',
  shelfId: '',
  snackBarMessage: '',
  updating: false,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addingToLibrary: state => {
      state.adding = true;
    },
    addToLibrarySuccess: state => {
      state.shelfId = '2';
      state.selectedShelf = '2';
      state.isSnackBarVisible = true;
      state.snackBarMessage = 'add';
      state.adding = false;
    },
    addToLibraryFailure: state => {
      state.isSnackBarVisible = true;
      state.snackBarMessage = 'error';
      state.adding = false;
    },
    closeSnackBar: state => {
      state.isSnackBarVisible = false;
    },
    removeFromLibrarySuccess: state => {
      state.shelfId = '-1';
      state.selectedShelf = '-1';
      state.isSnackBarVisible = true;
      state.snackBarMessage = 'remove';
      state.removing = false;
    },
    removeFromLibraryFailure: state => {
      state.isSnackBarVisible = true;
      state.snackBarMessage = 'error';
      state.removing = false;
    },
    removingFromLibrary: state => {
      state.removing = true;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setSelectedShelf: (state, { payload }) => {
      state.selectedShelf = payload;
    },
    setShelfId: (state, { payload }) => {
      state.shelfId = payload;
    },
    updateShelfFailure: state => {
      state.isSnackBarVisible = true;
      state.snackBarMessage = 'error';
      state.updating = false;
    },
    updateShelfSuccess: state => {
      state.updating = false;
    },
    updatingShelf: state => {
      state.updating = true;
    },
  },
});

export const {
  addingToLibrary,
  addToLibrarySuccess,
  addToLibraryFailure,
  closeSnackBar,
  removeFromLibrarySuccess,
  removeFromLibraryFailure,
  removingFromLibrary,
  setCurrentPage,
  setSelectedShelf,
  setShelfId,
  updateShelfFailure,
  updateShelfSuccess,
  updatingShelf,
} = bookSlice.actions;

export const bookSelector = state => state.book;

export default bookSlice.reducer;
