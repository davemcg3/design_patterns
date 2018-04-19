import React, { Component } from 'react';
import './Navigation.css';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        ["Home", "#"],
        ["About", "#"],
        ["Contact", "#"]
      ],
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
      <nav style={this.componentStyle()}>
        { this.state.links.map((item, i) => (
          <a key={i} href={item[1]} style={this.componentStyle()}>{item[0]}</a>
        )) }
      </nav>
    )
  }
}
