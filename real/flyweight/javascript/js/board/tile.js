class Tile {
  constructor(attributes){
    // this.attributes = attributes;
    let self = this;
    for (var key in attributes){
      if (attributes.hasOwnProperty(key)) {
        self[key] = attributes[key];
      }
    }
  }

  draw(board){
    console.log( this );
    let thisTile = window.game.board.create_html('div', this.id);
    thisTile.style.backgroundColor = '#' + this.terrain.color;
    console.log('size: ' + window.game.board.gridSize)
    thisTile.style.width = window.game.board.gridSize + 'px';
    thisTile.style.height = window.game.board.gridSize + 'px';
    board.appendChild(thisTile);
  }
}
export default Tile;
