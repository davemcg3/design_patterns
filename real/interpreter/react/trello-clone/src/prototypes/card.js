export default class Card {
  constructor(title){
    this.title = title;
    this.id = ++Card.prototype.totalCount;
  }
}

// static variable to set object id
Card.prototype.totalCount = 0;