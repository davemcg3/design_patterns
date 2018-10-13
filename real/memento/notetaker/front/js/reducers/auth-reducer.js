/**
 * @file The Server Timestamp reducer.
 */

import { AUTH_LOGIN, AUTH_LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
};

const authReducer = (state = initialState, action = {}) => {
  console.log('authReducer state: ', state, 'action: ', action)
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        token: action.token,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: '',
      };

    default:
      return state;
  }
};

export default authReducer;
