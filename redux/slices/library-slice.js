import { createSlice } from '@reduxjs/toolkit';

import client from '../../api/client';
import {
  addingToLibrary,
  addToLibrarySuccess,
  addToLibraryFailure,
  removingFromLibrary,
  removeFromLibrarySuccess,
  removeFromLibraryFailure,
  setCurrentPage,
  setShelfId,
  updateShelfSuccess,
  updateShelfFailure,
  updatingShelf,
} from './book-slice';

import { closeDialog } from './dialog-slice';
import { addReadingSession } from './statistics-slice';

const initialState = {
  hasErrors: false,
  library: [],
  loading: false,
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addToShelf: (state, { payload }) => {
      state.library = [...state.library, payload];
    },
    clearShelf: state => {
      state.shelfId = null;
    },
    getLibrary: state => {
      state.loading = true;
    },
    getLibraryFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    getLibrarySuccess: (state, { payload }) => {
      state.library = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getShelf: state => {
      state.loading = true;
    },
    getShelfFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    getShelfSuccess: (state, { payload }) => {
      state.shelfId = payload;
    },
    removeFromShelf: (state, { payload }) => {
      state.library = [
        ...state.library.filter(book => book.bookId !== payload),
      ];
    },
    updateCurrentPage: (state, { payload: { bookId, currentPage } }) => {
      state.library = state.library.map(book =>
        book.bookId === bookId ? { ...book, currentPage } : book
      );
    },
    changeShelf: (state, { payload: { bookId, selectedShelf: shelfId } }) => {
      state.library = state.library.map(book =>
        book.bookId === bookId ? { ...book, currentPage: 0, shelfId } : book
      );
    },
  },
});

export const {
  addToShelf,
  changeShelf,
  getLibrary,
  getLibrarySuccess,
  getLibraryFailure,
  getShelf,
  getShelfSuccess,
  getShelfFailure,
  removeFromShelf,
  updateCurrentPage,
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
      console.warn(error);
    }
  };
};

export const addToLibrary = book => {
  return async dispatch => {
    dispatch(addingToLibrary());
    try {
      await client.addToLibrary({ ...book, shelfId: '2' });
      dispatch(addToShelf({ ...book, shelfId: '2' }));
      dispatch(addToLibrarySuccess());
    } catch (error) {
      dispatch(addToLibraryFailure());
      console.warn(error);
    }
  };
};

export const removeFromLibrary = bookId => {
  return async dispatch => {
    dispatch(removingFromLibrary());
    try {
      await client.removeFromLibrary(bookId);
      dispatch(removeFromShelf(bookId));
      dispatch(removeFromLibrarySuccess());
    } catch (error) {
      dispatch(removeFromLibraryFailure());
    }
  };
  l;
};

export const updateShelf = (bookId, shelfId) => {
  return async dispatch => {
    dispatch(updatingShelf());
    try {
      await client.updateShelf(bookId, shelfId);
      dispatch(changeShelf({ bookId, selectedShelf: shelfId }));
      dispatch(setShelfId(shelfId));
      dispatch(closeDialog());
      dispatch(updateShelfSuccess());
    } catch (error) {
      dispatch(updateShelfFailure());
      console.warn(error);
    }
  };
};

export const updateReadingProgress = (
  bookId,
  currentPage,
  oldCurrentPage,
  timeRead
) => {
  return async dispatch => {
    try {
      const pagesRead = currentPage - oldCurrentPage;
      await client.updateReadingProgress({ bookId, currentPage });
      dispatch(addReadingSession({ pagesRead, timeRead }));
      dispatch(updateCurrentPage({ bookId, currentPage }));
      dispatch(setCurrentPage(currentPage));
    } catch (error) {
      console.warn(error);
    }
  };
};
