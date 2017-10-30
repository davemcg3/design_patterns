import React from 'react';
import {Button} from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';

class Configurator extends React.Component {

  constructor(props) {
    super(props);
    //props['siteName'] could be undefined which would make it an 'uncontrolled' input, the || '' makes it 'controlled' by default, avoiding the console warning
    this.state = {
      siteName: props['siteName'] || '',
      siteUrl: props['siteUrl'] || '',
      method: props['method'] || '',
      payload: props['payload'] || '',
      active: false
    };
    // This binding is necessary to make `this` work in the callback
    this.handleToggle = this.handleToggle.bind(this);
    this.saveOptions = this.saveOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
  }

  loadOptions (options) {
    for (var key in options) {
      var temp = { [key]: options[key]};
      this.setState(temp);
    }
  }

  handleToggle () {
    this.setState({active: !this.state.active});
  }

  handleChange (name, value) {
    this.setState({ [name]: value });
  };

  saveOptions () {
    //emit this state up the chain so it can be handled by the app
    this.props.callback(this.state);
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    const actions = [
      { label: "Cancel", onClick: this.handleToggle },
      { label: "Save", onClick: this.saveOptions.bind(this) }
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Configurator'
        >
          <div>
            <section>
              <Input type='text' label='site name' name='siteName' value={this.state.siteName} onChange={this.handleChange.bind(this, 'siteName')} />
              <Input type='text' label='site url' name='siteUrl' value={this.state.siteUrl} onChange={this.handleChange.bind(this, 'siteUrl')} />
              <Input type='text' label='method' name='method' value={this.state.method} onChange={this.handleChange.bind(this, 'method')} />
              <Input type='text' label='payload' name='payload' value={this.state.payload} onChange={this.handleChange.bind(this, 'payload')} />
            </section>
          </div>
        </Dialog>
      </div>
    );
  }

}

export default Configurator;
