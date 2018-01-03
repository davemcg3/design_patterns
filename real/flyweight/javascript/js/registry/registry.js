import Terrain from '/js/registry/terrain.js';
import grassland from '/js/registry/terrain/grassland.js'
import mountain from '/js/registry/terrain/mountain.js'
import ocean from '/js/registry/terrain/ocean.js'

class Registry {
  constructor () {
    let self = this;
    self.terrains = {};
    // TODO: glob terrain directory and create object for each
    [grassland, mountain, ocean].forEach(function (terrainType){
      self.terrains[terrainType.name] = new Terrain (terrainType);
    });
  }


}
export default Registry;
