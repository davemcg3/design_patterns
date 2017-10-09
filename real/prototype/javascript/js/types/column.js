//for spawning new cards
import * as Card from '/js/types/card.js'

//when a card is added we want an event to trigger
function addObject(object){
  window.ProtoManage.registry.triggerEvent('before_add', this, object);
  this.contains.push(object);
  window.ProtoManage.registry.triggerEvent('after_add', this, object);
}

//when a card is removed we want an event to trigger
function removeObject(object){
  window.ProtoManage.registry.triggerEvent('before_remove', this, object);
  this.contains = this.contains.filter(child => (child.id !== object.id))
  window.ProtoManage.registry.triggerEvent('after_remove', this, object);
}

function typeRender(){
  //only do this if the object has been rendered
  var column = document.getElementById(this.id);
  if (column){
    //columnize our column
    column.classList.add('col-md-2');

    //add our spawner if needed
    if (!column.querySelector('.cardSpawner')){
      var row = document.createElement('div');
      row.setAttribute('class', 'row');
      var spawner = document.createElement('div');
      spawner.setAttribute('class', 'col-xs-12 cardSpawner');
      var button = document.createElement('button');
      button.setAttribute('class', 'btn btn-success col-xs-12');
      button.append(document.createTextNode('Add Card'));
      spawner.append(button);
      row.append(spawner);
      column.append(row);
    }

    //add event listeners
    if (button){
      button.addEventListener('click', spawnCard, false);
    }
    column.addEventListener('dragstart', handleDragStart, false);
    column.addEventListener('dragover', handleDragOver, false);
    column.addEventListener('dragenter', handleDragEnter, false);
    column.addEventListener('dragleave', handleDragLeave, false);
    column.addEventListener('dragend', handleDragEnd, false);
    column.addEventListener('drop', handleDrop, false);
  }

  return 0;
}

function spawnCard(e){
  //since the button is buried in a div inside a column inside... use recursion
  function findParentColumn(node){
    if (node.classList.contains('column')){
      return node;
    } else {
      node = findParentColumn(node.parentNode);
    }
    return node;
  }

  parent = findParentColumn(e.target);
  window.ProtoManage.registry.addObject(ProtoManage.registry.clone(Card, {"title": "Test","containedBy": window.ProtoManage.registry.find("id", parseInt(parent.id))}));
  window.ProtoManage.registry.render();
}

function handleDragStart(e) {
  e.stopPropagation();
  //this.style.opacity = '0.4';  // this / e.target is the source node.

  dragSrcEl = this;

 e.dataTransfer.effectAllowed = 'move';
 e.dataTransfer.setData('text/html', e.target.outerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDragEnd(e) {
  //this.style.opacity = '1.0';  // this / e.target is the source node.
}


function handleDrop(e) {
  // this / e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  // Not 100% sure this is set correctly because we're on a different column object, but it seemed to work during some light testing
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    //dragSrcEl.innerHTML = this.innerHTML;


    //dirty hack to get at the id of the transferred object
    var s = e.dataTransfer.getData('text/html');
    var temp = document.createElement('div');
    temp.innerHTML = s;
    temp = temp.getElementsByClassName('card')[0]; //this card is not part of the DOM
    var transferredCard = document.getElementById(temp.id); //this is the card from the DOM that we are transferring
    if (transferredCard.getAttribute('id')){
      //move it in our actual application
      window.ProtoManage.registry.move(window.ProtoManage.registry.find("id", parseInt(transferredCard.getAttribute('id'))), window.ProtoManage.registry.find("id", parseInt(this.id)));

      //adjust visuals to match what we just did
      //remove from old column
      transferredCard.remove();
      //add to new column
      document.getElementById(this.id).append(transferredCard);
    }
  }

  return false;
}

var dragSrcEl = null;

var type = "column";

export { addObject, removeObject, typeRender, type }
