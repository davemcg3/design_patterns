/**
 * @file Form container.
 */

import { connect } from 'react-redux';

import Form from '../components/Form';
import { fetchNote, setNote, saveNote } from '../actions/form'

const mapStateToProps = ({ note }) => ({
  note: note.note || {},
});

const mapDispatchToProps = {
  fetchNote,
  setNote,
  saveNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
