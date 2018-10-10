/**
 * @file Auth container.
 */

import { connect } from 'react-redux';

import Auth from '../components/Auth';
import { postAuthDetails, postLogin, logout, setTokenFromStorage } from '../actions/auth'

const mapStateToProps = state => ({
  isLoggedIn: state.auth.token !== 'null' && !!state.auth.token,
  token: state.auth.token,
});

const mapDispatchToProps = {
  postAuthDetails,
  postLogin,
  logout,
  setTokenFromStorage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
