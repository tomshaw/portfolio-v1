// ==========================================================================
// Footer
// ==========================================================================
import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

// components
import HorizontalRule from '../rule';

// containers
import LatestList from './latest';
import ThemeList from './themes';

// data
import themes from '../../data/themes';
import latest from '../../data/latest';

class Footer extends Component {
  
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.$themeList = document.querySelectorAll("ul.themes li");
    
    for (let i = 0, len = this.$themeList.length; i < len; i++) {
        this.$themeList[i].addEventListener('click', this.handleThemeClick.bind(this), false);
    }
  }

  handleThemeClick(event) {
    event.preventDefault();
    let target = event.target;
    let theme = target.getAttribute('data-theme');
    this.props.setPageTheme(theme);
  }

  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <Row>
            <Col lg={4} className="content">
              <span className="h4">Creative <span>Portfolio</span></span>
              <HorizontalRule />  
              <p className="opener">Tom Shaw is a web designer and systems analyst from Dallas, Texas. He enjoys utilizing his expertise and programming skills in writing, modifying and integration in the field of web software application design and development.</p> 
              <p>Tom has over a decade of experience writting object oriented PHP and Javascript applications. Experienced with all stages of the developement lifecycle, modern PHP and Javascript frameworks and application development tooling systems.</p>
            </Col>
            <Col lg={4} className="content">
              <span className="h4">Latest <span>Projects</span></span>
              <HorizontalRule />
              <LatestList latest={latest} />
            </Col>
            <Col lg={4} className="content">
              <span className="h4">Available <span>Themes</span></span>
              <HorizontalRule />
              <ThemeList themes={themes} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <HorizontalRule className="rule rule2" />
              <Row>
                <Col lg={12} className="copyright">
                  <small>Copyright &copy; 2017 Tom Shaw. All rights reserved.</small>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </footer>
    );
  }
}

export default Footer;

