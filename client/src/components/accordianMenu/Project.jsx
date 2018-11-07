import React from 'react';
import Site from './Site';

export default function Project(props) {
  return (
    <li onClick={props.onClickItem}>
      {props.project.name}
      <ul>
        {props.subItemsVisible && props.project.items.map((site, i) =>
          <Site key={`subItem-${i}`} site={site} onClickSubitem={props.onClickSubitem} />)}
      </ul>
    </li>
  );
}