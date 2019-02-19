import * as React from 'react';
import { Redirect } from 'react-router-dom';
import style from './LogIn.st.css';

import { Input } from 'shared/form';
import { Logo } from 'shared/Logo';
import { Button } from 'shared/Button';

export const LogIn: React.SFC = props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [authed, setAuthed] = React.useState(false);

  React.useEffect(() => {
    document.title = 'Myx - Log In';
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
    <div {...style('root', { loading }, props)}>
      <div className={style.wrapper}>
        <span className={style.logoWrapper}>
          <Logo />
        </span>
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
        <div className={style.btnBar}>
          <Button className={style.submitButton} onClick={handleAuth}>
            Log In
          </Button>
        </div>
      </div>
      {authed && <Redirect to="/play" />}
    </div>
  );
};
