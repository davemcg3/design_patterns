// because I don't what else to call it
export default class Invoker {

  execute(options) {
    //TODO: come up with a more generic interface
    options.command.execute({key: options.key, value: options.value});
  }
}

