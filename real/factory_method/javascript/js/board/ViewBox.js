class ViewBox
{
  constructor(content)
  {
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

  addToCanvas(element)
  {
    this.canvasElements.push(element);
  }

  applyGravity(gravity)
  {
    if (this.canvas.getContext) {
      this.canvasElements.forEach(function (element) {
        element.updatePosition({gravity: gravity});
      });
    }
  }

  flashBox(flashes = 0)
  {
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

  gameOver()
  {
    var context = window.box.canvasContext;
    context.font = '48px serif';
    context.textAlign = 'center';
    context.fillStyle = 'rgb(255, 255, 255)';
    context.fillText('Game Over', (window.box.width / 2), ((window.box.height - 48) / 2));
  }

  draw()
  {
    self = this;
    if (this.canvas.getContext) {
      this.canvasElements.forEach(function (element) {
        element.draw(self.canvasContext);
      });
    }
  }
}

export default ViewBox;