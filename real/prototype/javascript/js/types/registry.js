function move(object, target){
  window.ProtoManage.registry.find("id", object.id).containedBy.removeObject(object);
  target.addObject(object);
}

var type = 'registry';

export { move, type }
