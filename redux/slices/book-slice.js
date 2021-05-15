import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adding: false,
  currentPage: 0,
  isSnackBarVisible: false,
  loading: false,
  removing: false,
  selectedShelf: null,
  shelfId: null,
  snackBarMessage: null,
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
    cleanBookStatus: state => {
      state.shelfId = null;
      state.selectedShelf = null;
    },
    closeSnackBar: state => {
      state.isSnackBarVisible = false;
    },
    getBookStatusSuccess: state => {
      state.loading = false;
    },
    gettingBookStatus: state => {
      state.loading = true;
    },
    removeFromLibrarySuccess: state => {
      state.shelfId = null;
      state.selectedShelf = null;
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
  cleanBookStatus,
  closeSnackBar,
  getBookStatusSuccess,
  gettingBookStatus,
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

export const getBookStatus = ({ currentPage, shelfId }) => {
  return dispatch => {
    dispatch(gettingBookStatus());
    dispatch(setShelfId(shelfId || null));
    dispatch(setSelectedShelf(shelfId));
    dispatch(setCurrentPage(currentPage || 0));
    dispatch(getBookStatusSuccess());
  };
};