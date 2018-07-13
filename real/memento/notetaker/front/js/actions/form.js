import axios from 'axios';

import getLogger from '../util/logger';

const log = getLogger('AuthAction');

export const NOTE_ADD = 'note/ADD';
export const addNote = note => ({ type: NOTE_ADD, payload: note });

const noteUpdate = (note) => {
  return { type: NOTE_ADD, note }
}

export const fetchNote = () => async (dispatch) => {
  dispatch(noteUpdate('test note should come from server call'))
}

export const setNote = note => async (dispatch) => {
  dispatch(noteUpdate(note))
}

export const saveNote = note => async (dispatch) => {
  const res = await axios.post('/notes.json', {
    note: note
  })

}
