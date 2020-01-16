// ==========================================================================
// LatestItem
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';
import {StyledItem, StyledLink} from '../styles';

const StyledItemExtend = StyledItem.extend`
  list-style-type: none;
  margin: 0.3rem 0;
`;

const StyledLinkExtend = StyledLink.extend`
  margin: 0 0 0 5px;
`;

const Item = ({title, description, href, icon, ...rest}) => (
  <StyledItemExtend>
    <i className={icon}></i>
    <StyledLinkExtend to={href}>{title}</StyledLinkExtend> - {description}
  </StyledItemExtend>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired
};

Item.defaultProps = {
  title: "",
  description: "",
  href: "",
  icon: "",
  enabled: false
};

export default Item;
