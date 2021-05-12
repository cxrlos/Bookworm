import { combineReducers } from 'redux';

import bookReducer from '../slices/book-slice';
import dialogReducer from '../slices/dialog-slice';
import libraryReducer from '../slices/library-slice';
import readingReducer from '../slices/reading-slice';
import searchReducer from '../slices/search-slice';
import shelfReducer from '../slices/shelf-slice';

const rootReducer = combineReducers({
  book: bookReducer,
  dialog: dialogReducer,
  reading: readingReducer,
  search: searchReducer,
  shelf: shelfReducer,
  library: libraryReducer,
});

export default rootReducer;
