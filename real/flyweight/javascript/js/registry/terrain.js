class Terrain {
  constructor (configuration) {
    let self = this;
    // console.log('passed in configuration to the Terrain class:');
    // console.log(configuration);
    for (var key in configuration){
      if (configuration.hasOwnProperty(key)) {
        self[key] = configuration[key];
      }
    }
  }
}
export default Terrain;
