import * as React from 'react';
import style from './Button.st.css';

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
    <button {...style('root', { loading }, { className, ...props })} {...props}>
      <span className={style.label}>{children}</span>
    </button>
  );
};
