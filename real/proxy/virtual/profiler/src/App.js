import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProfileProxy from './components/profile_proxy.js';
import FullProfile from './components/profile.js';
import Remote from './components/remote.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      profile_proxies: [],
      allProfiles: [],
      loadedProfile: 0
    }
    this.loadProfile = this.loadProfile.bind(this);
    this.unloadProfile = this.unloadProfile.bind(this);
    this.profilesLoaded = this.profilesLoaded.bind(this);
  }

  loadProfile(settings){
    document.getElementById('App-ProfileProxies').classList.add('hidden');
    document.getElementById('App-FullProfile').classList.remove('hidden');
    this.setState({loadedProfile: settings.id})
    this.refs.fullProfile.loadProfile(this.state.allProfiles[settings.id]);
  }

  unloadProfile(){
    document.getElementById('App-FullProfile').classList.add('hidden');
    document.getElementById('App-ProfileProxies').classList.remove('hidden');
    this.refs.fullProfile.unloadProfile();
    this.setState({loadedProfile: 0})
  }

  profilesLoaded(profiles){
    console.log(profiles);
    if (profiles.houses) {
      var profile_proxies = profiles.houses.map((profile, i) => ({id: i, name: profile.name, region: profile.region}))
      this.setState({allProfiles: profiles.houses, profile_proxies: profile_proxies});
    }
    console.log(this.state.allProfiles[0]);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Profiler</h1>
        </header>
        <div id="App-ProfileProxies">
          <p className="App-intro">
            Pick a profile!
          </p>
          {
            this.state.profile_proxies.map((item, i) => (
                <ProfileProxy key={i} settings={item} loadProfile={this.loadProfile} />
            ))
          }
        </div>
        <div id="App-FullProfile" className="hidden">
          <button id="App-FullProfile-Nav" onClick={this.unloadProfile}>&larr; Back</button>
          <FullProfile loadedProfile={this.state.loadedProfile} ref="fullProfile" />
        </div>
        <Remote profilesLoaded={this.profilesLoaded} />
      </div>
    );
  }
}

export default App;
