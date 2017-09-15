"use strict";

class ViewBox {
  constructor(content) {
    //hidden on browsers that support the canvas element
    this.content = "Your browser sucks. Use Chrome.";
    this.canvasElements = [];

    var playerView = document.createElement('canvas');
    playerView.setAttribute("id", "playerView");
    // set height and width explicitly, defaults to 300wx150h
    playerView.setAttribute("width", (document.documentElement.clientWidth * 0.90));
    this.width = playerView.getAttribute("width");
    playerView.setAttribute("height", (document.documentElement.clientHeight * 0.90));
    this.height = playerView.getAttribute("height");
    this.groundLevel = Math.round(this.height * 0.70);
    var divContent = document.createTextNode(this.content);
    playerView.append(divContent);
    document.body.append(playerView);

    this.canvas = document.getElementById('playerView');
    if (this.canvas.getContext) {
      this.canvasContext = this.canvas.getContext('2d');
    } else {
      //canvas element not supported, maybe show the user an error
    }

    this.flashBoxWhite = false;
    this.flashBoxCount = 0;
  }

  addToCanvas(element) {
    this.canvasElements.push(element);
  }

  applyGravity(gravity) {
    if (this.canvas.getContext) {
      this.canvasElements.forEach(function (element) {
        element.updatePosition({gravity: gravity});
      });
    }
  }

  flashBox(flashes = 0) {
    if (flashes > 0) {
      window.box.flashBoxCount = flashes;
    }
    // console.log('flashBoxCount:' + window.box.flashBoxCount + ', white? ' + window.box.flashBoxWhite);
    var context = window.box.canvasContext;

    if (window.box.flashBoxWhite == false && window.box.flashBoxCount > 0) {
      //flash white
      // console.log('flash white');
      context.fillStyle = 'rgba(255,255,255,0.8)';
      context.fillRect(0, 0, window.box.width, window.box.height);
      window.box.flashBoxWhite = true;
      if (--window.box.flashBoxCount > 0) {
        setTimeout(window.box.flashBox, 80);
      }
    } else if (window.box.flashBoxWhite == true && window.box.flashBoxCount > 0) {
      //invisible
      // console.log('flash invisible');
      context.fillStyle = 'rgba(255,255,255,0)';
      context.fillRect(0, 0, window.box.width, window.box.height);
      window.box.flashBoxWhite = false;
      if (window.box.flashBoxCount > 0) {
        setTimeout(window.box.flashBox, 80);
      }
    }
  }

  gameOver() {
    var context = window.box.canvasContext;
    context.font = '48px serif';
    context.textAlign = 'center';
    context.fillStyle = 'rgb(255, 255, 255)';
    context.fillText('Game Over', (window.box.width / 2), ((window.box.height - 48) / 2));
  }

  draw() {
    self = this;
    if (this.canvas.getContext) {
      this.canvasElements.forEach(function (element) {
        element.draw(self.canvasContext);
      });
    }
  }
}

class Background {
  constructor() {
    this.name = "Background"
  }

  updatePosition() {
    //noop
  }

  draw() {
    var context = window.box.canvasContext;

    //ground
    context.fillStyle = 'rgba(30,30,30,0.6)';
    context.fillRect(0, window.box.groundLevel, window.box.width, (window.box.height - window.box.groundLevel));

    //sky
    context.fillStyle = 'rgba(60,100,255,0.85)';
    context.fillRect(0, 0, window.box.width, window.box.groundLevel);
  }
}

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

class Stats {
  constructor () {
    this.name = "Stats"
  }

  updatePosition() {

  }

  draw(context) {
    //get the player object
    var player = null;
    window.box.canvasElements.forEach(function (element) {
      if (element.constructor.name == 'Player') {
        player = element;
      }
    });

    context.font = '24px sans-serif';
    context.textAlign = 'left';
    context.fillStyle = 'rgb(255, 255, 255)';
    context.textBaseline = 'top';
    var text = 'Score: ' + player.score + '  ';
    for (var i = 0; i < player.lives; i++){
      text += '\u2665 ';
    }
    context.fillText(text, 10, 10);
  }
}

function checkKey(e) {
  var e = e || window.event;
  if ([38, 27].includes(e.keyCode)){
    //console.log('up arrow pressed');
    window.inputDispatcher.dispatchEvent(e);
  }
  //left = 37
  //up = 38
  //right = 39
  //down = 40
}

class Environment {
  constructor() {
    this.gravity = 8;
    this.stopTime = false;
    this.gameOver = false;
  }

  input (e) {
    //escape key
    if (e.keyCode == '27') {
      if (this.stopTime && !this.gameOver) {
        this.stopTime = false;
        window.masterClock = window.setTimeout(timeLoop, 150);
      } else {
        this.stopTime = true;
      }
    }
  }
}

class InputDispatcher {
  constructor(receivers) {
    this.receivers = receivers;
  }

  dispatchEvent(e){
    this.receivers.forEach(function (receiver) {
      //console.log('dispatching event to ' + receiver);
      receiver.input(e);
    });
  }
}

function timeLoop()
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
    window.masterClock = window.setTimeout(timeLoop, 50);
  }
}


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

class CharacterFactory {
  constructor() {
    // console.log('CharacterFactory');
  }
}

class EnemyFactory extends CharacterFactory {
  constructor() {
    // console.log('EnemyFactory');
    super();
  }
}

class RatFactory extends EnemyFactory {
  constructor() {
    // console.log('RatFactory');
    super();
  }

  generate() {
    // console.log('generating');
    return new Character({name: "rat", accelerationX: 20});
  }
}

function main() {

  window.box = new ViewBox();

  var background = new Background();
  window.box.addToCanvas(background);

  var player = new Player('player');
  window.box.addToCanvas(player);

  var stats = new Stats();
  window.box.addToCanvas(stats);

  window.environment = new Environment();
  window.inputDispatcher = new InputDispatcher([player, window.environment]);

  window.ratFactory = new RatFactory();
  window.enemies = [];
  window.lastRat = Date.now();
  window.enemies.push(window.ratFactory.generate());
  window.box.addToCanvas(window.enemies[window.enemies.length - 1]);

  window.box.draw();

  //check for movement
  document.onkeydown = checkKey;

  window.masterClock = window.setTimeout(timeLoop, 50);
}

main();
