import React, { Component } from 'react';
import Command from "../prototypes/command";
import Card from "../prototypes/card";
import Column from "../prototypes/column";
import Board from "../prototypes/board";
import TreeNode from "../prototypes/tree_node";
import Token from "../prototypes/token";

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
    this.query = this.query.bind(this);
  }

  register(command){
    console.log(command.attributes);
    console.log(command.attributes instanceof Column);
    if (command.attributes instanceof Board){
      console.log('Add board to what? Project?')
    } else if (command.attributes instanceof Column){
      // this structure might not take multiple boards into account
      this.state.columns_on_boards.push(command.attributes.id);
      this.state.columns_on_boards = {0: command.attributes.id}
      console.log(this.state.columns);
      console.log(this.state.columns_on_boards);
    } else if (command.attributes instanceof Card) {
      // need to figure out which column to add to
      console.log('this is a card');
    } else if (command.attributes instanceof TreeNode) {
      console.log('registering node:',command.attributes)
      // should be a verb, so we're doing something with the nouns we created
      if (command.attributes.value === "move") {
        // TODO: check that our subject can take action on the receiver, i.e. a Column can't be moved on a card but vice versa is fine
        // look up the current receiver the subject is in
        if (command.attributes.receiver.value.noun === "column"){
          var subject = this.find(new Command('find', new Token(command.attributes.subject.value.noun, command.attributes.subject.value.data)))[0];
          console.log('found subject:',subject);
          var receiver = this.find(new Command('find', new Token(command.attributes.receiver.value.noun, command.attributes.receiver.value.data)))[0];
          console.log('found receiver:',receiver);
        }
        // disassociate the current receiver
        var association = this.PLURALS[command.attributes.subject.value.noun] + '_on_' + this.PLURALS[command.attributes.receiver.value.noun];
        console.log(association, this.state[association]);
        if (this.state[association].length === 0) {
          console.log('no previous column found');
        }
        // associate the new receiver
        console.log(association + ' presence:',this.state[association][receiver.id]);
        if(this.state[association][receiver.id] === undefined){
          console.log(receiver.id);
          var key = receiver.id
          this.state[association] = {[key]: subject.id}
          console.log('associated ' + association, this.state[association]);
          return "success";
        }
      }
    } else {
      console.log('Can not register command');
    }
  }

  find(command){
    console.log('librarian find:', command);
    // console.log('librarian columns:', this.state.columns);
    // going to do the slowest possible lookup for now, because putting effort here is outside the scope of showing the
    // interpreter pattern, but I would need to reapproach the data structure to find a better way to search for a noun
    let search_result = this.state[this.PLURALS[command.attributes.noun]].filter(item => item.title == command.attributes.data);
    console.log('search result:',search_result);
    if (search_result.length === 0){
      if (command.command == "find_or_create"){
        // TODO: Consider the implications of returning a single result versus a collection. Should this be an array?
        search_result = this.props.sendToDispatch(new Command('create', command.attributes));
        console.log('created noun:',search_result);
        this.state[this.PLURALS[command.attributes.noun]].push(search_result);
        console.log('created noun:',this.state[this.PLURALS[command.attributes.noun]]);
      }
    }
    return search_result;
  }

  query(command){
    console.log('librarian query', command);
    console.log(command.attributes.noun, command.attributes.data)
    var association;
    if (command.attributes.noun === "board"){
      let board = this.props.sendToDispatch(new Command('find', command.attributes));
      console.log('board',board);
      console.log('boards:',this.state.boards);
      association = "columns_on_boards";
      console.log(association + ': ', this.state[association]);
    }

    return this.state[association];
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