import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import { isString, isFunction } from '@wish/wt-vue/es/utils/type.js';
import { firstUpperCase } from '@wish/wt-vue/es/utils/util';

import Data from './data';
import Column from './column';
import Sort from './sort';
import Selection from './selection';
import Expand from './expand';
import Filter from './filter';
import Tree from './tree';

// 此处的顺序会影响 mutation 的执行顺序，从而影响结果
var Modules = [Data, Column, Expand, Selection, Sort, Filter, Tree];

var methods = Modules.reduce(function (actions, mod) {
  _Object$assign(actions, mod.actions);
  return actions;
}, {});

export function mapStates(mapper) {
  return _Object$keys(mapper).reduce(function (res, key) {
    var value = mapper[key];
    if (isString(value)) {
      res[key] = function () {
        return this.store.states[value];
      };
    } else if (isFunction(value)) {
      res[key] = function () {
        return value.call(this, this.store.states);
      };
    }
    return res;
  }, {});
}

export function syncStates(mapper) {
  return _Object$keys(mapper).reduce(function (res, key) {
    var value = mapper[key];
    var name = firstUpperCase(value);
    res[key] = {
      immediate: true,
      handler: function handler(val) {
        var fn = this.store['set' + name];
        if (!fn) {
          console.error('未找到同步函数', name);
        } else {
          fn(val);
        }
      }
    };
    return res;
  }, {});
}

export function createStore(table) {
  var extModule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var modules = [].concat(Modules, _toConsumableArray(extModule));

  var states = modules.reduce(function (state, mod) {
    mod.getInitState && _Object$assign(state, mod.getInitState());
    return state;
  }, {});

  var store = {
    states: states,
    table: table,
    modules: [].concat(Modules, _toConsumableArray(extModule))
  };

  function dispatch(mutation) {
    var _this = this;

    var type = mutation.type;

    store.modules.forEach(function (mod) {
      var handler = mod.mutations[type];
      handler && handler.call(store, _this.states, mutation);
    });
  }

  store.dispatch = dispatch.bind(store);

  var fns = _Object$keys(methods).reduce(function (ms, name) {
    var method = methods[name];
    ms[name] = method.bind(store, store.dispatch);
    return ms;
  }, {});

  _Object$assign(store, fns);
  store.modules.forEach(function (mod) {
    return mod.bootstrap && mod.bootstrap(store);
  });

  store.getExpandPropsByItem = function (row, $index) {
    var treeEnabled = store.states.treeEnabled;

    if (treeEnabled) {
      return store.getTreeExpandProps(row, $index);
    }
    return store.getExpandProps(row, $index);
  };
  return store;
}