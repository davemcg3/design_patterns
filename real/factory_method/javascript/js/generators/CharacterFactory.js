class CharacterFactory {
  constructor(name='') {
    // console.log('CharacterFactory');
    // CharacterFactory isn't a first-class factory, but rather a factory that
    // other factories inherit from, so we're not returning an instance of a
    // character, but rather the attributes that all characters should possess
    this.attributes = {};
    this.attributes.name = name;
    this.attributes.width = 25;
    this.attributes.height = 25;
    this.attributes.jumpStrength = 0;
    this.attributes.accelerationY = 0;
    this.attributes.accelerationX = 0;
  }

  generate () {
    throw "CharacterFactory doesn't generate characters, just defines common attributes in the constructor."
  }
}

export default CharacterFactory;
