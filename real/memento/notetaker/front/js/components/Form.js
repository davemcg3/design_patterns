/**
 * @file Form component.
 */

import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  static propTypes = {
    textArea: PropTypes.string,
  };

  componentDidMount() {
  }

  render() {
    const { textArea } = this.props;

    return (
      <div>
        <h1>Note:</h1>
        <textarea></textarea>
      </div>
    );
  }
}

export default Form;
