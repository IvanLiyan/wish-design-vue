import { hasOwn, getValueByPath } from '@/utils/util';

export function getFirstComponentChild (children) {
  return children && children.find(c => c && c.tag);
};

export function isVNode (vnode) {
  return vnode !== null && typeof vnode === 'object' &&
    hasOwn(vnode, 'componentOptions');
};

export function filterEmptyNode (vnodes) {
  return vnodes.filter((vnode) => vnode.tag || vnode.text.trim());
}

export function getProps (vnode) {
  return vnode.componentOptions ? vnode.componentOptions.propsData : {};
}

export function applyProps (vnode, props) {
  return {
    ...vnode,
    componentOptions: {
      ...vnode.componentOptions,
      propsData: {
        ...vnode.componentOptions.propsData,
        ...props,
      },
    },
  };
}

export function hasProps (vm, props) {
  if (vm && vm.$options) {
    return props in vm.$options.propsData;
  }
  return false;
}

function getComponentName (vn) {
  return getValueByPath(vn, 'componentOptions.Ctor.options.name');
}
// 与 util 中不同，这里是在 vnode 侧进行查找
export function findVNodesDownward (vnode, componentName) {
  const child = (vnode.componentOptions ? vnode.componentOptions.children : vnode.children) || [];
  if (child && !!child.reduce) {
    return child.reduce((array, vn) => {
      const name = getComponentName(vn);
      if (name === componentName) array.push(vn);
      return array.concat(findVNodesDownward(vn, componentName));
    }, []);
  }
  return [];
}

export function findVNodesFromSlot (slot, componentName) {
  return (slot || []).reduce((array, vnode) => {
    if (getComponentName(vnode) === componentName) array.push(vnode);
    return array.concat(findVNodesDownward(vnode, componentName));
  }, []);
}
