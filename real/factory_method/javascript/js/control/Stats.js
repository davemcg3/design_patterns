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

export default Stats;