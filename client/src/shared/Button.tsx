import * as React from 'react';
import style from './Button.st.css';

import { Loader } from 'shared/Loader';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: React.SFC<ButtonProps> = ({
  loading = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...style('root', { loading }, { className, ...props })}
      disabled={loading}
      {...props}
    >
      {loading && <Loader className={style.loader} />}
      <span className={style.label}>{children}</span>
    </button>
  );
};
