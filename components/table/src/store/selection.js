import { getRowIdentity } from '../utils';

function getInitState () {
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
    indexOfSelection: undefined,
  };
}

function updateSelectionColumn (state) {
  const { hasSelection: old, columns } = state;
  state.hasSelection = !!columns.find((column) => {
    return column.type === 'selection';
  });
  if (old !== state.hasSelection) {
    computedSelection(state);
  }
  return state;
}

function isSelected (state, row) {
  const { indexOfSelection, selection } = state;
  return indexOfSelection(row, selection) > -1;
}

function getCheckboxPropsByItem (state, row, $index) {
  const { selectable, rowKey, CheckboxPropsCache } = state;
  const id = getRowIdentity(row, rowKey, $index);
  if (!CheckboxPropsCache[id]) {
    CheckboxPropsCache[id] = {
      disabled: selectable ? !selectable(row, $index) : false,
    };
  }

  return {
    ...CheckboxPropsCache[id],
    checked: isSelected(state, row),
  };
}

function computedSelection (state) {
  let hasAnySelected = false;
  let isAllSelected = false;
  const { hasSelection, data } = state;
  if (hasSelection && data.length) {
    const enabledCheckbox = data.map((item, index) => {
      return getCheckboxPropsByItem(state, item, index);
    }).filter((item) => {
      return !item.disabled;
    });
    if (enabledCheckbox.length) {
      hasAnySelected = enabledCheckbox.some((item) => {
        return item.checked;
      });
      isAllSelected = enabledCheckbox.every((item) => {
        return item.checked;
      });
    }
  }
  state.hasAnySelected = hasAnySelected;
  state.isAllSelected = isAllSelected;
  return state;
}

function getNestedRows (row, store) {
  const { treeEnabled, treeFieldNames } = store.states;
  if (!treeEnabled) {
    return [row];
  }

  const flat = function (item, array) {
    const { disabled } = store.getCheckboxPropsByItem(item, undefined);
    if (disabled) {
      return array;
    }

    array.push(item);

    const child = item[treeFieldNames.children];
    if (child) {
      child.forEach((chd) => flat(chd, array));
    }
    return array;
  };
  return flat(row, []);
}
const actions = {
  setSelection (dispatch, selection) {
    dispatch({ type: 'updateSelection', payload: selection });
  },
  setSelectable (dispatch, selectable) {
    dispatch({ type: 'updateSelectable', payload: selectable });
  },
  setIndexOfSelection (dispatch, indexOfSelection) {
    dispatch({ type: 'updateIndexOfSelection', payload: indexOfSelection });
  },
  setReserveSelection (dispatch, reserveSelection) {
    dispatch({ type: 'updateReserveSelection', payload: reserveSelection });
  },
};

const mutations = {
  updateData (state) {
    state.CheckboxPropsCache = {};
    return computedSelection(state);
  },
  updateColumns (state) {
    return updateSelectionColumn(state);
  },
  updateSelectable (state, { payload: selectable }) {
    state.selectable = selectable;
    state.CheckboxPropsCache = {};
    return state;
  },
  updateSelection (state, { payload: selection }) {
    state.selection = selection;
    return computedSelection(state);
  },
  updateIndexOfSelection (state, { payload: indexOfSelection }) {
    state.indexOfSelection = indexOfSelection;
    return state;
  },
  updateReserveSelection (state, { payload: reserveSelection }) {
    state.reserveSelection = reserveSelection;
    return state;
  },
};

function bootstrap (store) {
  store.getCheckboxPropsByItem = function (row, $index) {
    return getCheckboxPropsByItem(store.states, row, $index);
  };
  store.isSelected = function (row) {
    return isSelected(store.states, row);
  };

  store.toggleRowSelection = function (row, selected) {
    const {
      indexOfSelection, selection,
    } = store.states;
    const index = indexOfSelection(row, selection);

    const nowSelected = index > -1;
    const newSelected = selected === undefined ? !nowSelected : selected;
    const changed = nowSelected !== newSelected;
    if (changed) {
      const rows = getNestedRows(row, store);
      rows.forEach((row) => {
        const i = indexOfSelection(row, selection);
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
    const {
      selection, data,
      treeEnabled, treeFieldNames,
      isAllSelected,
      reserveSelection,
    } = store.states;
    const nextSelected = selected === undefined ? !isAllSelected : selected;
    const { children } = treeFieldNames;
    // todo 1.0 时需要更改为受控属性，不能直接操作
    if (!reserveSelection) {
      if (nextSelected) {
        const hander = (item, index) => {
          const { disabled } = store.getCheckboxPropsByItem(item, index);
          if (!disabled && selection.indexOf(item) === -1) {
            selection.push(item);
          }
          if (treeEnabled && item[children]) {
            const child = item[children];
            child.forEach(hander);
          }
        };
        data.forEach(hander);
      } else {
        selection.splice(0, selection.length);
      }
    } else {
      // 待处理的数据数组
      const shouldUpdateData = data.filter((item, index) => {
        const { disabled, checked } =
          store.getCheckboxPropsByItem(item, index);
        return !disabled && checked !== nextSelected;
      });
      if (nextSelected) {
        selection.push.apply(selection, shouldUpdateData);
      } else {
        const { indexOfSelection } = store.states;
        shouldUpdateData.forEach((data) => {
          const index = indexOfSelection(data, selection);
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
    const changed = store.toggleRowSelection(row, selected);
    if (changed) {
      store.table.$emit('select', store.states.selection, row);
      store.table.$emit('selection-change', store.states.selection);
    }
  };

  store.cleanSelection = function () {
    const { data, rowKey, selection } = store.states;
    const keys = data.map((row, index) => {
      // 如果没有 rowkey 则拿当前 row 作为 key
      return getRowIdentity(row, rowKey, undefined) || row;
    });
    selection.forEach((select) => {
      const inData = keys.find((item, index) => {
        return item === select;
      });
      if (!inData) {
        store.toggleRowSelection(select, false);
      }
    });
  };
  // 兼容 element
  store.clearSelection = function () {
    const { selection } = store.states;
    selection.splice(0);
    store.table.$emit('selection-change', selection);
  };
}

export default {
  getInitState,
  mutations,
  actions,
  bootstrap,
};
