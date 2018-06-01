/**
 * @file Root reducer, combines all reducers.
 */

import { combineReducers } from 'redux';

import serverTimestampReducer from './server-timestamp-reducer';
import formReducer from './form-reducer';

export default combineReducers({
  serverTimestamp: serverTimestampReducer,
  formReducer: formReducer,
});
