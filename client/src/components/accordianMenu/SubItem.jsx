import React from 'react';
import styles from './accordianMenu.scss';

export default function SubItem(props) {
  return (
    <li onClick={() => props.onClickSubItem(props.id)}>
      <span className={styles.item}>{props.name}</span>
    </li>
  )
}
