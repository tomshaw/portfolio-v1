// ==========================================================================
// Layout
// ==========================================================================
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import $ from 'jquery';

//import { app } from '../../firebase';

// utilities
import emitter from '../../base/emitter';
import config from '../../base/config';
import {LoadByPropKey, getSlugFromPath} from '../../base/utils';

// actions
import {changeTheme} from '../../actions/themeActions';
import {setAppLoading} from '../../actions/loadingActions';

// components
import Routes from '../routes';
//import Meta from '../meta';
import Header from '../header';
import Footer from '../footer';
import SoundCloud from '../soundcloud';
import YouTubeVideo from '../youtube';
import Loader from '../loader';
import Overlay from '../overlay';

// data
import music from '../../data/music';
import manifest from '../../data/manifest';

class Layout extends Component {

    // eslint-disable-next-line
    constructor(props) {
      super(props);
      
      emitter.setMaxListeners(0);

      this.state = {
        authenticated: false,
        currentUser: null
      }

      this.handlePageTheme = this.setPageTheme.bind(this);
      this.handleAppLoading = this.setAppLoading.bind(this);
    }

    componentDidMount() {
      
      this.$app = document.querySelector('.application');

      /*app.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            authenticated: true,
            currentUser: user
          });
        } 
      });*/

    }

    setAppLoading(val) {
        // must come first for loading animations.
        this.setPageReady(true);
        setTimeout(() => {
          this.props.actions.setAppLoading(val);
        }, 2e3)
    }

    setPageReady(val) {
        if (val === true) {
            this.$app.classList.remove('is-loading');
        } else {
            this.$app.classList.add('is-loading');
        }
    }

    setPageTheme(theme) {
      this.props.actions.changeTheme(theme);
      //this.setAppLoading(false);
    }

    handleTheme(config) {
        const stateTheme = this.props.theme;
        if (stateTheme !== 'config') {
            return stateTheme;
        }
        return config;
    }

	  render() {

      const {loading, pages, page} = this.props;

      const showHeader = page.header;
      const showFooter = page.footer;
      const showVideo = page.video;

      $('body').css('background-color', page.bgcolor);

      const theme = this.handleTheme(page.theme);

      const selector = classNames('application','is-loading', theme);

      if (loading === false) {
        setTimeout(() => {
          this.setPageReady(true);
        }, 2e3);
      }

      const youTubeConfig = config.get('youtube');

      return (

        <main className={selector}>
          
          {/* <Meta page={page} /> */}
          
          {showHeader && <Header pages={pages} setAppLoading={this.handleAppLoading} />}
          
          <SoundCloud tracks={music} random={true} enabled={true} clientId={'6f1327a14a0a8b3fe7026390efdb595e'}/>
          
          {loading && <Loader manifest={manifest} setAppLoading={this.handleAppLoading} />}
          
          {showVideo && <YouTubeVideo videoId={youTubeConfig.videoId} options={youTubeConfig} />}
          
          <div className="page-wrapper" style={{minHeight: '100vh'}}>
            <Routes authenticated={this.state.authenticated} />
          </div>

          {showFooter && <Footer setPageTheme={this.handlePageTheme} />}
          
          <Overlay />

        </main>
	    )
    }

}

function mapStateToProps(state, ownProps) {
  const slug = getSlugFromPath(window.location.pathname);
  const page = LoadByPropKey(state.section, 'route', (slug === '/') ? 'home' : slug);
  return {
    loading: state.loading,
    theme: state.theme,
    pages: state.section,
    page: page
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({setAppLoading, changeTheme}, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
