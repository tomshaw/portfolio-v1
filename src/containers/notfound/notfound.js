// ==========================================================================
// Music
// ==========================================================================
import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

// components
import Hero from '../../components/hero';

// actions
import {changeTheme} from '../../actions/themeActions';
import {setAppLoading} from '../../actions/loadingActions';

// utilities
import {LoadByPropKey} from '../../base/utils';

class NotFound extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        const {page} = this.props;
        const selector = classNames('page', page.selector);
        return (
          <article className={selector}>
            <Hero>creative <span>not found</span> portfolio</Hero>
          </article>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const page = LoadByPropKey(state.section, 'route', '404');
    return {
        loading: state.loading,
        theme: state.theme,
        page: page
    };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({setAppLoading, changeTheme}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
