import React, { Component } from 'react';

export default class Remote extends Component{

  componentDidMount() {
    fetch("https://www.anapioficeandfire.com/api/houses?pageSize=50")
      .then(res => res.json())
      .then(
        houses => this.props.profilesLoaded({ loading: false, houses }),
        error => this.props.profilesLoaded({ loading: false, error })
      );
  }

  render () {
    return (
      <div></div>
    )
  }

}
