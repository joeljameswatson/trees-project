import React from 'react';
import styles from './accordianMenu.scss';

export default function SubItem(props) {
  return (
    <li onClick={e => props.onClickSubItem(e, props.id)}>
      <span className={styles.item}>{props.label}</span>
    </li>
  )
}
