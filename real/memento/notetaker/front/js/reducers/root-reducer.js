/**
 * @file Root reducer, combines all reducers.
 */

import { combineReducers } from 'redux';

import serverTimestampReducer from './server-timestamp-reducer';
import formReducer from './form-reducer';
import authReducer from "./auth-reducer"

export default combineReducers({
  serverTimestamp: serverTimestampReducer,
  note: formReducer,
  auth: authReducer,
});
