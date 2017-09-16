"use strict";

import ViewBox from '/js/board/ViewBox.js';
import InputDispatcher from '/js/control/InputDispatcher.js';

(function main() {
  //create our board
  window.box = new ViewBox();

  //add our elements to the board
  window.box.initGame();

  //route inputs
  window.inputDispatcher = new InputDispatcher([window.box.player, window.box.environment]);

  //setup check for movement
  document.onkeydown = window.inputDispatcher.checkKey;

  //start the game!
  window.masterClock = window.setTimeout(window.box.environment.timeLoop, window.box.environment.timePace);
})();
