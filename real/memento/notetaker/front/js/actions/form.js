import axios from 'axios';

import getLogger from '../util/logger';
import { fetchHistory } from './history'

const log = getLogger('AuthAction');

export const NOTE_ADD = 'note/ADD';
export const addNote = note => ({ type: NOTE_ADD, payload: note });

const noteUpdate = (note) => {
  return { type: NOTE_ADD, note }
}

export const fetchNote = () => async (dispatch) => {
  // TODO: Make this component do something useful
  dispatch(noteUpdate('test note should come from server call'))
}

export const setNote = note => async (dispatch) => {
  dispatch(noteUpdate(note))
}

export const saveNote = note => async (dispatch) => {
  const jwt = localStorage.getItem('notetaker_jwt')
  log.info('jwt: ', jwt)
  const res = await axios({
    method: 'post', // TODO: adjust this method to patch if we have an id and include the id in the data for the back-end to update
    url: '/notes.json',
    data: {
      note: {
        data: note,
      },
    },
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  log.info('saveNote returned: ', res)
  dispatch(noteUpdate(note))
  fetchHistory()
}
