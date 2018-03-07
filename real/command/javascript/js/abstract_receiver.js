export default class AbstractReceiver {
  constructor(options={}) {
    this.history = options.history || []
  }

  add() {
    throw "Not Implemented"
  }

  remove() {
    throw "Not Implemented"
  }

  change() {
    throw "Not Implemented"
  }

  undo(){
    throw "Not Implemented"
  }

  no_history(){
    return Object.keys(this)
      .filter(key => key != 'history')
      .reduce((obj, key) => {
        obj[key] = this[key];
        return obj;
      }, {})
  }
}

