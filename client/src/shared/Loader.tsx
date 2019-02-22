import * as React from 'react';
import style from './Loader.st.css';

interface LoaderProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Loader: React.SFC<LoaderProps> = props => {
  return <span {...style('root', {}, props)} />;
};
