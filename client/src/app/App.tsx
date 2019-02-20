import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import style from './App.st.css';

import { Logo } from 'shared/Logo';
import { LogIn } from 'auth/login/LogIn';
import { SignUp } from 'auth/signup/SignUp';

export const App: React.SFC = props => {
  React.useEffect(() => {
    document.title = 'myx';
  });

  return (
    <div {...style('root', {}, props)}>
      <Switch>
        <Route path="/play" component={Logo} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <Redirect from="/" to="/play" />
      </Switch>
    </div>
  );
};
