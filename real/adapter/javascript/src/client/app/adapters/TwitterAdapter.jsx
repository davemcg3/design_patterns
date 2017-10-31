import React from "react";

class TwitterAdapter extends React.Component {
  constructor(props) {
    super(props);
    this.postOut = this.postOut.bind(this);
  }

  postOut(input) {
    this.props.log('posting out from twitter adapter');
    this.props.log(input);

    //it would be something like this
    //this.props.log('sending request...');
    //this.twitterUrl = "https://api.example.org/"; //this would be the twitter url but we're mocking
    //var xhr = new XMLHttpRequest();
    //if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9 //untested by me because I don't have to support IE right now
    //xhr.open('POST', this.twitterUrl, true);
    //var params = {crazyTwitterParamBluebird: input.text, crazyTwitterParamRobin: input.image}; //would need the rest of twitter-specific params here
    //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //xhr.onloadend = this.completedPost(response);
    //xhr.send(params);
  }

  completedPost(response){
    this.props.log('response received from twitter');
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default TwitterAdapter;
