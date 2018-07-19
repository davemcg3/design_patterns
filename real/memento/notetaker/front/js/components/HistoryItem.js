import React from 'react'
// import PropTypes from 'prop-types'

export default function HistoryItem(data) {
  console.log('HistoryItem data: ', data)
  // static propTypes = {
  //   data: PropTypes.object,
  // };

  function LoadItem(){
    console.log('TODO: Load History Item ' + data.id)
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
