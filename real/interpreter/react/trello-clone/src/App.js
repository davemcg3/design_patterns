import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Interpreter from './components/interpreter.js';
import Librarian from "./components/librarian";
import Receiver from "./components/receiver";
import Tokenizer from "./components/tokenizer";
import Command from "./prototypes/command";

class App extends Component {
  constructor(props){
    super(props);
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch(command){
    if (command == null){
      console.log('No command received.');
      return;
    }
    switch(command.command){
      case 'tokenize':
        console.log(this.tokenizer);
        this.dispatch(new Command('interpret', this.tokenizer.tokenize(command)));
        break;
      case 'interpret':
        this.interpreter.interpret(command);
        break;
      default:
        console.log("Don't know what to do with this command,", command);
    }
  }

  queryLibrarian(query){
    return Librarian.find(query);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Interpreter queryLibrarian={this.queryLibrarian} ref={instance => { this.interpreter = instance; }} />
        <Librarian ref="librarian" />
        <Receiver sendToDispatch={this.dispatch} />
        <Tokenizer ref={instance => { this.tokenizer = instance; }} />
      </div>
    );
  }
}

export default App;
