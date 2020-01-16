// ==========================================================================
// About
// ==========================================================================
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {TimelineMax, Quad, Quart, Linear} from 'gsap';
import $ from 'jquery';

// components
import Hero from '../../components/hero';
import Title from '../../components/title';
import Scroller from '../../components/scroller';
import Waves from '../../components/pixi/wave';

// utilities
import config from '../../base/config';
import {LoadByPropKey, temporarySwap} from '../../base/utils';

// data
import experience from '../../data/about/experience';
import technical from '../../data//about/technical';

import DisplacedImage from './melter.jpg';
//import DisplacedImage from './textures.jpg';

class About extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.isMobile = config.get('md').mobile();
        this.instance = null;
    }

    componentDidMount() {

        this.scroll = new Scroller({
          onScroll: this.onScroll.bind(this)
        });

        const figures = $('h2.h4');

        let sections = [];
        for (let i = 0, total = figures.length; i < total; i++) {
          sections.push({
            target: $(figures[i]),
            offset: 100
          });
        }
        
        this.scroll.addItems(sections);

        this.scroll.addItem({
          target: $('.waves'),
          offset: 400,
          onEnter: this.onEnter.bind(this)
        });
    }

    shouldComponentUpdate() {

    }

    buildExperience(data, index) {
      const year = data.year;
      const title = data.title;
      const location = data.location;

      return (
        <tr key={index}>
          <th><strong>{year}</strong></th>
          <td>{title}</td>
          <td>{location}</td>
        </tr>
      );
    }

    buildTechnical(data, index) {
      const key = data.key;
      const values = data.values.join(', ');
      return (
        <li key={index}>
          <strong style={{display: 'block'}}>{key}:</strong>
          {values}
        </li>
      );
    }

    buildPrimary(data, index) {
      return (
        <tr key={index}>
          <td> {data.title} {data.percent}%
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{width: data.percent + '%'}} aria-valuenow={data.percent} aria-valuemin="0" aria-valuemax={data.percent}></div>
            </div>
          </td>
        </tr>
      );
    }

    onScroll() {

    }

    onLoaded(instance) {
      this.instance = instance;
    }

    onEnter() {
      
      const instance = this.instance;

      if (instance) {

          instance.app.start();
          
          new TimelineMax({
            onComplete: () => {
                instance.app.stop();
            }
          }).from(instance.filter.scale, 2, {
              x: 100,
              ease: Quad.easeOut
          }, 0).from(instance.map.anchor, 2, {
              x: "+=.5",
              y: "+=.5",
              ease: Quad.easeOut
          }, 0).from(instance.sprite.scale, 3.5, {
              x: 1.2,
              y: 1.2,
              ease: Quart.easeOut
          }, 0).to(instance.sprite, .8, {
              alpha: 1,
              ease: Linear.easeNone
          }, 0);
      }

    }

    onMouseEnter(instance) {
      
    }
      
    onMouseLeave(instance) {
      
    }

    render() {

      const {page} = this.props;
      
      const expr = temporarySwap(experience);

      const selector = classNames('page', page.selector);

      return (
        <article className={selector}>

          <Hero>creative <span>about</span> portfolio</Hero>

          <div className="content">
            <div className="container-fluid">

              <Title header={page.title} paragraph={page.description} />

              <div className="row">
                <div className="col-lg-6">
                  <p>Tom Shaw is a systems analyst and user interface designer from Dallas, Texas. Tom has over a decade of experience writting object oriented PHP and Javascript applications. You can view his <Link to="/work">selected works</Link> check out his <Link to="/play">digital playground</Link> or even listen to some of his <Link to="/playlist">favorite music</Link> on his creative portfolio website.</p>
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                  <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <Waves
                    autoInit={true} 
                    fromImage={DisplacedImage} 
                    resolution={1}
                    onLoaded={this.onLoaded.bind(this)}
                    onMouseEnter={this.onMouseEnter.bind(this)}
                    onMouseLeave={this.onMouseLeave.bind(this)} /> 
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <h2 className="h4"> work <span>experience</span> </h2>
                  <table className="experience">
                    <tbody>
                      { expr.map(this.buildExperience, this) }
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <h2 className="h4"> technical <span>skills</span> </h2>
                  <ul className="technical">
                    { technical.map(this.buildTechnical, this) }
                  </ul>
                </div>
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

export default connect(mapStateToProps)(About);
