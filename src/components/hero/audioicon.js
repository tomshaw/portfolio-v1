// ==========================================================================
// AudioIcon
// ==========================================================================

/**
    <AudioIcon href="/" id="audio" scrolled={scrolled}>
    <i className="audio-icon">
      <span className="audio-icon-bg"></span>
      <span className="audio-icon-bg"></span>
      <span className="audio-icon-bg"></span>
      <span className="audio-icon-bg"></span>
      <span className="audio-icon-bg"></span>
      <span className="audio-icon-bg"></span>
      <span className="audio-icon-bg"></span>
      <span className="audio-icon-bg"></span>
      <span className="audio-icon-bg"></span>
    </i>
    </AudioIcon>
 */
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AudioIcon = styled.a`
  position: absolute;
  bottom: 20px;
  left: 30px;
  opacity: ${({scrolled}) => scrolled ? 0 : 1};
  transition: opacity 2s ease;
`;

AudioIcon.propTypes = {
  scrolled: PropTypes.bool
};
  
AudioIcon.defaultProps = {
    scrolled: false
};

export default AudioIcon;
