'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONFIG_PROVIDER = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.getConfig = getConfig;
exports.getPrefix = getPrefix;
exports.getIconPrefix = getIconPrefix;
exports.getPrefixCls = getPrefixCls;
exports.getIconCls = getIconCls;
exports.config = config;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONFIG_PROVIDER = exports.CONFIG_PROVIDER = 'WDConfig';

var zIndex = 2000;
var stack = [];

var DEFAULT_CONFIG = {
  prefixCls: 'wd',
  iconPrefixCls: 'wdicon',

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

function getConfig() {
  return DEFAULT_CONFIG;
}

function getPrefix() {
  return DEFAULT_CONFIG.prefixCls;
}

function getIconPrefix() {
  return DEFAULT_CONFIG.iconPrefixCls;
}

function getPrefixCls(suffixCls, customizePrefixCls) {
  return customizePrefixCls || DEFAULT_CONFIG.prefixCls + '-' + suffixCls;
}

function getIconCls(suffixCls, customizePrefixCls) {
  var iconPrefixCls = DEFAULT_CONFIG.iconPrefixCls;

  return customizePrefixCls || iconPrefixCls + ' ' + iconPrefixCls + '-' + (suffixCls || '');
}

function config(options) {
  return (0, _assign2.default)(DEFAULT_CONFIG, options);
}