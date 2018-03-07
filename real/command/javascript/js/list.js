import AbstractReceiver from '/js/abstract_receiver.js'

// Object is probably the right noun to use, but that one is already taken!
export default class List extends AbstractReceiver {
  constructor(options){
    super(options={});
    this.list = options.list || [];
  }

  add(options) {
    if (this.list.indexOf(options.value) === -1)
      this.list.push(options.value);
    else {
      console.log('item already on list');
      this.history.pop();
    }
    console.log(this.list);
  }

  remove(options) {
    var remove = options.value;
    this.list = this.list.filter(function(item){
      return item !== remove;
    });
    console.log(this.list);
  }

  change(options) {
    var index = this.list.indexOf(options.key);
    this.list[index] = options.value;
    console.log(this.list);
  }

  undo(options){
    var self = this; //don't lose reference to the receiver, can fix with arrow functions in ES6
    // debug code
    // console.log('history before undo:');
    // this.history.forEach(function(key,index){
    //   console.log(self.history[index]);
    // });
    // console.log('/history');
    var steps = (options.value) || 1;
    if (steps > this.history.length) {
      console.log('can\'t undo that much history');
      return;
    }
    //get new state
    var new_state = JSON.parse(this.history[this.history.length - steps]).state;
    //delete all current keys
    Object.keys(this).forEach(function(key,index){
      if (key != 'history'){
        delete self[key];
      }
    });
    //rebuild state from new state
    Object.keys(new_state).forEach(function(key,index){
      self[key] = new_state[key];
    });
    //rewrite history
    this.history = this.history.slice(0, this.history.length - steps);
    console.log(this.list);
  }
}
