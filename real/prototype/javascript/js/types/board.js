//for spawning new columns
import * as Column from '/js/types/column.js'

function typeRender(){
  var element = document.getElementById(this.id);
  if (element){

    //add our spawner if needed
    if (!element.querySelector('.columnSpawner')){
      var row = document.createElement('div');
      row.setAttribute('class', 'row');
      var spawner = document.createElement('div');
      spawner.setAttribute('class', 'col-xs-12 columnSpawner');
      var button = document.createElement('button');
      button.setAttribute('class', 'btn btn-success');
      button.append(document.createTextNode('Add Column'));
      button.addEventListener('click', spawnColumn, false);
      spawner.append(button);
      row.append(spawner);
      element.append(row);
    }
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

function spawnColumn(e){
  parent = findParentNode(e.target, "board");
  window.ProtoManage.registry.addObject(ProtoManage.registry.clone(Column, {"title": "New column","containedBy": window.ProtoManage.registry.find("id", parseInt(parent.id))}));
  window.ProtoManage.registry.render();
}

var type = "board";

export { typeRender, type }
