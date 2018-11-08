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
const getAllTreesById = state => state.trees.byId;
const getSelectedSite = state => state.sites.byId[state.sites.selected];

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

export const getTreesForSelectedSite = createSelector(
  [getSelectedSite, getAllTreesById],
  (selectedSite, allTreesById) => selectedSite.trees.map(id => allTreesById[id])
);

export const getTreeCountsForSelectedSite = createSelector(
  [getTreesForSelectedSite],
  trees => {
    const treeCounts = trees.reduce((accumulator, tree) => {
      const rangePosition = parseInt(tree.height/ 10, 10);
      if (accumulator[rangePosition] === undefined) {
        return [...accumulator];
      }
      let shallowCopy = [...accumulator];
      shallowCopy[rangePosition] = shallowCopy[rangePosition] +1;
      return shallowCopy;
    }, [0,0,0,0,0,0,0]);
  return treeCounts;
  }
)
