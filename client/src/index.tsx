import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Authenticator from 'auth/Authenticator';
import './project.st.css';
import style from './index.st.css';

import { App } from 'app/App';

Authenticator.addAuthListener(user => {
  if (user) {
    // signed-in
    if (!window.location.pathname.match(/^\/play/)) {
      window.location.assign('/play');
    }
  } else if (
    !window.location.pathname.match(/^\/login/) &&
    !window.location.pathname.match(/^\/signup/)
  ) {
    // signed-out
    window.location.assign('/login');
  }
});
Authenticator.init();

ReactDOM.render(
  <BrowserRouter {...style('root', {}, {})}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
