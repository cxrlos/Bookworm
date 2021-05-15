import { combineReducers } from 'redux';

import bookReducer from '../slices/book-slice';
import dialogReducer from '../slices/dialog-slice';
import formReducer from '../slices/form-slice';
import libraryReducer from '../slices/library-slice';
import readingReducer from '../slices/reading-slice';
import searchReducer from '../slices/search-slice';
import shelfReducer from '../slices/shelf-slice';
import statisticsReducer from '../slices/statistics-slice';

const rootReducer = combineReducers({
  book: bookReducer,
  dialog: dialogReducer,
  form: formReducer,
  reading: readingReducer,
  search: searchReducer,
  shelf: shelfReducer,
  statistics: statisticsReducer,
  library: libraryReducer,
});

export default rootReducer;
