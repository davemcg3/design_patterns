import Background from '/js/board/Background.js';
import Player from '/js/board/Player.js';
import Stats from '/js/control/Stats.js';
import Environment from '/js/control/Environment.js';
import RatFactory from '/js/generators/RatFactory.js';

// this should probably be a singleton
class ViewBox
{
  constructor(content)
  {
    //hidden on browsers that support the canvas element
    this.content = "HTML5 canvas doesn't seem to supported in your browser. Use latest Chrome.";
    this.canvasElements = [];

    //build our canvas element and attach it to the document
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

    //store a reference to the board in this object
    this.canvas = document.getElementById('playerView');
    if (this.canvas.getContext) {
      this.canvasContext = this.canvas.getContext('2d');
    } else {
      //canvas element not supported, maybe show the user an error
    }

    // set attributes
    this.flashBoxWhite = false;
    this.flashBoxCount = 0;
  }

  initGame()
  {
    //create a background
    this.background = new Background();
    this.addToCanvas(this.background);

    //create a player
    this.player = new Player('player');
    this.addToCanvas(this.player);

    //create an environment
    this.environment = new Environment();

    //create the stats for the top left
    this.stats = new Stats();
    this.addToCanvas(this.stats);

    //array to hold our enemies
    this.enemies = [];
    //build a factory to create enemies
    this.ratFactory = new RatFactory();
    this.lastRat = 0;
  }

  addToCanvas(element)
  {
    this.canvasElements.push(element);
  }

  applyGravity(gravity)
  {
    if (this.canvas.getContext) {
      this.canvasElements.forEach(function (element) {
        //all elements on the canvas must implement this function, probably
        //should create an interface with an abstract method that all canvas
        //elements inherit from
        element.updatePosition({gravity: gravity});
      });
    }
  }

  flashBox(flashes = 0)
  {
    if (flashes > 0) {
      window.box.flashBoxCount = flashes;
    }

    var context = window.box.canvasContext;

    if (window.box.flashBoxWhite == false && window.box.flashBoxCount > 0) {
      //flash white
      context.fillStyle = 'rgba(255,255,255,0.8)';
      context.fillRect(0, 0, window.box.width, window.box.height);
      window.box.flashBoxWhite = true;
      if (--window.box.flashBoxCount > 0) {
        setTimeout(window.box.flashBox, 80);
      }
    } else if (window.box.flashBoxWhite == true && window.box.flashBoxCount > 0) {
      //invisible
      context.fillStyle = 'rgba(255,255,255,0)';
      context.fillRect(0, 0, window.box.width, window.box.height);
      window.box.flashBoxWhite = false;
      if (window.box.flashBoxCount > 0) {
        setTimeout(window.box.flashBox, 80);
      }
    }
  }

  gameOver()
  {
    var context = window.box.canvasContext;
    context.font = '48px sans-serif';
    context.textAlign = 'center';
    context.fillStyle = 'rgb(255, 255, 255)';
    context.fillText('Game Over', (window.box.width / 2), ((window.box.height - 48) / 2));
  }

  draw()
  {
    self = this;
    if (this.canvas.getContext) {
      this.canvasElements.forEach(function (element) {
        //all canvas elements also need to implement this function
        element.draw(self.canvasContext);
      });
    }
  }
}

export default ViewBox;
