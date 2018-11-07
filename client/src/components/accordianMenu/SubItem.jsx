import React from 'react';

export default function Item(props) {
  return <li onClick={() => props.onClickSubItem(props.id)}>{props.name}</li>;
}
