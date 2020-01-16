import React from 'react';
import {
  compose,
  pure,
  withProps,
} from 'recompose';
import { withRouter } from 'react-router';

const hoc = compose(
  withRouter,
  withProps(({location}) => ({
    isHome: location.pathname === '/',
  })),
  pure
);

const page = (PageComponent, Authenticated) =>
  hoc(({isHome, ...rest}) => (
    <PageComponent isHome={isHome} authenticated={Authenticated} {...rest} />
  ));

export default page;
