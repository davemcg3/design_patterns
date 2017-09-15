class Background  {
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

export default Background;
