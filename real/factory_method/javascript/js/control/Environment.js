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
        window.masterClock = window.setTimeout(window.environment.timeLoop, window.environment.timePace);
      } else {
        this.stopTime = true;
      }
    }
  }

  timeLoop()
  {
    //get the player object
    var player = null;
    window.box.canvasElements.forEach(function (element) {
      if (element.constructor.name == 'Player') {
        player = element;
      }
    });

    //check invincibility
    // console.log('timeloop invincible? ' + player.invincible + ' -> ' + !!player.invincible + ' :: invincible for ' + (Date.now() - player.invincible) + ', should only last ' + player.invincibilityDuration);
    if (player.invincible > 0 && (Date.now() - player.invincible) > player.invincibilityDuration){
      player.invincible = 0;
      // console.log('reset player invincibility');
    }

    //apply gravity to objects
    window.box.applyGravity(window.environment.gravity);

    var difficulty = 2000 - (player.score * 50);
    var chance = 0.2 + (player.score * 0.01);
    //consider generating a new enemy
    if (Date.now() - window.lastRat > difficulty && Math.random() < chance) {
      window.lastRat = Date.now();
      window.enemies.push(ratFactory.generate());
      window.box.addToCanvas(window.enemies[window.enemies.length - 1]);
    }

    //redraw
    window.box.draw();

    //check for collisions
    player.checkCollisions();

    //set a new loop
    if (!window.environment.stopTime) {
      window.masterClock = window.setTimeout(window.environment.timeLoop, window.environment.timePace);
    }
  }


}

export default Environment;