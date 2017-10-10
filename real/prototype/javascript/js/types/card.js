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

// function handleDragStart(e) {
//   e.stopPropagation();
//   e.target.style.opacity = '0.4';  // this / e.target is the source node.
//
//   dragSrcEl = this;
//
//  e.dataTransfer.effectAllowed = 'move';
//
//  e.dataTransfer.setData('text/html', e.target.outerHTML);
//  this.style.display = 'none'; //remove();
// }
//
// function handleDragOver(e) {
//   if (e.preventDefault) {
//     e.preventDefault(); // Necessary. Allows us to drop.
//   }
//
//   e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
//
//   return false;
// }
//
// function handleDragEnter(e) {
//   // this / e.target is the current hover target.
//   this.classList.add('over');
//   //create ghost card if it doesn't exist
//   if (!document.getElementById(this.id).parentNode.querySelector('.ghostCard')){
//     var ghostObject = window.ProtoManage.registry.clone(Card, {"title": window.ProtoManage.registry.find("id", parseInt(dragSrcEl.id)).title,"containedBy": window.ProtoManage.registry.find("id", parseInt(this.id)).containedBy})
//     window.ProtoManage.registry.addObject(ghostObject);
//     ghostObject.render();
//     var ghost = document.getElementById(ghostObject.id);
//     //it's a singleton by practice, but should make it one explicitly by pattern
//     ghost.setAttribute('class', ghost.getAttribute('class') + ' ghostCard');
//     var cloned = document.getElementById(this.id);
//     var height = cloned.clientHeight;
//     ghost.style.height = height + 'px';
//     document.getElementById(this.id).parentNode.insertBefore(ghost, document.getElementById(this.id));
//   } else {
//     //move ghost card if it does exist
//     if (!this.classList.contains('ghostCard')){
//       if (this.parentNode.lastChild !== this){
//         var ghost = document.getElementsByClassName('ghostCard')[0];
//         ghost.remove();
//         this.parentNode.insertBefore(ghost, document.getElementById(this.id));
//       } else {
//         //this ends up skipping the second to last position, which you can drag it back up to, but still.
//         //I'm not super happy with this solution, but I'm not going to put any more time into it right now.
//         var ghost = document.getElementsByClassName('ghostCard')[0];
//         ghost.remove();
//         this.parentNode.insertBefore(ghost, document.getElementById(this.id).nextSibling);
//       }
//     }
//   }
// }
//
// function handleDragLeave(e) {
//   this.classList.remove('over');  // this / e.target is previous target element.
// }
//
// function handleDragEnd(e) {
//   e.target.style.opacity = '1.0';  // this / e.target is the source node.
//   this.classList.remove('over');  // this / e.target is previous target element.
//   if (this.parentNode.querySelector(".ghostCard")) {
//     this.parentNode.querySelector('.ghostCard').remove();
//   }
//   dragSrcEl.style.display = 'block';
// }
//
//
// function handleDrop(e) {
//   // this / e.target is current target element.
//
//   if (e.stopPropagation) {
//     e.stopPropagation(); // stops the browser from redirecting.
//   }
//
//   if (dragSrcEl != this) {
//     //dirty hack to get at the id of the transferred object
//     var s = e.dataTransfer.getData('text/html');
//     var temp = document.createElement('div');
//     temp.innerHTML = s;
//     temp = temp.getElementsByClassName('card')[0]; //this card is not part of the DOM
//     var transferredCard = document.getElementById(temp.id); //this is the card from the DOM that we are transferring
//     if (transferredCard.getAttribute('id')){
//       //move it in our actual application -- this works for columns, but I'm not actually storing position in our application, maybe swap array position if the same list?
//       window.ProtoManage.registry.move(window.ProtoManage.registry.find("id", parseInt(transferredCard.getAttribute('id'))), window.ProtoManage.registry.find("id", parseInt(this.id)));
//
//       //adjust visuals to match what we just did
//       //remove from old column
//       transferredCard.remove();
//       //add to new column
//       document.getElementById(this.id).parentNode.insertBefore(transferredCard, document.getElementById(this.id));
//     }
//   }
//
//   return false;
// }
//
// var dragSrcEl = null;



export { typeRender, type }
