import { orderBy } from '../utils';

function getInitState () {
  return {
    sortingColumn: undefined,
    sortOrder: {},
    sortedData: [],
  };
}

const actions = {
  setSortOrder (dispatch, sortOrder) {
    dispatch({ type: 'updateSorderOrder', payload: sortOrder });
    dispatch({ type: 'computedSortedData' });
    dispatch({ type: 'computedFilteredData' });
  },
};

function getSortingColumn (state) {
  const { columns, sortOrder } = state;
  if (sortOrder && sortOrder.prop && sortOrder.order) {
    return columns.find((column) => {
      return column.sortable && column.prop === sortOrder.prop;
    });
  }
}

function computedData (state) {
  const { treeEnabled, sortingColumn } = state;
  if (treeEnabled || !sortingColumn || sortingColumn.sortable !== true) {
    return state.originData;
  }

  const { sortMethod, sortBy } = sortingColumn;
  const { sortOrder: { order, prop }, originData } = state;

  return orderBy(originData, prop, order, sortMethod, sortBy);
}

const mutations = {
  updateSorderOrder (state, { payload: sortOrder }) {
    state.sortOrder = sortOrder;
    state.sortingColumn = getSortingColumn(state);
    return state;
  },
  updateColumns (state) {
    state.sortingColumn = getSortingColumn(state);
  },
  computedSortedData (state) {
    state.sortedData = computedData(state);
    state.data = state.sortedData;
  },
  updateTreeEnabled (state) {
    state.sortedData = computedData(state);
    state.data = state.sortedData;
  },
};

export default {
  getInitState,
  actions,
  mutations,
};
