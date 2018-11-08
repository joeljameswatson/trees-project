import React, { Component } from 'react';
import { connect } from 'react-redux';

import DistributionChart from '../components/distributionChart';
import { getTreeCountsForSelectedSite } from '../model'

class Chart extends Component {
  state = {
    width: 0,
    height: 0
  };

  componentDidMount() {
    window.addEventListener('resize', this.setSize);
    
    this.setSize();
  }

  setSize = (event) => {
    const { width, height } = this.chart.getBoundingClientRect();

    this.setState((prevState) => {
      return {
        width,
        height
      };
    });
  }

  setRef = (node) => {
    this.chart = node;
  }

  render() {
    const { width, height } = this.state;

    //  /* This is a hack to first set the size based on percentage
    //  then query for the size so the chart can be scaled to the window size.
    //  The second render is caused by componentDidMount(). */

    if(width < 100 || height < 100) {
      return <svg ref={ this.setRef } width={'100%'} height={'100%'}></svg>
    }

    return (
      <svg ref={ this.setRef } width={'100%'} height={'100%'}>
        <DistributionChart 
          data={ this.props.data } 
          height={ this.state.height }
          width={ this.state.width } 
          setRef={ this.state.width } 
        />
      </svg>
    )
  }
}

function mapStateToProps(state) {
  return {
    data: getTreeCountsForSelectedSite(state)
  };
}

export default connect(mapStateToProps)(Chart);

