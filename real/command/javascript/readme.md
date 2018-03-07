# Command Pattern
The command pattern is a powerful way to abstract away the implementation of the results of the command from the command object, so the command object doesn't need to know anything about the implementation in order to direct the receiver action to run a particular action.

## JSON Builder with Undo
The core functionality of this example lets you build a JSON object by adding, removing, and changing key-value pairs (JSON attributes, essentially) with an undo function.

## List Builder with Undo
Extended the example simply by adding a new type of Receiver, this time a List object that conforms to the AbstractReceiver class, that can add, remove, and change things on the internal list object. Didn't need to change anything in the client, invoker, or concrete command classes. Included the new type of receiver in the main file and added commands to add, remove, change, and undo things from that internal list. Interface for the command object is identical. Being able to simply swap in a new receiver without touching the command interface shows the real power of the Command pattern.

## Usage
From the project root run `docker-compose up` and then visit `http://localhost` in your browser.

_Note:_ There is currently no UI to this, so you'll see a white page. Open up the console and you should see an object that has been changed through a few commands. You can review those commands in `js/main.js` and if you want to play around on the command line you can invoke the functions yourself like this:

`client = window.command.client`

`client.execute({command: 'add', key: 'fastest_animal', value: 'cheetah'})`

`client.execute({command: 'change', key: 'fastest_animal', value: 'Paratarsotomus macropalpis'})`

_Note:_ [Actually true](https://io9.gizmodo.com/the-fastest-animal-relative-to-its-size-is-really-re-1570325611), it's a a sesame-seed-sized mite native to southern California. Scientists recently clocked P. micropalpis traveling 322 body lengths per second – which, to scale, would be like a person running 1,300 miles per hour. By comparison, the cheetah—the fastest land animal overall—can move at only about 16 body lengths per second. But nobody cares about a mite, so let's throw that away in the next step.

`client.execute({command: 'undo', key: null, value: 1)`

_Note:_ The "value" parameter in the undo command is the number of steps in history you want to go back. You can also pass a null to go back 1 step. There is validation to make sure you aren't trying to go back further in history than the object has history for.

`client.execute({command: 'delete', key: 'fastest_animal', value: null)`
