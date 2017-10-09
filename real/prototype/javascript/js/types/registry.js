function move(object, target){
  window.ProtoManage.registry.find("id", object.id).containedBy.removeObject(object);
  target.addObject(object);
  object.containedBy = target;
}

function typeRender(){
  this.contains.forEach(function(object){
    object.render();
  });

  var count = 0;
  while (this.lostChildren.length > 0 && count < 10) {
    this.lostChildren.forEach(function (element){
      element.render();
    });
    count++;
  }

  return 0;
}

var type = 'registry';

var lostChildren = [];

export { move, typeRender, type, lostChildren }
