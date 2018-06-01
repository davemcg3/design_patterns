export const NOTE_ADD = 'note/ADD';
export const addNote = note => ({ type: "NOTE_ADD", payload: note });

export const fetchServerTimestamp = () => async (dispatch) => {
  try {
    const res = await axios.get('/home/timestamp');

    dispatch(serverTimestampUpdate(res.data.timestamp));
  } catch (error) {
    log.error(error);
  }
};
