import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GradientDarkgreenGreen } from '@vx/gradient';
import { scaleBand, scaleLinear } from "@vx/scale";

import { getTreesForSelectedSite } from '../model'

class Chart extends Component {
  state = {
    width: 0,
    height: 0
  };

  treeCounts = []

  componentDidMount() {
    window.addEventListener('resize', this.setSize);
    
    this.setSize();

    // TODO: move this to componentDidUpdate / selector
    const ranges = ['0m - 10m', '10m - 20m', '20m - 30m', '30m - 40m', '40m - 50m', '50m - 60m', '60m - 70m'];
    const initialDataStructure = ranges.map(range => ({ range, count: 0 }));
    this.treeCounts = this.props.treesForSelectedSite.reduce((accumulator, tree) => {
      const rangePosition = parseInt(tree.height/ 10, 10);
      if (!accumulator[rangePosition]) {
        return accumulator;
      }
      accumulator[rangePosition].count ++
      return accumulator
    }, initialDataStructure);
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
    
    const x = d => d.range;
    const y = d => d.count;

    const margin = {
      top: 60,
      bottom: 60,
      left: 80,
      right: 80
    };
  
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: this.treeCounts.map(x),
      padding: 0.1
    });

    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [0, Math.max(...this.treeCounts.map(y))]
    });
    
    /* This is a hack to first set the size based on percentage
       then query for the size so the chart can be scaled to the window size.
       The second render is caused by componentDidMount(). */
    if(width < 100 || height < 100) {
      return <svg ref={ this.setRef } width={'100%'} height={'100%'}></svg>
    }

    return (
      <svg ref={ this.setRef } width={'100%'} height={'100%'}>
        <GradientDarkgreenGreen id="gradient" />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={`url(#gradient)`}
        />
      </svg>
    );
  }
}

function mapStateToProps(state) {
  return {
    treesForSelectedSite: getTreesForSelectedSite(state)
  };
}

export default connect(mapStateToProps)(Chart);

