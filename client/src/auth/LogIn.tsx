import * as React from 'react';
import { Link } from 'react-router-dom';
import Authenticator, {
  AuthErrorMessage,
  AuthErrorType,
} from 'auth/Authenticator';
import style from './Auth.st.css';

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

    const authError: AuthErrorMessage | null = await Authenticator.signIn(
      email,
      password
    );

    resetErrors();

    if (authError) {
      switch (authError.type) {
        case AuthErrorType.EMAIL:
          setEmailError(authError.message);
          break;
        case AuthErrorType.PASSWORD:
          setPasswordError(authError.message);
          break;
      }
    }

    setLoading(false);
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
