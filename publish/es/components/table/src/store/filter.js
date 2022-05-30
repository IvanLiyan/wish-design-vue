function getInitState() {
  return {
    filteredData: [],
    filters: {
      // [columnKey: string]: string[]
    }
  };
}

var actions = {
  computedFilteredData: function computedFilteredData(dispatch) {
    dispatch({ type: 'computedFilteredData' });
  }
};

var mutations = {
  computedFilteredData: function computedFilteredData(state) {
    var columns = state.columns,
        sortedData = state.sortedData;

    var filteredColumn = columns.filter(function (column) {
      return column.filterable;
    });
    var filters = {};

    var filteredData = filteredColumn.reduce(function (data, column) {
      var values = column.filteredValue,
          columnKey = column.columnKey,
          prop = column.prop,
          method = column.filterMethod;

      var key = columnKey || prop;
      if (values && values.length) {
        filters[key] = values;
        if (method) {
          return data.filter(function (row) {
            return values.some(function (value) {
              return method(value, row, column);
            });
          });
        }
      }
      return data;
    }, sortedData);
    state.filters = filters;
    state.filteredData = filteredData;
    state.data = filteredData;
  }
};

export default {
  getInitState: getInitState,
  actions: actions,
  mutations: mutations
};