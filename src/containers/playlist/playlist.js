// ==========================================================================
// Playlist
// ==========================================================================
import React, { Component } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import $ from 'jquery';

// components
import Hero from '../../components/hero';
import Title from '../../components/title';

// utilities
import {LoadByPropKey, immutableReverse} from '../../base/utils';
import emitter from '../../base/emitter';

class Playlist extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        emitter.emit('video:pause');
        emitter.emit('audio:pause');

        const clientId = '6f1327a14a0a8b3fe7026390efdb595e';
        
        const promise = $.get('https://api.soundcloud.com/playlists/351443211?client_id=' + clientId);
        promise.done(response => {
          const tracks = immutableReverse(response.tracks);
          for (let i = 0, total = tracks.length; i < total; i++) {
            let uri = tracks[i].uri;
            let title = tracks[i].title;
            $("#soundcloud").append('<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player?url=' + uri + '&auto_play=false&show_comments=false" title="' + title + '"></iframe>');
          }
        });
    }

    render() {
        
        const {page} = this.props;

        const selector = classNames('page', page.selector);

        return (
          <article className={selector}>
            <Hero>creative <span>playlist</span> portfolio</Hero>
            <div className="content">
              <div className="container-fluid">
                <Title header={page.title} paragraph={page.description} />
                <div className="row">
                  <div className="col-md-12" id="soundcloud"></div>
                </div>
              </div>
            </div>
          </article>
        );
    }
}

function mapStateToProps(state, ownProps) {
  const path = ownProps.match.path.split('/')[1];
  return {
    page: LoadByPropKey(state.section, 'route', path)
  };
}

export default connect(mapStateToProps)(Playlist);
