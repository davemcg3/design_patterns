export default class Column {
  constructor(title){
    this.title = title;
    this.id = ++Column.prototype.totalCount;
  }
}

// static variable to set object id
Column.prototype.totalCount = 0;