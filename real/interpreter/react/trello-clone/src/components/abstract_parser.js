import TaskParser from "./task_parser";

export default class AbstractParser {
  constructor(sendToDispatch, queryLibrarian){
    // probably won't build a different parser for this project but this is the point that a different parser could be
    // loaded if we wanted one
    this.parser = new TaskParser(sendToDispatch, queryLibrarian);

  }

  processNode(node) {
    return this.parser.processNode(node);
  }

  // processTerminalNode(node) {
  //   return this.parser.processTerminalNode(node);
  // }
  //
  // processNonTerminal(node) {
  //   return this.parser.processNonTerminal(node);
  // }
}
