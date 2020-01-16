// ==========================================================================
// VideoControls
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// components
import PlayPause from './playpause';

import {
  compose,
  pure,
  lifecycle,
  withHandlers,
  withState
} from 'recompose';

const minimumScrollAmount = 150;

const VideoControlsWrapper = styled.div`
display: inline-block;
position: absolute;
bottom: 20px;
left: 50px; 
`;

const hoc = compose(
  withState('scrolled', 'setScrolled', false),
  withHandlers({
    handleScroll: ({setScrolled, scrolled}) => () => {
      const scrollY = typeof window.scrollY === 'undefined' ? window.pageYOffset : window.scrollY;
      const newScrolled = scrollY > minimumScrollAmount;
      if (scrolled !== newScrolled) {
        setScrolled(newScrolled);
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      const { handleScroll } = this.props;
      window.addEventListener('scroll', handleScroll);

      let play = document.querySelector('.vplay');
      play.addEventListener('click', () => {
        pause.classList.remove('active');
        play.classList.add('active');
        this.props.setPlay();
      });

      let pause = document.querySelector('.vpause');
      pause.addEventListener('click', () => {
        play.classList.remove('active');
        pause.classList.add('active');
        this.props.setPause();
      });

      let exit = document.querySelector('.vexit');
      exit.addEventListener('click', () => {
        play.classList.remove('active');
        pause.classList.remove('active');
        exit.classList.add('active');
        this.props.setExit();
      });

    },
    componentWillUnmount() {
      const { handleScroll } = this.props;
      window.removeEventListener('scroll', handleScroll);
    }
  }),
  pure
);

const VideoControls = ({scrolled, ...rest}) => (
  <VideoControlsWrapper className="controls">
    <PlayPause scrolled={scrolled}><span className="vplay active">Play</span> / <span className="vpause">Pause</span> / <span className="vexit">Exit</span></PlayPause>
  </VideoControlsWrapper>
);

VideoControls.propTypes = {
  setPlay: PropTypes.func.isRequired,
  setPause: PropTypes.func.isRequired,
  setExit: PropTypes.func.isRequired
};

export default hoc(VideoControls);
