//for spawning our ghost card
import * as Card from '/js/types/card.js'

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

    this.dragSrcEl = null;

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
      var titlep = document.createElement('span');
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

  handleDragStart(e) {
    e.stopPropagation();
    e.target.style.opacity = '0.4';  // this / e.target is the source node.

    this.dragSrcEl = this;

   e.dataTransfer.effectAllowed = 'move';

   e.dataTransfer.setData('text/html', e.target.outerHTML);
   this.style.display = 'none'; //remove();
  }

  handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
  }

  handleDragEnter(e) {
    //dirty hack to get at the id of the transferred object
    var s = e.dataTransfer.getData('text/html');
    var temp = document.createElement('div');
    temp.innerHTML = s;
    this.dragSrcEl = temp.getElementsByClassName('card')[0]; //this card is not part of the DOM

    // this / e.target is the current hover target.
    this.classList.add('over');
    //create ghost card if it doesn't exist
    if (!document.getElementById(this.id).parentNode.querySelector('.ghostCard')){
      var ghostObject = window.ProtoManage.registry.clone(Card, {"title": window.ProtoManage.registry.find("id", parseInt(this.dragSrcEl.id)).title,"containedBy": window.ProtoManage.registry.find("id", parseInt(this.id)).containedBy})
      window.ProtoManage.registry.addObject(ghostObject);
      ghostObject.render();
      var ghost = document.getElementById(ghostObject.id);
      //it's a singleton by practice, but should make it one explicitly by pattern
      if (ghost !== null) { //sometimes ghost is unexpectedly null
        ghost.setAttribute('class', ghost.getAttribute('class') + ' ghostCard');
        var cloned = document.getElementById(this.id);
        var height = cloned.clientHeight;
        ghost.style.height = height + 'px';
        document.getElementById(this.id).parentNode.insertBefore(ghost, document.getElementById(this.id));
      }
    } else {
      //move ghost card if it does exist
      if (!this.classList.contains('ghostCard')){
        if (this.parentNode.lastChild !== this){
          var ghost = document.getElementsByClassName('ghostCard')[0];
          ghost.remove();
          this.parentNode.insertBefore(ghost, document.getElementById(this.id));
        } else {
          //this ends up skipping the second to last position, which you can drag it back up to, but still.
          //I'm not super happy with this solution, but I'm not going to put any more time into it right now.
          var ghost = document.getElementsByClassName('ghostCard')[0];
          ghost.remove();
          this.parentNode.insertBefore(ghost, document.getElementById(this.id).nextSibling);
        }
      }
    }
  }

  handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
  }

  handleDragEnd(e) {
    e.target.style.opacity = '1.0';  // this / e.target is the source node.
    this.classList.remove('over');  // this / e.target is previous target element.
    var ghost = document.querySelector(".ghostCard");
    if (ghost) {
      window.ProtoManage.registry.removeObject(window.ProtoManage.registry.find("id", parseInt(ghost.id)));
      ghost.remove();
    }
    this.dragSrcEl.style.display = 'block';
  }


  handleDrop(e) {
    // this / e.target is current target element.
    console.log(this);

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (this.dragSrcEl != this) {
      //dirty hack to get at the id of the transferred object
      var s = e.dataTransfer.getData('text/html');
      var temp = document.createElement('div');
      temp.innerHTML = s;
      temp = temp.getElementsByClassName('card')[0]; //this card is not part of the DOM
      var transferredCard = document.getElementById(temp.id); //this is the card from the DOM that we are transferring
      if (transferredCard.getAttribute('id')){
        //move it in our actual application -- this works for columns, but I'm not actually storing position in our application, maybe swap array position if the same list?
        window.ProtoManage.registry.move(window.ProtoManage.registry.find("id", parseInt(transferredCard.getAttribute('id'))), window.ProtoManage.registry.find("id", parseInt(this.id)));

        //adjust visuals to match what we just did
        //remove from old column
        transferredCard.remove();
        //add to new column
        if (this.classList.contains('card')){
          this.parentNode.insertBefore(transferredCard, document.getElementById(this.id));
        } else if (this.classList.contains('column')) {
          this.insertBefore(transferredCard, null);
        } else if (this.classList.contains('board')) {
          this.insertBefore(transferredCard, null);
        }
      }
    }

    return false;
  }


  //Prototype Pattern
  clone (type=null, options) {
    //probably should be a clone instead of a new for the pattern, but this at least presents the idea
    return new ObjectBase(type, options);
  }
}

// static variable to set object id
ObjectBase.prototype.objectCount = 0;
