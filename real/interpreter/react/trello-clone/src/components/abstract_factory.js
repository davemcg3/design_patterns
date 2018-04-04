import React, { Component } from 'react';
import BoardFactory from "../Factories/board_factory";
import ColumnFactory from "../Factories/column_factory";
import CardFactory from "../Factories/card_factory";

class AbstractFactory extends Component {
  constructor(props){
    super(props);
    this.boardFactory = new BoardFactory();
    this.columnFactory = new ColumnFactory();
    this.cardFactory = new CardFactory();
  }

  generate(command){
    var token = command.attributes
    switch(token.noun) {
      case 'board':
        return this.boardFactory.generate(token.data);
      case 'column':
        return this.columnFactory.generate(token.data);
      case 'card':
        return this.cardFactory.generate(token.data);
    }
  }

  render () {
    return (
      <div>
      </div>
    );
  }
}

export default AbstractFactory;