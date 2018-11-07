import React, { Component } from 'react';
import Project from './Project';

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
          <Project
            key={itemKey}
            project={item}
            onClickItem={() => this.toggleSubItemsVisible(itemKey)}
            onClickSubitem={this.props.onClickSubitem}
            subItemsVisible={this.state[itemKey]}
          />
        )
      })
    );
  }
}

export default AccordianMenu;
