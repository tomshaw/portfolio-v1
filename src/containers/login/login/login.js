// ==========================================================================
// Login
// ==========================================================================
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import toastr from 'toastr';
import classNames from 'classnames';
import $ from 'jquery';

import { 
  app,
  googleProvider, 
  facebookProvider,
  githubProvider 
} from '../../../firebase';

// utilities
import {LoadByPropKey} from '../../../base/utils';

class Login extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
        
        this.state = {
          user: false,
          redirect: false
        }

        this.handleLoginGoogle = this.onLoginGoogle.bind(this);
        this.handleLoginGithub = this.onLoginGithub.bind(this);
        this.handleLoginFacebook = this.onLoginFacebook.bind(this);
        this.handleEmailPassword = this.onEmailPassword.bind(this)
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {

      $('.message a').click((e) => {
          e.preventDefault();
          $('form').animate({
              height: "toggle", 
              opacity: "toggle"
          }, "slow");
      });

      $('a.social-icon').click((e) => {
          e.preventDefault();
      });

      app.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        } 
      });

    }

    onLoginGoogle() {
      app.auth().signInWithPopup(googleProvider) 
        .then((user, error) => {
          if (error) {
            toastr.error(error.message);
          } else {
            this.setState({ redirect: true });
          }
        });
    }

    onLoginFacebook() {
      app.auth().signInWithPopup(facebookProvider)
        .then((user, error) => {
          if (error) {
            toastr.error(error.message);
          } else {
            this.setState({ user: user });
          }
        });
    }

    onLoginGithub() {
      app.auth().signInWithPopup(githubProvider)
        .then((user, error) => {
          if (error) {
            toastr.error(error.message);
          } else {
            this.setState({ redirect: true });
          }
        });
    }

    onEmailPassword(event) {
      event.preventDefault();
  
      const email = this.emailInput.value;
      const password = this.passwordInput.value;
  
      app.auth().fetchProvidersForEmail(email)
        .then((providers) => {
          if (providers.length === 0) {
            return app.auth().createUserWithEmailAndPassword(email, password);
          } else if (providers.indexOf("password") === -1) {
            this.loginForm.reset();
            toastr.error('Please use original login method.');
          } else {
            return app.auth().signInWithEmailAndPassword(email, password);
          }
        })
        .then((user) => {
          if (user && user.email) {
            toastr.success("Logged in successfully.");
            this.loginForm.reset();
            this.setState({redirect: true})
          }
        })
        .catch((error) => {
          toastr.error(error.message);
        });
    }

    logout() {
      toastr.success("Logged out successfully.");
      app.auth().signOut()
      .then(() => {
        this.setState({
          redirect: true
        });
      });
    }

    render() {

      const {page} = this.props;

      const selector = classNames('page', page.selector);

      const displayPicture = (this.state.user && this.state.type === 'google') ? true : false;

      const { from } = this.props.location.state || { from: { pathname: '/' } }

      if (this.state.redirect === true) {
        return <Redirect to={from} />
      }

      return (
        <article className={selector}>
          <div className="login-page">
            <div className="form">

              { (displayPicture)
                ? <h1 className="h3">{this.state.user.displayName}</h1>
                : <h1 className="h3">System Login</h1>
              }
            
              { this.state.user &&
                <div className='profile-picture'>
                  <img alt={this.state.user.displayName} src={this.state.user.photoURL} />
                </div>
              }

              { !this.state.user &&
                <form className="register-form" onSubmit={(event) => { this.handleEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                  <input type="text" placeholder="username" />
                  <input type="email" name="email" ref={(input) => { this.emailInput = input }} placeholder="email" />
                  <input type="password" name="password" ref={(input) => { this.passwordInput = input }} placeholder="password" />
                  <button>create</button>
                  <p className="message">Already registered? <a href="/login" className="login">Sign In</a></p>
                </form>
              }

              { !this.state.user &&
                <form className="login-form" onSubmit={(event) => { this.handleEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                  <input type="email" name="email" ref={(input) => { this.emailInput = input }} placeholder="email" />
                  <input type="password" name="password" ref={(input) => { this.passwordInput = input }} placeholder="password" />
                  <button>login</button>
                  <p className="message">Not registered? <a href="/register" className="register">Create an account</a></p>
                </form>
              }

              { 
                this.state.user && 
                <button className="button-logout" onClick={this.logout}>Log Out</button> 
              }

              { 
                this.state.user && 
                <p className="message"><Link to="/">Return back home.</Link></p>
              }

              { !this.state.user &&  
                <ul>
                  <li> <a href="/" className="social-icon" title="Login Using Facebook" onClick={this.handleLoginFacebook}><i className="fa fa-facebook"></i></a> </li>
                  <li> <a href="/" className="social-icon" title="Login Using Google" onClick={this.handleLoginGoogle}><i className="fa fa-google"></i></a> </li>
                  <li> <a href="/" className="social-icon" title="Login Using Github" onClick={this.handleLoginGithub}><i className="fa fa-github"></i></a> </li>
                </ul> 
              }

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

export default connect(mapStateToProps)(Login);
