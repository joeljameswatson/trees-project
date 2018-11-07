import React, { Component } from 'react';
import Item from './Item';

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
    );
  }
}

export default AccordianMenu;
