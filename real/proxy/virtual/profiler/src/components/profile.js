import React, { Component } from 'react';
import './profile.css';

export default class FullProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      profile: props.loadedProfile,
      loadedProfile: {}
    };
  }

  loadProfile(profile){
    console.log('loading profile');
    console.log(profile);
    this.setState({loadedProfile: profile, loading: false});
  }

  unloadProfile(){
    console.log('unloading profile');
    this.setState({loadedProfile: {}, loading: true});
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return <div>I'm sorry! Couldn't load profile.</div>;
  }

  renderProfile() {
    return (
      <div className="FullProfile-box">
        <h1>{this.state.loadedProfile.name}</h1>
        <div dangerouslySetInnerHTML={{__html: this.loopProfileAttributes()}} />
      </div>
    )
  }

  loopProfileAttributes() {
    var output = "";
    var exclude = ['name', 'url'];
    for( var attribute in this.state.loadedProfile){
      // console.log("(" + typeof(attribute) + ") " + attribute);
      if (this.state.loadedProfile[attribute].length > 0 &&
        this.state.loadedProfile[attribute][0] !== "" &&
        exclude.indexOf(attribute) === -1)
        output += '<div class="FullProfile-row"></div><div class="FullProfile-attribute alignRight"><strong>' + attribute + ':</strong></div><div class="FullProfile-attribute alignLeft greyBackground">' + this.state.loadedProfile[attribute] + '</div></div>'
    }
    return output;
  }

  whichRender() {
    if (this.state.loading) {
      return this.renderLoading();
    } else if (this.state.loadedProfile) {
      return this.renderProfile();
    } else {
      return this.renderError();
    }
  }

  render () {
    return (
      this.whichRender()
    )
  }
}





// State:
// { loading: true }
// { loading: false, planet: { name, climate, terrain } }
// { loading: false, error: any }
//
// class DagobahContainer extends React.Component {
//   state = { loading: true };
//
//   componentDidMount() {
//     fetch("https://swapi.co/api/planets/5")
//       .then(res => res.json())
//       .then(
//         planet => this.setState({ loading: false, planet }),
//         error => this.setState({ loading: false, error })
//       );
//   }
//
//   render() {
//     return <PlanetView {...this.state} />;
//   }
// }
//
// export default DagobahContainer;
