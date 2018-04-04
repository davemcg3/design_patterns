export default class Board {
  constructor(title){
    this.title = title;
    this.id = ++Board.prototype.totalCount;
  }
}

// static variable to set object id
Board.prototype.totalCount = 0;