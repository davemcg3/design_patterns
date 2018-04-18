import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.receiveColors = this.receiveColors.bind(this);
    this.props.registerWithMediator(this.receiveColors);
  }

  receiveColors(background, foreground) {
    console.log('background: ' + background + ', foreground: ' + foreground);
  }

  render() {
    return (
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <select className="theme-switcher">
          <option selected="selected">Darkish</option>
          <option>Lightish</option>
          <option>Reddish</option>
          <option>Blueish</option>
        </select>
        <h1 className="App-title">Simple Themer</h1>
      </header>
    )
  }
}
