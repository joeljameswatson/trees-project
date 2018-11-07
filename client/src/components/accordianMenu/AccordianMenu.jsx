import React, { Component } from 'react';
import Item from './Item';
import styles from './accordianMenu.scss';

class AccordianMenu extends Component {
  state = {}

  toggleSubItemsVisible = (key) => {
    this.setState(prevState => {
      const previouslyVisible = !!prevState[key]
      return { [key]: !previouslyVisible }
    })
  }

  render() {
    return (
      <div className={styles.list}>
        <ul>
          {
            this.props.items.map((item, i) => {
              const itemKey = `item-${i}`;
              return (
                <Item
                  key={itemKey}
                  item={item}
                  onClickItem={() => this.toggleSubItemsVisible(itemKey)}
                  onClickSubItem={this.props.onClickSubItem}
                  subItemsVisible={this.state[itemKey]}
                />
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default AccordianMenu;
