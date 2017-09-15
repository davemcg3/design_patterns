class Character {
  constructor(attributes) {
    //defaults, don't need some of this
    this.name = name;

    this.width = 25;
    this.height = 25;
    this.position = [Math.round(window.box.width - this.width), (window.box.groundLevel - this.height)]; //(x, y)
    this.jumpStrength = 40;
    this.acceleration = 0;
    this.collisions = 0;
    this.pointsValue = 1;

    //override with actual
    //TODO: switch to array_merge and then set each
    for(var key in attributes) {
      var value = attributes[key];
      this[key] = value;
    };
  }

  updatePosition() {
    this.position[0] -= this.accelerationX;
    if ((this.position[0] + this.width) < 0) {
      //TODO: delete enemies once they're off screen
      this.accelerationX = 0;
      if (this.collisions == 0) {
        //get the player object
        var player = null;
        window.box.canvasElements.forEach(function (element) {
          if (element.constructor.name == 'Player') {
            player = element;
          }
        });
        player.score += this.pointsValue;
        this.pointsValue = 0;
      }
    }
  }

  draw(context) {
    context.fillStyle = 'rgb(200, 0, 0)';
    context.fillRect(this.position[0], this.position[1], this.width, this.height);
  }
}

export default Character;