// ==========================================================================
// Horizontal Rule
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Rule = styled.hr`
  margin: ${props => props.margin ? props.margin + 'px 0px !important' : '5px 0px !important'};
`;

const HorizontalRule = ({margin, ...props}) => (
  <Rule margin={margin} className="rule rule8" {...props} />
);

HorizontalRule.propTypes = {
  margin: PropTypes.string
};

HorizontalRule.defaultProps = {
  margin: "5"
};

export default HorizontalRule;
