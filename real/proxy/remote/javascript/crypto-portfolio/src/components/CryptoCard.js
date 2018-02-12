import React from 'react';
// import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Button from 'react-toolbox/lib/button/Button';
import Configurator from './Configurator';

class CryptoCard extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   currency: props.settings.currency,
    //   quantity: props.settings.quantity,
    //   price: props.settings.price
    // };
    this.handleClick = this.handleClick.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
    this.handleConfiguratorSave = this.handleConfiguratorSave.bind(this);
  }

  handleClick () {
    this.configurator.loadOptions({currency: this.props.settings.currency, quantity: this.props.settings.quantity, active:true})
  }

  handleCallback(settings){
    this.props.callback(settings);
  }

  handleConfiguratorSave (settings) {
    // this.setState(Object.assign(this.state, settings));
    this.props.reconfigureCard(settings);
  }

  render() {
    return (
      <Card style={{width: '350px', display: 'inline-block'}}>
        {/*<CardTitle*/}
          {/*avatar="https://placeimg.com/80/80/animals"*/}
          {/*title="Avatar style title"*/}
          {/*subtitle="Subtitle here"*/}
        {/*/>*/}
        {/*<CardMedia*/}
          {/*aspectRatio="wide"*/}
          {/*image="https://placeimg.com/800/450/nature"*/}
        {/*/>*/}
        <CardTitle
          // title={this.state.currency}
          // subtitle={"Quantity: " + this.state.quantity + ', Price: ' + this.state.price }
          title={this.props.settings.currency}
        />
        <CardText style={{"textAlign": "left"}}>
          {/* <p>Have not been able to establish remote communicaiton.</p> */}
          <p>{"Quantity: " + this.props.settings.quantity }</p>
          <p>Price: { this.props.settings.price.toLocaleString('us-US', { style: 'currency', currency: 'USD' }) }</p>
          <p>Value: { this.props.settings.value.toLocaleString('us-US', { style: 'currency', currency: 'USD' }) }</p>
          <Configurator ref={(conf) => { this.configurator = conf; }} callback={this.handleConfiguratorSave} />
        </CardText>
        <CardActions>
          <Button label="Configure" onClick={this.handleClick} />
          {/*<Button label="Action 2" />*/}
        </CardActions>
      </Card>
    );
  }

}

export default CryptoCard;
