import { isString, isFunction } from '@/utils/type.js';
import { firstUpperCase } from '@/utils/util';

import Data from './data';
import Column from './column';
import Sort from './sort';
import Selection from './selection';
import Expand from './expand';
import Filter from './filter';
import Tree from './tree';

// 此处的顺序会影响 mutation 的执行顺序，从而影响结果
const Modules = [
  Data,
  Column,
  Expand,
  Selection,
  Sort,
  Filter,
  Tree,
];

const methods = Modules.reduce((actions, mod) => {
  Object.assign(actions, mod.actions);
  return actions;
}, {});

export function mapStates (mapper) {
  return Object.keys(mapper).reduce((res, key) => {
    const value = mapper[key];
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

export function syncStates (mapper) {
  return Object.keys(mapper).reduce((res, key) => {
    const value = mapper[key];
    const name = firstUpperCase(value);
    res[key] = {
      immediate: true,
      handler: function (val) {
        const fn = this.store[`set${name}`];
        if (!fn) {
          console.error('未找到同步函数', name);
        } else {
          fn(val);
        }
      },
    };
    return res;
  }, {});
}

export function createStore (table, extModule = []) {
  const modules = [...Modules, ...extModule];

  const states = modules.reduce((state, mod) => {
    mod.getInitState && Object.assign(state, mod.getInitState());
    return state;
  }, {});

  const store = {
    states,
    table,
    modules: [
      ...Modules,
      ...extModule,
    ],
  };

  function dispatch (mutation) {
    const { type } = mutation;
    store.modules.forEach((mod) => {
      const handler = mod.mutations[type];
      handler && handler.call(store, this.states, mutation);
    });
  }

  store.dispatch = dispatch.bind(store);

  const fns = Object.keys(methods).reduce((ms, name) => {
    const method = methods[name];
    ms[name] = method.bind(store, store.dispatch);
    return ms;
  }, {});

  Object.assign(store, fns);
  store.modules.forEach((mod) => mod.bootstrap && mod.bootstrap(store));

  store.getExpandPropsByItem = function (row, $index) {
    const { treeEnabled } = store.states;
    if (treeEnabled) {
      return store.getTreeExpandProps(row, $index);
    }
    return store.getExpandProps(row, $index);
  };
  return store;
}
