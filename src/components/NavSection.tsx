import React from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';
import { List, ListSubheader, ListProps } from '@mui/material';
import NavItem from './NavItem';
import Guard from './Guard';
import { Role } from '../types/user';

interface Item {
  path?: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
  children?: Item[];
  title: string;
  roles?: Role[];
}

export interface NavSectionProps extends ListProps {
  items: Item[];
  pathname: string;
  title: string;
  roles?: Role[];
}

const renderNavItems = ({
  depth = 0,
  items,
  pathname,
}: {
  items: Item[];
  pathname: string;
  depth?: number;
}): JSX.Element => (
  <List disablePadding>
    {items.reduce(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define, no-use-before-define
      (acc, item) =>
        reduceChildRoutes({
          acc,
          item,
          pathname,
          depth,
        }),
      [],
    )}
  </List>
);

const reduceChildRoutes = ({
  acc,
  pathname,
  item,
  depth,
}: {
  acc: JSX.Element[];
  pathname: string;
  item: Item;
  depth: number;
}): Array<JSX.Element> => {
  const key = `${item.title}-${depth}`;
  const exactMatch = item.path
    ? !!matchPath(
        {
          path: item.path,
          end: true,
        },
        pathname,
      )
    : false;

  if (item.children) {
    const partialMatch = item.path
      ? !!matchPath(
          {
            path: item.path,
            end: false,
          },
          pathname,
        )
      : false;

    acc.push(
      <Guard roles={item.roles}>
        <NavItem
          active={partialMatch}
          depth={depth}
          icon={item.icon}
          info={item.info}
          key={key}
          open={partialMatch}
          path={item.path}
          title={item.title}
        >
          {renderNavItems({
            depth: depth + 1,
            items: item.children,
            pathname,
          })}
        </NavItem>
      </Guard>,
    );
  } else {
    acc.push(
      <Guard roles={item.roles}>
        <NavItem
          active={exactMatch}
          depth={depth}
          icon={item.icon}
          info={item.info}
          key={key}
          path={item.path}
          title={item.title}
        />
      </Guard>,
    );
  }

  return acc;
};

const NavSection: React.FC<NavSectionProps> = (props) => {
  const { items, pathname, title, roles, ...other } = props;

  return (
    <Guard roles={roles}>
      <List
        subheader={
          <ListSubheader
            disableGutters
            disableSticky
            sx={{
              color: 'text.primary',
              fontSize: '0.75rem',
              lineHeight: 2.5,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            {title}
          </ListSubheader>
        }
        {...other}
      >
        {renderNavItems({
          items,
          pathname,
        })}
      </List>
    </Guard>
  );
};

NavSection.propTypes = {
  items: PropTypes.array,
  pathname: PropTypes.string,
  title: PropTypes.string,
};

export default NavSection;
