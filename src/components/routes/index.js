// ==========================================================================
// Routes
// ==========================================================================
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {APP_TOKEN_KEY} from '../../base/constants';

// components
import Page from '../page';
import TrackerFactory from '../tracker';

// containers
import NotFound from '../../containers/notfound';

// data
import data from '../../data/routes';

const checkAuth = () => {
  const token = localStorage.getItem(APP_TOKEN_KEY);
  return (token) ? true : false;
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    )
  )} />
)

const Routes = ({authenticated}) => (
    <Switch>                
    {
      data.map((route, index) => {
        let path = (typeof route.path === 'object') ? route.path.pathname : route.path;
        let secure = route.protected;
        if (secure) {
          return (
            <AuthRoute
              key={index}
              path={path}
              exact={true}
              component={TrackerFactory(Page(route.component, authenticated))}
            />
          )
        } else {
          return (
            <Route
              key={index}
              path={path}
              exact={true}
              component={TrackerFactory(Page(route.component, authenticated))}
            />
          )
        }
      })
    }
    <Route path="*" component={TrackerFactory(Page(NotFound), true)} />
  </Switch>
)

export default Routes;
