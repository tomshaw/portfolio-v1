// ==========================================================================
// SoundCloud
// this.music.push('https://soundcloud.com/max-richter/02-spring-1');
// ==========================================================================
import React, {Component} from 'react';
import $ from 'jquery';

// utilities
import emitter from '../../base/emitter';

class SoundCloud extends Component {

    constructor(props) {
        super(props);
        this.clientId = this.props.clientId;
        this.music = this.props.tracks;
        this.isLoaded = false;
        this.isPaused = false;
        this.track = null;
    }

    componentDidMount() {
        if (this.props.enabled && this.isLoaded === false) {
           this.createChildren();
           this.setupHandlers();
           this.onEnable();
        }
    }

    createChildren() {
        this.$el = document.getElementById("audioElement");
    }

    setupHandlers() {
        this._onTimeUpdateHandler = this._onTimeUpdateEvent.bind(this);
        this._onTimeEndedHandler = this._onTimeEndedEvent.bind(this);
        emitter.on('audio:play', (event) => {
            this.play(this.random(), this.clientId);
        });
        emitter.on('audio:pause', (event) => {
            this.pause();
        });
    }

    onEnable() {
        this.$el.crossOrigin = "anonymous";
        this.$el.addEventListener("timeupdate", this._onTimeUpdateHandler, false);
        this.$el.addEventListener("ended", this._onTimeEndedHandler, false);
        //this.play(this.random(), this.clientId);
    }

    render() {
        return (
          <audio id="audioElement" crossOrigin="Anonymous"></audio>
        );
    }

    play(track, clientId) {
        if (!this.isPaused) {
            $.getJSON("http://api.soundcloud.com/resolve.json?url=" + track + "&client_id=" + clientId, (response) => {
                this.track = response;
                this.$el.src = this.track.stream_url + "?client_id=" + clientId;
                this.$el.play();
                this.isLoaded = true;
            });
        } else {
            this.$el.play();
        }
    }

    pause() {
        this.$el.pause();
        this.isPaused = true;
    }

    random() {
        return this.music[Math.floor(Math.random() * this.music.length)];
    }

    get(url, callback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                callback(request.responseText);
            }
        }
        request.open("GET", url, true);
        request.send(null);
    }

    _onTimeUpdateEvent(event) {
        //console.log(event, 'audio-update');
        emitter.emit('audio:isplaying', event);
    }

    _onTimeEndedEvent(event) {
        let music = this.music;
        let index = music.indexOf(this.track);
        let remaining = music.splice(index, 1);
        let random = remaining[Math.floor(Math.random() * remaining.length)];
        this.isPaused = false;
        this.play(random, this.clientId);
    }

}

export default SoundCloud;
