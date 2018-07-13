/**
 * @file Root reducer, combines all reducers.
 */

import { combineReducers } from 'redux';

import serverTimestampReducer from './server-timestamp-reducer';
import formReducer from './form-reducer';
import authReducer from './auth-reducer';
import historyReducer from './history-reducer';

export default combineReducers({
  serverTimestamp: serverTimestampReducer,
  note: formReducer,
  auth: authReducer,
  history: historyReducer,
});
