/**
 * @file Auth related actions.
 */

import axios from 'axios';

import getLogger from '../util/logger';

const log = getLogger('AuthAction');

export const AUTH_LOGIN = 'auth/LOGIN';

const authLogin = (token) => {
  log.info('auth.js token: ', token);
  return { type: AUTH_LOGIN, token };
};

export const postLogin = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/login.json', {
      email,
      password,
    })
    log.info('auth.js::postLogin res: ', res)

    // should get a JWT back, dispatch to redux
    if (res.status === 200) {
      // lose token on refresh, so should put in localstorage or cookie instead
      dispatch(authLogin(res.data.access_token));
      log.debug('setting access token in local storage notetaker_jwt as ', res.data.access_token)
      localStorage.setItem('notetaker_jwt', res.data.access_token);
    }
  } catch (error) {
    log.error(error);
  }
}

export const AUTH_LOGOUT = 'auth/LOGOUT';

const authLogout = () => {
  return { type: AUTH_LOGOUT };
}

export const logout = () => async (dispatch) => {
  log.info('logging out')
  localStorage.setItem('notetaker_jwt', 'null');
  dispatch(authLogout());
}


export const AUTH_REGISTER = 'auth/REGISTER';

const authRegister = (data) => {
  return { type: AUTH_REGISTER, data };
};

export const postAuthDetails = (name, email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/register.json', {
      name,
      email,
      password,
    });
    log.info('res: ', res);

    if (res.status) {
      // login
      postLogin(email, password);
    }

    // dispatch(authRegister(res.data));
  } catch (error) {
    log.error(error);
  }
};

export const setTokenFromStorage = token => async (dispatch) => {
  log.info('actions/auth.js::setTokenFromStorage token: ', token)
  log.info('yo');
  log.info('setting token from storage, ', token)
  try {
    log.info('auth.js::setTokenFromStorage dispatching');
    dispatch(authLogin(token))
    log.info('auth.js::setTokenFromStorage finished dispatching');
  } catch (error) {
    log.info('setTokenFromStorage error: ', error);
    log.error(error);
  }
}
