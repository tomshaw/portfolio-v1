// ==========================================================================
// LatestList
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';
import {StyledList} from '../styles';

const LatestList = StyledList.extend`
  padding-left: 5px;
`;

const List = ({children}) => (
  <LatestList>
    {children}
  </LatestList>
);

List.propTypes = {
  children: PropTypes.node
};

List.defaultProps = {
  children: null
};

export default List;
