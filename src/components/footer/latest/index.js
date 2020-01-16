// ==========================================================================
// LatestList
// ==========================================================================
import React from 'react';
import {immutableReverse} from '../../../base/utils';

import List from './list';
import Item from './item';

import {
  compose,
  withProps,
  branch, 
  renderNothing
} from 'recompose';

const itemIsNotActive = ({ enabled }) => enabled !== true;
const hideIfNotActive = branch(itemIsNotActive, renderNothing);

const LatestItem = hideIfNotActive(({title, description, href, icon, enabled}) =>
  <Item title={title} description={description} href={href} icon={icon} enabled={enabled} />
);

const hoc = compose(
  withProps(({latest}) => {
    return {
      items: immutableReverse(latest)
    };
  })
)

const LatestList = ({items}) => (
  <List>
  {
    items.map((item, index) => (
      <LatestItem key={index} title={item.title} description={item.description} href={item.href} icon={item.icon} enabled={item.enabled} />
    ))
  }
</List>
);

export default hoc(LatestList);
