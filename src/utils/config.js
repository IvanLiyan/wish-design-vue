export const CONFIG_PROVIDER = 'MTDConfig';

let zIndex = 2000;
const stack = [];

const DEFAULT_CONFIG = {
  prefixCls: 'mtd',
  iconPrefixCls: 'mtdicon',

  getPopupContainer: function () {
    return document.body;
  },

  getNextZIndex () {
    return zIndex++;
  },
  addPopup (instance) {
    if (stack.indexOf(instance) === -1) {
      stack.push(instance);
    }
  },
  removePopup (instance) {
    const index = stack.lastIndexOf(instance);
    if (index > -1) {
      stack.splice(index, 1);
    }
  },
  getLastPopup () {
    if (stack.length > 0) {
      return stack[stack.length - 1];
    }
  },
};

export function getConfig () {
  return DEFAULT_CONFIG;
}

export function getPrefix () {
  return DEFAULT_CONFIG.prefixCls;
}

export function getIconPrefix () {
  return DEFAULT_CONFIG.iconPrefixCls;
}

export function getPrefixCls (suffixCls, customizePrefixCls) {
  return customizePrefixCls || `${DEFAULT_CONFIG.prefixCls}-${suffixCls}`;
}

export function getIconCls (suffixCls, customizePrefixCls) {
  const { iconPrefixCls } = DEFAULT_CONFIG;
  return customizePrefixCls || `${iconPrefixCls} ${iconPrefixCls}-${suffixCls || ''}`;
}

export function config (options) {
  return Object.assign(DEFAULT_CONFIG, options);
}
