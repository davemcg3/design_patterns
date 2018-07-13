/**
 * @file The History reducer.
 */

import { HISTORY_FETCH } from '../actions/history';

const initialState = {
  history: null,
};

const historyReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case HISTORY_FETCH:
      return {
        ...state,
        history: action.history,
      };

    default:
      return state;
  }
};

export default historyReducer;
