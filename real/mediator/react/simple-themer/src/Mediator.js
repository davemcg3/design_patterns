import React, { Component } from 'react';

export default class Mediator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peers: []
    };
    this.registerPeer = this.registerPeer.bind(this);
  }

  registerPeer(peer) {
    let peers = this.state.peers;
    peers.push(peer);
    this.setState({peers: peers});
  }

  render() {
    return (
      <div></div>
    )
  }
}
