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
    const res = await axios.get('/home/timestamp');
    console.log(res);

    dispatch(historyFetch(res.data.timestamp));
  } catch (error) {
    log.error(error);
  }
};
