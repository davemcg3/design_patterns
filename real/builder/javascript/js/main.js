"use strict";

// import ViewBox from '/js/board/ViewBox.js';
// import InputDispatcher from '/js/control/InputDispatcher.js';

(function main() {
  //route
  var splitpath = window.location.pathname.split("/").filter(function (input) {
    if (input !== "" && input !== undefined)
      return true;
    return false;
  });
  var action = splitpath.shift();
  var site = splitpath.shift();
  switch(action){
    case "edit":
      //instantiate editor
      console.log('edit');
      break;
    case "view":
      //instantiate viewer
      console.log('view');
      break;
    default:
  }

})();
