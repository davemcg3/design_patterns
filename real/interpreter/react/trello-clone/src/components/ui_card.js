import React, { Component } from 'react';

class UiCard extends Component {
  constructor(props) {
    super(props);
    console.log('ui card props:',props);
  }

  render () {
    return (
      <div>
        <h1>{this.props.settings.title}</h1>
      </div>
    );
  }
}

export default UiCard;
