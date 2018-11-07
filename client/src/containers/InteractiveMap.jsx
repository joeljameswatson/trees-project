import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as turf from '@turf/turf';

import Map, { Layer, Sources, GeoJSON } from '../components/map';

import { centerMapOnSite, mapSetCenter, mapSetZoom } from '../model/map';
import { getTreesForSelectedSite } from '../model'

class InteractiveMap extends Component {
  render() {
    const { currentSite: { bounding }, treesForSelectedSite } = this.props;

    const boundingFeature = turf.polygon([[
      [bounding.left, bounding.top],
      [bounding.right, bounding.top],
      [bounding.right, bounding.bottom],
      [bounding.left, bounding.bottom],
      [bounding.left, bounding.top]
    ]], { name: 'Bounding Area' });

    const treePoints = treesForSelectedSite.map(({long, lat, height}) => {
      return turf.point([long, lat], { height });
    });
    const treesFeatureCollection = turf.featureCollection(treePoints);

    return (
      <Map {...this.props}>
        <Sources>
          <GeoJSON id="bounding-box" data={boundingFeature} />
          <GeoJSON id="tree-locations" data={treesFeatureCollection} />
        </Sources>
        <Layer
          id="bounding-box"
          type="line"
          paint={{
            'line-width': 2,
            'line-color': '#fff'
          }}
          source="bounding-box"
        />
        <Layer
          id="opaque-fill"
          type="fill"
          paint={{
            'fill-color': '#ffffff',
            'fill-opacity': 0.1
          }}
          source="bounding-box"
        />
        <Layer
          id="tree-locations"
          type="circle"
          paint={{
            'circle-radius': 3,
            'circle-color': {
              'property': 'height',
              'stops': [
                [0, 'white'],
                [70, 'darkgreen']
              ]
            }
          }}
          source="tree-locations"
        />
      </Map>
    );
  }
}

function mapStateToProps(state) {
  return {
    treesForSelectedSite: getTreesForSelectedSite(state),
    currentSite: state.sites.byId[state.sites.selected],
    center: state.map.center,
    zoom: state.map.zoom
  };
}

const mapDispatchToProps = {
  centerMapOnSite,
  mapSetCenter,
  mapSetZoom
};

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveMap);
