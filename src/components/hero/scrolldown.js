// ==========================================================================
// ScrollDown
// ==========================================================================
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ScrollDown = styled.p`
  color: #fff;
  position: absolute;
  bottom: 20px;
  right: 50px;
  font-family: "Roboto", "san-serif";
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 3px;
  opacity: ${({scrolled}) => scrolled ? 0 : 1};
  transition: opacity 2s ease;
  span {
      position: relative;
      display: block;
      cursor: pointer;
  }
  span:before, 
  span:after {
      content: '';
      position: absolute;
      width: 0%;
      height: 1px;
      top: 50%;
      margin-top: -0.5px;
      background: #fff;
  }
  span:before {
      left: -2.5px;
  }
  span:after {
      right: 2.5px;
      background: #fff;
      transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  span:hover:before {
      background: #fff;
      width: 100%;
      transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  span:hover:after {
      background: transparent;
      width: 100%;
      transition: 0s;
  }
`;

ScrollDown.propTypes = {
  scrolled: PropTypes.bool,
};

ScrollDown.defaultProps = {
  scrolled: false,
};

export default ScrollDown;

