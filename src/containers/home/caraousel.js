// ==========================================================================
// Home
// ==========================================================================
import React, { Component } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Hammer from 'hammerjs';

// utilities
import {LoadByPropKey, getSlugFromPath} from '../../base/utils';
import emitter from '../../base/emitter'
import normalizeWheel from '../../base/normalizeWheel';

// components
import Icons from '../../components/icons';

// data
import icons from '../../data/icons';

class Home extends Component {

    // eslint-disable-next-line
    constructor(props) {
      super(props);
      this.winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      
      this.activeIndex = 0;
      this._direction = 1;
      this._slideWidth = 0;
      this._mouseX = 0;
      this._mouseY = 0;
      this._mouseRatioX = 0;
      this._mouseRatioY = 0;
      this._isAnimating = false;
      this.translationX = 0;
      this.translationY = 0;
      this._translateX = 0;
      this._translateY = 0;
      this._delta = 0;
      this._transitionDuration = 1.1;
      this._selectors = ['.js-home','.js-work','.js-play'];
      this._assets = '.js-home';

      this.lastY = 0;

      for (var i = 0; i < this._selectors.length; i++) {
          //document.querySelectorAll(this._selectors[i]).style = '';
      }
    }

    componentDidMount() {
        this.createChildren()
        this.setupHandlers();
        this.onEnable();
        this.onResize();
        this.onFocusFrontSlide(); 
        this.onFocusBackSlide(this._transitionDuration);
        this.onEnterFrame();
    }

    componentWillUnmount() {
        emitter.removeListener("resize", this.handleResize); 
        emitter.removeListener("enterframe", this.handleEnterFrame); 
        document.removeEventListener("keydown", this.handleKeyPress);
        document.removeEventListener("keydown", this.handleKeyPress);
        document.removeEventListener('DOMMouseScroll', this.handleMouseWheel);
        document.removeEventListener('mousewheel', this.handleMouseWheel);
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.hammer.off('swipeleft', this.handleSwipeLeft);
        this.hammer.off('swiperight', this.handleSwipeRight);
    }

    createChildren() {
        this.$el = document.querySelector(".carousel");
        this.$slides = this.$el.querySelectorAll(".js-slide"); 
        this.$slidesFront = this.$el.querySelectorAll(".js-slide-front"); 
        this.$backgrounds = this.$el.querySelectorAll(".sliderbg"); 
    }

    setupHandlers() {
        this.handleResize = this.onResize.bind(this);
        this.handleEnterFrame = this.onEnterFrame.bind(this);
        this.handleKeyPress = this.onKeyPress.bind(this);
        this.handleMouseWheel = this.onMouseWheel.bind(this);
        this.handleMouseMove = this.onMouseMove.bind(this);
        this.handleSwipeRight = this.onSwipeRight.bind(this);
        this.handleSwipeLeft = this.onSwipeLeft.bind(this);
    }

    onEnable() {
        emitter.on("resize", this.handleResize);
        emitter.on("enterframe", this.handleEnterFrame);
        document.addEventListener("keydown", this.handleKeyPress);
        document.addEventListener('DOMMouseScroll', this.handleMouseWheel);
        document.addEventListener('mousewheel', this.handleMouseWheel);
        document.addEventListener('mousemove', this.handleMouseMove);
        this.hammer = Hammer(this.$el)
        this.hammer.on('swipeleft', this.handleSwipeLeft);
        this.hammer.on('swiperight', this.handleSwipeRight);
    }

    onSwipeRight(event) {
        this.onNextSlide();
    }

    onSwipeLeft(event) {
      this.onPrevSlide();
  }

    /**
     * {this.workBackgrounds(sections)}
     * 
     * @param {*} sections 
     */
    workBackgrounds(sections) {
      return sections.map((section, index) => {
          if (index === 0) {
              return (<div className="sliderbg is-active is-first" style={{backgroundColor: section.backgroundColor}}></div>)
          } else {
              return (<div className="sliderbg" style={{backgroundColor: section.backgroundColor}}></div>)
          }
      });
    };

    onPrevSlide() {
      if (this.activeIndex > 0) {
          this.activeIndex -= 1;
          this._direction = -1;
          this.onFocusFrontSlide();
          this.onFocusBackSlide(this._transitionDuration);
      }
    }
      
    onNextSlide() {
      if (this.activeIndex < this.$slides.length - 1) {
          this.activeIndex += 1;
          this._direction = 1;
          this.onFocusFrontSlide();
          this.onFocusBackSlide(this._transitionDuration);
      }
    }

    updateAssets() {
      const selector = this._selectors[this.activeIndex];
      this._assets = document.querySelectorAll(selector);
    }

    updateBackground() {
      for (let i = 0; i < this.$backgrounds.length; i++) {
        this.$backgrounds[i].classList.remove("is-active");
      }
      this.$backgrounds[this.activeIndex].classList.add("is-active");
    }

    onFocusFrontSlide() {
      this.updateAssets();
      this.updateBackground();
      for (let i = 0; i < this.$slides.length; i++) {
          if (i < this.activeIndex) {
              this.$slides[i].classList.remove("is-active");
          } else if (i > this.activeIndex) {
              this.$slides[i].classList.remove("is-active");
          } else {
              this.$slides[i].classList.add("is-active");
          }
      }
    }

    onFocusBackSlide(duration) {

    }

    onEnterFrame() {
      this.translationX += .1 * (this._translateX - this.translationX);
      this.translationY += .1 * (this._translateY - this.translationY);
      requestAnimationFrame(this.onEnterFrame.bind(this));
    }

    onResize() {

    }

    onMouseMove(event) {
      this._mouseX = event.pageX;
      this._mouseY = event.pageY;
      this._mouseRatioX = this._mouseX / this.winWidth;
      this._mouseRatioY = this._mouseY / this.winHeight;
      this._translateX = 2 * (this._mouseRatioX - .5) * 7;
      this._translateY = 2 * (this._mouseRatioY - .5) * 7;
      this.animate();
    }
  
    animate() {
      for (let i = 0; i < this._assets.length; i++) {
        let string = "translateX(" + this.translationX * (i + 1) * .5 + "px) translateY(" + this.translationY * (i + 1) * .5 + "px) translateZ(0)";
        this._assets[i].style.transform = string;
      }
    }

    onKeyPress(event) {
      if (37 === event.keyCode) {
          this.onPrevSlide();
      } else if (39 === event.keyCode) {
          this.onNextSlide();
      }
    }

    onMouseWheel(event) {
      const that = this;

      event.preventDefault();
      event.stopPropagation();
      
      clearTimeout(this.wheelTimer);
      this.wheelTimer = setTimeout(() => {
          that._isWheeling = false;
      }, 100);

      if (Math.abs(-normalizeWheel(event).pixelY) < 20) {
          clearTimeout(this.wheelTimer);
          this._isWheeling = false;
      }

      if (!(this._isWheeling || Math.abs(-normalizeWheel(event).pixelY) < 20 || Date.now() - this._lastWheelTime < 1e3)) {
          
          this._lastWheelTime = Date.now();
          
          this._wheelEndTimer = setTimeout(() => {
              clearTimeout(that.wheelTimer);
              that._isWheeling = false;
          }, 2e3);
          
          this._isWheeling = true;

          let wheel = normalizeWheel(event);
          let pixelY = -wheel.pixelY;

          if (pixelY < 0) {
            this.onNextSlide();
          } else if (pixelY > 0) {
            this.onPrevSlide();
          }
      }
    }

	  render() {

      const { page } = this.props;

      const selector = classNames('page', page.selector);

      return (
        <article className={selector}>
          <div className="carousel">

            <div className="sliderbg home is-active"></div>
            <div className="sliderbg work"></div>
            <div className="sliderbg play"></div>

            <div className="slidercopy">

              <div className="slide home js-slide is-active">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6 from-right">
                      <h2 className="title">Creative Portfolio</h2>
                    </div>
                    <div className="col-md-6 hidden-md"></div>
                  </div>
                </div>
              </div>

              <div className="slide work js-slide">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-2 hidden-md"></div> 
                    <div className="col-md-6 from-left">
                      <h2 className="title">Interface Design</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slide play js-slide">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6 from-right">
                      <h2 className="title">Systems Analyst</h2>
                    </div>
                    <div className="col-md-6 hidden-md"></div>
                  </div>
                </div>
              </div>

            </div>

            {/*<div className="decor"></div>*/}

            <Icons icons={icons} />

          </div>
        </article>
	    )
    }

}

function mapStateToProps(state, ownProps) {
  const slug = getSlugFromPath(window.location.pathname);
  const page = LoadByPropKey(state.section, 'route', (slug === '/') ? 'home' : slug);
  return {
    page: page
  };
}

export default connect(mapStateToProps)(Home);
