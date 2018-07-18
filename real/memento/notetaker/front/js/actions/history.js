/**
 * @file History related actions.
 */

import axios from 'axios';

import getLogger from '../util/logger';

const log = getLogger('HistoryAction');

export const HISTORY_FETCH = 'history/FETCH';

const historyFetch = (history) => {
  return { type: HISTORY_FETCH, history};
};

export const fetchHistory = () => async (dispatch) => {
  try {
    console.log('fetching history')
    const jwt = localStorage.getItem('notetaker_jwt')
    const res = await axios({
      method: 'get',
      url: '/notes.json',
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    });
    console.log(res);

    dispatch(historyFetch(res.data));
  } catch (error) {
    log.error(error);
  }
};
