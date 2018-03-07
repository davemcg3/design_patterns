import Command from '/js/command.js';

export default class Undo extends Command {
  execute(options) {
    // don't record an undo, just undo it!
    this.receiver.undo(options);
  }

}

