import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './Navigation.js'
import Header from "./Header.js";
import Footer from "./Footer.js";
import Mediator from "./Mediator.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.registerWithMediator = this.registerWithMediator.bind(this);
  }

  registerWithMediator(peer) {
    this.refs.mediator.registerPeer(peer)
  }

  render() {
    return (
      <div className="App">
        <Mediator ref="mediator" />
        <Header registerWithMediator={this.registerWithMediator}/>
        <Navigation registerWithMediator={this.registerWithMediator} />
        <div className="App-intro">
          <h1>Panels go here.</h1>
        </div>
        <Footer registerWithMediator={this.registerWithMediator} />
      </div>
    );
  }
}

export default App;
