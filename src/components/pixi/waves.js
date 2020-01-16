// ==========================================================================
// Waves
// ==========================================================================
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import DisplacementImage from './assets/clouds.jpg';

let PIXI = require('pixi.js');

class Waves extends Component {

    constructor(props) {
        super(props);
        this.counter = 1;
    }

    componentDidMount() {
        this.element = $(".js-canvas");

        if (this.props.onMouseEnter) {
            this.element.on('mouseenter', () => {
                this.props.onMouseEnter(this);
            });
        }

        if (this.props.onMouseLeave) {
            this.element.on('mouseleave', () => {
                this.props.onMouseLeave(this);
            });
        }

        this.imgWidth = 790;
        this.imgHeight = 526;
        this.imgRatio = this.imgHeight / this.imgWidth;

        this.winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.winWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        this.handleEnterFrame = this.onEnterFrame.bind(this);

        this.app = new PIXI.Application({
            view: this.element[0],
            backgroundColor: 'transparent'
        });

        this.stage = new PIXI.Container();
        this.imgContainer = new PIXI.Container();
        this.displacementSprite = PIXI.Sprite.fromImage(DisplacementImage);
        this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);

        this.imgContainer.position.x = this.imgWidth / 2;
        this.imgContainer.position.y = this.imgHeight / 2;
        this.stage.scale.x = this.stage.scale.y = this.winWidth / this.imgWidth;
        this.stage.interactive = true;
        this.stage.addChild(this.imgContainer);
        
        this.app.stage.addChild(this.stage);
        this.app.renderer.resize(this.winWidth, this.winWidth * this.imgRatio);

        let sprite = PIXI.Sprite.fromImage(this.props.fromImage);
        sprite.anchor.x = .5;
        sprite.anchor.y = .5;
        this.imgContainer.addChild(sprite);

        this.stage.addChild(this.displacementSprite);
        this.displacementFilter.scale.x = this.displacementFilter.scale.y = this.winWidth / this.imgWidth;
        this.imgContainer.filters = [this.displacementFilter];

        if (!this.props.autostart) {
            this.app.ticker.add(this.handleEnterFrame);
        }
    }

    componentWillUnmount() {
        this.app.ticker.remove(this.handleEnterFrame);
    }

    onEnterFrame() {
        this.displacementFilter.scale.x = this.props.dispX ? this.props.transition * this.props.dispScale : 0;
        this.displacementFilter.scale.y = this.props.dispY ? this.props.transition * (this.props.dispScale + 10) : 0;
        this.displacementSprite.x = 200 * Math.sin(.15 * this.counter);
        this.displacementSprite.y = 200 * Math.cos(.13 * this.counter);
        this.displacementSprite.rotation = .06 * this.counter;
        this.counter += .05 * this.props.speed;
        this.app.render(this.stage);
    }

    stop() {
        this.app.ticker.remove(this.handleEnterFrame);
    }

    start() {
        this.app.ticker.add(this.handleEnterFrame);
    }

    render() {
      return (
        <div className="waves">
          <canvas className="js-canvas"></canvas>
        </div>
      );
    }
}

Waves.propTypes = {
    autoStart: PropTypes.bool,
    transition: PropTypes.number,
    speed: PropTypes.number,
    dispScale: PropTypes.number,
    dispX: PropTypes.bool,
    dispY: PropTypes.bool,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
};

Waves.defaultProps = {
    autoStart: false,
    transition: 1,
    speed: 1,
    dispScale: 40,
    dispX: true,
    dispY: true
};

export default Waves;

/*
<Waves
autoStart={true} 
fromImage={MelterImage} 
transition={1} 
speed={1} 
dispScale={40} 
dispX={true} 
dispY={true} 
onLoaded={this.onWavesLoaded.bind(this)}
onMouseEnter={this.onWavesMouseEnter.bind(this)}
onMouseLeave={this.onWavesMouseLeave.bind(this)} /> 
*/