//probably need a method to register listeners here
function registerListener(e, listener){
  //don't know exactly what this looks like
  //maybe I'll need to add a new variable that holds listener/event pairs
}

function triggerEvent (e, container, object){
  //not sure what this code will look like, but I want the user to be able to configure events to occur when an object is transitioned. Maybe send an email, or a push notification, or do something. Change the background color. I don't know, whatever.
  console.log('event triggered: ' + e);
  // console.log(container);
  // console.log(object);

  //notify listeners registered for the triggered event e
  this.notifyListeners(e, object);
}

function notifyListeners(e, object){
  //not sure what this looks like either
  //ObjectBase might need to have a method for receiving messages and then some way to act on received messages
}

var type = "event";

export { registerListener, triggerEvent, notifyListeners, type }
