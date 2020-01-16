// ==========================================================================
// Config
// @see https://github.com/hgoebl/mobile-detect.js
// ==========================================================================

let MobileDetect = require('mobile-detect');

const config = {
    md: new MobileDetect(window.navigator.userAgent),
    youtube: {
      videoId: "Ebm69gW9UlI",
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        start: 109
      }
    }
};

module.exports = {
    get(key) {
        return config[key];
    },
    set(key, value) {
        config[key] = value;
    }
};
