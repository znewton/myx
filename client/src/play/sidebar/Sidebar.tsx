import * as React from 'react';
import style from './Sidebar.st.css';
import { DefaultItem } from './DefaultItem';

type ListItemRenderer = (
  item: any,
  expanded: boolean,
  props?: { className?: string }
) => React.ReactElement;

interface SidebarProps {
  title?: string;
  className?: string;
  items?: Array<any>;
  listItemRenderer?: ListItemRenderer;
}

const defaultItemRenderer: ListItemRenderer = (item, expanded, props = {}) => (
  <DefaultItem key={item} expanded={expanded} {...props}>
    {item}
  </DefaultItem>
);

export const Sidebar: React.SFC<SidebarProps> = ({
  title = '',
  className = '',
  items = [],
  listItemRenderer = defaultItemRenderer,
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
        <ul {...style('itemList', { expanded }, {})}>
          {items.map(item =>
            listItemRenderer(item, expanded, { className: style.item })
          )}
        </ul>
      </div>
    </div>
  );
};
