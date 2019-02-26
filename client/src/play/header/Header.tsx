import * as React from 'react';
import Authenticator from 'auth/Authenticator';
import style from './Header.st.css';

import { Logo } from 'shared/Logo';
import { Button } from 'shared/Button';

interface HeaderProps {
  className: string;
}

export const Header: React.SFC<HeaderProps> = props => {
  return (
    <div {...style('root', {}, props)}>
      <Logo className={style.logo} />
      <Button onClick={Authenticator.signOut}>Log out</Button>
    </div>
  );
};
