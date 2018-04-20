import React, { Component } from 'react';
import Command from "../prototypes/command";
import Token from "../prototypes/token";
import UiColumn from "./ui_column";

class UiBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { columns: [] }
    this.refresh = this.refresh.bind(this);
  }

  refresh(){
    // I want to do this in the constructor but I think I'm hitting a lifecycle issue where the librarian hasn't mounted
    // before we try to pull data from it. For now we'll defer load until this button is clicked, but TODO: fix this hack
    let columns = this.props.sendToDispatch(new Command('query',new Token('board', 'Board Title')));
    console.log(columns);
    if (columns.length === 0) {
      let column = this.props.sendToDispatch(new Command('tokenize', 'add column TODO to board "Board Title"'));
      console.log(column);
    }
  }

  render () {
    return (
      <div>
        <h1>UI Board</h1>
        <button onClick={this.refresh}>Refresh</button>
        {
          this.state.columns.map((item, i) => (
              <UiColumn key={i} settings={item} />
          ))
        }
      </div>
    );
  }
}

export default UiBoard;