// ==========================================================================
// Filters
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';

const Filters = ({items}) => {
  return (
    <div className="filters"> 
      <span>Filters:</span>
      <ul id="filters">
        <li data-filter="*" className="active">All</li>
        {items.map((item, index) =>
          <li key={index} data-filter={item.attribute}>{item.title}</li>
        )}
      </ul>
    </div>
  );
};

Filters.propTypes = {
  items: PropTypes.array.isRequired
};

export default Filters;