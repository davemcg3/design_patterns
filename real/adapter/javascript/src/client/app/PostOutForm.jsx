  import React from 'react';
import {Button} from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import Upload from "./Upload.jsx";
import Checkbox from 'react-toolbox/lib/checkbox';
import AbstractAdapter from './adapters/AbstractAdapter.jsx';

class PostOutForm extends React.Component {

  constructor(props) {
    super(props);
    //props['siteName'] could be undefined which would make it an 'uncontrolled' input, the || '' makes it 'controlled' by default, avoiding the console warning
    this.state = {
      postText: props['postText'] || '',
      postAlbum: props['postAlbum'] || '',
      facebook: props['facebook'] || true,
      instagram: props['instagram'] || true,
      twitter: props['twitter'] || true,
      validFacebook: false,
      validInstagram: false,
      validTwitter: false
    };
    // This binding is necessary to make `this` work in the callback
    this.handleToggle = this.handleToggle.bind(this);
    this.saveOptions = this.saveOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
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
    this.setState({ [name]: value }, this.validateFields);
  };

  handleFileUpload (file) {
    //bug: this function is being called twice
    //bug: this should append to an array instead of resetting the field
    this.setState({postAlbum: file}, this.validateFields);
    //improvement: show a preview of uploaded file
  }

  validateFields () {
    //facebook
    if (this.state.postText != '' || this.state.postAlbum != '' ) {
      this.setState({validFacebook: true});
    } else {
      this.setState({validFacebook: false});
    }

    //instagram
    if (this.state.postAlbum != '') {
      this.setState({validInstagram: true});
    } else {
      this.setState({validInstagram: false});
    }

    //twitter
    if (this.state.postText.length > 0 && this.state.postText.length <= 140) {
      this.setState({validTwitter: true});
    } else {
      this.setState({validTwitter: false});
    }
  }

  saveOptions () {
    //emit this state up the chain so it can be handled by the app
    this.props.callback(this.state);
    this.setState({
      active: !this.state.active
    });
  }

  formSubmit () {
    //post to adapter
    this.props.log('form submitted');
    var errors = [];
    if (this.state.facebook && !this.state.validFacebook) {
      errors.push('error in facebook post');
    }
    if (this.state.instagram && !this.state.validInstagram) {
      errors.push('error in instagram post');
    }
    if (this.state.twitter && !this.state.validTwitter) {
      errors.push('error in twitter post');
    }
    if (errors.length > 0) {
      this.props.log(errors.join('\n'));
      return false;
    }
    var networks = ['facebook', 'instagram', 'twitter'];
    var arr = networks.filter(function (network) {
      if (this.state[network]) return network;
    }, this);
    this.abstractAdapter.postOut({text: this.state.postText, image: this.state.postAlbum, networks: arr});
    this.props.log('post submitted');
  }

  render() {
    const actions = [
      { label: "Cancel", onClick: this.handleToggle },
      { label: "Save", onClick: this.saveOptions.bind(this) }
    ];

    return (
      <div style={{maxWidth:"800px"}}>
        <section>
          <Input type='text' multiline label='Post Text' maxLength={10000} value={this.state.postText} onChange={this.handleChange.bind(this, 'postText')} />
          <Upload callback={this.handleFileUpload} />

          <p>Post out to:</p>
          <Checkbox
            checked={this.state.facebook}
            label="Facebook"
            onChange={this.handleChange.bind(this, 'facebook')}
          />
           {!this.state.validFacebook ? <p style={{color:"rgb(222, 50, 38)",fontSize:"12px",lineHeight:"20px",marginTop:"-10px",marginBottom:"10px"}}>Must have text or an image to post to facebook!</p> : null}
          <Checkbox
            checked={this.state.instagram}
            label="Instagram"
            onChange={this.handleChange.bind(this, 'instagram')}
          />
          {!this.state.validInstagram ? <p style={{color:"rgb(222, 50, 38)",fontSize:"12px",lineHeight:"20px",marginTop:"-10px",marginBottom:"10px"}}>Must have an image to post to instagram!</p> : null}
          <Checkbox
            checked={this.state.twitter}
            label="Twitter"
            onChange={this.handleChange.bind(this, 'twitter')}
          />
          {!this.state.validTwitter ? <p style={{color:"rgb(222, 50, 38)",fontSize:"12px",lineHeight:"20px",marginTop:"-10px",marginBottom:"10px"}}>Text must be less than 140 characters (and more than 0!) to post to Twitter!</p> : null}
          <Button icon='' label='Post' raised primary onClick={this.formSubmit}/>
        </section>
        <section>
          <AbstractAdapter ref={(conf) => { this.abstractAdapter = conf; }} log={this.props.log} />
        </section>
      </div>
    );
  }

}

export default PostOutForm;
