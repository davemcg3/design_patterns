import Terrain from '/js/registry/terrain.js';
import grassland from '/js/registry/terrain/grassland.js'
import mountain from '/js/registry/terrain/mountain.js' //currently unused
import ocean from '/js/registry/terrain/ocean.js' //should probably be water instead of ocean and then subclass with ocean, coast, lake

class Registry {
  constructor () {
    let self = this;
    self.terrains = {};
    // TODO: glob terrain directory and create object for each
    [grassland, ocean].forEach(function (terrainType){
      self.terrains[terrainType.name] = new Terrain (terrainType);
    });
  }

  getRegisteredItem(itemType=undefined, specificItem=undefined){
    //TODO: Build out a better digger so we can have deeply nested searches
    //if itemType is undefined return everything
    //if itemType is defined but specificItem is undefined return all items of that itemType
    //if both are defined return specific item
    if (itemType == undefined) {
      // return each type
      // TODO: implement
    } else if (itemType != undefined && specificItem == undefined) {
      // return all of itemType
      // TODO: implement
    } else if (itemType != undefined && specificItem != undefined) {
      // return specific item
      return this[itemType][specificItem];
    } else {
      // woah
      // TODO: implement
    }
  }
}
export default Registry;
