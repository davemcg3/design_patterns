/**
 * @file Hello World container.
 */

import { connect } from 'react-redux';

import Form from '../components/Form';
// import { fetchServerTimestamp } from '../actions/server-timestamp';

const mapStateToProps = ({ serverTimestamp }) => ({
  // textArea: serverTimestamp.timestamp,
});

const mapDispatchToProps = {
  // fetchServerTimestamp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
