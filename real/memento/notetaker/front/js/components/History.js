/**
 * @file History component.
 */

import React from 'react';
import PropTypes from 'prop-types';
import HistoryItem from './HistoryItem'

class History extends React.Component {
  static propTypes = {
    history: PropTypes.shape({ history: [] }),
    fetchHistory: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool,
  };

  componentWillReceiveProps(nextProps) {
    console.log('History willReceiveProps: ', nextProps)
    console.log('isLoggedIn: ', this.props.isLoggedIn)
    console.log('history: ', this.props.history.history)
    if (nextProps.isLoggedIn && !nextProps.history.history) {
      nextProps.fetchHistory()
    }
  }

  render() {
    return (
      <div>
        <h2>History</h2>
        {
          this.props.history.history && this.props.history.history.map((item) => {
            console.log('item.data: ', item.data)
            return <HistoryItem key={item.id} data={item} />
          })
        }
      </div>
    );
  }
}

export default History;
