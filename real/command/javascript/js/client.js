import Invoker from '/js/invoker.js';
import Thing from '/js/thing.js';
import AttributeAdd from '/js/attribute_add.js';
import AttributeRemove from '/js/attribute_remove.js';
import AttributeChange from '/js/attribute_change.js';
import Undo from '/js/undo.js';

export default class Client {
  constructor(options={}) {
    this.invoker = new Invoker;
    this.receiver = options.receiver || new Thing;
  }

  execute(options) {
    switch(options.command) {
      case 'add':
        this.invoker.execute({command: new AttributeAdd({receiver: this.receiver}), key: options.key, value: options.value});
        break;
      case 'remove':
        this.invoker.execute({command: new AttributeRemove({receiver: this.receiver}), key: options.key, value: options.value});
        break;
      case 'change':
        this.invoker.execute({command: new AttributeChange({receiver: this.receiver}), key: options.key, value: options.value});
        break;
      case 'undo':
        this.invoker.execute({command: new Undo({receiver: this.receiver}), key: null, value: options.value});
        break;
    }
  }
}

