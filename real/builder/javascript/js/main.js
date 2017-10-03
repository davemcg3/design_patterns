"use strict";

import Editor from '/js/edit.js';
import Viewer from '/js/view.js';

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
  var page = null;
  if (splitpath.length > 0) {
    page = splitpath.shift();
  }
  var args = window.location.search.substr(1);
  switch(action){
    case "edit":
      //instantiate editor
      window.alphaBuilder.editor = new Editor(site, args);
      break;
    case "view":
    default:
      //instantiate viewer
      window.alphaBuilder.viewer = new Viewer(site, page, args);
      break;
  }

})();
