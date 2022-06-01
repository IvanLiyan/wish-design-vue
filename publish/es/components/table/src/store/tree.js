import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _extends from 'babel-runtime/helpers/extends';
import { getRowIdentity, orderBy } from '../utils';

function getInitState() {
  return {
    treeEnabled: false,
    treeData: [],
    loadedKeys: [],
    loadedKeysMap: {},
    loadData: undefined,
    treeFieldNames: {}
  };
}

// function loadTreeData (key, row, state, store) {
//   const { loadData } = state;

//   loadData(row, store.createLoadDataCallback(key, row));
// }

function updateTreeData(state, store) {
  var treeEnabled = state.treeEnabled,
      $ready = state.$ready;

  if (!treeEnabled || !$ready) {
    return;
  }
  var data = state.filteredData,
      rowKey = state.rowKey,
      expandedKeysMap = state.expandedKeysMap,
      treeFieldNames = state.treeFieldNames,
      loadData = state.loadData,
      loadedKeysMap = state.loadedKeysMap,
      sortingColumn = state.sortingColumn;
  var children = treeFieldNames.children,
      isLeaf = treeFieldNames.isLeaf;

  var _ref = sortingColumn || {},
      sortMethod = _ref.sortMethod,
      sortBy = _ref.sortBy,
      sortable = _ref.sortable;

  var sort = sortable === true;
  var _state$sortOrder = state.sortOrder,
      order = _state$sortOrder.order,
      prop = _state$sortOrder.prop;


  var reduceTreeData = function reduceTreeData(array, data, level) {
    if (sort) {
      data = orderBy(data, prop, order, sortMethod, sortBy);
    }

    return data.reduce(function (array, row) {
      array.push(row);
      var key = getRowIdentity(row, rowKey);
      var childs = row[children];
      var length = childs && childs.length;
      row.$$mtd = _extends({}, row.$$mtd, {
        key: key,
        level: level,
        hasChild: length || loadData && !row[isLeaf],
        expanded: expandedKeysMap[key],
        loaded: loadedKeysMap[key],
        childCount: length
      });
      if (length && row.$$mtd.expanded) {
        return reduceTreeData(array, childs || [], level + 1);
      }
      return array;
    }, array);
  };

  var nextData = reduceTreeData([], data, 0);

  state.data = nextData;
}

var actions = {
  setTreeEnabled: function setTreeEnabled(dispatch, treeEnabled) {
    dispatch({ type: 'updateTreeState', payload: { treeEnabled: treeEnabled } });
  },
  setLoadedKeys: function setLoadedKeys(dispatch, loadedKeys) {
    dispatch({ type: 'updateLoadedKeys', payload: loadedKeys });
  },
  setTreeFieldNames: function setTreeFieldNames(dispatch, treeFieldNames) {
    dispatch({ type: 'updateTreeState', payload: { treeFieldNames: treeFieldNames } });
  },
  setLoadData: function setLoadData(dispatch, loadData) {
    dispatch({ type: 'updateTreeState', payload: { loadData: loadData } });
  }
};

var mutations = {
  updateTreeState: function updateTreeState(state, _ref2) {
    var payload = _ref2.payload;

    var store = this;
    _Object$assign(state, payload);
    updateTreeData(state, store);
  },
  updateData: function updateData(state, _ref3) {
    var data = _ref3.payload;

    var store = this;
    updateTreeData(state, store);
  },
  computedFilteredData: function computedFilteredData(state) {
    var store = this;
    updateTreeData(state, store);
  },
  updateExpandRowKeys: function updateExpandRowKeys(state) {
    var store = this;
    updateTreeData(state, store);
  },
  updateLoadedKeys: function updateLoadedKeys(state, _ref4) {
    var loadedKeys = _ref4.payload;

    state.loadedKeys = loadedKeys;
    state.loadedKeysMap = loadedKeys.reduce(function (map, key) {
      map[key] = true;
      return map;
    }, {});
  },
  updateLoadData: function updateLoadData(state, _ref5) {
    var loadData = _ref5.payload;

    state.loadData = loadData;
  }
};

function bootstrap(store) {
  store.getTreeExpandProps = function (row, $index) {
    return {
      expanded: store.isExpanded(row, $index)
    };
  };
  store.createLoadDataCallback = function (key, row) {
    var that = this;
    return function callbak(data) {
      row.$$mtd.loading = false;
      var table = that.table,
          _that$states = that.states,
          loadedKeys = _that$states.loadedKeys,
          children = _that$states.treeFieldNames.children;

      table.$emit('update:loadedKeys', [].concat(_toConsumableArray(loadedKeys), [key]));
      table.$set(row, children, data);
      // force update
      store.setData(table.data);
    };
  };
}
export default {
  getInitState: getInitState,
  actions: actions,
  mutations: mutations,
  bootstrap: bootstrap
};