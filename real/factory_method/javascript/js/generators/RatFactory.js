import CharacterFactory from "/js/generators/CharacterFactory.js";
import Character from "/js/board/Character.js";

class RatFactory extends CharacterFactory
{
  constructor() {
    // console.log('RatFactory');
    //get defaults
    super();
    this.ratCount = 0;
  }

  generate() {
    //override where necessary
    this.attributes.name = "rat" + this.ratCount++;
    this.attributes.pointsValue = 1;
    this.attributes.collisions = 0;
    this.attributes.accelerationX = 20;
    this.attributes.position = [Math.round(window.box.width - this.attributes.width), (window.box.groundLevel - this.attributes.height)]; //(x, y)
    return new Character(this.attributes);
  }
}

export default RatFactory;
