import React from "react";

class Logger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    //setting state directly was creating a race condition so used a queue to work around it
    this.queuedMessages = [];
    this.log = this.log.bind(this);
  }

  log(message) {
    if (typeof(message) === 'object') {
      message = JSON.stringify(message);
    }
    this.queuedMessages.push((new Date().toLocaleString()) + ': ' + message);
    this.setState({ messages: this.queuedMessages });
  }

  render() {
    return (
      <div>
        <h3>System messages</h3>
        <ul>
        {
          this.state.messages.map((item, i) => (
            <li key={i}>{item}</li>
          ))
        }
        </ul>

      </div>
    );
  }
}

export default Logger;
