import BoardFactory from "./board_factory";
import ColumnFactory from "./column_factory";
import CardFactory from "./card_factory";

export default class AbstractFactory {
  constructor(){
    this.boardFactory = new BoardFactory();
    this.columnFactory = new ColumnFactory();
    this.cardFactory = new CardFactory();
  }

  generate(token){
    switch(token.noun) {
      case 'board':
        return this.boardFactory.generate(token.data);
      case 'column':
        return this.columnFactory.generate(token.data);
      case 'card':
        return this.cardFactory.generate(token.data);
    }
  }
}