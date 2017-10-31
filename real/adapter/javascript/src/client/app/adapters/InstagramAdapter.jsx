import React from "react";

class InstagramAdapter extends React.Component {
  constructor(props) {
    super(props);
    this.postOut = this.postOut.bind(this);
  }

  postOut(input) {
    this.props.log('posting out from instagram adapter');
    this.props.log(input);

    //it would be something like this
    //this.props.log('sending request...');
    //this.instagramUrl = "https://api.example.org/"; //this would be the instagram url but we're mocking
    //var xhr = new XMLHttpRequest();
    //if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9 //untested by me because I don't have to support IE right now
    //xhr.open('POST', this.instagramUrl, true);
    //var params = {crazyInstagramParamA: input.text, crazyInstagramParamB: input.image}; //would need the rest of instagram-specific params here
    //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //xhr.onloadend = this.completedPost(response);
    //xhr.send(params);
  }

  completedPost(response){
    this.props.log('response received from instagram');
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default InstagramAdapter;
