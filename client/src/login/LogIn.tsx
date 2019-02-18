import * as React from 'react';
import style from './Login.st.css';

import { Input } from 'shared/form';
import { Logo } from 'shared/Logo';

export const LogIn: React.SFC = props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    document.title = 'Myx - Log In';
  });

  console.log(email, password);

  return (
    <div {...style('root', {}, props)}>
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
      </div>
    </div>
  );
};
