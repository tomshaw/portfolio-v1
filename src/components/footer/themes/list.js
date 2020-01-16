// ==========================================================================
// ThemeList
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';
import {StyledList} from '../styles';

const List = ({children}) => (
  <StyledList className="themes">
    {children}
  </StyledList>
);

List.propTypes = {
  children: PropTypes.node
};

List.defaultProps = {
  children: null
};

export default List;
