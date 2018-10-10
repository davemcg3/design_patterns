/**
 * @file History related actions.
 */

import axios from 'axios';

import getLogger from '../util/logger';
import { logout } from './auth'

const log = getLogger('HistoryAction');

export const HISTORY_FETCH = 'history/FETCH';

const historyFetch = (history) => {
  return { type: HISTORY_FETCH, history };
};

export const fetchHistory = () => async (dispatch) => {
  try {
    log('fetching history')
    const jwt = localStorage.getItem('notetaker_jwt')
    log(`jwt ( ${typeof (jwt)} ) `, jwt, ` !== ( ${typeof ('null')} ) null ? `, (jwt !== 'null'))
    if (jwt !== 'null') {
      log('getting notes from server')
      const res = await axios({
        method: 'get',
        url: '/notes.json',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      log(res);

      dispatch(historyFetch(res.data));
    }
  } catch (error) {
    log('caught error with jwt, logging out, ', error)
    dispatch(logout())
    // log.error(error);
  }
};
