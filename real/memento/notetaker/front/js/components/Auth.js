/**
 * @file Auth component.
 */

import React from 'react';
import PropTypes from 'prop-types';

class Auth extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    postAuthDetails: PropTypes.func,
    postLogin: PropTypes.func,
    logout: PropTypes.func,
  };

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      password: "",
    }
    console.log('isLoggedIn: ', this.props.isLoggedIn)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount() {
  }

  handleChange(e) {
    // console.log('e: ', e)
    // auth details should be stored here in the component only
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit(e) {
    console.log('handleSubmit e: ', e)
    e.preventDefault()
    this.props.postAuthDetails(this.state.name, this.state.email, this.state.password);
  }

  handleLogin(e) {
    console.log('handleLogin e: ', e)
    e.preventDefault()
    this.props.postLogin(this.state.email, this.state.password);
    console.log('isLoggedIn: ', this.props.isLoggedIn)

  }

  handleLogout(e) {
    console.log('handleLogout e: ', e)
    e.preventDefault()
    this.setState({password: ''})
    this.props.logout();
  }

  render() {
    // TODO: Refactor these forms out to multiple sub-components
    let { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return (
        <div>
          <p>Thank you for logging in</p>
          <button onClick={this.handleLogout} >Logout</button>
        </div>
      )
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Register</h2>
          <label>Name</label>
          <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
          <label>Email</label>
          <input type="email" name="email" onChange={this.handleChange} value={this.state.email} />
          <label>Password</label>
          <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
          <button type="submit" name="submit" onClick={this.handleSubmit} >Register</button>
        </form>
        <br />
        <form onSubmit={this.handleLogin}>
          <h2>Login</h2>
          <label>Email</label>
          <input type="email" name="email" onChange={this.handleChange} value={this.state.email} />
          <label>Password</label>
          <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
          <button type="submit" name="submit" onClick={this.handleLogin} >Login</button>
        </form>
      </div>
    );
  }
}

export default Auth;
