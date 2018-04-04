import React, { Component } from 'react';
import Command from "../prototypes/command";
import Card from "../prototypes/card";
import Column from "../prototypes/column";
import Board from "../prototypes/board";

class Librarian extends Component {
  constructor(props) {
    super(props);
    // the librarian manages state, so in a redux-inclusive refactoring of the app the reducers would be controlled by
    // the librarian, so their management would be contained within this component
    this.state = {
      boards: props.boards || [],
      columns: props.columns || [],
      cards: props.cards || [],
      columns_on_boards: props.columns_on_boards || [],
      cards_on_columns: props.cards_on_columns || []
    };
    this.register = this.register.bind(this);
    this.find = this.find.bind(this);
  }

  register(command){
    console.log(command.attributes);
    console.log(command.attributes instanceof Column);
    if (command.attributes instanceof Board){
      console.log('Add board to what? Project?')
    } else if (command.attributes instanceof Column){
      this.state.columns_on_boards.push(command.attributes.id);
      console.log(this.state.columns);
      console.log(this.state.columns_on_boards);
    } else if (command.attributes instanceof Card){
      // need to figure out which column to add to
    } else {
      console.log('Can not register noun');
    }
  }

  find(command){
    console.log('librarian find:', command);
    console.log('librarian columns:', this.state.columns);
    // going to do the slowest possible lookup for now, because putting effort here is outside the scope of showing the
    // interpreter pattern, but I would need to reapproach the data structure to find a better way to search for a noun
    let search_result = this.state[this.PLURALS[command.attributes.noun]].filter(item => item.title == command.attributes.data);
    if (search_result.length === 0){
      if (command.command == "find_or_create"){
        // TODO: Consider the implications of returning a single result versus a collection. Should this be an array?
        search_result = this.props.sendToDispatch(new Command('create', command.attributes));
        this.state.columns.push(search_result);
        console.log(this.state.columns);
      }
    }
    return search_result;
  }

  render () {
    return (
      <div>
      </div>
    );
  }
}

Librarian.prototype.PLURALS = {
  "board": "boards",
  "column": "columns",
  "card": "cards"
}

export default Librarian;