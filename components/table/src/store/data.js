import { getRowIdentity } from '../utils';

function getInitState () {
  return {
    originData: [], // 元数据
    data: [], // 渲染数据
    hoverRow: -1,
    rowKey: '', // string or function
    $ready: false,
    currentRow: undefined, // 当前高亮行
    currentRowKey: undefined,
  };
}

const actions = {
  setData (dispatch, data) {
    const { data: oldData, currentRowKey } = this.states;
    dispatch({ type: 'updateData', payload: data });
    if (this.states.selectionColumn && !this.states.reserveSelection) {
      if (oldData === data) {
        this.cleanSelection();
      } else {
        this.clearSelection();
      }
    }
    this.updateExpandRows();
    if (currentRowKey || currentRowKey === 0) {
      dispatch({ type: 'updateCurrentRowByKey', payload: currentRowKey });
    }

    dispatch({ type: 'computedSortedData' });
    dispatch({ type: 'computedFilteredData' });
  },
  setReady (dispatch, options) {
    dispatch({ type: 'updateReady', payload: options });
    dispatch({ type: 'updateColumns', payload: options });
    dispatch({ type: 'computedSortedData' });
    dispatch({ type: 'computedFilteredData' });
  },
  setHoverRow (dispatch, hoverRow) {
    dispatch({ type: 'updateHoverRow', payload: hoverRow });
  },
  setRowKey (dispatch, rowKey) {
    dispatch({ type: 'updateRowKey', payload: rowKey });
  },
  setCurrentRow (dispatch, row) {
    dispatch({ type: 'updateCurrentRow', payload: row });
  },
  setCurrentRowKey (dispatch, currentRowKey) {
    dispatch({ type: 'updateCurrentRowByKey', payload: currentRowKey });
  },
};

const mutations = {
  updateData (state, { payload: data }) {
    state.originData = data;
    state.data = data;
    return state;
  },
  updateReady (state, { payload: $ready }) {
    state.$ready = $ready;
    return state;
  },
  updateHoverRow (state, { payload: hoverRow }) {
    state.hoverRow = hoverRow;
    return state;
  },
  updateRowKey (state, { payload: rowKey }) {
    state.rowKey = rowKey;
    return state;
  },
  updateCurrentRow (state, { payload: row }) {
    state.currentRow = row;
    return state;
  },
  updateCurrentRowByKey (state, { payload: currentRowKey }) {
    const { rowKey, data } = state;
    if (rowKey) {
      const currentRow = data.find((item) => {
        const key = getRowIdentity(item, rowKey);
        return key === currentRowKey;
      });
      state.currentRow = currentRow;
    }
    state.currentRowKey = currentRowKey;
    return state;
  },
};

export default {
  getInitState,
  actions,
  mutations,
};
