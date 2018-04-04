import React, { Component } from 'react';
import AbstractParser from "./abstract_parser";

class Interpreter extends Component {
  constructor(props){
    super(props);
    this.interpret = this.interpret.bind(this);
    // probably won't build a different parser for this project but this is the point that a different parser could be
    // loaded if we wanted one
    this.parser = new AbstractParser(this.props.sendToDispatch, this.props.queryLibrarian);
  }

  // command is a JSON object
  interpret(command) {
    // interpret parsedStructure
    // console.log('interpreter', command.attributes);
    this.parser.processNode(command.attributes);
    // generate command object
  }

  // processNode(node){
  //   this.parser.processNode(node);
  // }
  //
  // processTerminalNode(node){
  //   // terminal nodes are nouns
  //   console.log('terminal node, value:', node.value);
  //   this.parser.processTerminalNode(node);
  // }
  //
  // processNonTerminal(node){
  //   console.log('non-terminal node, value:', node.value);
  //   this.parser.processNonTerminal(node);
  // }

  render () {
    return (
      <div>
      </div>
    );
  }
}

export default Interpreter;