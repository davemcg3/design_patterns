/**
 * @file History related actions.
 */

import axios from 'axios';

import getLogger from '../util/logger';
import { logout } from './auth'

let log = getLogger('HistoryAction');
export const HISTORY_FETCH = 'history/FETCH';

const historyFetch = (history) => {
  return { type: HISTORY_FETCH, history };
};

export const fetchHistory = () => async (dispatch) => {
  console.log('inside fetchHistory')

  try {
    console.log('actions/history.js fetching history');
    log.info('fetching history')
    const jwt = localStorage.getItem('notetaker_jwt')
    log.info(`jwt ( ${typeof (jwt)} ) `, jwt, ` !== ( ${typeof ('null')} ) null ? `, (jwt !== 'null'))
    if (jwt !== 'null') {
      log.info('getting notes from server')
      const res = await axios({
        method: 'get',
        url: '/notes.json',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      log.info(res);

      dispatch(historyFetch(res.data));
    }
  } catch (error) {
    log.error('caught error with jwt, logging out, ', error)
    dispatch(logout())
    // log.error(error);
  }
};
