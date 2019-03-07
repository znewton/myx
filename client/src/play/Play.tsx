import * as React from 'react';
import style from './Play.st.css';
import Authenticator from 'auth/Authenticator';

import { Header } from './header/Header';
import { Sidebar } from './sidebar/Sidebar';
import { Player } from './player/Player';

export const Play: React.SFC = props => {
  const [user, setUser] = React.useState<firebase.User | null>(null);

  React.useEffect(() => {
    const removeAuthListener = Authenticator.addAuthListener(setUser);
    return () => {
      removeAuthListener();
    };
  });
  console.log(user);
  return (
    <div {...style('root', {}, props)}>
      <div className={style.flexRow}>
        <Sidebar title="Mixes" className={style.mixBar} />
        <Sidebar title="Queue" className={style.queueBar} />
      </div>
      <div className={style.flexColumn}>
        <Header className={style.header} />
        <Player className={style.player} />
      </div>
    </div>
  );
};
