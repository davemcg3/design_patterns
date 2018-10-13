import React from 'react'
// import PropTypes from 'prop-types'

export default function HistoryItem({ data, setNote }) {
  // data.data is our memento
  console.log('HistoryItem data: ', data)
  // static propTypes = {
  //   data: PropTypes.object,
  // };

  function LoadItem() {
    setNote(data.data)
    console.log('next step: when an item is loaded we need to set some meta data so that when save is clicked the back-end updates the existing data instead of creating a new record')
  }

  // render() {
  return (
    <div>
      <button type="button" onClick={LoadItem}>Load</button>
      {data.data}
    </div>
  )
  // }
}
