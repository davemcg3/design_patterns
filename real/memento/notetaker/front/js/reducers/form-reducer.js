/**
 * @file The Server Timestamp reducer.
 */

import { NOTE_ADD } from '../actions/form';

const initialState = {
  note: null,
};

const formReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case NOTE_ADD:
      return {
        ...state,
        note: action.note,
      };

    default:
      return state;
  }
};

export default formReducer;
