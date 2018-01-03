import Tile from '/js/board/tile.js';

class Board {

  constructor(registry, width, height){

    this.width = width;
    this.height = height;
    this.gridSize = 100;
    let waterPercentage = 60;
    let continentCount = 2;

    console.log('Constructing Board: ' + this.width + "x" + this.height);
    this.tiles = [];
    // let terrainType = Object.keys(registry.terrains);
    // let lastTerrain = 0;
    for (let i = 0; i < this.height; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j] = "placeholder";
        // this.tiles[i][j] = new Tile ({ "id": j + ":" + i, "terrain":window.game.registry.terrains[terrainType[lastTerrain]]});
        // lastTerrain = (lastTerrain + 1) % terrainType.length;
      }
    }

    let totalTiles = this.width * this.height;
    let waterTiles = Math.ceil(totalTiles * waterPercentage / 100);
    let landTiles = totalTiles - waterTiles;
    console.log(waterTiles + ' water ' + landTiles + ' land = ' + totalTiles + ' tiles');
    let islandTiles = 0; //Math.ceil(landTiles * 2 / 100); // TODO: figure out algorithm to tell if a tile can be an island
    let continentTiles = landTiles - islandTiles;
    let tilesPerContinent = continentTiles / continentCount;
    console.log(tilesPerContinent + ' tiles per continent for ' + continentCount + ' continents and ' + islandTiles + ' island tile equals ' + landTiles + ' land tiles');

    //will eventually need a better way to pick seed locations but for now let's go upper-right and lower-left
    //upper-right
    // TODO: Properly fix bug with 0-indexed arrays being out of bounds. For example, height 3 75% tile rounded up is tile 3, but row count only goes up to 2
    let seed1x = Math.floor(this.width * 75 / 100);
    let seed1y = Math.floor(this.height * 25 / 100);
    console.log('seed 1: ' + seed1x + ', ' + seed1y);
    console.log(this.tiles);
    this.tiles[seed1y][seed1x] = new Tile ({ "id": seed1x + ":" + seed1y, "terrain":registry.getRegisteredItem('terrains', 'grassland')});

    //using a numberpad there are 9 different directions to move, remove this tile (5) and we are left with movement
    //should build a recursive algorithm for this, but not yet
    //probably will look something like this:
      // 1. create an array of possible moves
      // 2. if there is already a tile there, drop it from the array
      // 3. randomly pick a move
      // 4. add a tile there
      // 5. drop that move from the array
      // 6. randomly pick a move, add a tile there, drop that move from the array, repeat until no more moves
      // 7. go back to the seed, pick a direction, and use that as the new seed
      // 8. fill out all directions
      // 9. go back to the seed, pick a different direction, and use that as the new seed
      // 10. fill out all directions, repeat until all directions filled out
      // 11. go back to the seed, randomly pick a direction, move there and randomly pick a direction, use that as the new seed and fill out all the directions
      // 12. continue until out of continent tiles

    let tilesLeft = tilesPerContinent - 1; // our seed tile
    let directions = [for (i of Array(9).keys()) i+1];
    directions = directions.filter(e => e !== 5);
    console.log(directions);

    do {
      let direction = directions[Math.floor(Math.random()*directions.length)];
      console.log('direction to try: ' + direction);
      //TODO: Add checks for out of range
      let newTilex = 0;
      let newTiley = 0;
      switch(direction) {
        case 1:
          newTilex = seed1x - 1;
          newTiley = seed1y + 1;
          break;
        case 2:
        newTilex = seed1x - 0;
        newTiley = seed1y + 1;
          break;
        case 3:
        newTilex = seed1x + 1;
        newTiley = seed1y + 1;
          break;
        case 4:
        newTilex = seed1x - 1;
        newTiley = seed1y - 0;
          break;
        // case 5:
        //   break;
        case 6:
        newTilex = seed1x + 1;
        newTiley = seed1y - 0;
          break;
        case 7:
        newTilex = seed1x - 1;
        newTiley = seed1y - 1;
          break;
        case 8:
        newTilex = seed1x - 0;
        newTiley = seed1y - 1;
          break;
        case 9:
        newTilex = seed1x + 1;
        newTiley = seed1y - 1;
          break;
      }

      console.log('new tile: ' + newTilex + ', ' + newTiley)
      try {
        if (this.tiles[newTiley][newTilex] == undefined) {
          throw 'not a valid tile';
        } else {
          this.tiles[newTiley][newTilex] = new Tile ({ "id": newTiley + ":" + newTilex, "terrain":registry.getRegisteredItem('terrains', 'grassland')});
        }
        tilesLeft--;
      } catch (e) {
        console.log(e);
      }
      directions = directions.filter(e => e !== direction);

      console.log(tilesLeft + ' continent tiles left');
      if (tilesLeft <= 0) {
        break;
      }

    } while (directions.length > 0);



    let seed2x = Math.floor(this.width * 25 / 100);
    let seed2y = Math.floor(this.height * 75 / 100);
    console.log('seed 2: ' + seed2x + ', ' + seed2y);
    this.tiles[seed2y][seed2x] = new Tile ({ "id": seed2y + ":" + seed2x, "terrain":registry.getRegisteredItem('terrains', 'grassland')});

    tilesLeft = tilesPerContinent - 1; // our seed tile
    directions = [for (i of Array(9).keys()) i+1];
    directions = directions.filter(e => e !== 5);
    console.log(directions);

    do {
      let direction = directions[Math.floor(Math.random()*directions.length)];
      console.log('direction to try: ' + direction);
      //TODO: Add checks for out of range
      let newTilex = 0;
      let newTiley = 0;
      switch(direction) {
        case 1:
          newTilex = seed2x - 1;
          newTiley = seed2y + 1;
          break;
        case 2:
        newTilex = seed2x - 0;
        newTiley = seed2y + 1;
          break;
        case 3:
        newTilex = seed2x + 1;
        newTiley = seed2y + 1;
          break;
        case 4:
        newTilex = seed2x - 1;
        newTiley = seed2y - 0;
          break;
        // case 5:
        //   break;
        case 6:
        newTilex = seed2x + 1;
        newTiley = seed2y - 0;
          break;
        case 7:
        newTilex = seed2x - 1;
        newTiley = seed2y - 1;
          break;
        case 8:
        newTilex = seed2x - 0;
        newTiley = seed2y - 1;
          break;
        case 9:
        newTilex = seed2x + 1;
        newTiley = seed2y - 1;
          break;
      }

      console.log('new tile: ' + newTilex + ', ' + newTiley)
      try {
        if (this.tiles[newTiley][newTilex] != "placeholder") {
          // [4, 0]
          throw 'not a valid tile';
        } else {
          this.tiles[newTiley][newTilex] = new Tile ({ "id": newTiley + ":" + newTilex, "terrain":registry.getRegisteredItem('terrains', 'grassland')});
        }
        tilesLeft--;
      } catch (e) {
        // -1 gets me here without throwing in the try
        console.log(e);
      }
      directions = directions.filter(e => e !== direction);

      console.log(tilesLeft + ' continent tiles left');
      if (tilesLeft <= 0) {
        break;
      }

    } while (directions.length > 0);


    //fill in our water tiles
    console.log('filling in water tiles');
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        console.log(this.tiles[i][j]);
        if (this.tiles[i][j] == 'placeholder') {
          this.tiles[i][j] = new Tile ({ "id": j + ":" + i, "terrain":registry.getRegisteredItem('terrains', 'ocean')});
        }
      }
    }
    console.log('water tiles filled in');
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        console.log(this.tiles[i][j]);
      }
    }

    // change the terrain image directly and check the terrain reference in the board object changed to show we are using shared memory
    // console.log(registry.terrains.grassland);
    // registry.terrains.grassland.image = 'booga booga';
    // console.log(this.tiles[0][0]); //great success!
  }

  fillMap() {
    //TODO: this is our recursive function
  }

  draw(){
    console.log('Drawing board');

    let board = this.find_or_create_board_html();

    for (let i = 0; i < this.height; i++) {
      let row = this.create_html('div', 'board_row_' + i, 'row');
      board.appendChild(row);
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j].draw(row);
      }
    }
  }


  // should be private, but JS doesn't do that without workarounds

  find_or_create_board_html() {
    let board_id = "board0";
    this.id = board_id;

    if(document.getElementById(board_id) == undefined) {
      document.body.appendChild(this.create_html('div', board_id, 'board'));
    }
    let board = document.getElementById(board_id);
    let phantomPixels = 10;
    board.style.width = (this.width * this.gridSize + phantomPixels) + 'px';
    board.style.height = (this.height * this.gridSize + phantomPixels) + 'px';
    return board;
  }

  // TODO: Move this to some sort of "utility" class
  create_html (tag, id, classes) {
    let element = document.createElement(tag);
    if (id !== undefined)
      element.setAttribute("id", id);
    if (classes !== undefined)
      element.setAttribute("class", classes);
    return element;
  }
}
export default Board;
