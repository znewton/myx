import * as React from 'react';
import style from './Sidebar.st.css';

interface SidebarProps {
  title?: string;
  className?: string;
}

export const Sidebar: React.SFC<SidebarProps> = ({
  title = '',
  className = '',
}: SidebarProps) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div {...style('root', { expanded }, { className })}>
      <button
        {...style('toggle', { expanded }, {})}
        onClick={() => setExpanded(!expanded)}
      >
        <span {...style('toggleArrows', { expanded }, {})} />
        <span {...style('toggleTitle', { expanded }, {})}>{title}</span>
      </button>
    </div>
  );
};
