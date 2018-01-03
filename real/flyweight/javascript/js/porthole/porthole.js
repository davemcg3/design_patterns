class Porthole {
  constructor (registry, board) {
    this.registry = registry;
    this.board = board;
    this.x = document.documentElement.clientWidth;
    this.y = document.documentElement.clientHeight;
    this.boardx = 0;
    this.boardy = 0;
    this.px = 'px';
    this.displayedBoard = document.getElementById(board.id);
    this.displayedBoard.style.position = 'absolute';
    this.displayedBoard.style.left = this.boardx + this.px;
    this.displayedBoard.style.top = this.boardy + this.px;
  }

  draw () {

  }

  center_on_tile(x,y) {
    this.displayedBoard.style.left = (this.x / 2 - (x * this.board.gridSize + this.board.gridSize / 2)) + this.px;
    this.displayedBoard.style.top = (this.y / 2 - (y * this.board.gridSize + this.board.gridSize / 2)) + this.px;
  }
}
export default Porthole;
