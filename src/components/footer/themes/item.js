// ==========================================================================
// ThemeItem
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';
import {StyledItem, StyledLink} from '../styles';

const Item = ({title, description, theme, ...rest}) => (
  <StyledItem>
    <StyledLink to="/" alt={title} title={title} data-theme={theme}>{title}</StyledLink> - {description}
  </StyledItem>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
};

Item.defaultProps = {
  title: "",
  description: "",
  theme: ""
};

export default Item;
