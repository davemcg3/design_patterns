import React from 'react';
import {Button} from 'react-toolbox/lib/button';
import Configurator from './Configurator.jsx'

class Fab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
  }

  handleClick () {
    this.configurator.loadOptions({active:true})
  }

  handleCallback(settings){
    this.props.callback(settings);
  }

  render() {
    return (
      <div>
        <Button id='fab' icon='add' floating accent onClick={this.handleClick} />
        <Configurator ref={(conf) => { this.configurator = conf; }} callback={this.handleCallback} />
      </div>
    );
  }

}

export default Fab;
