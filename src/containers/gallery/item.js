// ==========================================================================
// GalleryListItem
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';
import {Col} from 'react-bootstrap';

// components
import MediaImage from '../../components/media/image';
import MediaPicture from '../../components/media/picture';

const GalleryListItem = ({item, overlayStyle, filters, mediaSet, mediaType, ...props}) => (
  <Col xs={12} sm={6} md={4} className="selector" data-filters={filters}>
    <div className="item-wrapper">
      <div className="item"> 
        <div className="overlay" style={overlayStyle}>
          <div className="overlay-items">
            <h3>{item.title}</h3>
            <span>{item.subhead}</span> 
            <p>{item.description}</p> 
          </div>
        </div>
      </div>
      {mediaType === 'image' && 
        <MediaImage title={item.title} srcset={mediaSet} />}
      {mediaType === 'picture' && 
        <MediaPicture title={item.title} srcset={mediaSet} />}
    </div>
  </Col>
);

GalleryListItem.propTypes = {
  item: PropTypes.object.isRequired
};

GalleryListItem.defaultProps = {
  item: {}
};

export default GalleryListItem;
