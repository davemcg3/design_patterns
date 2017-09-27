"use strict";

import Editor from '/js/edit.js';

(function main() {
  //namespace
  window.alphaBuilder = window.alphaBuilder || {};

  //route
  var splitpath = window.location.pathname.split("/").filter(function (input) {
    if (input !== "" && input !== undefined)
      return true;
    return false;
  });
  var action = splitpath.shift();
  var site = splitpath.shift();
  var args = window.location.search.substr(1);
  switch(action){
    case "edit":
      //instantiate editor
      window.alphaBuilder.editor = new Editor(site, args);
      break;
    case "view":
      //instantiate viewer
      console.log('view');
      break;
    default:
  }

  window.alphaBuilder.editor.draw();

})();
