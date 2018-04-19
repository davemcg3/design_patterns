import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "#222",
      color: "#eee"
    }
    this.receiveColors = this.receiveColors.bind(this);
    this.props.registerWithMediator(this.receiveColors);
    this.changeTheme = this.changeTheme.bind(this);
    this.componentStyle = this.componentStyle.bind(this);
  }

  receiveColors(message) {
    this.setState({backgroundColor: message.background, color: message.foreground})
  }

  componentStyle() {
    return {
      backgroundColor: this.state.backgroundColor,
      color: this.state.color
    }
  }

  changeTheme(event){
    let message;
    switch(event.target.value){
      case "Lightish":
        message = {background: "#ddd", foreground: "#333"}
        break;
      case "Reddish":
        message = {background: "#800", foreground: "#eee"}
        break;
      case "Blueish":
        message = {background: "#237", foreground: "#eee"}
        break;
      default:
        message = {background: "#222", foreground: "#eee"}
    }
    if (message)
      this.props.sendMessageToPeers(message);
  }

  render() {
    return (
      <header className="App-header" style={this.componentStyle()}>
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <select className="theme-switcher" defaultValue="Darkish" onChange={this.changeTheme}>
          <option>Darkish</option>
          <option>Lightish</option>
          <option>Reddish</option>
          <option>Blueish</option>
        </select>
        <h1 className="App-title">Simple Themer</h1>
      </header>
    )
  }
}
