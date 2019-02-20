import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Authenticator from 'auth/Authenticator';
import './project.st.css';
import style from './index.st.css';

import { App } from 'app/App';

Authenticator.init();

ReactDOM.render(
  <BrowserRouter {...style('root', {}, {})}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
