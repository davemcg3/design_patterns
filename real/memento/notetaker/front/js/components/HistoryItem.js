import React from 'react'
// import PropTypes from 'prop-types'

export default function HistoryItem({ data, setNote, deleteNote }) {
  // data is our memento
  // static propTypes = {
  //   data: PropTypes.object,
  // };

  function LoadItem() {
    setNote(data)
  }

  function DeleteItem() {
    deleteNote(data)
  }

  return (
    <div>
      <button type="button" onClick={LoadItem}>Load</button>
      <button type="button" onClick={DeleteItem}>Delete</button>
      {data.data}
    </div>
  )
}
