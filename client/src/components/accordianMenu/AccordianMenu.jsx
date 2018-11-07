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
              const itemKey = `${item.name}-${i}`;
              return (
                <Item
                  key={itemKey}
                  label={item.name}
                  onClickItem={() => this.toggleSubItemsVisible(itemKey)}
                  subItems={item.items}
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
