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
    this.loadProfile = this.loadProfile.bind(this);
  }

  loadProfile(profile){
    // console.log('loading profile');
    // console.log(profile);
    this.setState({loadedProfile: profile, loading: false}, this.supplementInformation)
  }

  unloadProfile(){
    // console.log('unloading profile');
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

  supplementInformation() {
    var self = this;

    // console.log(this.state.loadedProfile);
    // console.log('houses: ', res);
    var exclude = ["url"];
    var profile = this.state.loadedProfile;
    var asyncCalls = [];

      for(var attribute in profile){
        // console.log('profile: ', profile);
        // console.log(attribute + ': ' + profile[attribute]);
        if (profile[attribute].toString().startsWith('https://www.anapioficeandfire.com/api/')) {
            // console.log(attribute + ' array? ' + (profile[attribute] instanceof Array));
            if (profile[attribute] instanceof Array) {
              var calls = profile[attribute];
              for (var call in calls) {
                if (exclude.indexOf(attribute) === -1) {

                  asyncCalls.push(new Promise(function(resolve) {
                    resolve({promise: fetch(calls[call]), key: attribute});
                    profile[attribute] = '';
                    this.setState({loadedProfile: profile});

                }));
              }
            }
            } else {
              // console.log('in else => ' + attribute + ': ' + profile[attribute]);
              if (exclude.indexOf(attribute) === -1) {
                asyncCalls.push(new Promise(function(resolve) {
                  resolve({promise: fetch(profile[attribute]), key: attribute});
                  profile[attribute] = '';
                  this.setState({loadedProfile: profile});
                }));
                // console.log(asyncCalls);
              }
            }
        }

      };

      Promise.all(asyncCalls)
        .then(function (values) {
          // console.log(values);
          values.forEach(function(value){
            // console.log('value:',value);
            // console.log('value.promise:',value.promise);
            value.promise.then(res => res.json())
              .then(data => {
                // console.log('data: ',data, 'value: ', value);
                if (profile[value.key] !== '') {
                  profile[value.key] += ', ';
                }
                profile[value.key] += data.name;
                // console.log('profile:',profile);
                self.setState({loadedProfile: profile});
              });
          });
        });

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
