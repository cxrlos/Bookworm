import { combineReducers } from 'redux';

import libraryReducer from './screens/library/library-slice';

const rootReducer = combineReducers({
  library: libraryReducer,
});

export default rootReducer;
