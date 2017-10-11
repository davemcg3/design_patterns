//for spawning our ghost card
import * as Card from '/js/types/card.js'

function typeRender(){
  var card = document.getElementById(this.id);
  if (card){
    //only do this if the object has been rendered
    card.setAttribute('draggable', 'true');
    if (!card.querySelector('.closeButton')){
      var closeButton = document.createElement('button');
      closeButton.setAttribute('class', 'pull-right btn-link closeButton');
      closeButton.append(document.createTextNode('x'));
      card.append(closeButton);
      card.insertBefore(closeButton, card.firstChild);
      closeButton.addEventListener('click', removeCard, false);
    }

    card.addEventListener('dragstart', this.handleDragStart, false);
    card.addEventListener('dragover', this.handleDragOver, false);
    card.addEventListener('dragenter', this.handleDragEnter, false);
    card.addEventListener('dragleave', this.handleDragLeave, false);
    card.addEventListener('dragend', this.handleDragEnd, false);
    card.addEventListener('drop', this.handleDrop, false);

  }

  return 0;
}

function removeCard(e){
  function findParentNode(node, type){
    if (node.classList.contains(type)){
      return node;
    } else {
      node = findParentNode(node.parentNode, type);
    }
    return node;
  }

  var column = findParentNode(e.target, "column");
  var card = findParentNode(e.target, "card");
  //remove from column
  window.ProtoManage.registry.find("id", parseInt(column.id)).removeObject(window.ProtoManage.registry.find("id", parseInt(card.id)));
  //remove from registry
  window.ProtoManage.registry.removeObject(window.ProtoManage.registry.find("id", parseInt(card.id)));
  //remove from DOM
  card.remove();
}

var type = "card";

export { typeRender, type }
