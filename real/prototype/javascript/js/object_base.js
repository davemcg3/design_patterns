//for spawning our ghosts
import * as Card from '/js/types/card.js'
import * as Column from '/js/types/column.js'

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

  findParentNodeInDom(node, type='id', value=null){
    // console.log('findParentNodeInDom start');
    // console.log(node);
    // console.log(type);
    // console.log(value);
    if (node === null) return false;
    // console.log('node[type]=' + node[type])
    if (node[type]){
      if (value){
        // console.log('node[type] === value || node[type].contains(value)');
        // console.log(node[type] + ' === ' + value + ' (' + (node[type] === value) + ') || ' + node[type].contains(value));
        if (node[type] === value || node[type].contains(value)){
          // console.log('found it!');
          return node;
        }
      } else {
        if (node[type]){
          return node;
        }
      }
      node = this.findParentNodeInDom(node.parentNode, type, value);
    } else {
      node = this.findParentNodeInDom(node.parentNode, type, value);
    }
    return node;
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

    // this.contains.forEach(function(element){
    //   element.render();
    // });

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
        // console.log(card);
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
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    // e.target.style.opacity = '0.4';  // this / e.target is the source node.

    this.dragSrcEl = this;

     e.dataTransfer.effectAllowed = 'move';

     e.dataTransfer.setData('text/html', e.target.outerHTML);

    if(this.dragSrcEl.classList.contains('card')){
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
      }
    } else if (this.dragSrcEl.classList.contains('column')) {
      //create ghost column if it doesn't exist
      if (!document.getElementById(this.id).parentNode.querySelector('.ghostColumn')){
        var ghostObject = window.ProtoManage.registry.clone(Column, {"title": window.ProtoManage.registry.find("id", parseInt(this.dragSrcEl.id)).title,"containedBy": window.ProtoManage.registry.find("id", parseInt(this.id)).containedBy})
        window.ProtoManage.registry.addObject(ghostObject);
        ghostObject.render();
        var ghost = document.getElementById(ghostObject.id);
        //it's a singleton by practice, but should make it one explicitly by pattern
        if (ghost !== null) { //sometimes ghost is unexpectedly null
          ghost.setAttribute('class', ghost.getAttribute('class') + ' ghostColumn');
          var cloned = document.getElementById(this.id);
          var height = cloned.clientHeight;
          ghost.style.height = height + 'px';
          document.getElementById(this.id).parentNode.insertBefore(ghost, document.getElementById(this.id));
        }
      }
    }
    this.style.display = 'none'; //remove();
  }

  handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }

    if (e){
      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    }

    return false;
  }

  handleDragEnter(e) {
    console.log("dragEnter: e");
    console.log(e);
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    var targetedObject = null;
    var transferredObjectType = null;
    for(var objectType of ObjectBase.prototype.hierarchy){
      targetedObject = window.ProtoManage.registry.find("id", parseInt(this.id)).findParentNodeInDom(e.target, 'classList', objectType);
      if (targetedObject !== false){
        transferredObjectType = objectType;
        break;
      }
    }

    //skip if this is the transferred card
    if (targetedObject){
      //dirty hack to get at the id of the transferred object
      var s = e.dataTransfer.getData('text/html');
      var temp = document.createElement('div');
      temp.innerHTML = s;
      // console.log('temp card, not in DOM:')
      // console.log(temp);
      // console.log(temp.getElementsByClassName(transferredObjectType)[0]);
      //card or column or...
      var transferredObject = temp.getElementsByClassName(transferredObjectType)[0]; //this element is not part of the DOM
      // console.log('transferredObject, not part of DOM');
      // console.log(transferredObject)
      if (transferredObject && transferredObject.id !== targetedObject.id){
        this.dragSrcEl = document.getElementById(transferredObject.id); //this is the element from the DOM that we are transferring
        // console.log("transferredObject, from the DOM");
        // console.log(this.dragSrcEl);

        if(this.dragSrcEl.classList.contains('card')){

          // this / e.target is the current hover target.
          this.classList.add('over');
          //if (document.getElementById(this.id).parentNode.querySelector('.ghostCard')){
          if (document.querySelector('.ghostCard')){
            //move ghost card if it does exist
            if (!this.classList.contains('ghostCard')){
              if (this.parentNode.lastChild !== this){
                // console.log('not last child');
                var ghost = document.getElementsByClassName('ghostCard')[0];
                // console.log(ghost);
                ghost.remove();
                this.parentNode.insertBefore(ghost, document.getElementById(this.id));
              } else {
                //this ends up skipping the second to last position, which you can drag it back up to, but still.
                //I'm not super happy with this solution, but I'm not going to put any more time into it right now.
                var ghost = document.getElementsByClassName('ghostCard')[0];
                // console.log(ghost);
                // console.log('last child');
                ghost.remove();
                this.parentNode.insertBefore(ghost, document.getElementById(this.id).nextSibling);
              }
            } else {
              // console.log('this is the ghostCard');
            }
          } else {
            // console.log('ghostCard does not exist in the document');
          }
        } else if(this.dragSrcEl.classList.contains('column')){

          // this / e.target is the current hover target.
          this.classList.add('over');
          //if (document.getElementById(this.id).parentNode.querySelector('.ghostCard')){
          if (document.querySelector('.ghostColumn')){
            //move ghost card if it does exist
            if (!this.classList.contains('ghostColumn')){
              if (this.parentNode.lastChild !== this){
                // console.log('not last child');
                var ghost = document.getElementsByClassName('ghostColumn')[0];
                // console.log(ghost);
                ghost.remove();
                this.parentNode.insertBefore(ghost, document.getElementById(this.id));
              } else {
                //this ends up skipping the second to last position, which you can drag it back up to, but still.
                //I'm not super happy with this solution, but I'm not going to put any more time into it right now.
                var ghost = document.getElementsByClassName('ghostColumn')[0];
                // console.log(ghost);
                // console.log('last child');
                ghost.remove();
                this.parentNode.insertBefore(ghost, document.getElementById(this.id).nextSibling);
              }
            } else {
              // console.log('this is the ghostColumn');
            }
          } else {
            // console.log('ghostColumn does not exist in the document');
          }
        }
      } else {
        // console.log('this is the transferred card');
      }
    } //skip if this is the transferred card
  }

  handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
  }

  handleDragEnd(e) {
    e.target.style.opacity = '1.0';  // this / e.target is the source node.
    this.classList.remove('over');  // this / e.target is previous target element.
    [".ghostCard", ".ghostColumn"].forEach(function(ghostC){
      var ghost = document.querySelector(ghostC);
      // console.log('dragEnd ghost ' + ghostC + ':');
      // console.log(ghost);
      if (ghost) {
        // console.log('before remove registry.contains:');
        // console.log(window.ProtoManage.registry.contains);
        var appGhost = window.ProtoManage.registry.find("id", parseInt(ghost.id));
        appGhost.containedBy.removeObject(appGhost);
        window.ProtoManage.registry.removeObject(appGhost);
        // console.log('after remove registry.contains:');
        // console.log(window.ProtoManage.registry.contains);
        ghost.remove();

        //check output
        console.log(ProtoManage.registry);
        ProtoManage.registry.contains.forEach(function(obj){
          console.log(obj);
        });


      }
    });
    if (this.dragSrcEl){
      this.dragSrcEl.style.display = 'block';
    }
  }


  handleDrop(e) {
    // this / e.target is current target element.
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    console.log('drop target:');
    console.log(e.target);
    console.log('drop this:');
    console.log(this);
    var thisType = null;
    var targetedObject = null;

    for(var objectType of ObjectBase.prototype.hierarchy){
      targetedObject = window.ProtoManage.registry.find("id", parseInt(this.id)).findParentNodeInDom(e.target, 'classList', objectType);

      if (targetedObject && targetedObject.classList.contains(objectType)){
        thisType = objectType;
        break;
      }
    }
    // console.log('thisType: ' + thisType);

    switch(thisType){
      case "card":
      case "column":
        if (this.dragSrcEl != this) {
          //dirty hack to get at the id of the transferred object
          var s = e.dataTransfer.getData('text/html');
          var temp = document.createElement('div');
          temp.innerHTML = s;
          temp = temp.getElementsByClassName('card')[0]; //this card is not part of the DOM
          // console.log('temp');
          // console.log(temp);
          var transferredCard = document.getElementById(temp.id); //this is the card from the DOM that we are transferring
          // console.log('drop transferred object:');
          // console.log(transferredCard);
          if (transferredCard.getAttribute('id')){
            var transferredObjectType = null;
            for(var objectType of ObjectBase.prototype.hierarchy){
              if (transferredCard.classList.contains(objectType)) {
                transferredObjectType = objectType;
                break;
              }
            }

            //columns can't contain columns and the board is effectively a singleton so their containedBy doesn't change.
            // console.log(thisType + " === " + transferredObjectType);
            if (thisType === "card" || (thisType === "column" && transferredObjectType === "card")) {
              //move it in our actual application -- this works for cards swapping columns but not their own column, but I'm not actually storing position in our application, maybe swap array position if the same list?
              // console.log('move id ' + transferredCard.id + ' to id ' + this.id);
              window.ProtoManage.registry.move(window.ProtoManage.registry.find("id", parseInt(transferredCard.getAttribute('id'))), window.ProtoManage.registry.find("id", parseInt(this.id)));
            }

            //adjust visuals to match what we just did
            //remove from old column
            transferredCard.remove();
            //add to new column
            // console.log(this.classList);
            if (this.classList.contains('card')){
              this.parentNode.insertBefore(transferredCard, document.getElementById(this.id));
            } else if (this.classList.contains('column') && transferredCard.classList.contains('card')) {
              this.append(transferredCard);
            } else if (this.classList.contains('column') && transferredCard.classList.contains('column')) {
              this.parentNode.insertBefore(transferredCard, this);
            } else if (this.classList.contains('board')) {
              this.insertBefore(transferredCard, null);
            }

          }
        }
        break;
      case "board":
        // console.log(e.dataTransfer.getData('text/html'));
      default:
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

ObjectBase.prototype.hierarchy = ['card', 'column', 'board'];
