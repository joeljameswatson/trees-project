import React from 'react';

export default function Site(props) {
  return <li onClick={() => props.onClickSubitem(props.site.id)}>{props.site.name}</li>;
}
