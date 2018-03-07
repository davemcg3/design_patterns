export default class Command {
  constructor(options){
    this.receiver = options.receiver;
  }

  execute (options) {
    throw "Not Implemented"
  }

  undo() {
    throw "Not Implemented"
  }

  record(message) {
    return this.receiver.history.push(message)
  }

  viewLastHistoryItem() {
    return this.receiver.history[this.receiver.history.length - 1]
  }

  viewAllHistory() {
    return this.receiver.history
  }
}
