import React from "react";

class FacebookAdapter extends React.Component {
  constructor(props) {
    super(props);
    this.postOut = this.postOut.bind(this);
    this.completedPost = this.completedPost.bind(this);
  }

  postOut(input) {
    this.props.log('posting out from facebook adapter');
    this.props.log(input);

    //it would be something like this
    //this.props.log('sending request...');
    //this.facebookUrl = "https://api.example.org/"; //this would be the facebook url but we're mocking
    //var xhr = new XMLHttpRequest();
    //if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9 //untested by me because I don't have to support IE right now
    //xhr.open('POST', this.facebookUrl, true);
    //var params = {crazyFacebookParam1: input.text, crazyFacebookParam2: input.image}; //would need the rest of facebook-specific params here
    //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //xhr.onloadend = this.completedPost(response);
    //xhr.send(params);
  }

  completedPost(response){
    this.props.log('response received from facebook');
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default FacebookAdapter;
