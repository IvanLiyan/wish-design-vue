module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 476);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ 12:
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(16);
var core = __webpack_require__(17);
var ctx = __webpack_require__(18);
var hide = __webpack_require__(20);
var has = __webpack_require__(30);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ 16:
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(169);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(170), __esModule: true };

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(171);
var $Object = __webpack_require__(17).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(15);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(25), 'Object', { defineProperty: __webpack_require__(21).f });


/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(19);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(21);
var createDesc = __webpack_require__(29);
module.exports = __webpack_require__(25) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(22);
var IE8_DOM_DEFINE = __webpack_require__(24);
var toPrimitive = __webpack_require__(28);
var dP = Object.defineProperty;

exports.f = __webpack_require__(25) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(25) && !__webpack_require__(26)(function () {
  return Object.defineProperty(__webpack_require__(27)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(26)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ 264:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/console");

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);
var document = __webpack_require__(16).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(23);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 30:
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(37);
var enumBugKeys = __webpack_require__(47);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(30);
var toIObject = __webpack_require__(38);
var arrayIndexOf = __webpack_require__(41)(false);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(39);
var defined = __webpack_require__(12);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(40);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-undefined */

var throttle = __webpack_require__(397);

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {Number}   delay         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}  [atBegin]     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @return {Function} A new, debounced function.
 */
module.exports = function ( delay, atBegin, callback ) {
	return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};


/***/ }),

/***/ 397:
/***/ (function(module, exports) {

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
module.exports = function ( delay, noTrailing, callback, debounceMode ) {

	// After wrapper has stopped being called, this timeout ensures that
	// `callback` is executed at the proper times in `throttle` and `end`
	// debounce modes.
	var timeoutID;

	// Keep track of the last time `callback` was executed.
	var lastExec = 0;

	// `noTrailing` defaults to falsy.
	if ( typeof noTrailing !== 'boolean' ) {
		debounceMode = callback;
		callback = noTrailing;
		noTrailing = undefined;
	}

	// The `wrapper` function encapsulates all of the throttling / debouncing
	// functionality and when executed will limit the rate at which `callback`
	// is executed.
	function wrapper () {

		var self = this;
		var elapsed = Number(new Date()) - lastExec;
		var args = arguments;

		// Execute `callback` and update the `lastExec` timestamp.
		function exec () {
			lastExec = Number(new Date());
			callback.apply(self, args);
		}

		// If `debounceMode` is true (at begin) this is used to clear the flag
		// to allow future `callback` executions.
		function clear () {
			timeoutID = undefined;
		}

		if ( debounceMode && !timeoutID ) {
			// Since `wrapper` is being called for the first time and
			// `debounceMode` is true (at begin), execute `callback`.
			exec();
		}

		// Clear any existing timeout.
		if ( timeoutID ) {
			clearTimeout(timeoutID);
		}

		if ( debounceMode === undefined && elapsed > delay ) {
			// In throttle mode, if `delay` time has been exceeded, execute
			// `callback`.
			exec();

		} else if ( noTrailing !== true ) {
			// In trailing throttle mode, since `delay` time has not been
			// exceeded, schedule `callback` to execute `delay` ms after most
			// recent execution.
			//
			// If `debounceMode` is true (at begin), schedule `clear` to execute
			// after `delay` ms.
			//
			// If `debounceMode` is false (at end), schedule `callback` to
			// execute after `delay` ms.
			timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
		}

	}

	// Return the wrapper function.
	return wrapper;

};


/***/ }),

/***/ 398:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/option");

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(38);
var toLength = __webpack_require__(42);
var toAbsoluteIndex = __webpack_require__(43);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(11);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(11);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(45)('keys');
var uid = __webpack_require__(46);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(17);
var global = __webpack_require__(16);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(14) ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 46:
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ 463:
/***/ (function(module, exports) {

var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/

module.exports = function mergeJSXProps (objs) {
  return objs.reduce(function (a, b) {
    var aa, bb, key, nestedKey, temp
    for (key in b) {
      aa = a[key]
      bb = b[key]
      if (aa && nestRE.test(key)) {
        // normalize class
        if (key === 'class') {
          if (typeof aa === 'string') {
            temp = aa
            a[key] = aa = {}
            aa[temp] = true
          }
          if (typeof bb === 'string') {
            temp = bb
            b[key] = bb = {}
            bb[temp] = true
          }
        }
        if (key === 'on' || key === 'nativeOn' || key === 'hook') {
          // merge functions
          for (nestedKey in bb) {
            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey])
          }
        } else if (Array.isArray(aa)) {
          a[key] = aa.concat(bb)
        } else if (Array.isArray(bb)) {
          a[key] = [aa].concat(bb)
        } else {
          for (nestedKey in bb) {
            aa[nestedKey] = bb[nestedKey]
          }
        }
      } else {
        a[key] = b[key]
      }
    }
    return a
  }, {})
}

function mergeFn (a, b) {
  return function () {
    a && a.apply(this, arguments)
    b && b.apply(this, arguments)
  }
}


/***/ }),

/***/ 47:
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_tab_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(477);

/* istanbul ignore next */
_src_tab_vue__WEBPACK_IMPORTED_MODULE_0__["default"].install = function (Vue) {
  Vue.component(_src_tab_vue__WEBPACK_IMPORTED_MODULE_0__["default"].name, _src_tab_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
};
/* harmony default export */ __webpack_exports__["default"] = (_src_tab_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(478);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _tab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(479);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(168);
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(78);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tab_nav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(480);
/* harmony import */ var _utils_console__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(264);
/* harmony import */ var _utils_console__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_console__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(86);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_utils_config__WEBPACK_IMPORTED_MODULE_4__);







function hasContent(panes, vnodes) {
  /* 当 pane 中子节点中有 v-if 时，pane.$slots.default 会为 undefined
   * 而 vnode 中的 componentOptions.children 会包含相关 vnode
   * to fix: https://tt.sankuai.com/ticket/detail?id=4028083
   */
  return panes.some(function (pane) {
    return pane.hasContent;
  });
}

function getTabPanes(vnodes) {
  return (vnodes || []).filter(function (vnode) {
    if (vnode.componentOptions) {
      var name = vnode.componentOptions.Ctor.options.name;
      return ['WtTabDrop', 'WtTabPane'].indexOf(name) > -1;
    }
    return false;
  }).map(function (vnode) {
    // 必须要求 vnode 已经 mounted
    return vnode.componentInstance;
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtTab',

  components: {
    TabNav: _tab_nav__WEBPACK_IMPORTED_MODULE_2__["default"]
  },

  props: {
    type: String,
    closable: Boolean,
    addable: Boolean,
    value: [String, Number, Object, Array],
    tabPosition: {
      type: String,
      default: 'top'
    },
    size: {
      type: String,
      default: 'large'
    },
    lineSize: Number,
    // position left 数量
    verticalHeightNumber: {
      type: Number,
      default: function _default() {
        return 1000;
      }
    },
    dropAutosize: Boolean, // 未来将默认为 true，暂时不写属性说明
    tabComponent: {
      type: [String, Object]
    }
  },
  inject: {
    config: {
      from: _utils_config__WEBPACK_IMPORTED_MODULE_4__["CONFIG_PROVIDER"],
      default: {
        getPrefixCls: _utils_config__WEBPACK_IMPORTED_MODULE_4__["getPrefixCls"]
      }
    }
  },
  data: function data() {
    return {
      currentValue: this.value,
      panes: [],
      tabStyle: {
        height: null
      },
      showPanel: true
    };
  },


  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('tabs');
    },
    hasInputListener: function hasInputListener() {
      return 'input' in this.$listeners;
    }
  },

  watch: {
    value: function value(_value) {
      this.setCurrentValue(_value);
    }
  },

  created: function created() {
    this.$on('tab-nav-update', this.calcPaneInstances.bind(null, { force: true }));
  },
  mounted: function mounted() {
    var _this = this;

    // 判断是否需要
    this.$nextTick(function () {
      if (_this.tabPosition === 'left') {
        var offsetHeight = _this.$refs.nav.$el.offsetHeight;

        _this.tabStyle.height = offsetHeight + 'px';
      }
      var panes = _this.panes;

      var activeHave = panes.some(function (item) {
        return item.active;
      });
      if (!activeHave) {
        if (panes[0]) {
          _this.setCurrentValue(panes[0].value);
          Object(_utils_console__WEBPACK_IMPORTED_MODULE_3__["warn"])('Tabs', 'no one pane has matched, activate the first item automatically. but this behavior will be removed in the future.' + _this.value); // eslint-disable-line max-len
        }
      }
    });
    this.calcPaneInstances();
  },
  updated: function updated() {
    this.calcPaneInstances();
  },


  methods: {
    calcPaneInstances: function calcPaneInstances(options) {
      var _this2 = this;

      var panes = getTabPanes(this.$slots.default);
      var changed = !(panes.length === this.panes.length && panes.every(function (pane, index) {
        return pane === _this2.panes[index];
      }));
      if (changed || options && options.force) {
        this.panes = panes;
        var nav = this.$refs.nav;
        nav && nav.updateNav();
        this.setCurrentValue(this.value);
        this.showPanel = this.panes && hasContent(this.panes, this.$slots.default);
      }
    },
    handleTabClick: function handleTabClick(event, tab, tabValue, index) {
      if (tab && tab.disabled) {
        return;
      }
      this.setValue(tabValue, index);
      this.$emit('tab-click', event, tab);
    },
    handleTabRemove: function handleTabRemove(event, pane) {
      if (pane.disabled) return;
      event.stopPropagation();
      this.$emit('tab-remove', event, pane.value);
    },
    handlePrevClick: function handlePrevClick(event) {
      this.$emit('prev-click', event);
    },
    handleNextClick: function handleNextClick(event) {
      this.$emit('next-click', event);
    },
    setValue: function setValue(value, index) {
      if (this.value !== value) {
        this.$emit('input', value);
      }
      if (!this.hasInputListener) {
        // 兼容历史版本，后期移除 currentValue
        this.setCurrentValue(value, index);
        Object(_utils_console__WEBPACK_IMPORTED_MODULE_3__["warn"])('Tabs', 'value is control props, it must has input event handler');
      }
    },
    setCurrentValue: function setCurrentValue(value) {
      this.currentValue = value;
    },
    addTabButton: function addTabButton(event) {
      this.$emit('tab-add', event);
    }
  },

  render: function render(h) {
    var _ref;

    var type = this.type,
        handleTabClick = this.handleTabClick,
        handleTabRemove = this.handleTabRemove,
        handlePrevClick = this.handlePrevClick,
        handleNextClick = this.handleNextClick,
        currentValue = this.currentValue,
        panes = this.panes,
        closable = this.closable,
        addable = this.addable,
        tabPosition = this.tabPosition,
        size = this.size,
        $attrs = this.$attrs,
        verticalHeightNumber = this.verticalHeightNumber,
        tabStyle = this.tabStyle,
        showPanel = this.showPanel,
        lineSize = this.lineSize,
        dropAutosize = this.dropAutosize,
        prefix = this.prefix;

    var navData = {
      props: {
        currentValue: currentValue,
        closable: closable,
        addable: addable,
        type: type,
        panes: panes,
        size: size,
        lineSize: lineSize,
        tabPosition: tabPosition,
        verticalHeightNumber: verticalHeightNumber,
        dropAutosize: dropAutosize,
        prefix: prefix,
        getPrefixCls: this.config.getPrefixCls,
        tabComponent: this.tabComponent
      },
      on: {
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        onPrevClick: handlePrevClick,
        onNextClick: handleNextClick
      },
      ref: 'nav'
    };
    babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(navData.props, $attrs);
    var borderStyle = {};

    if (!type) {
      if (tabPosition === 'top') {
        borderStyle['height'] = lineSize || lineSize === 0 ? lineSize + 'px' : '';
      } else {
        borderStyle['width'] = lineSize || lineSize === 0 ? lineSize + 'px' : '';
      }
    }

    var nav = h(
      'div',
      { 'class': [prefix + '-nav', tabPosition] },
      [h('tab-nav', navData), h('div', { 'class': prefix + '-bottom-border', style: borderStyle })]
    );
    var panels = h(
      'div',
      { 'class': prefix + '-content', ref: 'panes', directives: [{
          name: 'show',
          value: showPanel
        }]
      },
      [this.$slots.default]
    );
    return h(
      'div',
      {
        'class': (_ref = {}, babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, '' + prefix, true), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefix + '-nocard', !type), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefix + '-card', type === 'card'), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefix + '-border-card', type === 'border-card'), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefix + '-left', this.tabPosition === 'left'), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefix + '-' + this.size, this.size), _ref),
        style: tabStyle,
        ref: 'tab'
      },
      [[nav, panels]]
    );
  }
});

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(481);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(482);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(168);
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(78);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(483);
/* harmony import */ var _tab_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(484);
/* harmony import */ var _tab_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(487);
/* harmony import */ var _tab_one__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(490);
/* harmony import */ var _tab_drop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(496);
/* harmony import */ var _tab_add__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(499);
/* harmony import */ var _utils_resize_event__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(502);
/* harmony import */ var _utils_resize_event__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_utils_resize_event__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var throttle_debounce_debounce__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(396);
/* harmony import */ var throttle_debounce_debounce__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(throttle_debounce_debounce__WEBPACK_IMPORTED_MODULE_10__);













var ONE_HUNDRED_PERCENTAGE = '100%';

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtTabNav',

  components: {
    TabBar: _tab_bar__WEBPACK_IMPORTED_MODULE_4__["default"],
    TabPage: _tab_page__WEBPACK_IMPORTED_MODULE_5__["default"],
    TabOne: _tab_one__WEBPACK_IMPORTED_MODULE_6__["default"],
    TabDrop: _tab_drop__WEBPACK_IMPORTED_MODULE_7__["default"],
    TabAdd: _tab_add__WEBPACK_IMPORTED_MODULE_8__["default"]
  },

  props: {
    currentValue: [String, Number, Object, Array],
    panes: Array,
    closable: Boolean,
    size: {
      type: String,
      default: 'normal'
    },
    type: String,
    lineSize: Number,
    scrollUnit: {
      type: Number,
      default: 1
    },
    tabPosition: String,
    // 垂直时，tab 数量限制
    verticalHeightNumber: Number,
    addable: Boolean,
    dropAutosize: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: String,
      required: true
    },
    getPrefixCls: {
      type: Function,
      required: true
    },
    tabComponent: {
      type: [String, Object]
    }
  },

  data: function data() {
    return {
      fontSize: 0,
      containerWidth: 0,
      containerStyle: {},
      page: {
        offsetWidth: 0,
        offsetHeight: 0,
        pageStyle: {
          right: null,
          bottom: null,
          transform: null,
          padding: null
        }
      },
      scrollStyle: {
        'max-width': 0,
        height: null
      },
      animatedStyle: {
        transform: ''
      },
      animatedtranslate: 0,
      tabList: [],
      splitIndex: 0,
      firstIndex: 0,
      pageShow: true,
      // vertical tab height
      oneTabHeight: 0
    };
  },


  computed: {
    pageHaveShow: function pageHaveShow() {
      return this.tabPosition === 'left';
    },
    navStyle: function navStyle() {
      return {};
    },
    fixedWidth: function fixedWidth() {
      return this.page.offsetWidth;
    },
    prevStatus: function prevStatus() {
      return this.firstIndex !== 0;
    },
    scrollable: function scrollable() {
      var scrollStyle = this.scrollStyle,
          $refs = this.$refs;

      return $refs.animated.offsetWidth > scrollStyle['max-width'];
    }
  },

  watch: {
    firstIndex: function firstIndex(newValue, oldValue) {
      if (this.firstIndex < 0) {
        this.firstIndex = 0;
        return;
      }
      var widthSum = 0;
      for (var i = 0; i < this.firstIndex; i++) {
        if (this.tabPosition === 'left') {
          widthSum += this.oneTabHeight;
        } else {
          widthSum += this.tabList[i];
        }
      }
      this.animatedtranslate = -1 * widthSum;
    },
    panes: function panes() {
      var _this = this;

      // add tab 时updatetablist 数据用于计算翻页
      this.$nextTick(function () {
        _this.updateNav();
        var panes = _this.panes,
            tabList = _this.tabList;

        if (panes.length !== tabList.length) {
          _this.updateFirstIndex();
        }
        var bar = _this.$refs.bar;

        bar && bar.getStyle();
      });
    },
    animatedtranslate: function animatedtranslate() {
      var direction = '';

      switch (this.tabPosition) {
        case 'top':
          direction = 'X';
          break;
        case 'left':
          direction = 'Y';
          break;
      }
      babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2___default()(this.animatedStyle, {
        transform: 'translate' + direction + '(' + this.animatedtranslate + 'px)'
      });
    },
    currentValue: function currentValue(oldValue, newValue) {
      var _this2 = this;

      // 确保拿到当前激活的active
      this.$nextTick(function () {
        _this2.scrollToActiveTab();
      });
    }
  },

  created: function created() {
    this.isMounted = false;
    this.repaint = throttle_debounce_debounce__WEBPACK_IMPORTED_MODULE_10___default()(100, this.resetBarStyle);
  },
  mounted: function mounted() {
    var _this3 = this;

    Object(_utils_resize_event__WEBPACK_IMPORTED_MODULE_9__["addResizeListener"])(this.$el, this.updateNav);
    this.isMounted = true;
    // 等待nav 及组件 渲染结束，updateNav 内部使用子组件引用
    this.$nextTick(function () {
      _this3.updateNav();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.isMounted) Object(_utils_resize_event__WEBPACK_IMPORTED_MODULE_9__["removeResizeListener"])(this.$el, this.updateNav);
  },


  methods: {
    updateFirstIndex: function updateFirstIndex() {
      var activeTabIndex = 0;
      for (var i = 0; i < this.panes.length; i++) {
        if (this.panes[i].value === this.currentValue) {
          activeTabIndex = i;
          break;
        }
      }
      var _$refs = this.$refs,
          container = _$refs.container,
          animated = _$refs.animated;

      this.updateList(container, animated);
      var list = this.tabList;
      var maxWidth = this.scrollStyle['max-width'];
      var scrollWidth = maxWidth === ONE_HUNDRED_PERCENTAGE ? 0 : parseFloat(maxWidth);
      if (scrollWidth === 0) {
        return null;
      }
      var someSum = 0;
      for (var _i = activeTabIndex; _i >= 0; _i--) {
        someSum += list[_i];
        if (someSum > scrollWidth) {
          this.firstIndex = _i + 1;
          break;
        }
      }
      if (someSum < scrollWidth) {
        this.firstIndex = 0;
      }
    },
    updateNav: function updateNav() {
      var _this4 = this;

      if (!this.isMounted) {
        return;
      }
      var tabPosition = this.tabPosition,
          verticalHeightNumber = this.verticalHeightNumber,
          prefix = this.prefix,
          $refs = this.$refs;
      var container = $refs.container,
          animated = $refs.animated,
          page = $refs.page;

      if (!container || !animated) {
        return;
      }
      var add = $refs.add;

      var page$el = page ? page.$el : undefined;

      var _ref = page$el || {},
          offsetWidth = _ref.offsetWidth,
          offsetHeight = _ref.offsetHeight;

      var list = ['margin-left', 'margin-right'];
      var style = _style_js__WEBPACK_IMPORTED_MODULE_3__["cssStyle"].apply(undefined, [page$el].concat(list));
      this.page = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2___default()(this.page, {
        offsetWidth: offsetWidth + style['margin-left'] + style['margin-right'],
        offsetHeight: offsetHeight
      });
      this.updateList(container, animated);
      this.oneTabHeight = function () {
        for (var i = 0, len = animated.children.length; i < len; i++) {
          var item = animated.children[i];
          if (item.attributes.class.value.indexOf(prefix + '-item') !== -1) {
            var _list = ['margin-bottom'];
            var _style = _style_js__WEBPACK_IMPORTED_MODULE_3__["cssStyle"].apply(undefined, [item].concat(_list));
            return item.offsetHeight + _style['margin-bottom'];
          }
          continue;
        }
      }();

      // this.oneTabHeight 会触发tab add 渲染,更新,下面依赖渲染结果，so 添加nexttick
      this.$nextTick(function () {
        var list = ['margin-left', 'margin-right'];
        add = add || {};
        var style = _style_js__WEBPACK_IMPORTED_MODULE_3__["cssStyle"].apply(undefined, [add.$el].concat(list));
        var addWidth = add && add.$el ? add.$el.offsetWidth + style['margin-left'] + style['margin-right'] : 0;

        if (!animated) {
          // tofix https://tt.sankuai.com/ticket/detail?id=3747238
          return;
        }

        if (tabPosition === 'top') {
          var contentWidth = animated.scrollWidth + addWidth;
          var shouldShowPager = contentWidth > _this4.containerWidth;

          // 动态增加 tabs 是，由于之前没有翻页，所以在进入到次时挂载，所以 fixedWidth 会是 0。
          var pagerWidth = shouldShowPager ? Math.max(Math.min(_this4.fixedWidth || 0, 56), 56) : 0;

          var fixedWidth = pagerWidth + addWidth;

          _this4.scrollStyle['max-width'] = shouldShowPager ? _this4.containerWidth - fixedWidth + 'px' : ONE_HUNDRED_PERCENTAGE;
        } else {
          var _ref2 = page$el || { offsetWidth: 0, offsetHeight: 0 },
              _offsetWidth = _ref2.offsetWidth,
              _offsetHeight = _ref2.offsetHeight;

          _this4.scrollStyle['max-width'] = ONE_HUNDRED_PERCENTAGE;
          var isShowPage = verticalHeightNumber;
          var scrollHeight = _this4.oneTabHeight * verticalHeightNumber;
          var computedHeight = Math.min(scrollHeight, animated.offsetHeight);

          if (isShowPage && animated.offsetHeight > scrollHeight) {
            computedHeight += _offsetWidth;
            babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2___default()(_this4.scrollStyle, {
              height: scrollHeight + 'px'
            });
            babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2___default()(_this4.animatedStyle, {
              height: animated.offsetHeight + 'px'
            });
            babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_2___default()(_this4.page.pageStyle, {
              bottom: (_offsetWidth - _offsetHeight) / 2 + 'px',
              right: '20px',
              transform: 'rotate(90deg)',
              padding: '2px 0'
            });
          } else {
            _this4.pageShow = false;
          }

          _this4.containerStyle = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, _this4.containerStyle, {
            height: computedHeight + 'px'
          });
        }
        // 等待 scrollStyle 应用在 scroll 元素上
        _this4.$nextTick(function () {
          // 初始化page状态
          _this4.computedPageShow();
        });
      });
    },
    updateList: function updateList(container, animated) {
      if (!this.isMounted || !container || !animated) {
        return;
      }
      var computedResult = this.computedMoreIndex(container, animated);

      for (var key in computedResult) {
        this[key] = computedResult[key];
      }
    },

    computedMoreIndex: function computedMoreIndex(container, animated) {
      if (!container || !animated) {
        return {};
      }
      var len = 0;
      var result = {
        splitIndex: this.splitIndex,
        tabList: [],
        containerWidth: this.containerWidth
      };
      // get container width

      result.containerWidth = container.offsetWidth;
      [].every.call(animated.children, function (el, index) {
        // 如果 margin-right 固定 style['margin-right']可做优化
        var list = ['margin-right'];
        var style = _style_js__WEBPACK_IMPORTED_MODULE_3__["cssStyle"].apply(undefined, [el].concat(list));
        var tabLength = el.offsetWidth + style['margin-right'];
        len = len + tabLength;

        if (len <= result.containerWidth) {
          result.splitIndex = index;
        }

        result.tabList.push(tabLength);
        return true;
      });

      var bar = this.$refs.bar;

      bar && result.tabList.shift();
      return result;
    },
    onPrevClick: function onPrevClick() {
      this.computedTranslate(-1);
    },
    onNextClick: function onNextClick() {
      this.computedTranslate(1);
    },
    computedTranslate: function computedTranslate(o) {
      this.firstIndex = this.firstIndex + o * this.scrollUnit;
    },
    scrollToActiveTab: function scrollToActiveTab() {
      var _this5 = this;

      // active 渲染结束
      this.$nextTick(function () {
        var tabPrefix = _this5.getPrefixCls('tab');
        var activeTab = _this5.$el.querySelector(tabPrefix + '-active');
        if (!activeTab) return;
        var navScroll = _this5.$refs.scroll;
        var activeTabBounding = activeTab.getBoundingClientRect();
        var navScrollBounding = navScroll.getBoundingClientRect();
        var animatedtranslate = _this5.animatedtranslate;

        var newOffset = animatedtranslate;

        if (activeTabBounding.left < navScrollBounding.left) {
          newOffset = animatedtranslate + (navScrollBounding.left - activeTabBounding.left);
        }
        if (activeTabBounding.right > navScrollBounding.right) {
          _this5.updateFirstIndex();
          var widthSum = 0;
          for (var i = 0; i < _this5.firstIndex; i++) {
            widthSum += _this5.tabList[i];
          }
          newOffset = -widthSum;
        }
        _this5.animatedtranslate = newOffset;
        _this5.$nextTick(function () {
          _this5.computedPageShow();
          var bar = _this5.$refs.bar;

          bar && bar.getStyle();
        });
      });
    },
    computedPageShow: function computedPageShow() {
      var $refs = this.$refs,
          pageHaveShow = this.pageHaveShow;
      var animated = $refs.animated,
          scroll = $refs.scroll;


      if (!animated || !scroll) {
        return;
      }
      // 比较 tab 总长度与 scroll 确定是否超长
      // pageHaveShow vertical 情况使用
      if (!pageHaveShow) {
        this.pageShow = parseFloat(animated.offsetWidth) > scroll.offsetWidth;
        if (!this.pageShow) {
          this.animatedtranslate = 0;
        }
      }
    },
    computedActive: function computedActive(currentValue, item) {
      var tabDropInfo = item.tabDropInfo;


      if (tabDropInfo) {
        return tabDropInfo.moreTabs.some(function (it) {
          var val = it.value || it.index;
          item.active = currentValue === val;
          return item.active;
        });
      }

      var val = item.value || item.index;
      item.active = currentValue === val;

      return item.active;
    },
    getNextStatus: function getNextStatus() {
      var animatedtranslate = this.animatedtranslate,
          scrollStyle = this.scrollStyle,
          $refs = this.$refs;

      var styleName = this.tabPosition === 'left' ? 'height' : 'width';
      var firstUpperCase = function firstUpperCase(str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, function (L) {
          return L.toUpperCase();
        });
      };
      // animatedLength 滚动剩余距离
      var cssStyleName = styleName === 'width' ? 'max-width' : styleName;
      var animatedLength = parseFloat(scrollStyle[cssStyleName]) + Math.abs(animatedtranslate);
      if (this.firstIndex === 0) {
        return true;
      } else {
        return $refs.animated && animatedLength < $refs.animated['offset' + firstUpperCase(styleName)];
      }
    },
    addClick: function addClick(event) {
      // this.computedPageShow();
      this.$parent.addTabButton(event);
    },
    resetBarStyle: function resetBarStyle() {
      this.$refs.bar && this.$refs.bar.getStyle();
    }
  },

  render: function render(h) {
    var _this6 = this;

    var type = this.type,
        size = this.size,
        panes = this.panes,
        lineSize = this.lineSize,
        scrollStyle = this.scrollStyle,
        animatedStyle = this.animatedStyle,
        prevStatus = this.prevStatus,
        pageShow = this.pageShow,
        tabPosition = this.tabPosition,
        containerStyle = this.containerStyle,
        closable = this.closable,
        addable = this.addable,
        oneTabHeight = this.oneTabHeight,
        dropAutosize = this.dropAutosize,
        prefix = this.prefix,
        getPrefixCls = this.getPrefixCls,
        tabComponent = this.tabComponent;

    var nextStatus = pageShow ? this.getNextStatus() : false;
    var tabs = panes.map(function (item, index, all) {
      var active = _this6.computedActive(_this6.currentValue, item);
      var disabled = item.disabled,
          value = item.value,
          icon = item.icon,
          label = item.label,
          tabDropInfo = item.tabDropInfo,
          number = item.number;

      var tabValue = value || item.index || index;

      item.index = index + '';
      var tabOneData = {
        props: {
          size: size,
          disabled: disabled,
          active: active,
          icon: icon,
          number: number,
          label: label,
          pane: item, // vue 2.6+ 中 slot.label 取不到正确的值，故传递 pane 对象
          paneLabel: item.$slots.label,
          tabDropInfo: tabDropInfo,
          value: value,
          key: value,
          dropAutosize: dropAutosize,
          currentValue: _this6.currentValue,
          closable: item.$options && 'closable' in item.$options.propsData ? item.closable : closable,
          prefix: prefix,
          getPrefixCls: getPrefixCls,
          tabComponent: tabComponent
        },
        on: {
          tabClick: function tabClick(ev, activeValue) {
            // activeName select 使用
            tabValue = activeValue || tabValue;
            _this6.$emit('onTabClick', ev, item, tabValue, index);
          },
          tabRemove: function tabRemove(e) {
            _this6.$emit('onTabRemove', e, item);
          }
        },
        key: item.value,
        functional: true
      };
      return h(_tab_one__WEBPACK_IMPORTED_MODULE_6__["default"], tabOneData);
    });

    var barData = {
      props: {
        tabs: panes,
        lineSize: lineSize,
        tabPosition: tabPosition,
        prefix: this.prefix
      },
      ref: 'bar'
    };

    var pageData = {
      props: {
        size: size,
        prevStatus: prevStatus,
        nextStatus: nextStatus,
        pageStyle: this.page.pageStyle,
        prefix: this.prefix
      },
      on: {
        prevClick: function prevClick(event) {
          _this6.onPrevClick(event);
          _this6.$emit('onPrevClick', event);
        },
        nextClick: function nextClick(event) {
          _this6.onNextClick(event);
          _this6.$emit('onNextClick', event);
        }
      },
      ref: 'page'
    };

    var addData = {
      props: {
        width: oneTabHeight,
        prefix: this.prefix
      },
      ref: 'add'
    };

    return h(
      'div',
      {
        'class': babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, prefix + '-nav-container', true),
        style: containerStyle,
        ref: 'container'
      },
      [h(
        'div',
        {
          'class': babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, prefix + '-nav-scroll', true),
          style: scrollStyle,
          ref: 'scroll'
        },
        [h(
          'div',
          {
            'class': babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, prefix + '-nav-animated', true),
            style: animatedStyle,
            ref: 'animated'
          },
          [!type && h('tab-bar', barData), tabs]
        )]
      ), addable && h('tab-add', addData), pageShow && h('tab-page', pageData)]
    );
  }
});

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssStyle", function() { return cssStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoprefixer", function() { return autoprefixer; });
function cssStyle(el) {
  if (!el) {
    return {};
  }
  var style = window.getComputedStyle(el, null);

  for (var _len = arguments.length, styleName = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    styleName[_key - 1] = arguments[_key];
  }

  return styleName.reduce(function (o, name) {
    o[name] = parseFloat(style.getPropertyValue(name));
    return o;
  }, {});
};

function autoprefixer(css) {
  var prefixer = ['ms', 'webkit'];
  var style = ['transform'];
  style.forEach(function (item) {
    var cssValue = css[item];
    cssValue && prefixer.forEach(function (fix) {
      css[fix] = cssValue;
    });
  });
  return css;
};

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(485);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(486);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(168);
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(483);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtTabBar',

  props: {
    tabs: Array,
    lineSize: Number,
    tabPosition: String,
    prefix: {
      type: String,
      required: true
    }
  },

  data: function data() {
    return {
      barStyle: {
        width: '',
        height: '',
        transform: ''
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.getStyle();
    }, 0);
  },


  methods: {
    getStyle: function getStyle() {
      var _this2 = this;

      var barStyle = {};
      var offset = 0;
      var sizeName = 'width';
      var tabSize = 0;
      var firstUpperCase = function firstUpperCase(str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, function (L) {
          return L.toUpperCase();
        });
      };
      // 过滤 $el
      if (this.tabPosition === 'top') {
        var styleList = ['padding-left', 'padding-right', 'margin-right'];

        var paddingWidth = null;
        var marginWidth = null;
        this.tabs.every(function (tab, index) {
          // 注意 $el 与 compoment 的关系， 外面拼装list 的方式会对这里有影响
          var tabOne = tab.$tab;
          if (!tabOne) {
            // tofix: https://tt.sankuai.com/ticket/detail?id=3852483
            return;
          }
          var $el = tabOne.$el || tabOne;

          if (!$el) {
            return false;
          }

          var style = _style_js__WEBPACK_IMPORTED_MODULE_1__["cssStyle"].apply(undefined, [$el].concat(styleList));
          var getPaddingWidth = function getPaddingWidth() {
            var paddingLeft = style['padding-left'];
            var paddingRight = style['padding-right'];
            return paddingLeft === paddingRight ? paddingLeft : paddingLeft + paddingRight;
          };
          paddingWidth = getPaddingWidth();
          marginWidth = marginWidth || style['margin-right'];

          // if (index === this.tabs.length - 1) {
          //   offset -= tabSize / 2;
          //   // 最后一个tab bar 展示不全问题
          // }

          if (tab.active) {
            tabSize += $el['client' + firstUpperCase(sizeName)];
            if (sizeName === 'width' && _this2.tabs.length > 1) {
              tabSize -= paddingWidth * 2;
              // 计算头尾特殊tab 的line 的宽度
            }
            return false;
          }

          offset += $el['client' + firstUpperCase(sizeName)];
          offset += marginWidth;
          return true;
        });

        if (sizeName === 'width') {
          offset = offset + paddingWidth;
        }
        var transform = 'translateX(' + offset + 'px)';
        barStyle[sizeName] = tabSize + 'px';
        barStyle['height'] = this.lineSize ? this.lineSize + 'px' : this.lineSize;
        barStyle.transform = transform;
        for (var key in barStyle) {
          this.barStyle[key] = barStyle[key];
        }
      } else if (this.tabPosition === 'left') {
        tabSize = 0;
        sizeName = 'height';
        var _marginWidth = null;
        var _styleList = ['margin-bottom'];
        this.tabs.every(function (tab, index) {
          // 注意 $el 与 compoment 的关系， 外面拼装list 的方式会对这里有影响
          var tabOne = tab.$tab;
          var $el = tabOne.$el ? tabOne.$el : tabOne;

          if (!$el) {
            return false;
          }

          var style = _style_js__WEBPACK_IMPORTED_MODULE_1__["cssStyle"].apply(undefined, [$el].concat(_styleList));

          _marginWidth = _marginWidth || style['margin-bottom'];
          if (tab.active) {
            tabSize += $el['client' + firstUpperCase(sizeName)];
            return false;
          }

          offset += $el['client' + firstUpperCase(sizeName)];
          offset += _marginWidth;
          return true;
        });
        var _transform = 'translateY(' + offset + 'px)';
        barStyle[sizeName] = tabSize + 'px';
        barStyle['width'] = this.lineSize ? this.lineSize + 'px' : this.lineSize;
        barStyle.transform = _transform;
        for (var _key in barStyle) {
          this.barStyle[_key] = barStyle[_key];
        }
      }
    }
  },

  render: function render(h) {
    var _ref;

    var barStyle = this.barStyle,
        prefix = this.prefix;

    return h('div', {
      'class': (_ref = {}, babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefix + '-bar', true), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefix + '-bar-active', true), _ref),
      style: Object(_style_js__WEBPACK_IMPORTED_MODULE_1__["autoprefixer"])(barStyle)
    });
  }
});

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tab_page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(488);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _tab_page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(489);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(168);
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_icon__WEBPACK_IMPORTED_MODULE_1__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtTabPage',

  props: {
    size: String,
    prevStatus: Boolean,
    nextStatus: Boolean,
    pageStyle: {
      type: Object,
      default: function _default() {
        return {
          right: 0
        };
      }
    },
    prefix: {
      type: String,
      required: true
    }
  },

  methods: {
    prevClick: function prevClick(event) {
      if (this.prevStatus) {
        this.$emit('prevClick', event);
      }
    },
    nextClick: function nextClick(event) {
      if (this.nextStatus) {
        this.$emit('nextClick', event);
      }
    }
  },

  render: function render(h) {
    var _ref2, _ref3;

    var pageStyle = this.pageStyle,
        prevClick = this.prevClick,
        nextClick = this.nextClick,
        prevStatus = this.prevStatus,
        nextStatus = this.nextStatus,
        prefix = this.prefix;

    return h(
      'span',
      {
        'class': babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, prefix + '-page', true),
        style: pageStyle
      },
      [h(_components_icon__WEBPACK_IMPORTED_MODULE_1___default.a, {
        attrs: {
          name: 'arrow-left',
          width: '18',
          height: '18'
        },
        'class': (_ref2 = {}, babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, prefix + '-action', true), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, prefix + '-action-disabled', !prevStatus), _ref2),
        on: {
          'click': prevClick
        }
      }), h(_components_icon__WEBPACK_IMPORTED_MODULE_1___default.a, {
        attrs: {
          name: 'arrow-right',
          width: '18',
          height: '18'
        },
        'class': (_ref3 = {}, babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref3, prefix + '-action', true), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref3, prefix + '-action-disabled', !nextStatus), _ref3),
        on: {
          'click': nextClick
        }
      })]
    );
  }
});

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(168);
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tab_more__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(491);
/* harmony import */ var _tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(495);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(87);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_icon__WEBPACK_IMPORTED_MODULE_3__);





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtTabOne',

  components: {
    tabMore: _tab_more__WEBPACK_IMPORTED_MODULE_1__["default"],
    Icon: _components_icon__WEBPACK_IMPORTED_MODULE_3___default.a
  },

  props: {
    size: String,
    disabled: Boolean,
    active: Boolean,
    label: String,
    pane: {
      type: Object,
      required: true
    },
    paneLabel: Array,
    icon: String,
    tabDropInfo: Object,
    currentValue: [String, Number, Object, Array],
    closable: Boolean,
    dropAutosize: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: String,
      required: true
    },
    getPrefixCls: {
      type: Function,
      required: true
    },
    tabComponent: [String, Object],
    number: Number
  },

  data: function data() {
    return {
      labelContent: null
    };
  },
  updated: function updated() {
    this.$parent.repaint && this.$parent.repaint();
  },
  mounted: function mounted() {
    this.$parent.addTabs && this.$parent.addTabs(this);
    this.pane.$tab = this;
  },


  methods: {
    emitTabClick: function emitTabClick(e) {
      var value = !this.tabDropInfo ? this.pane.value : this.tabDropInfo.$parent.currentValue;
      !this.disabled && this.$emit('tabClick', e, value);
    },
    handleClick: function handleClick(e) {
      var _ref = this.tabDropInfo || {},
          moreTabs = _ref.moreTabs;

      if (!moreTabs || !moreTabs.length) {
        this.emitTabClick(e);
      }
    },
    closeClick: function closeClick(e) {
      !this.disabled && this.$emit('tabRemove', e);
    }
  },
  render: function render(h) {
    var _ref3;

    var size = this.size,
        disabled = this.disabled,
        active = this.active,
        icon = this.icon,
        label = this.label,
        paneLabel = this.paneLabel,
        emitTabClick = this.emitTabClick,
        handleClick = this.handleClick,
        tabDropInfo = this.tabDropInfo,
        currentValue = this.currentValue,
        closable = this.closable,
        closeClick = this.closeClick,
        dropAutosize = this.dropAutosize,
        prefix = this.prefix,
        tabComponent = this.tabComponent,
        number = this.number;

    var _ref2 = tabDropInfo || {},
        moreTabs = _ref2.moreTabs,
        $parent = _ref2.$parent;

    var tabMoreData = null;
    $parent && ($parent.currentValue = currentValue);
    if (moreTabs && moreTabs.length) {
      tabMoreData = {
        props: {
          moreTabs: moreTabs,
          currentValue: currentValue,
          label: label,
          icon: icon,
          disabled: disabled,
          size: size,
          dropAutosize: dropAutosize,
          prefix: prefix,
          tabComponent: tabComponent,
          number: number
        },
        on: {
          tabSelectClick: function tabSelectClick(value) {
            if (value) {
              $parent.currentValue = value;
              emitTabClick(undefined, value);
            }
          }
        },
        ref: 'more'
      };
    }

    // 如多每次都重新复制，会导致多次渲染问题
    // [Vue warn]: You may have an infinite update loop
    // in a component render function.

    // this.labelContent = this.labelContent || (
    //   <tab-more {...tabMoreData}></tab-more>
    // );
    var tabPrefix = this.getPrefixCls('tab');
    var children = h(
      'div',
      { 'class': prefix + '-item-label' },
      [tabMoreData && h('tab-more', tabMoreData), !tabMoreData && icon && h('icon', {
        attrs: { name: icon, width: '18', height: '18' }
      }), !tabMoreData && (paneLabel && paneLabel.length ? paneLabel : label), closable && h('icon', {
        attrs: { name: 'mtdicon-error-o' },
        'class': prefix + '-tab-close', on: {
          'click': closeClick
        }
      }), number > 0 && h(
        'span',
        { 'class': prefix + '-item-number' },
        [number]
      )]
    );
    var attrs = {
      class: [(_ref3 = {}, babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref3, prefix + '-item', true), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref3, prefix + '-item-' + size, true), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref3, prefix + '-item-disabled', disabled), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref3, tabPrefix + '-active', active), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref3, prefix + '-closable', closable), _ref3), this.pane.labelClass],
      on: {
        click: function click(ev) {
          handleClick(ev);
        }
      },
      props: {
        tab: this.pane
      }
    };
    var Component = tabComponent || _tab__WEBPACK_IMPORTED_MODULE_2__["default"];
    return h(
      Component,
      attrs,
      [children]
    );
  }
});

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tab_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(492);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _tab_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(493);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_more_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(463);
/* harmony import */ var babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(494);
/* harmony import */ var _components_select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_select__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(398);
/* harmony import */ var _components_option__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_option__WEBPACK_IMPORTED_MODULE_2__);




// import WtPicker from '@components/picker';

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtTabMore',

  components: {
    WtSelect: _components_select__WEBPACK_IMPORTED_MODULE_1___default.a,
    WtOption: _components_option__WEBPACK_IMPORTED_MODULE_2___default.a
    // WtPicker,
  },

  props: {
    label: String,
    size: String,
    disabled: Boolean,
    moreTabs: Array,
    currentValue: [String, Number, Object, Array],
    dropAutosize: Boolean,
    prefix: {
      type: String,
      required: true
    },
    tabComponent: [String, Object]
  },

  data: function data() {
    return {
      selectValue: this.label
    };
  },


  watch: {
    currentValue: {
      immediate: true,
      handler: function handler() {
        this.setSelectValue();
      }
    },
    moreTabs: function moreTabs() {
      this.setSelectValue();
    }
  },
  methods: {
    setSelectValue: function setSelectValue() {
      var _this = this;

      var selected = this.moreTabs.find(function (item) {
        return item.value === _this.currentValue;
      });
      if (!selected) {
        this.selectValue = this.label;
      } else {
        this.selectValue = selected.label;
      }
    }
  },
  render: function render(h) {
    var _this2 = this;

    var selectValue = this.selectValue,
        moreTabs = this.moreTabs,
        disabled = this.disabled,
        size = this.size,
        dropAutosize = this.dropAutosize,
        prefix = this.prefix;

    var props = {
      popperClass: prefix + '-select',
      value: selectValue,
      placeholder: '',
      disabled: disabled,
      size: size,
      genre: 'line'
    };
    var WtSelectData = {
      props: props,
      attrs: props,
      on: {
        input: function input(value) {
          // 手动更新select value
          _this2.$nextTick(function () {
            if (value) {
              _this2.selectValue = value;
              _this2.$emit('tabSelectClick', value);
            }
          });
        }
      }
    };
    var Component = _components_select__WEBPACK_IMPORTED_MODULE_1___default.a;
    return h(
      Component,
      babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default()([WtSelectData, { 'class': dropAutosize ? '' : prefix + '-select-item' }]),
      [moreTabs && moreTabs.map(function (item) {
        return h(
          'Wt-option',
          {
            key: item.value,
            attrs: { value: item.value,
              label: item.label,

              disabled: item.disabled
            },
            'class': item.labelClass },
          [item.$slots && item.$slots.label && h(
            'template',
            { slot: 'default' },
            [item.$slots.label]
          )]
        );
      })]
    );
  }
});

/***/ }),

/***/ 494:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/select");

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Tab',
  props: {
    tab: { type: Object }
  },
  render: function render(h) {
    return h('div', {
      on: this.$listeners
    }, this.$slots.default);
  }
});

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tab_drop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(497);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _tab_drop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_drop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(498);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_drop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtTabDrop',
  props: {
    label: String,
    disabled: Boolean
  },

  data: function data() {
    return {
      currentValue: '',
      tabDropInfo: {
        moreTabs: []
      }
    };
  },
  mounted: function mounted() {
    this.calcPaneInstances();
  },
  updated: function updated() {
    this.calcPaneInstances();
  },


  methods: {
    calcPaneInstances: function calcPaneInstances() {
      if (!this.$slots.default) {
        return null;
      }
      var data = [].map.call(this.$slots.default, function (item) {
        if (!item || !item.componentOptions) {
          return null;
        }
        var _item$componentOption = item.componentOptions.propsData,
            label = _item$componentOption.label,
            value = _item$componentOption.value,
            disabled = _item$componentOption.disabled,
            labelClass = _item$componentOption.labelClass;

        var instance = item.componentInstance;

        return {
          label: label,
          value: value,
          disabled: disabled,
          labelClass: labelClass,
          $slots: instance ? instance.$slots : undefined
        };
      });

      var moreTabs = data.filter(function (item) {
        return item;
      });
      this.tabDropInfo.moreTabs = moreTabs;
    },
    addTabs: function addTabs(tab, $parent) {
      this.tabDropInfo.$parent = this.tabDropInfo.$parent || $parent;
    }
  },

  render: function render(h) {
    var panes = this.$slots.default;
    return h(
      'div',
      { ref: 'select' },
      [panes]
    );
  }
});

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tab_add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(500);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _tab_add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(501);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tab_add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_icon__WEBPACK_IMPORTED_MODULE_0__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'MtdTabAdd',
  inheritAttrs: false,
  props: {
    prefix: {
      type: String,
      required: true
    }
  },
  methods: {
    addClick: function addClick(event) {
      this.$parent.addClick(event);
    }
  },

  render: function render(h) {
    var addClick = this.addClick,
        prefix = this.prefix;

    return h(
      'span',
      { 'class': prefix + '-action ' + prefix + '-add',
        on: {
          'click': addClick
        }
      },
      [h(_components_icon__WEBPACK_IMPORTED_MODULE_0___default.a, {
        attrs: { name: 'add' }
      })]
    );
  }
});

/***/ }),

/***/ 502:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/resize-event");

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(12);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(78);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
module.exports = __webpack_require__(17).Object.assign;


/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(15);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(81) });


/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(25);
var getKeys = __webpack_require__(36);
var gOPS = __webpack_require__(82);
var pIE = __webpack_require__(83);
var toObject = __webpack_require__(52);
var IObject = __webpack_require__(39);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(26)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ 82:
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 83:
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ 86:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/config");

/***/ }),

/***/ 87:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/icon");

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

/******/ });