import { getRowIdentity, orderBy } from '../utils';

function getInitState () {
  return {
    treeEnabled: false,
    treeData: [],
    loadedKeys: [],
    loadedKeysMap: {},
    loadData: undefined,
    treeFieldNames: {},
  };
}

// function loadTreeData (key, row, state, store) {
//   const { loadData } = state;

//   loadData(row, store.createLoadDataCallback(key, row));
// }

function updateTreeData (state, store) {
  const { treeEnabled, $ready } = state;
  if (!treeEnabled || !$ready) {
    return;
  }
  const {
    filteredData: data, rowKey,
    expandedKeysMap,
    treeFieldNames,
    loadData,
    loadedKeysMap,
    sortingColumn,
  } = state;
  const { children, isLeaf } = treeFieldNames;
  const { sortMethod, sortBy, sortable } = sortingColumn || {};
  const sort = sortable === true;
  const { sortOrder: { order, prop } } = state;

  const reduceTreeData = (array, data, level) => {
    if (sort) {
      data = orderBy(data, prop, order, sortMethod, sortBy);
    }

    return data.reduce((array, row) => {
      array.push(row);
      const key = getRowIdentity(row, rowKey);
      const childs = row[children];
      const length = childs && childs.length;
      row.$$mtd = {
        ...row.$$mtd,
        key: key,
        level: level,
        hasChild: length || (loadData && !row[isLeaf]),
        expanded: expandedKeysMap[key],
        loaded: loadedKeysMap[key],
        childCount: length,
      };
      if (length && row.$$mtd.expanded) {
        return reduceTreeData(array, childs || [], level + 1);
      }
      return array;
    }, array);
  };

  const nextData = reduceTreeData([], data, 0);

  state.data = nextData;
}

const actions = {
  setTreeEnabled (dispatch, treeEnabled) {
    dispatch({ type: 'updateTreeState', payload: { treeEnabled } });
  },
  setLoadedKeys (dispatch, loadedKeys) {
    dispatch({ type: 'updateLoadedKeys', payload: loadedKeys });
  },
  setTreeFieldNames (dispatch, treeFieldNames) {
    dispatch({ type: 'updateTreeState', payload: { treeFieldNames } });
  },
  setLoadData (dispatch, loadData) {
    dispatch({ type: 'updateTreeState', payload: { loadData } });
  },

};

const mutations = {
  updateTreeState (state, { payload }) {
    const store = this;
    Object.assign(state, payload);
    updateTreeData(state, store);
  },
  updateData (state, { payload: data }) {
    const store = this;
    updateTreeData(state, store);
  },
  computedFilteredData (state) {
    const store = this;
    updateTreeData(state, store);
  },
  updateExpandRowKeys (state) {
    const store = this;
    updateTreeData(state, store);
  },
  updateLoadedKeys (state, { payload: loadedKeys }) {
    state.loadedKeys = loadedKeys;
    state.loadedKeysMap = loadedKeys.reduce((map, key) => {
      map[key] = true;
      return map;
    }, {});
  },
  updateLoadData (state, { payload: loadData }) {
    state.loadData = loadData;
  },
};

function bootstrap (store) {
  store.getTreeExpandProps = function (row, $index) {
    return {
      expanded: store.isExpanded(row, $index),
    };
  };
  store.createLoadDataCallback = function (key, row) {
    const that = this;
    return function callbak (data) {
      row.$$mtd.loading = false;
      const {
        table,
        states: { loadedKeys, treeFieldNames: { children } },
      } = that;
      table.$emit('update:loadedKeys', [...loadedKeys, key]);
      table.$set(row, children, data);
      // force update
      store.setData(table.data);
    };
  };
}
export default {
  getInitState,
  actions,
  mutations,
  bootstrap,
};
