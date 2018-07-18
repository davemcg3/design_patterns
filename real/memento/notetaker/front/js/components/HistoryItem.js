import React from 'react'
// import PropTypes from 'prop-types'

export default function HistoryItem(data) {
  console.log('HistoryItem data: ', data)
  // static propTypes = {
  //   data: PropTypes.object,
  // };

  // render() {
  return (
    <div>
      {data.data}
    </div>
  )
  // }
}
