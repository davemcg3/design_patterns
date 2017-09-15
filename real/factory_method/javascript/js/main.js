"use strict";

import ViewBox from '/js/board/ViewBox.js';
import Background from '/js/board/Background.js';
import Player from '/js/board/Player.js';
import Stats from '/js/control/Stats.js';
import Environment from '/js/control/Environment.js';
import InputDispatcher from '/js/control/InputDispatcher.js';
import RatFactory from '/js/generators/RatFactory.js';

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
  document.onkeydown = window.inputDispatcher.checkKey;

  window.masterClock = window.setTimeout(window.environment.timeLoop, window.environment.timePace);
}

main();
