import React, { Component } from 'react';

class Interpreter extends Component {
  constructor(props){
    super(props);
    this.interpret = this.interpret.bind(this);
  }

  // command is a JSON object
  interpret(command) {
    // interpret parsedStructure
    console.log('interpreter', command.attributes);
    this.processNode(command.attributes);
  }

  processNode(node){
    if (node.leftChildNode == "" && node.rightChildNode == ""){
      this.processTerminalNode(node);
    } else {
      this.processNonTerminal(node);
    }
    
    // generate command object
  }

  processTerminalNode(node){
    // terminal nodes are nouns
    console.log('terminal node, value:', node.value);
    // query the librarian to see if noun exists
    // if noun does not exist create it
    // return the reference to the noun
  }

  processNonTerminal(node){
    console.log('non-terminal node, value:', node.value);
    if (node.leftChildNode !== "") {
      var left = this.processNode(node.leftChildNode);
    }
    if (node.rightChildNode !== "") {
      var right = this.processNode(node.rightChildNode);
    }
    // non-terminal nodes are verbs
    // if we only have one noun process the verb for that noun
    // if we have 2 nouns use the board->column->card hierarchy to determine which is the receiving object and then
    // process the verb for the subject object on the receiving object
    // processing the verb should involve generating a command object and passing it to the dispatch method which gives
    // it to the Librarian
  }

  render () {
    return (
      <div>
      </div>
    );
  }
}

export default Interpreter;