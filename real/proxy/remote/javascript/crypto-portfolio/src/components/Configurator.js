import React from 'react';
// import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';

class Configurator extends React.Component {

  constructor(props) {
    super(props);
    //props['siteName'] could be undefined which would make it an 'uncontrolled' input, the || '' makes it 'controlled' by default, avoiding the console warning
    this.state = {
      currency: props['currency'] || '',
      quantity: props['quantity'] || '',
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
    this.handleToggle();
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
              <Input type='text' label='currency' name='currency' value={this.state.currency} onChange={this.handleChange.bind(this, 'currency')} />
              <Input type='text' label='quantity' name='quantity' value={this.state.quantity} onChange={this.handleChange.bind(this, 'quantity')} />
            </section>
          </div>
        </Dialog>
      </div>
    );
  }

}

export default Configurator;
