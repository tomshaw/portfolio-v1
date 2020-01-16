// ==========================================================================
// YouTubeVideo
// ==========================================================================
import React, {Component} from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import $ from 'jquery';

// utilities
import emitter from '../../base/emitter';

// components
import Controls from './controls';

const BackgroundVideo = styled.div`
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  overflow: hidden;
  iframe {
    transform: scale(1.2);
  }
`;

class YouTubeVideo extends Component {
  
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.video = null;
    this.handleVideoReady = this.onVideoReady.bind(this);
    this.handleVideoPlaying = this.onVideoPlaying.bind(this);

    this.handleClickPlay = this.onClickPlay.bind(this);
    this.handleClickPause = this.onClickPause.bind(this);
    this.handleClickExit = this.onClickExit.bind(this);
  }

  componentDidMount() {

    emitter.on('video:start', (event) => {
      this.startVideo();
    });
    
    emitter.on('video:pause', (event) => {
      this.pauseVideo();
    });

    emitter.on('video:volume', (event) => {
      this.setVolume(event);
    });

  }

  onVideoReady(video) {
    this.video = video.target;
  }

  onVideoPlaying(video) {
    //let target = video.target;
    //console.log(target.getCurrentTime());
    //console.log(target.getDuration());
  }

  startVideo() {
    this.video.playVideo();
    $("body").addClass("is-video");
  }

  pauseVideo() {
    this.video.pauseVideo();
  }

  stopVideo() {
    this.video.stopVideo();
  }

  setVolume(amount) {
    this.video.setVolume(amount); // 100
  }

  onClickPause() {
    this.pauseVideo();
  }

  onClickPlay() {
    this.startVideo();
  }

  onClickExit() {
    
    $("body").removeClass("is-video");
    
    $(".bgvideo").fadeOut('slow');

    this.stopVideo();

    let all = document.querySelectorAll('.controls p span');
    for (let i = 0; i < all.length; i++) {
      all[i].classList.remove('active');
    }

    let play = document.querySelector('.vplay');
    play.classList.add('active');
    
  }

  render() {

    const {videoId, options} = this.props;

    return (
      <BackgroundVideo className="bgvideo">
        <YouTube videoId={videoId} opts={options} onReady={this.handleVideoReady} onPlay={this.handleVideoPlaying} />
        <Controls setPause={this.handleClickPause} setPlay={this.handleClickPlay} setExit={this.handleClickExit} />
      </BackgroundVideo>
    );
  }
}

YouTubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

YouTubeVideo.defaultProps = {
  videoId: '',
  options: {}
};

export default YouTubeVideo;

