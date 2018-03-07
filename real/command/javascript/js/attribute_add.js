import Command from '/js/command.js';

export default class AttributeAdd extends Command {
  execute(options) {
    this.record(JSON.stringify({
      state: this.receiver.no_history(),
      old_value: null,
      new_value: {[options.key]: options.value}
    }));
    this.receiver.add(options);
  }
}

