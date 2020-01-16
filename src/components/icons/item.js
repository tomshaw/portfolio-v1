// ==========================================================================
// NavItem
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';
//import {Link} from 'react-router-dom';
import styled from 'styled-components';

//const StyledLink = styled(Link)`
const StyledLink = styled.a`
  color: ${props => props.color ? props.color : 'black'};
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0;
  cursor: pointer;
  font-size: 2rem;
  text-decoration: none;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  i {
    position: relative;
    top: 1px;
  }
  &:hover {
    opacity: .7;
  }
`

const Item = ({active, color, styles, href, title, type, ...rest}) => (
  <StyledLink href={href} color={'white'} className={styles.outer} title={title} type={type}>
    {type === "normal" && <i className={styles.inner}></i>}
    {type === "email" && <i className={styles.inner}></i>}
  </StyledLink>
);

Item.propTypes = {
  active: PropTypes.bool.isRequired,
  color: PropTypes.string,
  styles: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string
};

Item.defaultProps = {
  active: false,
  color: '#000',
  styles: {
      outer: "",
      inner: ""
  },
  href: "/",
  title: "",
  type: "normal"
};

export default Item;
