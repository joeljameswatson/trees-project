import React from 'react';
import SubItem from './SubItem';

export default function Item(props) {
  return (
    <li onClick={props.onClickItem}>
      {props.item.name}
      <ul>
        {props.subItemsVisible && props.item.items.map((site, i) =>
          <SubItem key={`subItem-${i}`} site={site} name={site.name} id={site.id} onClickSubItem={props.onClickSubItem} />)}
      </ul>
    </li>
  );
}