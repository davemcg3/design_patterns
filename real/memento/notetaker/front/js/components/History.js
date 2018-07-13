/**
 * @file History component.
 */

import React from 'react';
import PropTypes from 'prop-types';

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
        <p>{ this.props.history.history }</p>
      </div>
    );
  }
}

export default History;
