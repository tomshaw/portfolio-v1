// ==========================================================================
// Title
// ==========================================================================
import React from 'react';
//import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

const Title = ({header, paragraph, ...rest}) => (
  <Row>
    <Col lg={6}>
      <div className="page-title">
        <h1>{header}</h1>
        <p>{paragraph}</p>
      </div>
    </Col>
  </Row>
);

Title.propTypes = {
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired
};

Title.defaultProps = {
    first: 'Welcome',
    second: 'Tom Shaw is a systems analyst and user interface designer from Dallas, Texas.'
};

export default Title;
