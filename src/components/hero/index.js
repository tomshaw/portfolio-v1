// ==========================================================================
// Hero
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

// components
import ScrollDown from './scrolldown';
import PressDown from './pressdown';
import Scroller from '../scroller';

// utilities
import emitter from '../../base/emitter';
import config from '../../base/config';

import {
  compose,
  pure,
  lifecycle,
  withHandlers,
  withState,
  withProps
} from 'recompose';

let mouseIsDown = false;
const minimumScrollAmount = 150;
const isMobile = config.get('md').mobile();

const hoc = compose(
  withState('scrolled', 'setScrolled', false),
  withState('mousedown', 'setMouseDown', 0),
  withState('mouseup', 'setMouseUp', 0),
  withProps(({mousedown}) => ({
    amount: (mouseIsDown) ? mousedown : 0,
    isMobile: (isMobile) ? true : false
  })),
  withHandlers({
    handleScroll: ({setScrolled, scrolled}) => () => {
      const scrollY = typeof window.scrollY === 'undefined' ? window.pageYOffset : window.scrollY;
      const newScrolled = scrollY > minimumScrollAmount;
      if (scrolled !== newScrolled) {
        setScrolled(newScrolled);
      }
    },
    handleMouseDown: ({setMouseDown, mousedown}) => () => {

      const handleProgress = (starttime, distribution, duration) => {
        
        let timestamp = new Date().getTime();
        let runtime = timestamp - starttime;
        let progress = Math.min(runtime / duration);
        let amount = (distribution * progress).toFixed(0);

        if (runtime > duration && mouseIsDown) {
          $(".bgvideo").fadeIn('slow');
          $(".page-hero h3").addClass('hidden');
          emitter.emit('video:start');
          setMouseDown(0);
          return;
        }

        let realStartTime = (mouseIsDown) ? starttime : timestamp;
        requestAnimationFrame(() => handleProgress(realStartTime, distribution, duration));

        setMouseDown(amount);
      };
      
      handleProgress(new Date().getTime(), 100, 2e3); // 400px over 2 seconds

      mouseIsDown = true;
    },
    handleMouseUp: ({setMouseUp, mouseup}) => () => {
      mouseIsDown = false;
    }
  }),
  lifecycle({
    componentDidMount() {
      
      const { handleScroll, handleMouseDown, handleMouseUp } = this.props;

      const heroText = document.querySelector('.page-hero h3');
      const pressDown = document.querySelector(".pressdown");
      //const audio = document.getElementById('audio');

      window.addEventListener('scroll', handleScroll);
      if (pressDown) {
        pressDown.addEventListener('mousedown', handleMouseDown);
        pressDown.addEventListener('touchstart', handleMouseDown);
        pressDown.addEventListener('mouseup', handleMouseUp);
        pressDown.addEventListener('touchend', handleMouseUp);
      }

      this.scroll = new Scroller({});
      this.scroll.addItem({
        target: heroText,
        axis: 'x',
        isParallax: true,
        ratio: -0.25,
        scale: 1.05,
        offset: 20
      });

    },
    componentWillUnmount() {
      const { handleScroll } = this.props;
      window.removeEventListener('scroll', handleScroll);
      this.scroll = null;
    }
  }),
  pure
);

const Hero = ({children, scrolled, mousedown, amount, isMobile, ...rest}) => (
  <div className="page-hero">
    <h3>{children}</h3>
    { (isMobile === false) && <PressDown className="pressdown" scrolled={scrolled} width={amount}><span>Press And Hold</span></PressDown> }
    <ScrollDown className="scrolldown" scrolled={scrolled}><span>Scroll Down</span></ScrollDown>    
  </div>
);

Hero.propTypes = {
  children: PropTypes.node
};

Hero.defaultProps = {
  children: null
};

export default hoc(Hero);
