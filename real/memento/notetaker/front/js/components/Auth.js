/**
 * @file Auth component.
 */

import React from 'react';
import PropTypes from 'prop-types';

class Auth extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    token: PropTypes.string,
    postAuthDetails: PropTypes.func,
    postLogin: PropTypes.func,
    logout: PropTypes.func,
    setTokenFromStorage: PropTypes.func,
  };

  static MAX_ATTEMPTS = 5

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      attempts: 0,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount() {
    console.log('components/Auth.js localStorage token: ', localStorage.getItem('notetaker_jwt'))
    if (localStorage.getItem('notetaker_jwt')) {
      this.props.setTokenFromStorage(localStorage.getItem('notetaker_jwt'))
    }
    console.log('components/Auth.js::componentWillMount token: ', this.props.token)

    console.log('components/Auth.js::componentWillMount isLoggedIn: ', this.props.isLoggedIn)
    console.log(`components/Auth.js::componentWillMount ( ${this.state.attempts} )attempts < ( ${Auth.MAX_ATTEMPTS} ) MAX_ATTEMPTS ? `, (this.state.attempts < Auth.MAX_ATTEMPTS))
    console.log('components/Auth.js::componentWillMount email: ', this.state.email)
    console.log('components/Auth.js::componentWillMount password: ', this.state.password)
    if (!this.props.isLoggedIn && this.state.attempts < Auth.MAX_ATTEMPTS
      && this.state.email && this.state.password) {
      this.setState({ attempts: this.state.attempts + 1 })
      this.handleLogin()
    }
  }

  componentDidMount() {
  }

  handleChange(e) {
    // console.log('e: ', e)
    // auth details should be stored here in the component only
    this.setState({
      [e.target.name]: e.target.value,
    })
  }


  handleSubmit(e) {
    console.log('components/Auth.js::handleSubmit e: ', e)
    e.preventDefault()
    this.props.postAuthDetails(this.state.name, this.state.email, this.state.password);
  }

  handleLogin(e = null) {
    console.log('components/Auth.js::handleLogin e: ', e)
    if (e) e.preventDefault()
    this.props.postLogin(this.state.email, this.state.password);
    console.log('isLoggedIn: ', this.props.isLoggedIn)
  }

  handleLogout(e) {
    console.log('components/Auth.js::handleLogout e: ', e)
    e.preventDefault()
    this.setState({ password: '' })
    this.props.logout();
  }

  render() {
    // TODO: Refactor these forms out to multiple sub-components
    const { isLoggedIn } = this.props;
    console.log('components/Auth.js::render token: ', this.props.token, ', isLoggedIn? ', isLoggedIn)

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
          <label htmlFor="registerName">Name
            <input type="text" id="registerName" name="name" onChange={this.handleChange} value={this.state.name} />
          </label>
          <label htmlFor="registerEmail">Email
            <input type="email" id="registerEmail" name="email" onChange={this.handleChange} value={this.state.email} />
          </label>
          <label htmlFor="registerPassword">Password
            <input type="password" id="registerPassword" name="password" onChange={this.handleChange} value={this.state.password} />
          </label>
          <button type="submit" name="submit" onClick={this.handleSubmit} >Register</button>
        </form>
        <br />
        <form onSubmit={this.handleLogin}>
          <h2>Login</h2>
          <label htmlFor="loginEmail">Email
            <input type="email" id="loginEmail" name="email" onChange={this.handleChange} value={this.state.email} />
          </label>
          <label htmlFor="loginPassword">Password
            <input type="password" id="loginPassword" name="password" onChange={this.handleChange} value={this.state.password} />
          </label>
          <button type="submit" name="submit" onClick={this.handleLogin} >Login</button>
        </form>
      </div>
    );
  }
}

export default Auth;
