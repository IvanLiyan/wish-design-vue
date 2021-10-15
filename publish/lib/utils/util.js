'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sharpMatcherRegx = exports.getValueByPath = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.hasOwn = hasOwn;
exports.typeOf = typeOf;
exports.deepCopy = deepCopy;
exports.mergeDeep = mergeDeep;
exports.firstUpperCase = firstUpperCase;
exports.scrollTop = scrollTop;
exports.findComponentDownward = findComponentDownward;
exports.findComponentsDownward = findComponentsDownward;
exports.getPropByPath = getPropByPath;
exports.escapeRegexpString = escapeRegexpString;
exports.arrayRemove = arrayRemove;

var _type = require('./type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function typeOf(obj) {
  return Object.prototype.toString.call(obj).toLowerCase().replace(/(\[object )(\w+)(\])/g, '$2');
}

// deepCopy
function deepCopy(data) {
  var t = typeOf(data);
  var o = void 0;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (var i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (var _i in data) {
      o[_i] = deepCopy(data[_i]);
    }
  }
  return o;
}

function mergeDeep(target, source) {
  if (!source) {
    return target;
  }

  (0, _keys2.default)(source).forEach(function (key) {
    var targetValue = target[key];
    var sourceValue = source[key];

    if (!(key in target)) {
      target[key] = sourceValue;
    } else if ((typeof sourceValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(sourceValue)) !== (typeof targetValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(targetValue))) {
      target[key] = sourceValue;
    } else if ((0, _type.isArray)(targetValue)) {
      target[key] = sourceValue;
    } else if ((0, _type.isObject)(targetValue)) {
      target[key] = mergeDeep(targetValue, sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
}

function firstUpperCase(str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1);
}

// scrollTop animation
function scrollTop(el) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var to = arguments[2];
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
  var endCallback = arguments[4];

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  }
  var difference = Math.abs(from - to);
  var step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    var d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(function () {
      return scroll(d, end, step);
    });
  }
  scroll(from, to, step);
}

// Find component downward
function findComponentDownward(context, componentName) {
  var childrens = context.$children;
  var children = null;

  if (childrens.length) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(childrens), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var child = _step.value;

        var name = child.$options.name;
        if (name === componentName) {
          children = child;
          break;
        } else {
          children = findComponentDownward(child, componentName);
          if (children) break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  return children;
}

// Find components downward
function findComponentsDownward(context, componentName) {
  return context.$children.reduce(function (components, child) {
    if (child.$options.name === componentName) components.push(child);
    var foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}

var getValueByPath = exports.getValueByPath = function getValueByPath(object, prop) {
  if (object === undefined || object === null) {
    return object;
  }
  if (hasOwn(object, prop)) {
    return object[prop];
  }
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = null;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

function getPropByPath(obj, path, strict) {
  var tempObj = obj;
  if (hasOwn(obj, path)) {
    return {
      o: obj,
      k: path,
      v: obj[path]
    };
  }
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  var keyArr = path.split('.');
  var i = 0;
  for (var len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    var key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        // eslint-disable-next-line max-len
        throw new Error('[warn]: unable get ' + path + ' in ' + obj);
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

var sharpMatcherRegx = exports.sharpMatcherRegx = /#([^#]+)$/;

function escapeRegexpString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}

function arrayRemove(array, removed) {
  var b = (0, _type.isArray)(removed) ? removed : [removed];
  return array.filter(function (a) {
    return b.includes(a);
  });
}