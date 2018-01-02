# Flyweight Pattern

## Overview

Building a game board object. The game board can have 3 different types of terrain tiles:
- ocean
- mountain
- grassland

The game board can be of arbitrary size. Since we can theoretically have thousands of identical tiles, this is the perfect use case of the flyweight class, where each of the tiles is stored once and then every "instance" of a tile is really just a reference to one of the 3 stored tiles.

## Structure

Broadly, there will be a global object to keep the game namespaced. Everything will be contained within the global object.

### Major Components

1. Game board
2. Registry/Library
3. Viewport

#### Game board

The game board can be of any size. It will be a multi-dimensional array and located at each array index is a JSON object containing data relevant to that array. For the early version that will likely be some sort of numeric identifier, maybe [row]:[column] or something like that, and then the type of terrain to be displayed there.

#### Registry/Library

This is an object that contains a reference to all of the flyweights, this is our FlyweightFactory in terms of the pattern itself. 

#### Viewport

Since the game board can be much, much larger than the monitor it is placed on, the viewport identifies the currently viewable part of the game board, along with any information that should always be shown, like game name and game score.
