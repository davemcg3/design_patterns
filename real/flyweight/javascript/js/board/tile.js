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

  draw(row){
    let thisTile = window.game.board.create_html('div', this.id);
    thisTile.innerHTML = this.id;
    thisTile.style.backgroundColor = '#' + this.terrain.color;
    thisTile.style.width = window.game.board.gridSize + 'px';
    thisTile.style.height = window.game.board.gridSize + 'px';
    thisTile.style.display = 'inline-block';
    row.appendChild(thisTile);
  }
}
export default Tile;
