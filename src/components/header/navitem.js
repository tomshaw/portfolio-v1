// ==========================================================================
// NavItem
// ==========================================================================
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NavItemWrapper = styled.li`
  display: block;
  padding-right: 1rem;
`;

const StyledNavLink = styled(Link)`
  color: #fff;
  font-family: "Roboto", "san-serif";
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 3px;
`

const NavItem = ({children, href, ...rest}) => (
  <NavItemWrapper>
    <StyledNavLink exact="true" to={href}>{children}</StyledNavLink>
  </NavItemWrapper>
);

NavItem.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired
};

NavItem.defaultProps = {
  children: null
};

export default NavItem;
