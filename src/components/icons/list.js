// ==========================================================================
// IconList
// ==========================================================================
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconList = styled.div`
  position: absolute;
  right: 30px;
  bottom: 20px;
  display: inline-block;
  margin: 0;
  padding: 0;
`;

const List = ({children}) => (
  <IconList className="icons">
    {children}
  </IconList>
);

List.propTypes = {
    children: PropTypes.node
};

List.defaultProps = {
    children: null
};

export default List;
