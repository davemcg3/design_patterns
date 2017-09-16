// this should be a prototype, not a class
class Character {
  constructor(attributes) {
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
        var player = window.box.player;
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
