import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Interpreter from './components/interpreter.js';
import Librarian from "./components/librarian";
import Receiver from "./components/receiver";
import Tokenizer from "./components/tokenizer";
import Command from "./prototypes/command";
import AbstractFactory from "./components/abstract_factory";

class App extends Component {
  constructor(props){
    super(props);
    this.dispatch = this.dispatch.bind(this);
    this.queryLibrarian = this.queryLibrarian.bind(this);
  }

  dispatch(command){
    if (command == null){
      console.log('No command received.');
      return;
    }
    switch(command.command){
      case 'tokenize':
        // console.log(this.tokenizer);
        this.dispatch(new Command('interpret', this.tokenizer.tokenize(command)));
        break;
      case 'interpret':
        this.interpreter.interpret(command);
        break;
      case 'create':
        return this.factory.generate(command);
      case 'register':
        return this.librarian.register(command);
      default:
        console.log("Don't know what to do with this command,", command);
    }
  }

  queryLibrarian(query){
    // console.log(this.librarian);
    return this.librarian.find(query);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Interpreter sendToDispatch={this.dispatch} queryLibrarian={this.queryLibrarian} ref={instance => { this.interpreter = instance; }} />
        <Librarian sendToDispatch={this.dispatch} ref={instance => { this.librarian = instance; }} />
        <Receiver sendToDispatch={this.dispatch} />
        <Tokenizer ref={instance => { this.tokenizer = instance; }} />
        <AbstractFactory ref={instance => { this.factory = instance; }} />
      </div>
    );
  }
}

export default App;
