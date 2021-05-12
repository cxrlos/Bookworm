import { createSlice } from '@reduxjs/toolkit';

import client from '../../api/client';

const initialState = {
  hasErrors: false,
  books: [],
  loading: false,
  query: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: state => {
      state.books = [];
      state.query = '';
    },
    getGoogleBooks: state => {
      state.loading = true;
    },
    getGoogleBooksSuccess: (state, { payload }) => {
      state.books = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getGoogleBooksFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    setQuery: (state, { payload }) => {
      state.query = payload;
    },
  },
});

export const {
  clearSearch,
  getGoogleBooks,
  getGoogleBooksSuccess,
  getGoogleBooksFailure,
  setQuery,
} = searchSlice.actions;

export const searchSelector = state => state.search;

export default searchSlice.reducer;

export const fetchGoogleBooks = query => {
  return async dispatch => {
    dispatch(getGoogleBooks());
    try {
      if (query.length > 0) {
        const books = await client.getGoogleBooks(query);
        const { items } = await books.json();
        if (items) {
          dispatch(
            getGoogleBooksSuccess(
              items.map(book => ({
                authors: book.volumeInfo.authors,
                description: book.volumeInfo.description,
                currentPage: 0,
                id: book.id,
                pageCount: book.volumeInfo.pageCount,
                publisher: book.volumeInfo.publisher,
                thumbnail:
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.thumbnail,
                title: book.volumeInfo.title,
              }))
            )
          );
        }
      }
    } catch (error) {
      console.warn(error);
      dispatch(getGoogleBooksFailure());
    }
  };
};
