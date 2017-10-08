function move(object, target){
  window.ProtoManage.registry.find("id", object.id).containedBy.removeObject(object);
  target.addObject(object);
  object.containedBy = target;
}

function typeRender(){
  // console.log('registry render');
  // //registry takes the whole viewport
  // var element = null;
  // if (!(element = document.getElementById(this.id))) {
  //   console.log('element doesn\'t exist');
  //   //create element if it doesn't exist
  //   element = document.createElement('div');
  //   element.setAttribute('id', this.id);
  //   element.setAttribute('class', this.type.join(' ') + ' container-fluid');
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
  //     parent.innerHTML = '';
  //   }
  //   console.log(parent);
  //   parent.append(element);
  // } else {
  //   console.log('if failed');
  // }
  //

  this.contains.forEach(function(object){
    object.render();
    // if (object.typeRender){
    //   object.typeRender();
    // }
  });

  var count = 0;
  while (this.lostChildren.length > 0 && count < 10) {
    this.lostChildren.forEach(function (element){
      element.render();
      // if (object.typeRender){
      //   object.typeRender();
      // }

    });
    count++;
  }

  return 0;
}

var type = 'registry';

var lostChildren = [];

export { move, typeRender, type, lostChildren }
