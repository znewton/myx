import * as React from 'react';
import style from './Auth.st.css';

import { Logo } from 'shared/Logo';

export const AuthLayout: React.SFC = props => {
  return (
    <div {...style('root', {}, props)}>
      <div className={style.wrapper}>
        <span className={style.logoWrapper}>
          <Logo />
        </span>
        {props.children}
      </div>
    </div>
  );
};
