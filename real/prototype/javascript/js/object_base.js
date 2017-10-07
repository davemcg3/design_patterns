export default class ObjectBase {
  constructor (type=null, options=null) {
    this.id = ++ObjectBase.prototype.objectCount;

    this.type = [];
    //object can contain or be contained by itself, a little bit of the Composition pattern
    this.contains = [];
    this.containedBy = null;
    this.title = '';

    //mixin functions from our Type Object (passed in) on this instance, not the prototype
    //I'm using the Type Object Pattern here to avoid subclassing and get around single inheritance
    this.assign(type);

    //assign passed in attributes
    this.assign(options);

    //add this object to its container
    if (this.containedBy !== null){
      this.containedBy.addObject(this);
    }
  }

  assign(iterable){
    //deal with collections
    if (iterable.constructor === Array){
      for (var value of iterable) {
        for (var key in value) {
          if (key === 'type'){
            this.type.push(value[key]);
          } else {
            this[key] = value[key];
          }
        }
      }
    } else {
      //deal with things that aren't collections
      for (var key in iterable){
        if (key === 'type'){
          this.type.push(iterable[key]);
        } else {
          this[key] = iterable[key];
        }
      }
    }
  }

  //TypeError: cyclic object value
  //objects contain a reference to their parent, and their parent contains a reference to them
  toJson() {
    return JSON.stringify(this);
  }

  addObject (object) {
    this.contains.push(object);
  }

  removeObject (object) {
    this.contains.pop(object);
  }

  find (attribute, value) {
    for (var obj of this.contains) {
      if (obj[attribute].constructor === Array){ //been using this test a lot, might want a helper function for it
        for (var objValue of obj[attribute]){
          if (objValue === value) {
            return obj;
          }
        }
      } else {
        if (obj[attribute] === value){
          return obj;
        }
      }
    }
    return null;
  }

  setTitle(string) {
    this.title = string;
  }

  getTitle(string) {
    return this.title;
  }

  //Prototype Pattern
  clone (type=null, options) {
    return new ObjectBase(type, options);
  }
}

// static variable to set object id
ObjectBase.prototype.objectCount = 0;
