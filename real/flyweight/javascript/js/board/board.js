import Tile from '/js/board/tile.js';

class Board {

  constructor(){
    console.log('Constructing Board');
    this.width = 4;
    this.height = 3;
    this.gridSize = 200;

    this.tiles = [];
    console.log(this.width + "x" + this.height);
    for (let i = 0; i < this.height; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j] = new Tile (i + ":" + j);
      }
    }

    this.draw();
  }

  draw(){
    console.log('drawing board');
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j].draw();
      }
    }
  }
}
export default Board;
