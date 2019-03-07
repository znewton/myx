import * as React from 'react';
import style from './DefaultItem.st.css';

interface DefaultItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  expanded: boolean;
}

export const DefaultItem: React.SFC<DefaultItemProps> = ({
  children,
  expanded,
  ...props
}: DefaultItemProps) => (
  <li {...style('defaultItem', { expanded }, props)}>{children}</li>
);
