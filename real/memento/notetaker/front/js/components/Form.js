/**
 * @file Form component.
 */

import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  static propTypes = {
    note: PropTypes.object,
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
    let note = JSON.parse(JSON.stringify(this.props.note))
    note.data = event.target.value
    this.props.setNote(note)
  }

  saveNote(event) {
    this.props.saveNote(this.props.note)
  }

  componentWillReceiveProps(nextProps) {
    console.log('Form.js nextProps: ', nextProps)
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
        <textarea onChange={this.updateNote} value={note.data} style={textareaStyle} />
        <button onClick={this.saveNote}>Save</button>
      </div>
    );
  }
}

export default Form;
