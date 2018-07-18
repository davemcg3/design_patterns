/**
 * @file History component.
 */

import React from 'react';
import PropTypes from 'prop-types';
import HistoryItem from './HistoryItem'

class History extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    fetchHistory: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool,
  };

  render() {
    const { isLoggedIn } = this.props;

    console.log('this.props.history: ', this.props.history)
    if (isLoggedIn && !this.props.history.history) {
      this.props.fetchHistory();
    }

    return (
      <div>
        <h2>History</h2>
        {
          this.props.history.history && this.props.history.history.map((item) => {
            console.log('item.data: ', item.data)
            return <HistoryItem key={item.id} data={item.data} />
          })
        }
      </div>
    );
  }
}

export default History;
