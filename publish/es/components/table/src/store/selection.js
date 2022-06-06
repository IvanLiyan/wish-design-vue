import _extends from 'babel-runtime/helpers/extends';
import { getRowIdentity } from '../utils';

function getInitState() {
  return {
    hasSelection: false,
    hasAnySelected: false,
    isAllSelected: false,
    selection: [],

    reserveSelection: false,
    CheckboxPropsCache: {},

    // fn
    selectable: undefined,
    // fn
    indexOfSelection: undefined
  };
}

function updateSelectionColumn(state) {
  var old = state.hasSelection,
      columns = state.columns;

  state.hasSelection = !!columns.find(function (column) {
    return column.type === 'selection';
  });
  if (old !== state.hasSelection) {
    computedSelection(state);
  }
  return state;
}

function isSelected(state, row) {
  var indexOfSelection = state.indexOfSelection,
      selection = state.selection;

  return indexOfSelection(row, selection) > -1;
}

function getCheckboxPropsByItem(state, row, $index) {
  var selectable = state.selectable,
      rowKey = state.rowKey,
      CheckboxPropsCache = state.CheckboxPropsCache;

  var id = getRowIdentity(row, rowKey, $index);
  if (!CheckboxPropsCache[id]) {
    CheckboxPropsCache[id] = {
      disabled: selectable ? !selectable(row, $index) : false
    };
  }

  return _extends({}, CheckboxPropsCache[id], {
    checked: isSelected(state, row)
  });
}

function computedSelection(state) {
  var hasAnySelected = false;
  var isAllSelected = false;
  var hasSelection = state.hasSelection,
      data = state.data;

  if (hasSelection && data.length) {
    var enabledCheckbox = data.map(function (item, index) {
      return getCheckboxPropsByItem(state, item, index);
    }).filter(function (item) {
      return !item.disabled;
    });
    if (enabledCheckbox.length) {
      hasAnySelected = enabledCheckbox.some(function (item) {
        return item.checked;
      });
      isAllSelected = enabledCheckbox.every(function (item) {
        return item.checked;
      });
    }
  }
  state.hasAnySelected = hasAnySelected;
  state.isAllSelected = isAllSelected;
  return state;
}

function getNestedRows(row, store) {
  var _store$states = store.states,
      treeEnabled = _store$states.treeEnabled,
      treeFieldNames = _store$states.treeFieldNames;

  if (!treeEnabled) {
    return [row];
  }

  var flat = function flat(item, array) {
    var _store$getCheckboxPro = store.getCheckboxPropsByItem(item, undefined),
        disabled = _store$getCheckboxPro.disabled;

    if (disabled) {
      return array;
    }

    array.push(item);

    var child = item[treeFieldNames.children];
    if (child) {
      child.forEach(function (chd) {
        return flat(chd, array);
      });
    }
    return array;
  };
  return flat(row, []);
}
var actions = {
  setSelection: function setSelection(dispatch, selection) {
    dispatch({ type: 'updateSelection', payload: selection });
  },
  setSelectable: function setSelectable(dispatch, selectable) {
    dispatch({ type: 'updateSelectable', payload: selectable });
  },
  setIndexOfSelection: function setIndexOfSelection(dispatch, indexOfSelection) {
    dispatch({ type: 'updateIndexOfSelection', payload: indexOfSelection });
  },
  setReserveSelection: function setReserveSelection(dispatch, reserveSelection) {
    dispatch({ type: 'updateReserveSelection', payload: reserveSelection });
  }
};

var mutations = {
  updateData: function updateData(state) {
    state.CheckboxPropsCache = {};
    return computedSelection(state);
  },
  updateColumns: function updateColumns(state) {
    return updateSelectionColumn(state);
  },
  updateSelectable: function updateSelectable(state, _ref) {
    var selectable = _ref.payload;

    state.selectable = selectable;
    state.CheckboxPropsCache = {};
    return state;
  },
  updateSelection: function updateSelection(state, _ref2) {
    var selection = _ref2.payload;

    state.selection = selection;
    return computedSelection(state);
  },
  updateIndexOfSelection: function updateIndexOfSelection(state, _ref3) {
    var indexOfSelection = _ref3.payload;

    state.indexOfSelection = indexOfSelection;
    return state;
  },
  updateReserveSelection: function updateReserveSelection(state, _ref4) {
    var reserveSelection = _ref4.payload;

    state.reserveSelection = reserveSelection;
    return state;
  }
};

function bootstrap(store) {
  store.getCheckboxPropsByItem = function (row, $index) {
    return getCheckboxPropsByItem(store.states, row, $index);
  };
  store.isSelected = function (row) {
    return isSelected(store.states, row);
  };

  store.toggleRowSelection = function (row, selected) {
    var _store$states2 = store.states,
        indexOfSelection = _store$states2.indexOfSelection,
        selection = _store$states2.selection;

    var index = indexOfSelection(row, selection);

    var nowSelected = index > -1;
    var newSelected = selected === undefined ? !nowSelected : selected;
    var changed = nowSelected !== newSelected;
    if (changed) {
      var rows = getNestedRows(row, store);
      rows.forEach(function (row) {
        var i = indexOfSelection(row, selection);
        if (!newSelected) {
          if (i > -1) {
            selection.splice(i, 1);
          }
        } else if (i === -1) {
          selection.push(row);
        }
      });
    }
    return changed;
  };

  store.toggleAllSelection = function (selected) {
    var _store$states3 = store.states,
        selection = _store$states3.selection,
        data = _store$states3.data,
        treeEnabled = _store$states3.treeEnabled,
        treeFieldNames = _store$states3.treeFieldNames,
        isAllSelected = _store$states3.isAllSelected,
        reserveSelection = _store$states3.reserveSelection;

    var nextSelected = selected === undefined ? !isAllSelected : selected;
    var children = treeFieldNames.children;
    // todo 1.0 时需要更改为受控属性，不能直接操作

    if (!reserveSelection) {
      if (nextSelected) {
        var hander = function hander(item, index) {
          var _store$getCheckboxPro2 = store.getCheckboxPropsByItem(item, index),
              disabled = _store$getCheckboxPro2.disabled;

          if (!disabled && selection.indexOf(item) === -1) {
            selection.push(item);
          }
          if (treeEnabled && item[children]) {
            var child = item[children];
            child.forEach(hander);
          }
        };
        data.forEach(hander);
      } else {
        selection.splice(0, selection.length);
      }
    } else {
      // 待处理的数据数组
      var shouldUpdateData = data.filter(function (item, index) {
        var _store$getCheckboxPro3 = store.getCheckboxPropsByItem(item, index),
            disabled = _store$getCheckboxPro3.disabled,
            checked = _store$getCheckboxPro3.checked;

        return !disabled && checked !== nextSelected;
      });
      if (nextSelected) {
        selection.push.apply(selection, shouldUpdateData);
      } else {
        var indexOfSelection = store.states.indexOfSelection;

        shouldUpdateData.forEach(function (data) {
          var index = indexOfSelection(data, selection);
          if (index > -1) {
            selection.splice(index, 1);
          }
        });
      }
    }
    store.table.$emit('select-all', selection);
    store.table.$emit('selection-change', selection);
    return true;
  };

  store.rowSelectedChanged = function (row, selected) {
    var changed = store.toggleRowSelection(row, selected);
    if (changed) {
      store.table.$emit('select', store.states.selection, row);
      store.table.$emit('selection-change', store.states.selection);
    }
  };

  store.cleanSelection = function () {
    var _store$states4 = store.states,
        data = _store$states4.data,
        rowKey = _store$states4.rowKey,
        selection = _store$states4.selection;

    var keys = data.map(function (row, index) {
      // 如果没有 rowkey 则拿当前 row 作为 key
      return getRowIdentity(row, rowKey, undefined) || row;
    });
    selection.forEach(function (select) {
      var inData = keys.find(function (item, index) {
        return item === select;
      });
      if (!inData) {
        store.toggleRowSelection(select, false);
      }
    });
  };
  // 兼容 element
  store.clearSelection = function () {
    var selection = store.states.selection;

    selection.splice(0);
    store.table.$emit('selection-change', selection);
  };
}

export default {
  getInitState: getInitState,
  mutations: mutations,
  actions: actions,
  bootstrap: bootstrap
};