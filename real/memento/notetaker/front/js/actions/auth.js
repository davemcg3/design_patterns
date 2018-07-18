/**
 * @file Auth related actions.
 */

import axios from 'axios';

import getLogger from '../util/logger';

const log = getLogger('AuthAction');

export const AUTH_LOGIN = 'auth/LOGIN';

const authLogin = (token) => {
  return { type: AUTH_LOGIN, token };
};

export const postLogin = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/login.json', {
      email: email,
      password: password,
    })
    console.log('res: ', res)

    // should get a JWT back, dispatch to redux
    if(res.status === 200) {
      // lose token on refresh, so should put in localstorage or cookie instead
      dispatch(authLogin(res.data.access_token));
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

export const logout = () => async(dispatch) => {
  dispatch(authLogout());
}


export const AUTH_REGISTER = 'auth/REGISTER';

const authRegister = (data) => {
  return { type: AUTH_REGISTER, data };
};

export const postAuthDetails = (name, email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/register.json', {
      name: name,
      email: email,
      password: password,
    });
    console.log('res: ', res);

    if (res.status) {
      // login
      postLogin(email, password);
    }

    // dispatch(authRegister(res.data));
  } catch (error) {
    log.error(error);
  }
};

export const setTokenFromStorage = (token) => async (dispatch) => {
  try {
    dispatch(authLogin(token))
  } catch (error) {
    log.error(error);
  }
}
