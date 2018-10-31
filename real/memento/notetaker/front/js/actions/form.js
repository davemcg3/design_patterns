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
  log.info('setting note: ', note)
  dispatch(noteUpdate(note))
}

export const saveNote = note => async (dispatch) => {
  const jwt = localStorage.getItem('notetaker_jwt')
  // log.info('jwt: ', jwt, 'note: ', note)
  const res = await axios({
    method: note.hasOwnProperty('id') ? 'patch' : 'post',
    url: '/notes' + (note.hasOwnProperty('id') ? '/' + note.id : '') + '.json',
    data: {
      note: note,
    },
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  // log.info('saveNote returned: ', res)
  dispatch(noteUpdate(res.data))
  dispatch(setNote(res.data))
  dispatch(fetchHistory())
}

export const deleteNote = note => async (dispatch) => {
  const jwt = localStorage.getItem('notetaker_jwt')
  const res = await axios({
    method: 'delete',
    url: 'notes/' + note.id + '.json',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  log.info('deleted note, response: ', res)
  dispatch(setNote({}))
  dispatch(fetchHistory())
}
