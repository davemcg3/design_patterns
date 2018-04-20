import React, { Component } from 'react';
import Command from "../prototypes/command";
import Token from "../prototypes/token";
import UiColumn from "./ui_column";

class UiBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Main',
      columns: []
    }
    this.refresh = this.refresh.bind(this);
    window.setTimeout(this.refresh,100)

  }

  refresh(){
    // I want to do this in the constructor but I think I'm hitting a lifecycle issue where the librarian hasn't mounted
    // before we try to pull data from it. For now we'll defer load until this button is clicked, but TODO: fix this hack
    let columns = this.props.sendToDispatch(new Command('query',new Token('board', this.state.title)));
    console.log(columns);
    if (columns.length === 0) {
      this.props.sendToDispatch(new Command('tokenize', 'move column TODO to board Main'));
      this.setState({columns:this.props.sendToDispatch(new Command('query', new Token('board', 'Main')))});
    }
  }

  render () {
    return (
      <div>
        <h1>{this.state.title}</h1>
        {
          this.state.columns.map((item, i) => (
              <UiColumn key={i} settings={item} sendToDispatch={this.props.sendToDispatch} />
          ))
        }
      </div>
    );
  }
}

export default UiBoard;
