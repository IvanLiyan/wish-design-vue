'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lock = lock;
exports.unlock = unlock;

var _dom = require('./dom');

var lockNumber = 0;
var CLASSNAME = 'mtd-lock-scroll';

function lock(el) {
  if (!(0, _dom.hasClass)(el, CLASSNAME)) {
    (0, _dom.addClass)(el, CLASSNAME);
  }
  lockNumber++;
}

function unlock(el) {
  lockNumber--;
  if (lockNumber <= 0) {
    (0, _dom.removeClass)(el, CLASSNAME);
    lockNumber = 0;
  }
}

exports.default = {
  lock: lock,
  unlock: unlock
};