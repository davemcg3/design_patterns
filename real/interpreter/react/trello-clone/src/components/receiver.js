import React, { Component } from 'react';
import Command from "../prototypes/command";

class Receiver extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event){
    event.preventDefault();
    // console.log(event.target.children.magicBox.value);
    this.props.sendToDispatch(new Command('tokenize', event.target.children.magicBox.value));
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleInput}>
          <input type="text" name="magicBox"/>
          <input type="submit" value="Execute"/>
        </form>
      </div>
    );
  }
}

export default Receiver;