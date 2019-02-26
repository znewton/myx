import * as React from 'react';
import style from './Sidebar.st.css';

interface SidebarProps {
  className: string;
}

export const Sidebar: React.SFC<SidebarProps> = props => {
  return <div {...style('root', {}, props)}>Sidebar</div>;
};
