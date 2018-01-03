# Flyweight Pattern

## Overview

Building a game board object. The game board can have 2 different types of terrain tiles:
- ocean
- grassland

The game board can be of arbitrary size. Since we can theoretically have thousands of identical tiles, this is the perfect use case of the flyweight class, where each of the tiles is stored once and then every "instance" of a tile is really just a reference to one of the stored tile types.

## Structure

Broadly, there will be a global object to keep the game namespaced. Everything will be contained within the global object.

### Major Components

1. Game board
2. Registry/Library
3. Porthole

#### Game board

The game board can be of any size. It will be a multi-dimensional array and located at each array index is a JSON object containing data relevant to that array. For the early version that will likely be some sort of numeric identifier, maybe [row]:[column] or something like that, and then the type of terrain to be displayed there.

#### Registry/Library

This is an object that contains a reference to all of the flyweights, this is our FlyweightFactory in terms of the pattern itself.

#### Porthole

Since the game board can be much, much larger than the monitor it is placed on, the porthole identifies the currently viewable part of the game board, along with any information that should always be shown, like game name and game score.

## Map-building Algorithm

We're outside the scope of the Flyweight Pattern here, but I wanted something more map-like than an alternating 3-terrain pattern, which is what I started with. There are an infinite number of approaches a programmer can take toward map-building, but here's the one that I used.  Eventually we can take these configuration variables and load them into profiles and then the user can choose which profile seed to use for their map, but that's down-the-road stuff at this point. For now, let's just get one working.

1. How much of the map should be water? For reference, the Earth is approximately 71% water and the oceans hold 96.5% of all the Earth's water. (https://water.usgs.gov/edu/earthhowmuch.html). This gives us approximate tile numbers of water and land tiles.
2. How many continents should be on the map? We'll play loose and allow them to touch if the algorithm goes that way, but generally we should try to keep a continent as a separate land mass. We can divide our land tiles by the number of continents and get the approximate size of the continents if we want to keep them more or less evenly sized. We can set aside a few tiles for islands if we want.
3. Pick a location for the "center"-ish of each of the continents. This will have to be based on map-size and number of continents.
4. Touch each of the surrounding eight tiles in a random-ish pattern and determine if it should be land or water. If we are out of tiles for this continent then it should be water. We can also add some low percentage chance of it being water even if there are land tiles left to represent a lake.
5. At this point we could sprinkle in islands if we accounted for them in our continent size calculations.
6. After we run out of land tiles fill in the rest of the tiles and make them water.
