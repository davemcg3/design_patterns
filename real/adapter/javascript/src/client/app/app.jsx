import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';
import {Button} from 'react-toolbox/lib/button';
import PostOutForm from './PostOutForm.jsx';
import Logger from './Logger.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.log = this.log.bind(this);
  }

  log(message) {
    this.logger.log(message);
  }

  render() {
    return(
      <div>
        <AppBar title='Post Out Adapter' >
          <Navigation type='horizontal'>
          </Navigation>
        </AppBar>

        <p>We're mocking various social networks for simplicity and assuming OAuth is already set up for each mocked network.</p>

        <PostOutForm log={this.log} />
        <Logger ref={(conf) => { this.logger = conf; }} />
      </div>
    );
  }
}

export default App;
