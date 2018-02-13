import React, { Component } from 'react';
import './profile_proxy.css';

export default class ProfileProxy extends Component{
  loadProfile() {
    this.props.loadProfile(this.props.settings)
  }

  render () {
    return (
      <div className="ProfileProxy-box">
        <h1>{this.props.settings.name}</h1>
        <h2>Region: {this.props.settings.region}</h2>
        <button onClick={this.loadProfile.bind(this)}>Load Profile</button>
      </div>
    )
  }
}
