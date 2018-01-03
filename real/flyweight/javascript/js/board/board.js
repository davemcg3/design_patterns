import Tile from '/js/board/tile.js';

class Board {

  constructor(registry){

    console.log('Constructing Board');
    this.width = 4;
    this.height = 3;
    this.gridSize = 100;

    this.tiles = [];
    console.log(this.width + "x" + this.height);
    let terrainType = Object.keys(window.game.registry.terrains);
    let lastTerrain = 0;
    for (let i = 0; i < this.height; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j] = new Tile ({ "id": i + ":" + j, "terrain":window.game.registry.terrains[terrainType[lastTerrain]]});
        lastTerrain = (lastTerrain + 1) % terrainType.length;
      }
    }

    // change the terrain image directly and check the terrain reference in the board object changed to show we are using shared memory
    // console.log(registry.terrains.grassland);
    // registry.terrains.grassland.image = 'booga booga';
    // console.log(this.tiles[0][0]); //great success!
  }

  draw(){
    console.log('drawing board');

    let board = this.find_or_create_board_html();

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j].draw(board);
      }
    }
  }


  // should be private, but JS doesn't do that without workarounds

  find_or_create_board_html() {
    let board_id = "board0";

    if(document.getElementById(board_id) == undefined) {
      document.body.appendChild(this.create_html('div', board_id));
    }
    let board = document.getElementById(board_id);
    return board;
  }

  // TODO: Move this to some sort of "utility" class
  create_html (tag, id) {
    let element = document.createElement(tag);
    element.setAttribute("id", id);
    return element;
  }
}
export default Board;
