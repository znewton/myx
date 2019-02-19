import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './project.st.css';
import style from './index.st.css';

import { App } from 'app/App';
import { LogIn } from 'login/LogIn';
import { SignUp } from 'signup/SignUp';

ReactDOM.render(
  <BrowserRouter {...style('root', {}, {})}>
    <Switch>
      <Route path="/play" component={App} />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Redirect from="/" to="/play" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
