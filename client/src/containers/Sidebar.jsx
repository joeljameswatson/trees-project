import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProjects, getSites } from '../model';

import { centerMapOnSite } from '../model/map';

import List from '../components/List';

class Sidebar extends Component {
  render() {
    /*
      Data should be an array of items. Each item also has items that represent the sub menu. Use the data from the redux store being passed in as props.

      The structure of the data is:

      [
        {
          id: 1,
          name: "Cypress Provincial Park",
          items: [
            {
              id: 1,
              name: 'East'
            },
            {
              id: 2,
              name: 'West'
            }
          ]
        }
      ]
    */

    const listItems = this.props.projects.map(({ id, name, sites }) => {
      const items = sites.map(id => {
        return this.props.sites.find(site => site.id === id);
      });
      return { id, name, items };
    });

    return <List items={listItems} onClickSubitem={this.props.centerMapOnSite} />
  }
}

function mapStateToProps(state) {
  return {
    projects: getProjects(state),
    sites: getSites(state)
  };
}

const mapDispatchToProps = {
  centerMapOnSite
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
