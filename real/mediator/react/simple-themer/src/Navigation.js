import React, { Component } from 'react';
import './Navigation.css';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        ["Google", "https://www.google.com"],
        ["Yahoo", "https://www.yahoo.com"],
        ["Bing", "https://www.bing.com"]
      ]
    }
  }

  render() {
    return (
      <nav>
        { this.state.links.map((item, i) => (
          <a key={i} href={item[1]}>{item[0]}</a>
        )) }
      </nav>
    )
  }
}
