import { doFlattenColumns } from '../utils';

function getInitState () {
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
    selectionColumn: undefined,
  };
}

const actions = {
  insertColumn (dispatch, params) {
    dispatch({ type: 'insertColumn', payload: params });
    this.states.$ready && dispatch({ type: 'updateColumns' });
  },
  removeColumn (dispatch, params) {
    dispatch({ type: 'removeColumn', payload: params });
    this.states.$ready && dispatch({ type: 'updateColumns' });
  },
  updateColumns (dispatch) {
    dispatch({ type: 'updateColumns' });
  },
};

function updateColumns (state) {
  const { columnsConfig } = state;
  const fixedColumns = columnsConfig.filter(
    (column) => column.fixed === true || column.fixed === 'left',
  );
  const rightFixedColumns = columnsConfig.filter(
    (column) => column.fixed === 'right',
  );
  const notFixedColumns = columnsConfig.filter(column => !column.fixed);

  if (fixedColumns.length > 0 && columnsConfig[0] &&
    columnsConfig[0].type === 'selection' && !columnsConfig[0].fixed) {
    columnsConfig[0].fixed = true;
    fixedColumns.unshift(columnsConfig[0]);
  }
  state.fixedColumns = fixedColumns;
  state.rightFixedColumns = rightFixedColumns;
  state.notFixedColumns = notFixedColumns;

  state.originColumns = [].concat(state.fixedColumns)
    .concat(state.notFixedColumns)
    .concat(state.rightFixedColumns);
  // computed
  state.isComplex = fixedColumns.length > 0 || rightFixedColumns.length > 0;

  state.leafColumns = doFlattenColumns(notFixedColumns);
  state.fixedLeafColumns = doFlattenColumns(fixedColumns);
  state.rightFixedLeafColumns = doFlattenColumns(rightFixedColumns);

  state.columns = [].concat(state.fixedLeafColumns)
    .concat(state.leafColumns)
    .concat(state.rightFixedLeafColumns);

  state.selectionColumn = columnsConfig.find((column) => {
    return column.type === 'selection';
  });
  return state;
}

const mutations = {
  insertColumn (state, { payload: { column, index, parent } }) {
    let { columnsConfig: array } = state;
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

  removeColumn (state, { payload: { column, parent } }) {
    let { columnsConfig: array } = state;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }
    if (array) {
      const index = array.indexOf(column);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
    return state;
  },

  updateColumns (state) {
    return updateColumns(state);
  },
};

export default {
  getInitState,
  actions,
  mutations,
};
