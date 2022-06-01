import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import { getRowIdentity } from '../utils';

function getInitState() {
  return {
    expandRowKeys: [],
    expandedKeysMap: {}
  };
}

var actions = {
  setExpandRowKeys: function setExpandRowKeys(dispatch, expandRowKeys) {
    dispatch({ type: 'updateExpandRowKeys', payload: expandRowKeys });
  }
};

var mutations = {
  updateExpandRowKeys: function updateExpandRowKeys(state, _ref) {
    var expandRowKeys = _ref.payload;

    state.expandRowKeys = expandRowKeys;
    state.expandedKeysMap = expandRowKeys.reduce(function (state, key) {
      state[key] = true;
      return state;
    }, {});

    return state;
  }
};

function bootstrap(store) {
  store.updateExpandRows = function () {
    var _store$states = store.states,
        data = _store$states.data,
        rowKey = _store$states.rowKey,
        expandRowKeys = _store$states.expandRowKeys;

    if (rowKey && expandRowKeys.length) {
      var keys = data.reduce(function (state, row, index) {
        var key = getRowIdentity(row, rowKey, index);
        state[key] = true;
        return state;
      }, {});

      [].concat(_toConsumableArray(expandRowKeys)).forEach(function (key) {
        if (!keys[key]) {
          var index = expandRowKeys.indexOf(key);
          expandRowKeys.splice(index, 1);
        }
      });
    } else {
      expandRowKeys.splice(0, expandRowKeys.length);
    }
    // $emit update 事件会造成异步的重新 set，导致最终结果出错，故不能使用
    // store.table.$emit('update:expand-row-keys', expandRowKeys);
  };

  store.toggleRowExpansion = function (row, $index, expanded) {
    var _store$states2 = store.states,
        expandRowKeys = _store$states2.expandRowKeys,
        rowKey = _store$states2.rowKey;

    var key = getRowIdentity(row, rowKey, $index);
    var index = expandRowKeys.indexOf(key);

    var nowExpanded = index > -1;
    var nextExpanded = expanded === undefined ? !nowExpanded : expanded;
    var changed = nextExpanded !== nowExpanded;
    if (changed) {
      if (nextExpanded) {
        expandRowKeys.push(key);
      } else {
        expandRowKeys.splice(index, 1);
      }
      store.table.$emit('expand-change', row, expandRowKeys, { expanded: nextExpanded });
      store.setExpandRowKeys(expandRowKeys);
      store.table.$emit('update:expandRowKeys', expandRowKeys);
    }
  };

  store.isExpanded = function (row, $index) {
    var _store$states3 = store.states,
        rowKey = _store$states3.rowKey,
        expandedKeysMap = _store$states3.expandedKeysMap;

    var key = getRowIdentity(row, rowKey, $index);
    return expandedKeysMap[key];
  };

  store.getExpandProps = function (row, $index) {
    var expandable = store.table.expandable;

    return {
      expanded: store.isExpanded(row, $index),
      disabled: expandable ? !expandable(row, $index) : false
    };
  };

  return store;
}

export default {
  getInitState: getInitState,
  actions: actions,
  mutations: mutations,
  bootstrap: bootstrap
};