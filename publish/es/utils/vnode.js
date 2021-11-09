import _extends from 'babel-runtime/helpers/extends';
import _typeof from 'babel-runtime/helpers/typeof';
import { hasOwn, getValueByPath } from '@wish/wt-vue/es/utils/util';

export function getFirstComponentChild(children) {
  return children && children.find(function (c) {
    return c && c.tag;
  });
};

export function isVNode(vnode) {
  return vnode !== null && (typeof vnode === 'undefined' ? 'undefined' : _typeof(vnode)) === 'object' && hasOwn(vnode, 'componentOptions');
};

export function filterEmptyNode(vnodes) {
  return vnodes.filter(function (vnode) {
    return vnode.tag || vnode.text.trim();
  });
}

export function getProps(vnode) {
  return vnode.componentOptions ? vnode.componentOptions.propsData : {};
}

export function applyProps(vnode, props) {
  return _extends({}, vnode, {
    componentOptions: _extends({}, vnode.componentOptions, {
      propsData: _extends({}, vnode.componentOptions.propsData, props)
    })
  });
}

export function hasProps(vm, props) {
  if (vm && vm.$options) {
    return props in vm.$options.propsData;
  }
  return false;
}

function getComponentName(vn) {
  return getValueByPath(vn, 'componentOptions.Ctor.options.name');
}
// 与 util 中不同，这里是在 vnode 侧进行查找
export function findVNodesDownward(vnode, componentName) {
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

export function findVNodesFromSlot(slot, componentName) {
  return (slot || []).reduce(function (array, vnode) {
    if (getComponentName(vnode) === componentName) array.push(vnode);
    return array.concat(findVNodesDownward(vnode, componentName));
  }, []);
}