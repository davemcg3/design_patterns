import React, { Component } from 'react';
import Command from "../prototypes/command";
import Token from "../prototypes/token";
import UiCard from "./ui_card";

class UiColumn extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] }
    this.refresh = this.refresh.bind(this);
    console.log('ui column settings: ',this.props.settings, this.props.settings.title);
    window.setTimeout(this.refresh,100)
  }

  refresh(){
    // I want to do this in the constructor but I think I'm hitting a lifecycle issue where the librarian hasn't mounted
    // before we try to pull data from it. For now we'll defer load until this button is clicked, but TODO: fix this hack
    let cards = this.props.sendToDispatch(new Command('query',new Token('column', this.props.settings.title)));
    console.log('cards:',cards);
    if (cards.length === 0) {
      this.props.sendToDispatch(new Command('tokenize', 'move card "Create MOAR columns!" to column ' + this.props.settings.title));
      this.setState({cards:this.props.sendToDispatch(new Command('query', new Token('column', this.props.settings.title)))});
      console.log('ui column cards:',this.state.cards);
    }
  }

  render () {
    return (
      <div>
        <h1>{this.props.settings.title}</h1>
          {
            this.state.cards.map((item, i) => (
                <UiCard key={i} settings={item} sendToDispatch={this.props.sendToDispatch} />
            ))
          }
      </div>
    );
  }
}

export default UiColumn;
