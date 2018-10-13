import React from 'react'
// import PropTypes from 'prop-types'

export default function HistoryItem(data) {
  // data.data is our memento
  console.log('HistoryItem data: ', data)
  // static propTypes = {
  //   data: PropTypes.object,
  // };

  function LoadItem() {
    console.log(`TODO: Load History Item ${data.data.id}`)
  }

  // render() {
  return (
    <div>
      <button onClick={LoadItem}>Load</button>
      {data.data.data}
    </div>
  )
  // }
}
