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

/**
 * Fetches the user library and sets it on the client.
 */

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

/**
 * Adds a new book to the library. It makes a call so the book is added to the database, afterwards it adds the book client-side. The shelfId is always set to 2 ('Por leer'), when a new book is added.
 * @param {Object} book - Data of the book (bookId, thumbnail, title, authors, etc)
 */

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

/**
 * Deletes a given book from the user library. It makes a call so the book is deleted from the database, afterwards it deletes the book client-side.
 * @param {string} bookId - Book identifier to delete
 */

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

/**
 * Updates the shelfId from a given book to a new one. It makes a clal so the book is updated in the database, afterwards it changes the book and updates the shelfId, the current page (0) on the client-side.
 * @param {String} bookId  - Book identifier to update
 * @param {String} shelfId  - Shelf to change the book to
 */

export const updateShelf = (bookId, shelfId) => {
  return async dispatch => {
    dispatch(updatingShelf());
    try {
      await client.updateShelf(bookId, shelfId);
      dispatch(changeShelf({ bookId, selectedShelf: shelfId }));
      dispatch(setShelfId(shelfId));
      dispatch(setCurrentPage(0));
      dispatch(closeDialog());
      dispatch(updateShelfSuccess());
    } catch (error) {
      dispatch(updateShelfFailure());
      console.warn(error);
    }
  };
};

/**
 * Updates the reading progress of a book. It makes a call to updatee the reading progress of a book on the database by changing the current page the user read. Afterwards, it updates the same data in the client-side as well as adding a new reading session client-side.
 * @param {String} bookId - Book identifier
 * @param {number} currentPage - The new page the user registered
 * @param {number} oldCurrentPage - The previous page the user registered
 * @param {number} timeRead - Total number in seconds the user read
 */

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
