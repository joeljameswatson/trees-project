import React, { Component } from 'react';
import Project from './Project';

class AccordianMenu extends Component {
  render() {
    return (
      this.props.items.map(item => {
        return <Project project={item} />
      })
    );
  }
}

export default AccordianMenu;
