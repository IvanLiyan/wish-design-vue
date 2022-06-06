import { hasClass, addClass, removeClass } from './dom';

var lockNumber = 0;
var CLASSNAME = 'mtd-lock-scroll';

export function lock(el) {
  if (!hasClass(el, CLASSNAME)) {
    addClass(el, CLASSNAME);
  }
  lockNumber++;
}

export function unlock(el) {
  lockNumber--;
  if (lockNumber <= 0) {
    removeClass(el, CLASSNAME);
    lockNumber = 0;
  }
}

export default {
  lock: lock,
  unlock: unlock
};