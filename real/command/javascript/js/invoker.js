// because I don't what else to call it
export default class Invoker {
  execute(options) {
    options.command.execute({key: options.key, value: options.value});
  }
}

