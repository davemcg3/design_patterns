import Command from '/js/command.js';

export default class AttributeChange extends Command {
  execute(options) {
    this.record(JSON.stringify({
      state: this.receiver.no_history(),
      old_value: {[options.key]: this.receiver.key},
      new_value: {[options.key]: options.value}
    }));
    this.receiver.change(options);
  }
}

