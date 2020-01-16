// ==========================================================================
// IconList
// ==========================================================================
import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  withProps,
  branch, 
  lifecycle,
  renderNothing
} from 'recompose';

// utilities
import emitter from '../../base/emitter';
import $ from 'jquery';

import List from './list';
import Item from './item';

const itemIsNotActive = ({ active }) => active !== true;
const hideIfNotActive = branch(itemIsNotActive, renderNothing);

const IconItem = hideIfNotActive(({active, styles, href, title, type}) =>
  <Item active={active} styles={styles} href={href} title={title} type={type} />
);

const hoc = compose(
  withProps(({icons}) => {
    return {
      items: icons.sort((p, p2) => {
        return p.order - p2.order; 
      })
    };
  }),
  lifecycle({
    componentDidMount() {
      const outer = $('.icon-audio');
      const inner = $('.audio-icon')
      outer.on('click', event => {
        event.preventDefault();
        if (inner.hasClass('is-playing')) {
          inner.removeClass('is-playing');
          emitter.emit('audio:pause');
        } else {
          inner.addClass('is-playing');
          emitter.emit('audio:play');
        }
      })
    }
  })
)


const IconList = ({items, color, ...props}) => (
  <List>
    {
      items.map((item, index) => (
        <IconItem key={index} color={color} active={item.active} styles={item.styles} href={item.href} title={item.title} type={item.type} />
      ))
    }
  </List>
);

IconList.propTypes = {
  icons: PropTypes.array,
  color: PropTypes.string
};

IconList.defaultProps = {
  icons: [],
  color: '#fff'
};

export default hoc(IconList);
