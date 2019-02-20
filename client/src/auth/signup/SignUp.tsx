import * as React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import style from '../Auth.st.css';

import { AuthLayout } from 'auth/AuthLayout';
import { Input } from 'shared/form';
import { Button } from 'shared/Button';

export const SignUp: React.SFC = props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmedPassword, setConfirmedPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [confirmedPasswordError, setConfirmedPasswordError] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    document.title = 'myx - Sign Up';
  });

  function resetErrors() {
    setEmailError(null);
    setPasswordError(null);
    setConfirmedPasswordError(null);
  }

  async function handleAuth() {
    setLoading(true);

    if (password !== confirmedPassword) {
      setConfirmedPasswordError('Must match password.');
      return;
    }
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      resetErrors();
    } catch (authError) {
      resetErrors();
      switch (authError.code) {
        case 'auth/invalid-email':
          setEmailError('Invalid email address.');
          break;
        case 'auth/email-already-in-use':
          setEmailError('There is an existing user with this email address.');
          break;
        case 'auth/weak-password':
          setPasswordError('Password is too weak.');
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
      <Input
        className={style.input}
        label="Confirm Password"
        name="confirm_password"
        type="password"
        error={confirmedPasswordError}
        onUpdate={v => setConfirmedPassword((v || '').toString())}
      />
      <div className={style.spacedGroup}>
        <div className={style.flexColumn}>
          <span className={style.hint}>Already have an account?&nbsp;</span>
          <Link to="/login" className={style.link}>
            Log In
          </Link>
        </div>
        <Button className={style.primaryButton} onClick={handleAuth}>
          Sign Up
        </Button>
      </div>
    </AuthLayout>
  );
};
