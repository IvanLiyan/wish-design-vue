import _Object$assign from 'babel-runtime/core-js/object/assign';
export var CONFIG_PROVIDER = 'MTDConfig';

var zIndex = 2000;
var stack = [];

var DEFAULT_CONFIG = {
  prefixCls: 'mtd',
  iconPrefixCls: 'mtdicon',

  getPopupContainer: function getPopupContainer() {
    return document.body;
  },

  getNextZIndex: function getNextZIndex() {
    return zIndex++;
  },
  addPopup: function addPopup(instance) {
    if (stack.indexOf(instance) === -1) {
      stack.push(instance);
    }
  },
  removePopup: function removePopup(instance) {
    var index = stack.lastIndexOf(instance);
    if (index > -1) {
      stack.splice(index, 1);
    }
  },
  getLastPopup: function getLastPopup() {
    if (stack.length > 0) {
      return stack[stack.length - 1];
    }
  }
};

export function getConfig() {
  return DEFAULT_CONFIG;
}

export function getPrefix() {
  return DEFAULT_CONFIG.prefixCls;
}

export function getIconPrefix() {
  return DEFAULT_CONFIG.iconPrefixCls;
}

export function getPrefixCls(suffixCls, customizePrefixCls) {
  return customizePrefixCls || DEFAULT_CONFIG.prefixCls + '-' + suffixCls;
}

export function getIconCls(suffixCls, customizePrefixCls) {
  var iconPrefixCls = DEFAULT_CONFIG.iconPrefixCls;

  return customizePrefixCls || iconPrefixCls + ' ' + iconPrefixCls + '-' + (suffixCls || '');
}

export function config(options) {
  return _Object$assign(DEFAULT_CONFIG, options);
}