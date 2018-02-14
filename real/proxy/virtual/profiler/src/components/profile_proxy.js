import React, { Component } from 'react';
import './profile_proxy.css';

export default class ProfileProxy extends Component{
  loadProfile() {
    this.props.loadProfile(this.props.settings)
  }

  render () {
    return (
      <div className="ProfileProxy-box">
        <h2>{this.props.settings.name}</h2>
        <h3>Region: {this.props.settings.region}</h3>
        <button onClick={this.loadProfile.bind(this)}>Load Profile</button>
      </div>
    )
  }
}
