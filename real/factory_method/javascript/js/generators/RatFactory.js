import CharacterFactory from "/js/generators/CharacterFactory.js";
import Character from "/js/board/Character.js";

class RatFactory extends CharacterFactory
{
  constructor() {
    // console.log('RatFactory');
    super();
  }

  generate() {
    // console.log('generating');
    return new Character({name: "rat", accelerationX: 20});
  }
}

export default RatFactory;