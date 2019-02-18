import * as React from 'react';
import style from './Logo.st.css';

export const Logo: React.SFC = props => {
  return (
    <div {...style('root', {}, props)}>
      <span className={style.m}>m</span>
      <span className={style.y}>y</span>
      <span className={style.x}>x</span>
    </div>
  );
};
