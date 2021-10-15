import Vue from 'vue';

var isServer = Vue.prototype.$isServer;
var defaultOptions = {
  capture: false,
  passive: false
};

function noop() {}

/* istanbul ignore next */
export var off = function () {
  if (!isServer && document.removeEventListener) {
    return function (node, event, handler) {
      // 判断 node 为 vnode
      var element = node && node.$el ? node.$el : node;
      if (element && event) {
        element.removeEventListener(event, handler, defaultOptions);
      }
    };
  } else {
    return function (node, event, handler) {
      var element = node && node.$el ? node.$el : node;
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
}();

/* istanbul ignore next */
export var on = function () {
  if (!isServer && document.addEventListener) {
    return function (node, event, handler) {
      // 判断 node 为 vnode
      var element = node && node.$el ? node.$el : node;
      if (element && event && handler) {
        element.addEventListener(event, handler, defaultOptions);
        return function () {
          return off(element, event, handler);
        };
      }
      return noop;
    };
  } else {
    return function (node, event, handler) {
      var element = node && node.$el ? node.$el : node;
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
        return function () {
          return off(element, event, handler);
        };
      }
      return noop;
    };
  }
}();

export function hasClass(el, className) {
  if (!el || !className) {
    return false;
  }
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
  }
}

export function addClass(el, className) {
  if (!el) return;
  var curClass = el.className;
  var classes = (className || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el, className) {
  if (!el || !className) return;
  var classes = className.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = curClass.trim();
  }
}

export function getStyle(el, styleName) {
  if (isServer) return;
  if (!el) {
    return {};
  }
  try {
    var style = window.getComputedStyle(el, null);
    return style.getPropertyValue(styleName);
  } catch (e) {
    return el.style[styleName];
  }
}