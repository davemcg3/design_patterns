class InputDispatcher {
  constructor(receivers) {
    this.receivers = receivers;
  }

  checkKey(e) {
    var e = e || window.event;
    if ([38, 27].includes(e.keyCode)){
      //console.log('up arrow pressed');
      window.inputDispatcher.dispatchEvent(e);
    }
    //left = 37
    //up = 38
    //right = 39
    //down = 40
  }

  dispatchEvent(e){
    this.receivers.forEach(function (receiver) {
      //console.log('dispatching event to ' + receiver);
      receiver.input(e);
    });
  }
}

export default InputDispatcher;