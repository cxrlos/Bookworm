import { combineReducers } from 'redux';

import bookReducer from '../slices/book-slice';
import dialogReducer from '../slices/dialog-slice';
import formReducer from '../slices/form-slice';
import libraryReducer from '../slices/library-slice';
import readingReducer from '../slices/reading-slice';
import searchReducer from '../slices/search-slice';
import shelfReducer from '../slices/shelf-slice';
import snackBarReducer from '../slices/snack-bar-slice';
import statisticsReducer from '../slices/statistics-slice';
import userSlice from '../slices/user-slice';

const rootReducer = combineReducers({
  book: bookReducer,
  dialog: dialogReducer,
  form: formReducer,
  library: libraryReducer,
  reading: readingReducer,
  search: searchReducer,
  shelf: shelfReducer,
  snackBar: snackBarReducer,
  statistics: statisticsReducer,
  user: userSlice,
});

export default rootReducer;
