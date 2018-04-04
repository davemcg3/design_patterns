import React, { Component } from 'react';

class Librarian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: props.boards,
      columns: props.columns,
      cards: props.cards,
      columns_on_boards: props.columns_on_boards,
      cards_on_columns: props.cards_on_columns
    };
    this.register = this.register.bind(this);
    this.find = this.find.bind(this);
  }

  register(token){

  }

  find(token){

  }

  render () {
    return (
      <div>
      </div>
    );
  }
}

export default Librarian;