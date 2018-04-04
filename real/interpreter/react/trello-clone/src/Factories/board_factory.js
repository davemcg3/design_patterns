import Board from "../prototypes/board";

export default class BoardFactory {
  generate(title) {
    return new Board(title);
  }
}