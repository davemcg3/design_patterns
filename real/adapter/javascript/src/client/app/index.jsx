import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';

const render = Component => {
  ReactDOM.render( 
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
}

document.addEventListener("DOMContentLoaded", function() {
  render(App);
});

if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    const NextRootContainer = require('./app.jsx').default;
    render(NextRootContainer);
  });
}
