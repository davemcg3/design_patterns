import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Interpreter from './components/interpreter.js';
import Librarian from "./components/librarian";
import Receiver from "./components/receiver";
import Tokenizer from "./components/tokenizer";
import Command from "./prototypes/command";
import AbstractFactory from "./components/abstract_factory";
import UiBoard from "./components/ui_board";

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
        console.log('App command: ', command);
        this.interpreter.interpret(command);
        break;
      case 'create':
        return this.factory.generate(command);
      case 'register':
        return this.librarian.register(command);
      case 'find':
      case 'find_or_create':
        return this.librarian.find(command);
      case 'find_by_id':
        return this.librarian.find(command, true);
      case 'query':
        return this.librarian.query(command);
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
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h1 className="App-title">Bello</h1>
        </header>

        <Interpreter sendToDispatch={this.dispatch} queryLibrarian={this.queryLibrarian} ref={instance => { this.interpreter = instance; }} />
        <Librarian sendToDispatch={this.dispatch} ref={instance => { this.librarian = instance; }} />
        <Receiver sendToDispatch={this.dispatch} />
        <Tokenizer ref={instance => { this.tokenizer = instance; }} />
        <AbstractFactory ref={instance => { this.factory = instance; }} />
        <UiBoard sendToDispatch={this.dispatch} />
      </div>
    );
  }
}

export default App;
