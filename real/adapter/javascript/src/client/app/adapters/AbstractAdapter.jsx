import React from "react";
import FacebookAdapter from './FacebookAdapter.jsx';
import InstagramAdapter from './InstagramAdapter.jsx';
import TwitterAdapter from './TwitterAdapter.jsx';

class AbstractAdapter extends React.Component {
  constructor(props) {
    super(props);
    this.postOut = this.postOut.bind(this);
  }

  postOut(input) {
    var self = this;
    var params = {text: input.text, image: input.image};
    this.props.log('making calls from abstract adapter');
    input.networks.forEach(function(network){
      self[network.toLowerCase() + 'Adapter'].postOut(params);
    });
  }

  render() {
    return (
      <div>
        <FacebookAdapter ref={(conf) => { this.facebookAdapter = conf; }} log={this.props.log} />
        <InstagramAdapter ref={(conf) => { this.instagramAdapter = conf; }} log={this.props.log} />
        <TwitterAdapter ref={(conf) => { this.twitterAdapter = conf; }} log={this.props.log} />
      </div>
    );
  }
}

export default AbstractAdapter;
