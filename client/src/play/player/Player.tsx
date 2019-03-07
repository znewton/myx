import * as React from 'react';
import style from './Player.st.css';

interface PlayerProps {
  className: string;
}

export const Player: React.SFC<PlayerProps> = props => {
  return <div {...style('root', {}, props)}>Player</div>;
};
