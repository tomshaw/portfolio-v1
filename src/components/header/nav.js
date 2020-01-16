// ==========================================================================
// Nav
// ==========================================================================
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavOuter = styled.nav`
position: absolute;
top: 20px;
right: 30px;
`;

const NavInner = styled.ul`
  list-style: none;
`;

const Nav = ({selector, children}) => (
  <NavOuter>
    <NavInner className={selector}>
      {children}
    </NavInner>
  </NavOuter>
);

Nav.propTypes = {
    children: PropTypes.node
};

Nav.defaultProps = {
    children: null
};

export default Nav;
