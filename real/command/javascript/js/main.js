"use strict";

import Client from '/js/client.js';

// (function main() {
class Main {
  constructor() {
    //namespace
    window.command = window.command || {};
    window.command.client = new Client;

    // do some stuff
    var client = window.command.client;
    client.execute({command: 'add', key: 'best_animal', value: 'dog'});
    client.execute({command: 'add', key: 'worst_animal', value: 'cat'});
    client.execute({command: 'change', key: 'worst_animal', value: 'fish'});
    client.execute({command: 'remove', key: 'worst_animal', value: null});
    client.execute({command: 'undo'});
    client.execute({command: 'add', key: 'weirdest_animal', value: 'platypus'});
    client.execute({command: 'undo', value: 2});
    client.execute({command: 'undo', value: 2});
    client.execute({command: 'undo'});
  }
}
  // })();
document.addEventListener("DOMContentLoaded", (e) => new Main());


/*

  What I would like to build is a system that builds JSON objects by making changes to parameters on the object. So, I want a Command to add a parameter on the JSON object, a command to delete a parameter on the object, and a command to change a parameter on the object. Those should be attributes, not parameters.  My concrete commands should create a memento with these properties: action (add/delete/change), property name, old value (null for add), new value (null for delete). If we want to expand the system later we could develop a rename command that strings together our add and delete commands.

 */