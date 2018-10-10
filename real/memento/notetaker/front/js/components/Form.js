/**
 * @file Form component.
 */

import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  static propTypes = {
    note: PropTypes.string,
    fetchNote: PropTypes.func.isRequired,
    setNote: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.updateNote = this.updateNote.bind(this)
    this.saveNote = this.saveNote.bind(this)
  }

  updateNote(event) {
    this.props.setNote(event.target.value)
  }

  saveNote(event) {
    this.props.saveNote(this.props.note)
  }

  render() {
    const { note } = this.props;
    const textareaStyle = {
      width: '100%',
      height: '100%',
      minHeight: '10em',
    }

    return (
      <div>
        <h1>Note:</h1>
        <textarea onChange={this.updateNote} value={note} style={textareaStyle} />
        <button onClick={this.saveNote}>Save</button>
      </div>
    );
  }
}

export default Form;
