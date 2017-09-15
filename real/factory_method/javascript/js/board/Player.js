class Player {
  constructor(name) {
    this.name = name;

    this.width = 25;
    this.height = 25;
    this.position = [Math.round(window.box.width * 0.15), (window.box.groundLevel - this.height)]; //(x, y)
    this.jumpStrength = 40;
    this.acceleration = 0;
    this.score = 0;
    this.lives = 3;
    this.invincible = 0;
    this.invincibilityDuration = 0;
  }

  input (e) {
    //console.log('event received');
    if (e.keyCode == '38' && this.position[1] == (window.box.groundLevel - this.height) && !window.environment.stopTime) {
      this.acceleration = this.jumpStrength;
      this.updatePosition();
    }
  }

  updatePosition (modifier=null) {
    if (modifier != null && modifier.gravity > 0 && this.position[1] < (window.box.groundLevel - this.height ) ) {
      //gravity
      //console.log(modifier.gravity);
      this.acceleration -= modifier.gravity;
      this.position[1] -= this.acceleration;
    } else if (this.acceleration > 0) {
      //not gravity
      this.position[1] -= this.acceleration;
    }
  }

  checkCollisions () {
    self = this;
    window.enemies.forEach(function(enemy) {
      if (
        self.invincible == 0
        &&
        (
          (
            enemy.position[0] >= self.position[0]
            && enemy.position[0] <= ( self.position[0] + self.width )
            && enemy.position[1] >= self.position[1]
            && enemy.position[1] <= (self.position[1] + self.height)
          )
          ||
          (
            (enemy.position[0] + enemy.width) >= self.position[0]
            && (enemy.position[0] + enemy.width) <= (self.position[0] + self.width)
            && (enemy.position[1] + enemy.height) >= self.position[1]
            && (enemy.position[1] + enemy.height) <= (self.position[1] + self.height)
          )
        )
      ) {
        // console.log('collision');
        self.lives -= 1;
        enemy.collisions++;
        if (self.lives < 1) {
          // console.log('game over');
          //give stats one more draw to get rid of that last heart
          window.box.draw();
          window.environment.stopTime = true;
          window.environment.gameOver = true;
          window.box.gameOver();
        }
        if (!window.environment.stopTime) {
          window.box.flashBox(3);
        }
        self.invincible = Date.now();
        self.invincibilityDuration = 500;
        // console.log('made invincible');
      }
    });
  }

  draw(context) {
    context.fillStyle = 'rgb(0, 200, 0)';
    context.fillRect(this.position[0], this.position[1], this.width, this.height);
  }
}

export default Player;