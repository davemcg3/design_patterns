/**
 * @file App main entry point.
 */

import 'babel-polyfill';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Include the main scss file for webpack processing.
import '../css/app.scss';

import rootReducer from './reducers/root-reducer';
import Auth from './containers/AuthContainer';
import Form from './containers/FormContainer';
import getLogger from './util/logger';

const log = getLogger('App');

const init = () => {
  log.info('init() :: App starts booting...');

  // Check for devToolsExtension
  const create = window.devToolsExtension ?
    window.devToolsExtension()(createStore) : createStore;

  // Apply thunk and additional middleware if applicable
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(create);

  // Init store
  const store = createStoreWithMiddleware(rootReducer);
  log.info('init() :: App booted.');

  ReactDom.render(
    <Provider store={store}>
      <div id="app-main">
        <Auth />
        <Form />
      </div>
    </Provider>,
    document.getElementById('app'),
  );
};

// init app
init();
