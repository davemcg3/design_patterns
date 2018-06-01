/**
 * @file The Server Timestamp reducer.
 */

import { SERVER_TIMESTAMP_UPDATE } from '../actions/form';

const initialState = {
  textArea: null,
};

const formReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case NOTE_ADD:
      return {
        ...state,
        textArea: action.textArea,
      };

    default:
      return state;
  }
};

export default formReducer;
