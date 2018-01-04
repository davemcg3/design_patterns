"use strict";

import Registry from '/js/registry/registry.js';
import Board from '/js/board/board.js';
import Porthole from '/js/porthole/porthole.js';

(function main() {
  //namespace
  window.game = window.game || {};

  window.game.registry = new Registry();

  window.game.board = new Board(window.game.registry, 20, 7);
  window.game.board.draw();

  window.game.porthole = new Porthole(window.game.registry, window.game.board);

  console.log(window.game);
})();
