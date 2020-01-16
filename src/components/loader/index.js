// ==========================================================================
// Preloader
// ==========================================================================
import React, {Component} from 'react';
import createjs from '../../../node_modules/createjs-preloadjs/lib/preloadjs-NEXT.combined';
import TweenMax, {Expo, Linear} from 'gsap';

class Loader extends Component {

    constructor(props) {
      super(props);
      this.manifest = props.manifest;
    }

    componentDidMount() {
      this.createChildren();
      this.setupHandlers();
      this.onEnable();
    }

    createChildren() {
      this.$loader = document.querySelector('.loader');
      this.$number = this.$loader.querySelector('.number');
      this.$bar = this.$loader.querySelector('.bar');
      this.$loadingBar = this.$loader.querySelector('.loading-bar');
    }

    setupHandlers() {
      this.handleProgress = this.onProgress.bind(this);
      this.handleComplete = this.onComplete.bind(this);
    }

    onEnable() {
      const queue = new window.createjs.LoadQueue(true);
      queue.setMaxConnections(2);
      queue.installPlugin(createjs.Sound);
      queue.on('progress', this.handleProgress);
      queue.on('complete', this.handleComplete);
      queue.loadManifest(this.manifest);
    }

    componentWillUnmount() {
      this.handleProgress = null;
      this.handleComplete = null;
    }

    onProgress(event) {

      let loaded = Math.ceil(event.loaded * 100);

      this.$number.innerHTML = Math.floor(loaded) + "%";
      
      TweenMax.set(this.$bar, {
        width: Math.floor(loaded) + "%"
      });

      if (100 === loaded) {

        TweenMax.to(this.$loadingBar, .4, {
          z: 800,
          opacity: 0,
          delay: .5,
          ease: Expo.easeIn
        });
      
        TweenMax.to(this.$number, .4, {
            z: 800,
            opacity: 0,
            delay: .4,
            ease: Expo.easeIn,
            onComplete: () => {
                TweenMax.to(this.$loader, .6, {
                    autoAlpha: 0,
                    ease: Linear.easeNone
                });
            }
        })
      }
      
    }

    onComplete(event) {
      setTimeout(() => {
        this.props.setAppLoading(false);
      }, 1e3)
    }

    render() {
      return (
        <div className="loader">
          <div className="wrapper">
            <p>Loading...</p>
            <div className="loading-bar">
              <div className="bar">
                <span className="number">0%</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default Loader;
