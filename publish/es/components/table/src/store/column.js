import { doFlattenColumns } from '../utils';

function getInitState() {
  return {
    columnsConfig: [], // 元数据

    columns: [], // 渲染用实际数据
    originColumns: [],

    fixedColumns: [],
    rightFixedColumns: [],
    notFixedColumns: [],

    leafColumns: [],
    fixedLeafColumns: [],
    rightFixedLeafColumns: [],

    isComplex: false,
    selectionColumn: undefined
  };
}

var actions = {
  insertColumn: function insertColumn(dispatch, params) {
    dispatch({ type: 'insertColumn', payload: params });
    this.states.$ready && dispatch({ type: 'updateColumns' });
  },
  removeColumn: function removeColumn(dispatch, params) {
    dispatch({ type: 'removeColumn', payload: params });
    this.states.$ready && dispatch({ type: 'updateColumns' });
  },
  updateColumns: function updateColumns(dispatch) {
    dispatch({ type: 'updateColumns' });
  }
};

function _updateColumns(state) {
  var columnsConfig = state.columnsConfig;

  var fixedColumns = columnsConfig.filter(function (column) {
    return column.fixed === true || column.fixed === 'left';
  });
  var rightFixedColumns = columnsConfig.filter(function (column) {
    return column.fixed === 'right';
  });
  var notFixedColumns = columnsConfig.filter(function (column) {
    return !column.fixed;
  });

  if (fixedColumns.length > 0 && columnsConfig[0] && columnsConfig[0].type === 'selection' && !columnsConfig[0].fixed) {
    columnsConfig[0].fixed = true;
    fixedColumns.unshift(columnsConfig[0]);
  }
  state.fixedColumns = fixedColumns;
  state.rightFixedColumns = rightFixedColumns;
  state.notFixedColumns = notFixedColumns;

  state.originColumns = [].concat(state.fixedColumns).concat(state.notFixedColumns).concat(state.rightFixedColumns);
  // computed
  state.isComplex = fixedColumns.length > 0 || rightFixedColumns.length > 0;

  state.leafColumns = doFlattenColumns(notFixedColumns);
  state.fixedLeafColumns = doFlattenColumns(fixedColumns);
  state.rightFixedLeafColumns = doFlattenColumns(rightFixedColumns);

  state.columns = [].concat(state.fixedLeafColumns).concat(state.leafColumns).concat(state.rightFixedLeafColumns);

  state.selectionColumn = columnsConfig.find(function (column) {
    return column.type === 'selection';
  });
  return state;
}

var mutations = {
  insertColumn: function insertColumn(state, _ref) {
    var _ref$payload = _ref.payload,
        column = _ref$payload.column,
        index = _ref$payload.index,
        parent = _ref$payload.parent;
    var array = state.columnsConfig;

    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column);
    } else {
      array.push(column);
    }
    return state;
  },
  removeColumn: function removeColumn(state, _ref2) {
    var _ref2$payload = _ref2.payload,
        column = _ref2$payload.column,
        parent = _ref2$payload.parent;
    var array = state.columnsConfig;

    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }
    if (array) {
      var index = array.indexOf(column);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
    return state;
  },
  updateColumns: function updateColumns(state) {
    return _updateColumns(state);
  }
};

export default {
  getInitState: getInitState,
  actions: actions,
  mutations: mutations
};