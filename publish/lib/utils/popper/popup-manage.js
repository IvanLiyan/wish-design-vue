'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _config = require('@wish/wd-vue/lib/utils/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Manager = {
  open: function open(instance) {
    (0, _config.getConfig)().addPopup(instance);
  },
  close: function close(instance) {
    (0, _config.getConfig)().removePopup(instance);
  },


  nextZIndex: function nextZIndex() {
    return (0, _config.getConfig)().getNextZIndex();
  },

  getLastPopup: function getLastPopup() {
    return (0, _config.getConfig)().getLastPopup();
  }
};

if (!_vue2.default.prototype.$isServer) {
  window.addEventListener('keydown', function (event) {
    // keyCode is deprecated
    if (event.key === 'Escape' || event.keyCode === 27) {
      var topPopup = Manager.getLastPopup();
      if (topPopup) {
        topPopup.$emit('esc');
      }
    }
  });
}
exports.default = Manager;