import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import style from '../Auth.st.css';

import { AuthLayout } from 'auth/AuthLayout';
import { Input } from 'shared/form';
import { Button } from 'shared/Button';

export const LogIn: React.SFC = props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [authed, setAuthed] = React.useState(false);

  React.useEffect(() => {
    document.title = 'myx - Log In';
  });

  function handleAuth() {
    console.log(email, password);
    setLoading(true);
    // fake auth check
    setTimeout(() => {
      setAuthed(false);
      setLoading(false);
    }, 1000);
  }

  return (
    <AuthLayout {...style('root', { loading }, props)}>
      <Input
        className={style.input}
        label="Email"
        name="email"
        type="email"
        onUpdate={v => setEmail((v || '').toString())}
      />
      <Input
        className={style.input}
        label="Password"
        name="password"
        type="password"
        onUpdate={v => setPassword((v || '').toString())}
      />
      <div className={style.spacedGroup}>
        <div className={style.flexColumn}>
          <span className={style.hint}>Don't have an account?&nbsp;</span>
          <Link to="/signup" className={style.link}>
            Sign Up
          </Link>
        </div>
        <Button className={style.primaryButton} onClick={handleAuth}>
          Log In
        </Button>
      </div>
      {authed && <Redirect to="/play" />}
    </AuthLayout>
  );
};
