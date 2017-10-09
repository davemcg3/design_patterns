"use strict";

import ObjectBase from '/js/object_base.js';
import * as Board from '/js/types/board.js'
import * as Column from '/js/types/column.js'
import * as Card from '/js/types/card.js'
import * as Register from '/js/types/registry.js'
import * as Event from '/js/event.js'

class Main {
  constructor(){
    // Calling it ProtoManage for now

    //namespacing
    var ProtoManage = window.ProtoManage || {};
    window.ProtoManage = ProtoManage;

    //I'm also going to use my registry as a spawner and an event handler
    //TODO: registry, event, and board types should all enforce singleton pattern
    ProtoManage.registry = new ObjectBase([Register, Event], {'title': 'ProtoManage' });

    //Clone a board, column, and card off my spawner
    ProtoManage.registry.addObject(ProtoManage.registry.clone(Board, {"title": "Default Board", "containedBy": ProtoManage.registry}));
    ProtoManage.registry.addObject(ProtoManage.registry.clone(Column, {"title": "Default List", "containedBy": ProtoManage.registry.find("type", "board")}));
    ProtoManage.registry.addObject(ProtoManage.registry.clone(Card, {"title": "Your First Card!","containedBy": ProtoManage.registry.find("type", "column")}));

    //add a new column and move a card from one column to another
    ProtoManage.registry.addObject(ProtoManage.registry.clone(Column, {"title": "Test List", "containedBy": ProtoManage.registry.find("type", "board")}));
    ProtoManage.registry.move(ProtoManage.registry.find("type", "card"), ProtoManage.registry.find("title", "Test List"));

    //check output
    console.log(ProtoManage.registry);
    ProtoManage.registry.contains.forEach(function(obj){
      console.log(obj);
    });

    ProtoManage.registry.render();

  }
}

document.addEventListener("DOMContentLoaded", (e) => new Main());
