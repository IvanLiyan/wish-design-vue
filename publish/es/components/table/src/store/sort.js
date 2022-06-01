import { orderBy } from '../utils';

function getInitState() {
  return {
    sortingColumn: undefined,
    sortOrder: {},
    sortedData: []
  };
}

var actions = {
  setSortOrder: function setSortOrder(dispatch, sortOrder) {
    dispatch({ type: 'updateSorderOrder', payload: sortOrder });
    dispatch({ type: 'computedSortedData' });
    dispatch({ type: 'computedFilteredData' });
  }
};

function getSortingColumn(state) {
  var columns = state.columns,
      sortOrder = state.sortOrder;

  if (sortOrder && sortOrder.prop && sortOrder.order) {
    return columns.find(function (column) {
      return column.sortable && column.prop === sortOrder.prop;
    });
  }
}

function computedData(state) {
  var treeEnabled = state.treeEnabled,
      sortingColumn = state.sortingColumn;

  if (treeEnabled || !sortingColumn || sortingColumn.sortable !== true) {
    return state.originData;
  }

  var sortMethod = sortingColumn.sortMethod,
      sortBy = sortingColumn.sortBy;
  var _state$sortOrder = state.sortOrder,
      order = _state$sortOrder.order,
      prop = _state$sortOrder.prop,
      originData = state.originData;


  return orderBy(originData, prop, order, sortMethod, sortBy);
}

var mutations = {
  updateSorderOrder: function updateSorderOrder(state, _ref) {
    var sortOrder = _ref.payload;

    state.sortOrder = sortOrder;
    state.sortingColumn = getSortingColumn(state);
    return state;
  },
  updateColumns: function updateColumns(state) {
    state.sortingColumn = getSortingColumn(state);
  },
  computedSortedData: function computedSortedData(state) {
    state.sortedData = computedData(state);
    state.data = state.sortedData;
  },
  updateTreeEnabled: function updateTreeEnabled(state) {
    state.sortedData = computedData(state);
    state.data = state.sortedData;
  }
};

export default {
  getInitState: getInitState,
  actions: actions,
  mutations: mutations
};