// ==========================================================================
// Header
// ==========================================================================
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import Logo from '../logo';
import Menu from './menu';

class Header extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.createChildren();
        this.setupHandlers();
        this.onEnable();
        this.handleActive();
    }

    createChildren() {
        this.$el = document.querySelector('.header');
        this.$list = this.$el.querySelectorAll('ul li a');
        this.$logo = document.querySelector('.js-main-logo');
    }

    setupHandlers() {
        this.handleLinkClick = this.onLinkClickHandler.bind(this);
    }

    onEnable() {
        for (let i = 0, total = this.$list.length; i < total; i++) {
          this.$list[i].addEventListener('click', this.handleLinkClick, false);
        }
        this.$logo.addEventListener('click', this.handleLinkClick, false);
    }

    onLinkClickHandler(event) {
        this.handleActive();
        // window.createjs.Sound.play("click-manual", "none", 700, 0, 0, 1);
    }

    handleActive() {
      // router/delay
      setTimeout(() => {
        let path = window.location.pathname;
        let parts = path.split('/');  
        if (parts.length >= 3) {
            path = '/' + parts[1];
        }  
        this.clearActive();
        this.setActive(path);
      }, 1e3);
    }

    setActive(url) {
      for (let i = 0, total = this.$list.length; i < total; i++) {
          let href = this.$list[i].href.replace(/^.*\/\/[^\/]+/, ''); // eslint-disable-line
          if (href === url) {
            this.$list[i].parentNode.classList.add('active');
          }
      }
    }

    clearActive() {
      for (let i = 0, total = this.$list.length; i < total; i++) {
          this.$list[i].parentNode.classList.remove('active');
      }
    }

    render() {
      const {pages} = this.props;
      return (
        <header className="header">
          <Logo isHome={true} scrolled={true} color="#fff" />
          <Menu pages={pages} />
        </header>
      )
    }

}

Header.propTypes = {
  pages: PropTypes.array
};

Header.defaultProps = {
  pages: []
};

export default Header;
