/**
 * @file History container.
 */

import { connect } from 'react-redux';

import History from '../components/History';
import { fetchHistory } from '../actions/history'
import { setNote } from '../actions/form'

const mapStateToProps = state => ({
  history: state.history,
  isLoggedIn: state.auth.token !== 'null' && !!state.auth.token,
});

const mapDispatchToProps = {
  fetchHistory,
  setNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(History);
