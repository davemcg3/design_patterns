function typeRender(){
  // var element = null;
  // if (!(element = document.getElementById(this.id))) {
  //   //create element if it doesn't exist
  //   element = document.createElement('div');
  //   element.setAttribute('id', this.id);
  //   element.setAttribute('class', this.type.join(' ') + ' col-xs-12');
  //   var row = document.createElement('div');
  //   row.setAttribute('class', 'row');
  //   var column = document.createElement('div');
  //   column.setAttribute('class', 'col-xs-12');
  //   column.append(document.createTextNode(this.title));
  //   row.append(column);
  //   element.append(row);
  //
  //   var parent = null;
  //   if (this.containedBy !== null) {
  //     parent = document.getElementById(this.containedBy.id);
  //   } else {
  //     parent = document.getElementsByTagName('body');
  //     parent = parent[0];
  //   }
  //   //parent.innerHTML = '';
  //   //if a child has been drawn before its parent it can't attach
  //   if (parent === null){
  //     window.ProtoManage.registry.lostChildren.push(this);
  //   } else {
  //     parent.append(element);
  //     if (window.ProtoManage.registry.lostChildren.filter(child => (child.id === this.id))) {
  //       window.ProtoManage.registry.lostChildren = window.ProtoManage.registry.lostChildren.filter(child => (child.id !== this.id))
  //     }
  //   }
  // } else {
  //   console.log('document already contains this element: ' + this.id);
  // }

  var cards = window.ProtoManage.registry.contains.filter(child => (child.type.includes('card')));
  cards.forEach(function(element){
    //only do this if the object has been rendered
    var card = document.getElementById(element.id);
    if (card){
      card.setAttribute('draggable', 'true');
    }
  });

  return 0;
}

var type = "card";

export { typeRender, type }
