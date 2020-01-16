// ==========================================================================
// Video
// ==========================================================================
import React, { Component } from 'react';
//import PropTypes from "prop-types";
import raf from 'raf'
import prefix from 'prefix'

class Video extends Component {

    static defaultProps = {
        src: '/assets/videos/coffee.mp4',
        poster: '/assets/videos/coffee.jpg',
        bgcolor: 'rgba(34,36,38,0.8)',
        controls: true,
        autoplay: false,
        loop: true,
        playsinline: true
    }

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {

        this.eventListeners = [
            "loadedmetadata",
            "waiting",
            "canplay",
            "play",
            "pause",
            "ended",
            "progress",
            "error"
        ];

        this.transform = prefix('transform');

        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;

        this.duration = 0;
        this.timelineValue = 0;
        this.currentTime = 0;
        this.currentTimelineValue = 0;

        this.isLoaded = false;
        this.isMuted = false;
        this.paused = false;
        this.isPlaying = false;
        this.isFirstPlay = true;

        this.isTicking = false;
        this.enterFrame = this.onEnterFrame.bind(this);
        this.enterFrameId = 0;

        this.$el = document.querySelector(".video-player");
        this.$player = this.$el.querySelector(".player");
        this.$videoSource = this.$el.querySelector(".js-mp4");
        this.$dataSource = this.$player.getAttribute("data-src");
        
        this.$button = this.$el.querySelector(".video-button");
        this.$poster = this.$el.querySelector(".video-button-poster");
        this.$background = this.$el.querySelector(".video-button-background");
        
        this.$playIcon = this.$el.querySelector(".video-play");
        this.$pauseIcon = this.$el.querySelector(".video-pause");
        this.$muteIcon = this.$el.querySelector(".video-toggle-sound");
        
        this.$seekBar = this.$el.querySelector(".video-seekbar");

        this.$button.addEventListener("click", this.onTogglePlay.bind(this), false);
        this.$playIcon.addEventListener("click", this.onTogglePlay.bind(this), false);
        this.$pauseIcon.addEventListener("click", this.onTogglePlay.bind(this), false);
        this.$muteIcon.addEventListener("click", this.onToggleSound.bind(this), false);
        this.$seekBar.addEventListener("click", this.onSeek.bind(this), false);

        this.$player.src = this.props.src;
        this.$poster.style['background-image'] = 'url(' + this.props.poster + ')';
        this.$background.style['background-color'] = this.props.bgcolor;

        if (this.props.controls === false) {
            let buttons = this.$el.querySelectorAll("button");
            for (let i = 0, total = buttons.length; i < total; i++) {
                buttons[i].style['opacity'] = '0';
            }
        }

        if (this.props.autoplay === true) {
            this.$button.click();
        }
    }
        
    enableListeners() {
        for (let i = 0, total = this.eventListeners.length; i < total; i++) {
            this.$player.addEventListener(this.eventListeners[i], this.onPlayerStateChange.bind(this), false);
        }
    }

    onTogglePlay() {
        if (this.isPlaying) {
            this.onPlayerPause();
        } else {
            this.load();
            if (this.isLoaded) {
                this.onPlayerPlay();
            }
        }
    }

    onPlayerStateChange(event) {
        switch (event.type) {
            case 'loadedmetadata':
                this.onPlayerPlay();
                break;
            case 'waiting':
                this.$el.classList.add("is-loading");
                break;
            case 'canplay':
                this.isLoaded = true;
                this.$el.classList.remove("is-loading");
                break;
            case 'ended':
                this.onPlayerEnded();
                break;
            case 'play':
                this.onPlayerPlay();
                break;
            case 'pause':
                this.onPlayerPause();
                break;
            case 'progress':
                break;
            case 'error':
                console.log(event);
                break;
            default:
                console.warn(event);
        }
    }

    onToggleSound() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.$el.classList.add("is-muted");
            this.$player.muted = true;
        } else {
            this.$el.classList.remove("is-muted");
            this.$player.muted = false;
        }
    }

    load() {
        if (this.isLoaded === false) {
            this.$videoSource.src = this.$dataSource;
            this.enableListeners();
            this.$player.load();
        }
    }

    play() {
        this.$player.play();
        this.isPlaying = true;
    }

    pause() {
        this.$player.pause();
        this.isPlaying = false;
    }

    onPlayerPlay() {
        this.$el.classList.add("is-playing");
        this.$el.classList.remove("is-paused");
        this.paused = false;
        if (this.isFirstPlay) {
            this.$el.classList.add("is-started");
            this.isFirstPlay = false;
            this.duration = this.getDuration();
        }
        this.play();
        this.startTicker();
    }

    onPlayerPause() {
        this.$el.classList.remove("is-playing");
        this.$el.classList.add("is-paused");
        this.paused = true;
        this.pause();
        this.stopTicker();
    }

    onPlayerEnded() {
        if (this.props.loop) {
            this.onPlayerPlay();
        } else {
            this.onPlayerPause();
            this.$el.classList.remove("is-started");
            this.isFirstPlay = true;
            this.stopTicker();
        }
        this.currentTimelineValue = 0;
    }

    onSeek(event) {
        var _this = this;
        this.pause();
        this.$el.classList.add("is-seeking");
        this._width = this.$el.offsetWidth;
        this._mouseX = event.clientX - .5 * (this.winWidth - this._width);
        this.currentTimelineValue = this._mouseX / this._width;
        setTimeout(() => {
            _this.$player.currentTime = _this.currentTimelineValue * _this.duration;
            _this.play();
        }, 100);
        clearTimeout(this._seekingTimer);
        this._seekingTimer = setTimeout(() => {
            _this.$el.classList.remove("is-seeking");
        }, 800);
    }

    onEnterFrame() {
        if (this.isPlaying) {
            this.timelineValue = this.getCurrentTime() / this.getDuration();
            this.currentTimelineValue += .1 * (this.timelineValue - this.currentTimelineValue);
            if (this.props.controls === true) {
                this.updateSeekBar();
            }
        }
        this.enterFrameId = raf(this.enterFrame);
    }

    updateSeekBar() {
        this.$seekBar.style['background-color'] = this.props.skcolor;
        this.$seekBar.style[this.transform] = "translateX(" + (-100 + 100 * this.currentTimelineValue + this.timelineValue - this.currentTimelineValue) + "%) translateZ(0)";
    }

    getCurrentTime() {
        return Math.abs(this.$player.currentTime);
    }

    getDuration() {
        return parseFloat(this.$player.duration);
    }

    startTicker() {
        if (!this.isTicking) {
            this.isTicking = true;
            this.enterFrameId = raf(this.enterFrame);
        }
    }

    stopTicker() {
        if (this.isTicking) {
            this.isTicking = false;
            raf.cancel(this.enterFrameId);
        }
    }

    render() {

        const {srcset, poster, bgcolor, controls, autoplay, loop, playsinline} = this.props;

        console.log(this.props, 'this.props');
        
        let posterStyle = {
            backgroundImage: 'url(' + poster + ')' 
        }

        let backgroundStyle = {
            backgroundColor: bgcolor
        }

        const attachCustomAttributes = (domNode) => {
            if (domNode) {
                if (controls === true) {
                    //domNode.setAttribute('controls', controls);
                }
                if (autoplay === true) {
                    domNode.setAttribute('autoplay', autoplay);
                }
                if (loop === true) {
                    domNode.setAttribute('loop', loop);
                }
                if (playsinline === true) {
                    domNode.setAttribute('playsinline', playsinline);
                }
            }
        }

        const createSource = (set) => {
            return set[0].source;
            //return set[set.length-1].source;
        }

        const createSourceSet = (set, i) => {
            const src = set.source;
            const type = set.type;
            const selector = set.selector;
            return (
                <source key={i} type={type} src={src} className={selector} />
            );
        }

        const src = createSource(srcset);

        return (
          <div className="video-player">
            <video ref={attachCustomAttributes} width="100%" height="100%" data-src={src} className="player">
              { srcset.map(createSourceSet, this) } 
            </video>
            <button className="video-button">
              <div className="video-button-body">
                <div className="video-button-poster" style={posterStyle}></div>
                <div className="video-button-background" style={backgroundStyle}></div>
                <div className="video-button-circle"></div>
                <span className="video-button-label">Play</span> 
              </div>
            </button>
            <button className="video-toggle-play"> 
              <img src="/assets/img/icons/play.svg" className="video-play" alt="Play Video"/> 
              <img src="/assets/img/icons/pause.svg" className="video-pause" alt="Pause Video"/> 
            </button>
            <button className="video-toggle-sound"> 
              <span className="video-sound-bar"></span> 
              <span className="video-sound-bar"></span> 
              <span className="video-sound-bar"></span> 
              <span className="video-sound-bar"></span> 
              <span className="video-sound-bar"></span> 
            </button>
            <div className="video-seekbar"></div>
          </div>
        );
    }
}

export default Video;