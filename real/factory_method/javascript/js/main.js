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
    this.draw();
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
  }

  input (e) {
    //console.log('event received');
    if (e.keyCode == '38' && this.position[1] == (window.box.groundLevel - this.height)) {
      this.acceleration = this.jumpStrength;
      console.log(this.acceleration);
      this.updatePosition();
    }
  }

  updatePosition (modifier=null) {
    console.log(this.acceleration);
    if (modifier != null && modifier.gravity > 0 && this.position[1] < window.box.groundLevel ) {
      //console.log(modifier.gravity);
      if (this.acceleration > 0) {
        this.acceleration -= modifier.gravity;
      }
      if (this.acceleration < 0) {
        this.acceleration = 0;
      }
    }
    this.position[1] -= this.acceleration;
  }

  draw(context) {
    context.fillStyle = 'rgb(0, 200, 0)';
    context.fillRect(this.position[0], this.position[1], this.width, this.height);
  }
}

function checkKey(e) {
  var e = e || window.event;
  //console.log(e.keyCode);

  if ((e.keyCode) == '38'){
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
    this.gravity = 10;
  }
}

class InputDispatcher {
  constructor(receivers) {
    this.receivers = receivers;
  }

  dispatchEvent(e){
    this.receivers.forEach(function (receiver) {
      console.log('dispatching event');
      receiver.input(e);
    });
  }
}

function timeLoop()
{
  //apply gravity to objects
  window.box.applyGravity(window.environment.gravity);

  //redraw
  window.box.draw();

  //set a new loop
  window.setTimeout(timeLoop, 1000);
}

function main() {

  window.box = new ViewBox();

  var background = new Background();

  var player = new Player('player');
  box.addToCanvas(player);
  box.draw();

  window.inputDispatcher = new InputDispatcher([player]);
  window.environment = new Environment();

  //check for movement
  document.onkeydown = checkKey;

  window.setTimeout(timeLoop, 1000);
}

main();
