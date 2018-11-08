import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from 'reselect';

import projects from './projects';
import sites from './sites';
import trees from './trees';
import map from './map';

const reducers = combineReducers({
  projects,
  sites,
  trees,
  map
});

const middleware = [
  store => next => action => typeof action === 'function' ? action(store.dispatch, store.getState) : next(action)
];

export default createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      ...middleware
    )
  )
);

const allProjects = state => state.projects;
const allSites = state => state.sites;
const allTrees = state => state.trees;

export const getProjects = createSelector(
  [allProjects],
  projects => projects.ids.map(id => projects.byId[id])
);

export const getSites = createSelector(
  [allSites],
  sites => sites.ids.map(id => sites.byId[id])
);

export const getTrees = createSelector(
  [allTrees],
  trees => trees.ids.map(id => trees.byId[id])
);

export const getTreesForSelectedSite = state => {
  const treeIds = state.sites.byId[state.sites.selected].trees
  return treeIds.map(id => state.trees.byId[id])
}

export const getTreeCountsForSelectedSite = state => {
  const ranges = ['0m - 10m', '10m - 20m', '20m - 30m', '30m - 40m', '40m - 50m', '50m - 60m', '60m - 70m'];
  const initialDataStructure = ranges.map(range => ({ range, count: 0 }));
  const treesForSelectedSite = getTreesForSelectedSite(state);
  const treeCounts = treesForSelectedSite.reduce((accumulator, tree) => {
    const rangePosition = parseInt(tree.height/ 10, 10);
    if (!accumulator[rangePosition]) {
      return accumulator;
    }
    accumulator[rangePosition].count ++
    return accumulator
  }, initialDataStructure);
  return treeCounts;
}

