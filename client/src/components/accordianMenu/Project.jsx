import React from 'react';
import Site from './Site';

export default function Project(props) {
  const sites = props.project.items.map(site => <Site site={site} onClickSubitem={props.onClickSubitem} />)
  return (
    <ul>
      <li>{props.project.name}</li>
      <ul>{sites}</ul>
    </ul>
  );
}