// ==========================================================================
// ThemeList
// ==========================================================================
import React from 'react';

import List from './list';
import Item from './item';

const ThemeList = ({themes}) => (
  <List>
  {
    themes.map((item, index) => (
      <Item key={index} title={item.title} description={item.description} theme={item.theme} />
    ))
  }
</List>
);

export default ThemeList;
