// ==========================================================================
// MainLogo SVG
// ==========================================================================
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// utilities
import emitter from '../../base/emitter';

class MainLogo extends Component {

    componentDidMount() {
        this.createChildren();
        this.setupHandlers();
        this.onEnable();
    }

    createChildren() {
        this.$el = document.querySelector('.js-main-logo');
    }

    setupHandlers() {
        this.handleOnHover = this.onLogoHover.bind(this);
        this.handleOnClick = this.onLogoClick.bind(this);
    }

    onEnable() {
        this.$el.addEventListener('click', this.handleOnClick, false);
        this.$el.addEventListener('mouseenter', this.handleOnHover, false);
        this.$el.addEventListener('mouseleave', this.handleOnHover, false);
    }

    onLogoClick(event) {
        let path = window.location.pathname;
        if (path !== '/') {
            emitter.emit("page:ready", false);
        }
    }

    onLogoHover() {
       this.$el.classList.toggle('rotate');
    }

    render() {
      const {color, scrolled} = this.props;
      return (
        <Link to="/" className="logo js-main-logo" data-scrolled={scrolled} alt="Tom Shaw" title="Tom Shaw">
          <svg id="svg-main-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 532 104.9">
            <g>
              <path className="t" style={{fill: color}} d="M18.1,19.6H0V1.2h56.3v18.4H38v84.1H18.1V19.6z"/>
              <path className="o" style={{fill: color}} d="M125.3,50.6c0,38.6-13.7,54.3-33.2,54.3c-23.3,0-32.4-24.6-32.4-52.8C59.8,24.2,70.9,0,93.5,0C118.3,0,125.3,27.2,125.3,50.6z M80.5,52.5c0,23.3,4.4,35.1,12.5,35.1c8.4,0,11.6-15.2,11.6-36c0-17.9-2.7-34.2-11.7-34.2C84.9,17.3,80.5,30.4,80.5,52.5z"/>
              <path className="m" style={{fill: color}} d="M200.6,67.8c-0.5-9.7-1.2-23-0.9-33.9h-0.5c-1.8,11-4.6,23.6-6.5,31.5l-8.8,36.7h-14.1l-8.5-36c-2-8.2-4.7-21-6.2-32.1h-0.5c-0.3,11.1-0.9,24-1.5,34.2l-1.7,35.6h-17.2l7.5-102.5h21l8.2,37.1c2.9,12.9,5.5,24.3,7.3,35.9h0.3c1.5-11.4,3.8-23,6.5-35.9L193,1.2h21l6.2,102.5h-17.8L200.6,67.8z"/>
              <path className="s" style={{fill: color}} d="M232.5,83.3c4.1,2.3,11.1,4,16.9,4c9.4,0,14-4.9,14-11.6c0-7.5-4.6-11.1-13.2-16.7c-14-8.5-19.3-19.3-19.3-28.6c0-16.4,11-30.1,32.4-30.1c6.7,0,13.1,1.8,16.1,3.6l-3.2,17.2c-2.9-1.8-7.3-3.5-13.1-3.5c-8.5,0-12.6,5.2-12.6,10.6c0,6.1,3,9.3,14.1,16c13.5,8.2,18.6,18.6,18.6,29.4c0,18.7-13.8,31-33.9,31c-8.2,0-16.3-2.1-19.6-4.1L232.5,83.3z"/>
              <path className="h" style={{fill: color}} d="M314.7,1.2v41.1h20.8V1.2h19.9v102.5h-19.9V60.8h-20.8v42.9h-19.9V1.2H314.7z"/>
              <path className="a" style={{fill: color}} d="M389.3,80.3l-4.6,23.4h-19.3L387.6,1.2h23.9l19.9,102.5h-19.3l-4.4-23.4H389.3z M405.9,64.8l-3.3-21.4c-1.1-6.2-2.4-16.4-3.3-23.3h-0.5c-1.1,6.8-2.6,17.5-3.6,23.4l-3.8,21.3H405.9z"/>
              <path className="w" style={{fill: color}} d="M450.2,103.7L432.7,1.2h20.7l5,40.9c1.4,11.7,2.3,23.4,3.5,35.9h0.5c1.4-12.6,3.6-23.7,5.8-36l7.3-40.8h16.1l6.8,40.5c1.8,11.6,3.6,23,4.9,36.3h0.3c1.4-13.4,2.6-24.3,4-36.2l5-40.6H532l-18.1,102.5h-20.5l-6.1-33.6c-1.7-9.4-3.2-21.1-4.6-33.6h-0.3c-1.8,12.3-3.5,23.7-5.6,33.8l-6.8,33.5H450.2z"/>
            </g>
          </svg>
        </Link>
      );
    }
}

export default MainLogo;
