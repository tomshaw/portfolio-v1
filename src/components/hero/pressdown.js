// ==========================================================================
// PressDown
// ==========================================================================
import styled from 'styled-components';
import PropTypes from 'prop-types';

export function setWidth(width) {
  return `
    width: ${width}%;
  `;
}

const PressDown = styled.p`
  color: #fff;
  position: absolute;
  bottom: 20px;
  left: 30px;
  font-family: "Roboto", "san-serif";
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 3px;
  opacity: ${({scrolled}) => scrolled ? 0 : 1};
  transition: opacity 2s ease;
  user-select: none;
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
      background: #000;
      transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  span:before {
    background: #000;
    ${({width}) => setWidth(width)};
    transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  span:after {
    background: transparent;
    ${({width}) => setWidth(width)};
    transition: 0s;
  }
`;

PressDown.propTypes = {
  scrolled: PropTypes.bool
};

PressDown.defaultProps = {
  scrolled: false
};

export default PressDown;

