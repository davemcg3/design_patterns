class Environment {
  constructor() {
    this.gravity = 8;
    this.stopTime = false;
    this.gameOver = false;
    this.timePace = 50;
  }

  input (e) {
    //escape key
    if (e.keyCode == '27') {
      if (this.stopTime && !this.gameOver) {
        this.stopTime = false;
        window.masterClock = window.setTimeout(window.box.environment.timeLoop, window.box.environment.timePace);
      } else {
        this.stopTime = true;
      }
    }
  }

  timeLoop()
  {
    //get the player object
    var player = window.box.player;

    //check invincibility
    // console.log('timeloop invincible? ' + player.invincible + ' -> ' + !!player.invincible + ' :: invincible for ' + (Date.now() - player.invincible) + ', should only last ' + player.invincibilityDuration);
    if (player.invincible > 0 && (Date.now() - player.invincible) > player.invincibilityDuration){
      player.invincible = 0;
      // console.log('reset player invincibility');
    }

    //apply gravity to objects
    window.box.applyGravity(window.box.environment.gravity);

    //consider generating a new enemy
    var difficulty = 2000 - (player.score * 50);
    var chance = 0.2 + (player.score * 0.01);
    if (Date.now() - window.box.lastRat > difficulty && Math.random() < chance) {
      window.box.lastRat = Date.now();
      window.box.enemies.push(window.box.ratFactory.generate());
      window.box.addToCanvas(window.box.enemies[window.box.enemies.length - 1]);
      // console.log('added rat, count: ' + window.box.ratFactory.ratCount);
    }

    //redraw
    window.box.draw();

    //check for collisions
    player.checkCollisions();

    //set a new loop
    if (!window.box.environment.stopTime) {
      window.masterClock = window.setTimeout(window.box.environment.timeLoop, window.box.environment.timePace);
    }
  }
}

export default Environment;
