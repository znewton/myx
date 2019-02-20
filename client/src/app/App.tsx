import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import style from './App.st.css';

import { LogIn } from 'auth/LogIn';
import { SignUp } from 'auth/SignUp';
import { Play } from 'play/Play';

export const App: React.SFC = props => {
  React.useEffect(() => {
    document.title = 'myx';
  });

  return (
    <div {...style('root', {}, props)}>
      <Switch>
        <Route path="/play" component={Play} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <Redirect from="/" to="/play" />
      </Switch>
    </div>
  );
};
