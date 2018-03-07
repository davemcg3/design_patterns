import Command from '/js/command.js';

export default class AttributeRemove extends Command {
  execute(options) {
    this.record(JSON.stringify({
      state: this.receiver.no_history(),
      old_value: {[options.key]: this.receiver.key},
      new_value: {[options.key]: null}
    }));
    this.receiver.remove(options);
  }
}

