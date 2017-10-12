export default function Tile (terrain=null, size=100){ //size in pixels
  this.id = ++Tile.prototype.id;
  this.terrain = terrain || Tile.prototype.terrains.sample();
  this.size = size;
}

Tile.prototype.to_s = function (){
  return 'id: ' + this.id + ', terrain: ' + Tile.prototype.terrains[this.terrain];
}

Tile.prototype.to_html = function(){
  var tile = document.createElement('div');
  tile.setAttribute('id', this.id);
  tile.setAttribute('class', 'tile');
  tile.style.backgroundColor = '#' + Tile.prototype.tcolours[this.terrain];
  tile.style.width = this.size.toString() + 'px';
  tile.style.height = this.size.toString() + 'px';
  tile.append(document.createTextNode(this.id + ': ' + Tile.prototype.terrains[this.terrain]));
  return tile;
}

// these are all types and will have attributes and possibly methods associated with them, but here for now
Tile.prototype.terrains = new Array('desert', 'plains', 'grassland', 'forest', 'tundra', 'hills', 'mountain', 'water');
Tile.prototype.tcolours = new Array('d2b48c', 'b5a642', '556b2f', '4b5320', '85754e', '6c541e', '856d4d', '1e2666');
Tile.prototype.id = 0;
