import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from 'config/firebase.config';
import './project.st.css';
import style from './index.st.css';

import { App } from 'app/App';

firebase.initializeApp(FirebaseConfig);
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // signed-in
    if (!window.location.pathname.match(/^\/play/))
      window.location.assign('/play');
  } else if (
    !window.location.pathname.match(/^\/login/) &&
    !window.location.pathname.match(/^\/signup/)
  ) {
    window.location.assign('/login');
  }
});

ReactDOM.render(
  <BrowserRouter {...style('root', {}, {})}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
