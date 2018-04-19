import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "#222",
      color: "#eee"
    }
    this.receiveColors = this.receiveColors.bind(this);
    this.props.registerWithMediator(this.receiveColors);
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

  render() {
    return (
      <footer className="App-footer" style={this.componentStyle()}>
        Thanks for trying out simple themer!
      </footer>
    )
  }
}
