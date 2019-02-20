import * as React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import style from '../Auth.st.css';

import { AuthLayout } from 'auth/AuthLayout';
import { Input } from 'shared/form';
import { Button } from 'shared/Button';

export const LogIn: React.SFC = props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);

  React.useEffect(() => {
    document.title = 'myx - Log In';
  });

  function resetErrors() {
    setEmailError(null);
    setPasswordError(null);
  }

  async function handleAuth() {
    setLoading(true);

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      resetErrors();
    } catch (authError) {
      resetErrors();
      switch (authError.code) {
        case 'auth/invalid-email':
          setEmailError('Invalid email address.');
          break;
        case 'auth/user-disabled':
          setEmailError('The user for this email address has been disabled.');
          break;
        case 'auth/user-not-found':
          setEmailError('No user found with this email address.');
          break;
        case 'auth/wrong-password':
          setPasswordError('Incorrect password.');
          break;
        default:
          setEmailError('Something went wrong!');
          console.error(authError.message);
          break;
      }
    }
  }

  return (
    <AuthLayout {...style('root', { loading }, props)}>
      <Input
        className={style.input}
        label="Email"
        name="email"
        type="email"
        error={emailError}
        onUpdate={v => setEmail((v || '').toString())}
      />
      <Input
        className={style.input}
        label="Password"
        name="password"
        type="password"
        error={passwordError}
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
    </AuthLayout>
  );
};
