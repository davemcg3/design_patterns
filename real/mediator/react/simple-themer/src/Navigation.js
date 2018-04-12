import React, { Component } from 'react';
export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        {
          "Google": "https://www.google.com",
          "Yahoo": "https://www.yahoo.com",
          "Bing": "https://www.bing.com"
        }
      ]
    }
  }

  render() {

  }
}
