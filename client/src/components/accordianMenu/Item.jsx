import React from 'react';
import SubItem from './SubItem';
import styles from './accordianMenu.scss';

export default function Item(props) {
  return (
    <li onClick={props.onClickItem}>

      <span className={styles.item}><strong>{props.item.name}</strong></span>
      {
        props.subItemsVisible && (
          <ul>
            {
              props.item.items.map((site, i) =>
                <SubItem
                  key={`subItem-${i}`}
                  site={site}
                  name={site.name}
                  id={site.id}
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
