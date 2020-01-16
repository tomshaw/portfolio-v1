// ==========================================================================
// Waves
// ==========================================================================
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import DisplacementImage from './assets/map.jpg';

let PIXI = require('pixi.js');

class Wave extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.canvas = $(".js-canvas"); 
        this.onLoaded = this.props.onLoaded;
        this.onMouseEnter = this.props.onMouseEnter;
        this.onMouseLeave = this.props.onMouseLeave;
        this.resolution = this.props.resolution || 1; 
        this.loaded = false; 
        this.spriteScale = 1; 
        this.container = this.canvas.parent(); 
        this.img = this.getImg(); 
        this.nextTexture = null;
        this.prevWidth = 0;
        this.prevHeight = 0;
        if (this.props.autoInit) {
            this.init();
        }
    }

    init() {
        if (this.img) {
            this.app = new PIXI.Application({
                view: this.canvas[0],
                transparent: !0,
                resolution: this.resolution
            });
            this.app.stop(); 
            this.resizeImg(); 
            if (!this.map) {
                this.initMap();
            }
            this.map.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT; 
            this.app.stage.addChild(this.map);
            this.filter = new PIXI.filters.DisplacementFilter(this.map); 
            this.filter.filterArea = this.app.screen; 
            this.filter.padding = 0;
            this.filter.resolution = this.resolution;
            this.filter.scale.set(0, 0); 
            if (!this.sprite) {
                this.initSprite();
            } 
            this.sprite.anchor.set(.5);
            this.sprite.filters = [this.filter];
            this.app.stage.addChild(this.sprite); 
            this.sprite.texture.baseTexture.hasLoaded ? this.onTextureLoaded() : this.sprite.texture.baseTexture.once("loaded", this.onTextureLoaded.bind(this));
        }
    }
			
    initSprite() {
        if (this.img) {
            this.resizeImg();
            this.sprite = PIXI.Sprite.fromImage(this.img);
        }
    } 
    
    initMap() {
        if (this.img) {
            this.map = PIXI.Sprite.fromImage(DisplacementImage);
        }
    } 
    
    dispose() {
        if (this.sprite) {
            this.sprite.filters = null;
            this.sprite.destroy(true, true, true);
            this.sprite = null;
        }
        if (this.app) {
            this.app.destroy();
            this.app = null;
        }
    } 
    
    resize() {
        if (this.app) {
            let width = this.container.width();
            let height = this.container.height();
            if (width !== this.prevWidth || height !== this.prevHeight) {
                this.prevWidth = width;
                this.prevHeight = height;
                this.app.renderer.resize(width, height);
                let sWidth = width / this.sprite.texture.width;
                let sHeight = height / this.sprite.texture.height;
                let scale = Math.max(sWidth, sHeight);
                this.spriteScale = scale;
                this.sprite.scale.set(scale);
                this.sprite.x = .5 * width;
                this.sprite.y = .5 * height;
                this.app.render();
                if (this.resizeImg()) {
                    this.nextTexture = PIXI.Texture.fromImage(this.img);
                    if (this.nextTexture.baseTexture.hasLoaded) {
                        this.onNextTextureLoaded();
                    } else {
                        this.nextTexture.baseTexture.once("loaded", this.onNextTextureLoaded.bind(this));
                    }
                }
            }
        }
    } 
    
    resizeImg() {
        return false;
    } 
    
    getImg() {
        return this.props.fromImage;
    }
    
    onTextureLoaded() {
        this.loaded = true;
        this.resize();
        if (this.onLoaded) {
            this.onLoaded(this);
        }
        if (this.onMouseEnter) {
            this.canvas.on('mouseenter', () => {
                this.props.onMouseEnter(this);
            });
        }
        if (this.onMouseLeave) {
            this.canvas.on('mouseleave', () => {
                this.props.onMouseLeave(this);
            });
        }
    }
    
    onNextTextureLoaded() {
        if (this.sprite) {
            this.sprite.texture = this.nextTexture;
            this.resize();
        }
    }

    render() {
      return (
        <div className="waves">
          <canvas className="js-canvas"></canvas>
        </div>
      );
    }
}

Wave.propTypes = {
    autoInit: PropTypes.bool,
    resolution: PropTypes.number,
    onLoaded: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
};

Wave.defaultProps = {
    autoInit: false,
    resolution: 1
};

export default Wave;
