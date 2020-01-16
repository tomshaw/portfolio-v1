// ==========================================================================
// Tracker
// ==========================================================================
import React from 'react';
import ReactGA from 'react-ga';

if (window.location.host === 'tomshaw.us') {
    ReactGA.initialize('UA-1');
}

const TrackerFactory = (WrappedComponent, notFound = false) => {
    
    return class Tracker extends React.Component {

        componentDidMount() {
            this.error = false
            if (notFound && window.location.pathname !== '/404') {
                window.location.href = '/404'
                this.error = true
            } else {
                if (window.location.host === 'tomshaw.us') {
                    this.logPageView();
                }
            }

        }

        logPageView() {
            ReactGA.set({ page: window.location.pathname + window.location.search })
            ReactGA.pageview(window.location.pathname + window.location.search)
        }

        render() {
            return (!this.error) ? <WrappedComponent {...this.props} /> : null
        }

    }
}

export default TrackerFactory 
