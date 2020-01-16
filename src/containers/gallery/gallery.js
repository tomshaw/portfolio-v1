// ==========================================================================
// Grid 
// ==========================================================================
import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import $ from 'jquery';
import imagesLoaded from 'imagesloaded';
import {Grid, Col, Row} from 'react-bootstrap';

// components
import Hero from '../../components/hero';
import Title from '../../components/title';

// containers
import Filters from './filters';
import GalleryList from './list';
import Lightbox from './lightbox';

// actions
import {loadGallery} from '../../actions/galleryActions';

// utilities
import {LoadByPropKey, capitalizeFirst} from '../../base/utils';
import config from '../../base/config';

const { List } = require('immutable');

const isMobile = config.get('md').mobile();

class Gallery extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
          filter: '*'
        }
    }

    componentDidMount() {
      
      this.props.actions.loadGallery();

      imagesLoaded(document.body, { background: true }, () => {
        setTimeout(() => {
          this.init();
        }, 1e3);
      });

    }

    init() {
      
      $("#filters li").on("click", (event) => {
        $("#filters li").each((i, el) => $(el).removeClass("active"));
        let target = $(event.target);
        let filter = target.data('filter');
        target.addClass("active");
        this.setState({
          filter: filter
        });
      });

      $(".overlay-items h3 > a").on('click', (event) => {
        event.preventDefault();
        let wrapper = $(event.target).closest('.item-wrapper');
        let image = wrapper.find('img');
        let source = image.attr('src');
        $(".modal").fadeIn();
        $(".modal .img-wrapper img").attr("src", source);
      });
    }

    filterProtected(data) {
      return data.filter(item => {
        return item.protected !== true;
      });
    }

    filterGallery(data, selected) {
      if (selected === '*') {
        return data;
      }
      let mapped = [];
      for (let i = 0, total = data.length; i < total; i++) {
        let assigned = data[i].filters;
        for (let x = 0, total = assigned.length; x < total; x++) {
          if (assigned[x] === selected) {
            mapped.push(data[i]);
          }
        }
      }
      return mapped;
    }

    buildFilters(data) {
      let mapped = [];
      for (let i = 0; i < data.length; i++) {
        let filters = data[i].filters;
        let isProtected = data[i].protected;
        for (let x = 0; x < filters.length; x++) {
          let current = filters[x];
          if (mapped.map((o) => o.attribute).indexOf(current) === -1) {
            mapped.push({
              title: capitalizeFirst(current),
              attribute: current,
              protected: isProtected
            });
          }
        }
      }
      return mapped;
    }

    onScroll() {}

    render() {
        
      const {page, authenticated, gallery} = this.props;

      const {filter} = this.state;

      const selector = classNames('page', page.selector);

      let listGallery = (authenticated === false) ? List(this.filterProtected(gallery)) : List(gallery); 
      
      let listFilters = (authenticated === false) ? this.filterProtected(this.buildFilters(gallery)) : this.buildFilters(gallery);

      let galleryItems = this.filterGallery(listGallery.toArray(), filter);

      return (
        <article className={selector}>
          <Hero>creative <span>gallery</span> portfolio</Hero>
          <div className="content">
            <Grid fluid>
              <Title header={page.title} paragraph={page.description} />
              <Row>
                <Col md={6}>
                  <Filters items={listFilters} />
                </Col>
                {!isMobile && <Col md={6} className="lightbox-button">
                  <Lightbox items={galleryItems} />
                </Col>}
              </Row>
              <GalleryList items={galleryItems} />
              <Row className="hidden">
                <Col md={12}>
                  <div className="box-button"> <a href="/">Show More</a> </div>
                </Col>
              </Row>
            </Grid>
          </div>
        </article>
      );
    }
}

function mapStateToProps(state, ownProps) {
  const path = ownProps.match.path.split('/')[1];
  const page = LoadByPropKey(state.section, 'route', path);
  const gallery = state.gallery
  return {
    page: page,
    gallery: gallery
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({loadGallery}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
