import { getRowIdentity } from '../utils';

function getInitState() {
  return {
    originData: [], // 元数据
    data: [], // 渲染数据
    hoverRow: -1,
    rowKey: '', // string or function
    $ready: false,
    currentRow: undefined, // 当前高亮行
    currentRowKey: undefined
  };
}

var actions = {
  setData: function setData(dispatch, data) {
    var _states = this.states,
        oldData = _states.data,
        currentRowKey = _states.currentRowKey;

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
  setReady: function setReady(dispatch, options) {
    dispatch({ type: 'updateReady', payload: options });
    dispatch({ type: 'updateColumns', payload: options });
    dispatch({ type: 'computedSortedData' });
    dispatch({ type: 'computedFilteredData' });
  },
  setHoverRow: function setHoverRow(dispatch, hoverRow) {
    dispatch({ type: 'updateHoverRow', payload: hoverRow });
  },
  setRowKey: function setRowKey(dispatch, rowKey) {
    dispatch({ type: 'updateRowKey', payload: rowKey });
  },
  setCurrentRow: function setCurrentRow(dispatch, row) {
    dispatch({ type: 'updateCurrentRow', payload: row });
  },
  setCurrentRowKey: function setCurrentRowKey(dispatch, currentRowKey) {
    dispatch({ type: 'updateCurrentRowByKey', payload: currentRowKey });
  }
};

var mutations = {
  updateData: function updateData(state, _ref) {
    var data = _ref.payload;

    state.originData = data;
    state.data = data;
    return state;
  },
  updateReady: function updateReady(state, _ref2) {
    var $ready = _ref2.payload;

    state.$ready = $ready;
    return state;
  },
  updateHoverRow: function updateHoverRow(state, _ref3) {
    var hoverRow = _ref3.payload;

    state.hoverRow = hoverRow;
    return state;
  },
  updateRowKey: function updateRowKey(state, _ref4) {
    var rowKey = _ref4.payload;

    state.rowKey = rowKey;
    return state;
  },
  updateCurrentRow: function updateCurrentRow(state, _ref5) {
    var row = _ref5.payload;

    state.currentRow = row;
    return state;
  },
  updateCurrentRowByKey: function updateCurrentRowByKey(state, _ref6) {
    var currentRowKey = _ref6.payload;
    var rowKey = state.rowKey,
        data = state.data;

    if (rowKey) {
      var currentRow = data.find(function (item) {
        var key = getRowIdentity(item, rowKey);
        return key === currentRowKey;
      });
      state.currentRow = currentRow;
    }
    state.currentRowKey = currentRowKey;
    return state;
  }
};

export default {
  getInitState: getInitState,
  actions: actions,
  mutations: mutations
};