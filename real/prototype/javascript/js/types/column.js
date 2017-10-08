//when a card is added we want an event to trigger
function addObject(object){
  window.ProtoManage.registry.triggerEvent('before_add', this, object);
  this.contains.push(object);
  window.ProtoManage.registry.triggerEvent('after_add', this, object);
}

//when a card is removed we want an event to trigger
function removeObject(object){
  window.ProtoManage.registry.triggerEvent('before_remove', this, object);
  this.contains.pop(object);
  window.ProtoManage.registry.triggerEvent('after_remove', this, object);
}

function typeRender(){
  // var element = null;
  // if (!(element = document.getElementById(this.id))) {
  //   console.log('if succeeded');
  //   //create element if it doesn't exist
  //   element = document.createElement('div');
  //   element.setAttribute('id', this.id);
  //   element.setAttribute('class', this.type.join(' ') + ' col-md-2');
  //   var row = document.createElement('div');
  //   row.setAttribute('class', 'row');
  //   var column = document.createElement('div');
  //   column.setAttribute('class', 'col-xs-12');
  //   column.append(document.createTextNode(this.title));
  //   row.append(column);
  //   element.append(row);
  //   console.log(element);
  //
  //   var parent = null;
  //   if (this.containedBy !== null) {
  //     parent = document.getElementById(this.containedBy.id);
  //   } else {
  //     parent = document.getElementsByTagName('body');
  //     parent = parent[0];
  //   }
  //   //parent.innerHTML = '';
  //   console.log(parent);
  //   parent.append(element);
  // } else {
  //   console.log('if failed');
  // }
  //
  var columns = window.ProtoManage.registry.contains.filter(child => (child.type.includes('column')));
  columns.forEach(function(element){
    //only do this if the object has been rendered
    var column = document.getElementById(element.id);
    if (column){
      column.classList.add('col-md-2');
      column.addEventListener('dragstart', handleDragStart, false);
      column.addEventListener('dragover', handleDragOver, false);
      column.addEventListener('dragenter', handleDragEnter, false);
      column.addEventListener('dragleave', handleDragLeave, false);
      column.addEventListener('dragend', handleDragEnd, false);
      column.addEventListener('drop', handleDrop, false);
    }
  });
  return 0;
}

function handleDragStart(e) {
  e.stopPropagation();
  //this.style.opacity = '0.4';  // this / e.target is the source node.

  dragSrcEl = this;

 e.dataTransfer.effectAllowed = 'move';
 e.dataTransfer.setData('text/html', this.innerHTML);
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
    temp = temp.getElementsByClassName('card')[0];
    var transferredCard = document.getElementById(temp.id);
    if (transferredCard.getAttribute('id')){
      //move it in our actual application
      window.ProtoManage.registry.move(window.ProtoManage.registry.find("id", parseInt(transferredCard.getAttribute('id'))), window.ProtoManage.registry.find("id", parseInt(this.id)));

      //adjust visuals to match what we just did
      //remove from old column
      transferredCard.remove();
      //add to new column
      document.getElementById(this.id).append(transferredCard);
    }

    // console.log(e.dataTransfer.getData('text/html'));
    //this.innerHTML = e.dataTransfer.getData('text/html');

  }

  return false;
}

var dragSrcEl = null;

var type = "column";

export { addObject, removeObject, typeRender, type }
