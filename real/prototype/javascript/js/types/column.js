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

var type = "column";

export { addObject, removeObject, type }
