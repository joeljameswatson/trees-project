import React from 'react';
import SubItem from './SubItem';
import styles from './accordianMenu.scss';

export default function Item(props) {
  return (
    <li onClick={props.onClickItem}>
      <span className={styles.item}><strong>{props.label}</strong></span>
      {
        props.subItemsVisible && (
          <ul>
            {
              props.subItems.map((subItem, i) =>
                <SubItem
                  key={`subItem-${i}`}
                  label={subItem.name}
                  id={subItem.id}
                  onClickSubItem={props.onClickSubItem}
                />
              )
            }
          </ul>
        )
      }
    </li>
  );
}
