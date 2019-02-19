import * as React from 'react';
import style from './App.st.css';

import { Logo } from 'shared/Logo';

export const App: React.SFC = props => {
  React.useEffect(() => {
    document.title = 'myx';
  });

  return (
    <div {...style('root', {}, props)}>
      <Logo />
    </div>
  );
};
