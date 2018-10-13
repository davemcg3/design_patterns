/**
 * @file History component.
 */

import React from 'react';
import PropTypes from 'prop-types';
import HistoryItem from './HistoryItem'

class History extends React.Component {
  static propTypes = {
    // history: PropTypes.shape({ history: [] }),
    fetchHistory: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool,
    setNote: PropTypes.func.isRequired,
  };

  componentWillMount(){
    this.maybeFetchHistory(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.maybeFetchHistory(nextProps)
  }

  maybeFetchHistory(nextProps){
    console.log('components/History.js willReceiveProps: ', nextProps)
    console.log('components/History.js isLoggedIn: ', this.props.isLoggedIn)
    console.log('components/History.js history: ', this.props.history.history)
    if (nextProps.isLoggedIn && !nextProps.history.history) {
      nextProps.fetchHistory()
    }

  }

  render() {
    console.log(this.props.setNote)
    return (
      <div>
        <h2>History</h2>
        {
          this.props.history.history && this.props.history.history.map((item) => {
            console.log('item.data: ', item.data)
            return <HistoryItem key={item.id} data={item} setNote={this.props.setNote}/>
          })
        }
      </div>
    );
  }
}

export default History;
