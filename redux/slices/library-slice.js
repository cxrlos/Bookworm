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
    addToShelf: (state, { payload: { book } }) => {
      state.library = [...state.library, book];
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
      console.warn(payload)
      state.library = [
        ...state.library.filter(book => book.bookId !== payload),
      ];
    },
    updateCurrentPage: (state, { payload }) => {
      state.library = {
        ...state.library,
        3: [
          { ...payload.book, currentPage: payload.currentPage },
          ...state.library[3].filter(book => book.id !== payload.book.id),
        ],
      };
    },
  },
});

export const {
  addToShelf,
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
};

export const updateShelf = (book, newShelfId, oldShelfId) => {
  return async dispatch => {
    dispatch(updatingShelf());
    try {
      await client.updateShelf(book, newShelfId, oldShelfId);
      dispatch(removeFromShelf({ bookId: book.bookId, oldShelfId }));
      dispatch(addToShelf({ book, newShelfId }));
      dispatch(setShelfId(newShelfId));
      dispatch(closeDialog());
      dispatch(updateShelfSuccess());
    } catch (error) {
      dispatch(updateShelfFailure());
      console.warn(error);
    }
  };
};

export const updateReadingProgress = (
  book,
  currentPage,
  oldCurrentPage,
  timeRead
) => {
  return async dispatch => {
    try {
      const pagesRead = currentPage - oldCurrentPage;
      await client.updateReadingProgress({
        bookId: book.id,
        currentPage,
      });
      dispatch(addReadingSession({ pagesRead, timeRead }));
      dispatch(updateCurrentPage({ book, currentPage }));
      dispatch(setCurrentPage(currentPage));
    } catch (error) {
      console.warn(error);
    }
  };
};
