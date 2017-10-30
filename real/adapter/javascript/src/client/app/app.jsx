import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';
import {Button} from 'react-toolbox/lib/button';
import PostOutForm from './PostOutForm.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
        <AppBar title='Post Out Adapter' >
          <Navigation type='horizontal'>
          </Navigation>
        </AppBar>

        <p>We're mocking various social networks for simplicity.</p>

        <PostOutForm />
      </div>
    );
  }
}

export default App;
