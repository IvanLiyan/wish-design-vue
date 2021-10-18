'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('@wish/wd-vue/lib/utils/config');

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

window.addEventListener('keydown', function (event) {
  // keyCode is deprecated
  if (event.key === 'Escape' || event.keyCode === 27) {
    var topPopup = Manager.getLastPopup();
    if (topPopup) {
      topPopup.$emit('esc');
    }
  }
});
exports.default = Manager;