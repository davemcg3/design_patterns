/**
 * @file History container.
 */

import { connect } from 'react-redux';

import History from '../components/History';
import { fetchHistory } from '../actions/history'

const mapStateToProps = ( state ) => ({
  history: state.history,
  isLoggedIn: !!state.auth.token
});

const mapDispatchToProps = {
  fetchHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(History);
