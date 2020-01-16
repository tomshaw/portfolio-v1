// ==========================================================================
// Logout
// ==========================================================================
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import { app } from '../../../firebase';

class Logout extends Component {

    componentWillMount() {
      app.auth().signOut();
    }

    render() {
      return (
        <Redirect to="/" />
      );
    }
}

export default Logout;
