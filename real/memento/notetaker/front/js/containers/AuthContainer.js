/**
 * @file Auth container.
 */

import { connect } from 'react-redux';

import Auth from '../components/Auth';
import { postAuthDetails, postLogin, logout } from '../actions/auth'

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.token,
});

const mapDispatchToProps = {
  postAuthDetails,
  postLogin,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
