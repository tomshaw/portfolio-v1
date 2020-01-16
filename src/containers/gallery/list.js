// ==========================================================================
// GalleryList
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';
import {Row} from 'react-bootstrap';
import GalleryListItem from './item';

const GalleryList = ({items}) => {

  const create = (item, index) => {

    let overlayStyle = {
      background: "linear-gradient(135deg, " + item.gradient_start + " 0%, " + item.gradient_end + " 100%)",
    }

    const mediaSet = item.media_sets[0]['breakpoints'];
    const mediaType = item.media_sets[0]['type'];

    const filters = item.filters.join(" ");

    return (
      <GalleryListItem key={index} item={item} overlayStyle={overlayStyle} filters={filters} mediaSet={mediaSet} mediaType={mediaType} />
    )
  }

  return (
    <Row className="gallery">
      { items.map(create, this) }
    </Row>
  );

};

GalleryList.propTypes = {
    items: PropTypes.array.isRequired
};

GalleryList.defaultProps = {
  items: []
};

export default GalleryList;
