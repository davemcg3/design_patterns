"use strict";

import Registry from '/js/registry/registry.js';
import Board from '/js/board/board.js';

(function main() {
  //namespace
  window.game = window.game || {};

  window.game.registry = new Registry();

  window.game.board = new Board(window.game.registry);
  window.game.board.draw();

  console.log(window.game);
})();
