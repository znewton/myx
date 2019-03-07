import * as React from 'react';
import style from './Sidebar.st.css';

type ListItemRenderer = (
  item: any,
  props?: { className: string; expanded: boolean }
) => React.ReactElement;

interface SidebarProps {
  title?: string;
  className?: string;
  items?: Array<any>;
  listItemRenderer?: ListItemRenderer;
}

export const Sidebar: React.SFC<SidebarProps> = ({
  title = '',
  className = '',
  items = [1, 2, 3],
  listItemRenderer = item => <li key={item}>{item}</li>,
}: SidebarProps) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div {...style('root', { expanded }, { className })}>
      <div {...style('contentWrapper', { expanded }, {})}>
        <div {...style('toggleWrapper', { expanded }, {})}>
          <button
            {...style('toggleButton', { expanded }, {})}
            onClick={() => setExpanded(!expanded)}
          >
            <span {...style('toggleArrows', { expanded }, {})} />
            <span {...style('toggleTitle', { expanded }, {})}>{title}</span>
          </button>
        </div>
        <ul className={style.itemList}>
          {items.map(item =>
            listItemRenderer(item, { expanded, className: style.item })
          )}
        </ul>
      </div>
    </div>
  );
};
