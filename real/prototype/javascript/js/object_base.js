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
    if (!this.contains.includes(object)) {
      this.contains.push(object);
    }
  }

  removeObject (object) {
    this.contains = this.contains.filter(child => (child.id !== object.id))
  }

  find (attribute, value) {
    // console.log(attribute + '::' + value);
    for (var obj of this.contains) {
      if (obj[attribute].constructor === Array){ //been using this test a lot, might want a helper function for it
        for (var objValue of obj[attribute]){
          if (objValue === value) {
            return obj;
          }
        }
      } else {
        // console.log('(' + typeof(obj[attribute]) + ') ' + obj[attribute] + ' === (' + typeof(value) + ') ' + value + ' ? ' + (obj[attribute] === value));
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

  render(){
    var element = null;
    if (!(element = document.getElementById(this.id))) {
      //create element if it doesn't exist
      element = document.createElement('div');
      element.setAttribute('id', this.id);
      element.setAttribute('class', this.type.join(' ') + ' col-xs-12');
      var row = document.createElement('div');
      row.setAttribute('class', 'row');
      var column = document.createElement('div');
      column.setAttribute('class', 'col-xs-12');
      var title = document.createTextNode(this.title);
      var titlep = document.createElement('p');
      titlep.append(title);
      var titlecol = document.createElement('div');
      titlecol.setAttribute('class', 'col-xs-12');
      titlecol.append(titlep);
      var titlerow = document.createElement('div');
      titlerow.setAttribute('class', 'row');
      titlerow.append(titlecol);
      column.append(titlerow);
      titlecol.addEventListener('click', this.handleTitleClick, false);
      row.append(column);
      element.append(row);

      var parent = null;
      if (this.containedBy !== null) {
        parent = document.getElementById(this.containedBy.id);
      } else {
        parent = document.getElementsByTagName('body');
        parent = parent[0];
      }
      //parent.innerHTML = '';
      //if a child has been drawn before its parent it can't attach
      if (parent === null){
        window.ProtoManage.registry.lostChildren.push(this);
      } else {
        parent.append(element);
        if (window.ProtoManage.registry.lostChildren.filter(child => (child.id === this.id))) {
          window.ProtoManage.registry.lostChildren = window.ProtoManage.registry.lostChildren.filter(child => (child.id !== this.id))
        }
      }
    } else {
      // console.log('document already contains this element: ' + this.id);
    }

    if (this.typeRender){
      this.typeRender();
    }

    return 0;
  }

  handleTitleClick(e){
    function findParentNode(node, type='id', value=null){ //can probably extend with type and value variables to allow searching up the tree for anything, need to handle case where no parents left
      if (node === null) return false;
      if (node[type]){
        if (value){
          if (node[type] === value || node[type].contains(value)){
            return node;
          }
        } else {
          if (node[type]){
            return node;
          }
        }
        node = findParentNode(node.parentNode, type, value);
      } else {
        node = findParentNode(node.parentNode, type, value);
      }
      return node;
    }

    //app title shouldn't be editable, registry doesn't contain a copy of itself so it won't be found
    if (window.ProtoManage.registry.find("id", parseInt(findParentNode(e.target).id))) {
      var card = findParentNode(e.target, 'classList', 'card');
      if (card) {
        card.setAttribute('draggable', false);
      }
      var input = document.createElement('input');
      input.value = e.target.innerHTML;
      input.setAttribute('class', 'col-xs-12');
      input.addEventListener('blur', function(e){
        //set title in our app
        window.ProtoManage.registry.find("id", parseInt(findParentNode(e.target).id)).setTitle(e.target.value);

        //adjust ui
        var title = document.createTextNode(e.target.value);
        var p = e.target.parentNode;
        p.innerHTML = '';
        p.append(title);

        var card = findParentNode(p, 'classList', 'card');
        console.log(card);
        if (card) {
          card.setAttribute('draggable', true);
        }
      });
      e.target.innerHTML = '';
      e.target.append(input);
      input.focus();
    }
  }

  //Prototype Pattern
  clone (type=null, options) {
    return new ObjectBase(type, options);
  }
}

// static variable to set object id
ObjectBase.prototype.objectCount = 0;
