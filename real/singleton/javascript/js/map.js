import Tile from '/js/tile.js'

export default class Map {
  constructor(width = 10, height = 10){
    this.width = width;
    this.height = height;
    var board = [];
      for (var y = 0; y < height; y++){
        board[y] = [];
        for (var x = 0; x < width; x++){
        board[y][x] = new Tile();
      }
    }
    this.board = board;
    return this;
  }

  to_s(){
    var output = '';
    for (var y = 0; y < this.height; y++){
      for (var x = 0; x < this.width; x++){
        if (x !== 0) { output += ' '; }
        output += this.board[y][x].to_s() + '; ';
      }
      output += '\n';
    }
    return output;
  }

  draw(){
    var map = document.createElement('div');
    map.style.width = (this.width * this.board[0][0].size) + 'px';
    map.style.height = (this.height * this.board[0][0].size) + 'px';
    map.setAttribute('class', 'map');
    for (var y = 0; y < this.height; y++){
      for (var x = 0; x < this.width; x++){
        var tile = this.board[y][x].to_html();
        tile.style.left = (this.board[y][x].size * x) + 'px';
        tile.style.top = (this.board[y][x].size * y) + 'px';
        map.append(tile);
      }
      // map.append(document.createElement('br'));
    }
    return map;
  }
}
