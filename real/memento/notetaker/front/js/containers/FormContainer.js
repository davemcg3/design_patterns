/**
 * @file Hello World container.
 */

import { connect } from 'react-redux';

import Form from '../components/Form';
import { fetchNote, setNote } from '../actions/form'

const mapStateToProps = ({ note }) => ({
  note: note.note || '',
});

const mapDispatchToProps = {
  fetchNote,
  setNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
