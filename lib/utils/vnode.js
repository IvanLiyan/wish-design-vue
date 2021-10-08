'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getFirstComponentChild = getFirstComponentChild;
exports.isVNode = isVNode;
exports.filterEmptyNode = filterEmptyNode;
exports.getProps = getProps;
exports.applyProps = applyProps;
exports.hasProps = hasProps;
exports.findVNodesDownward = findVNodesDownward;
exports.findVNodesFromSlot = findVNodesFromSlot;

var _util = require('@ss/mtd-vue/lib/utils/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFirstComponentChild(children) {
  return children && children.find(function (c) {
    return c && c.tag;
  });
};

function isVNode(vnode) {
  return vnode !== null && (typeof vnode === 'undefined' ? 'undefined' : (0, _typeof3.default)(vnode)) === 'object' && (0, _util.hasOwn)(vnode, 'componentOptions');
};

function filterEmptyNode(vnodes) {
  return vnodes.filter(function (vnode) {
    return vnode.tag || vnode.text.trim();
  });
}

function getProps(vnode) {
  return vnode.componentOptions ? vnode.componentOptions.propsData : {};
}

function applyProps(vnode, props) {
  return (0, _extends3.default)({}, vnode, {
    componentOptions: (0, _extends3.default)({}, vnode.componentOptions, {
      propsData: (0, _extends3.default)({}, vnode.componentOptions.propsData, props)
    })
  });
}

function hasProps(vm, props) {
  if (vm && vm.$options) {
    return props in vm.$options.propsData;
  }
  return false;
}

function getComponentName(vn) {
  return (0, _util.getValueByPath)(vn, 'componentOptions.Ctor.options.name');
}
// 与 util 中不同，这里是在 vnode 侧进行查找
function findVNodesDownward(vnode, componentName) {
  var child = (vnode.componentOptions ? vnode.componentOptions.children : vnode.children) || [];
  if (child && !!child.reduce) {
    return child.reduce(function (array, vn) {
      var name = getComponentName(vn);
      if (name === componentName) array.push(vn);
      return array.concat(findVNodesDownward(vn, componentName));
    }, []);
  }
  return [];
}

function findVNodesFromSlot(slot, componentName) {
  return (slot || []).reduce(function (array, vnode) {
    if (getComponentName(vnode) === componentName) array.push(vnode);
    return array.concat(findVNodesDownward(vnode, componentName));
  }, []);
}