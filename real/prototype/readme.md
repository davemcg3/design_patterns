#Prototype Pattern

##Overview
Building a prototypical app in a class-based language. I've decided to build a Trello-inspired task management app to showcase this pattern. I wanted something where it would make sense for the user to want to generate new objects constantly and I remembered that in Trello users are constantly creating new cards and columns, and sometimes boards, so it was a perfect fit. I'll be mixing the Type Object pattern in with the Prototype pattern to generate all the objects needed in the project.  This document is beginning its life as a design document that I am using to plan out parts of the app before I build it. If it doesn't make sense to you, sorry, but it's not really for you. If it does make sense to you, great! Hopefully it helps you understand what I've built.

##Scratchpad

I essentially need 3 types of objects for the MVP of this product (obviously I would need more for a productized version, like user accounts and help objects and blah blah blah):
* Board to hold columns
* Column to hold cards
* Cards that exemplify tasks

I've been thinking it through and I think that I can reduce the whole thing to a single object that implements type prototypes which add methods to the base object so that the object acts like whatever type I want, and I think I _could_ reduce it to 2 types:
* Card
* Container

And then I could mix in methods that are specific to columns or to the board. But, if I took it a step further and allowed a card to also hold objects then I could reduce it to just one type:
* Object

This actually makes sense from a semantic perspective, because down the road I might want to add attributes to a card, and I could make each of those attributes its own type or object so that it's easy to expand. Examples of attributes might include an ordered list of subtasks or a photo attachment, so every object should be able to contain other objects. I can use modules if working in Ruby to add in methods from the various types. Not sure what ES6 tool is the equivalent but I'm sure I can create some sort of thing with utility methods and properties that I can include in my base object.

My object needs to include a clone method where it can create a new object based on itself (this is the Prototype pattern in a nutshell). My immediate thought based on some reading I did last night is that  I should create a spawner that holds an instance of the prototype, and then anytime I'm trying to create a new object I hit that spawner and it pops out a new object for me. One of the other things that I read about is creating a registry of prototypes that the Spawner can reach into to grab the prototype of the object that the user wants to create, that way the prototypes don't get garbage collected and are held in one place. 

Thinking it through, I think my spawner doesn't need to hold an instance of the prototype, because it can be an instance of the base object and that way it just creates clones of itself when hit. Using the Type Object pattern I don't need different prototypes for different types of objects, since all the objects are the same base object.  That's a hell of an abstraction. 

I'll need a registry for the different types so that the spawner can just reach out and attach the type it needs for the various objects. Since the spawner is an instance of the base object, and the base object can act as a container, the spawner itself can act as its own registry and hold the prototypes of the type objects. I can attach those as attributes to the single spawner instance so that they are not cloned into each spawned object.

Each object should have a toJson method so that it can be represented in JSON and I can move those pieces around easily (like storing them on a remote db).

I should include a registry that contains a reference to all instantiated objects. It can be an instance of our base Object, I'm just not sure that an object can be contained by 2 objects, i.e. a card can be contained by a column and also contained in the registry. The concept of pointers in C++ makes sense here, I'm just not 100% sure how that is implemented in ES6.

I also want an event object that receives triggers from within the platform and delegates them to interested listeners. This would be great for building a history of things that have happened on the system, for sending notifications when something happens, or doing some other unknown thing conditionally when a task occurs. These should be user-configurable. This is something that JIRA offers that Trello does not.

##Implementation
Essentially, in pseudocode, leaning toward ES6 since this fits really well with building an interface, my structure is going to look something like this:

class Object {
  static objectCount = 0;
  initialize (type=null) {
    this.id = ++objectCount;
    this.contains = [];
    this.containedBy = null;
    this.type = type;
    this.title = '';
    if (this.type !== null){
      execute_statement_that_dynamically_adds_attributes_and_methods_from_type();
    }  
  }
  
  toJson {
    return JSON.stringify(this);  
  }
  
  addObject (object) {
    contains.push(object);
  }
  
  removeObject (object) {
    contains.pop(object);
  }
  
  setTitle(string) {
    this.title = string;
  }
  
  getTitle(string) {
    return this.title;
  }
  
  clone (type=null) {
    return Object.initialize(type);  
  }
}

module Board {
  //don't necessarily need anything here for an MVP, except maybe a method of drawing itself. I'm not to the UI yet, just thinking abstractly about the components and there is nothing special about a Board in the abstract.
}

module Column {
  //when a card is moved from one column to another we might want a transition event to trigger
  removeObject(object){
    window.Event.triggerEvent('before_transition', self, object);
    contains.pop(object);
    window.Event.triggerEvent('after_transition', self, object);
  }  
}

module Card {
  //not sure what is unique to a card in the abstract yet
}

module Event {
  triggerEvent(event, container, object){
    //not sure what this code will look like, but I want the user to be able to configure events to occur when an object is transitioned. Maybe send an email, or a push notification, or do something. Change the background color. I don't know, whatever.
  }
}

module Registry {
  move(object, target){
    findParent(object.containedBy).removeObject(object);
    target.addObject(object);
  }
  
  findParent(object){
    //I think I'm thinking about C++ pointers here, which isn't relevant in JS, but I essentially want to pass back a reference to the object that's contained in the registry to make sure we're acting on the same object.
    return (object referenced);
  }
}

##Things to still think through:
I need to figure out how to reference the intended location of the object when its spawned. For example, if a user clicks an add card button on a column they will expect that object to be added to the column where they clicked the button, but my initial design doesn't contain the logic about where to put the newly instantiated object.

I think I'm missing a controller piece that accepts user actions and acts on the relevant objects. I touched on it with the implementation of the move function in the Registry module, but I don't have an object that's actually calling the move function.  It might look like this:

class Listener {
  onEventOccurance(event){
    doAction(); //like: registry.move(e.target, differentColumn);
  }
}