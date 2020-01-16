// ==========================================================================
// Menu
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';

// components
import Nav from './nav';
import NavItem from './navitem';

import {
  compose,
  pure,
  withProps,
} from 'recompose';

import {withRouter} from 'react-router';

const isHome = 'is-home';

const buildItems = pages => {
  let items = [];
  for (let i = 0; i < pages.length; i++) {
    let item = pages[i];
    if (item.inmenu === true) {
      items.push({
        title: item.page,
        route: item.route === 'home' ? '/' : '/' + item.route
      });
    }
  }
  return items;
}

const hoc = compose(
    withRouter,
    withProps(({location, pages}) => ({
      isHome: location.pathname === '/' ? isHome : '',
      items: buildItems(pages)
    })),
    pure,
);
  
const Menu = ({items, isHome}) => (
  <Nav selector={isHome}>
    {items.map((item, index) =>
      <NavItem key={index} href={item.route}><span>{item.title}</span></NavItem>
    )}
  </Nav>
);

Menu.propTypes = {
  pages: PropTypes.array
};
  
Menu.defaultProps = {
  pages: []
};
  
export default hoc(Menu);
