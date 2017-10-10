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

    //column.setAttribute('draggable', 'true');
    if (!column.querySelector('.closeButton')){
      var closeButton = document.createElement('button');
      closeButton.setAttribute('class', 'pull-right btn-link closeButton');
      closeButton.append(document.createTextNode('x'));
      column.append(closeButton);
      column.insertBefore(closeButton, column.firstChild);
      closeButton.addEventListener('click', removeColumn, false);
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

//since the button is buried in a div inside a column inside... use recursion
function findParentNode(node, type){
  if (node.classList.contains(type)){
    return node;
  } else {
    node = findParentNode(node.parentNode, type);
  }
  return node;
}

function spawnCard(e){
  parent = findParentNode(e.target, "column");
  window.ProtoManage.registry.addObject(ProtoManage.registry.clone(Card, {"title": "New card","containedBy": window.ProtoManage.registry.find("id", parseInt(parent.id))}));
  window.ProtoManage.registry.render();
}


function removeColumn(e){
  var board = findParentNode(e.target, "board");
  var column = findParentNode(e.target, "column");
  //remove all cards from column (unnecessary since column is being deleted, but for completeness), registry, and DOM
  window.ProtoManage.registry.find("id", parseInt(column.id)).contains.forEach(function(object){
    //object should reach out and remove itself from its parent when being removed instead of having to remember to do it explicitly
    window.ProtoManage.registry.find("id", parseInt(column.id)).removeObject(object);
    window.ProtoManage.registry.removeObject(object);
    document.getElementById(object.id).remove();
  });
  //remove column from board
  window.ProtoManage.registry.find("id", parseInt(board.id)).removeObject(column);
  //remove column from registry
  window.ProtoManage.registry.removeObject(window.ProtoManage.registry.find("id", parseInt(column.id)));
  //remove column from DOM
  column.remove();
}



function handleDragStart(e) {
  e.stopPropagation();
  e.target.style.opacity = '0.4';  // this / e.target is the source node.

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
  e.target.style.opacity = '1.0';  // this / e.target is the source node.
  this.classList.remove('over');  // this / e.target is previous target element.
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
