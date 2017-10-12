"use strict";

import Map from '/js/map.js'
import { sample } from '/js/utils.js'

class Main {
  constructor(){
    //setup
    this.define_utils();

    // Calling it SimpleCiv for now

    //namespacing
    var Sc = window.Sc || {};
    window.Sc = Sc;

    //build and display the map
    var map = new Map(10,5);
    console.log(map.to_s());
    document.getElementsByTagName('body')[0].append(map.draw());

    //turn the tiles into types with attributes like impassable, or movement points reduced, or movement only by certain player types
    //get a better seeding algorithm than random, similar tile types should be seeded together (i.e. mountain ranges, oceans, etc.)
    //build and display the player
    //allow the player to move around the map
    //hide the map the player hasn't seen yet, give him a visibility range, allow tall tiles to block visibility, but that should be based on the unit (i.e. an airplane could still see past)

  }

  define_utils () {
    //used to grab the id to index into our terrain types for our map tiles
    Array.prototype.sample = sample;
  }
}

document.addEventListener("DOMContentLoaded", (e) => new Main());
