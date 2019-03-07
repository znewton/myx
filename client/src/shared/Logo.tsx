import * as React from 'react';
import style from './Logo.st.css';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Logo: React.SFC<LogoProps> = props => {
  return (
    <div {...style('root', {}, props)}>
      <span className={style.m}>m</span>
      <span className={style.y}>y</span>
      <span className={style.x}>x</span>
    </div>
  );
};
