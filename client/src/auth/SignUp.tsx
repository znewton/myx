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

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    const authError: AuthErrorMessage | null = await Authenticator.signUp(
      email,
      password,
      confirmedPassword
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
        case AuthErrorType.CONFIRMEDPASSWORD:
          setConfirmedPasswordError(authError.message);
          break;
      }
    }

    setLoading(false);
  }

  return (
    <AuthLayout {...style('root', { loading }, props)}>
      <form onSubmit={handleAuth}>
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
          <Button
            className={style.primaryButton}
            type="submit"
            loading={loading}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};
