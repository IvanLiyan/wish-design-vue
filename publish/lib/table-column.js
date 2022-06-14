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
/******/ 	return __webpack_require__(__webpack_require__.s = 591);
/******/ })
/************************************************************************/
/******/ ({

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(105);
module.exports = __webpack_require__(17).Object.keys;


/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(52);
var $keys = __webpack_require__(36);

__webpack_require__(106)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(15);
var core = __webpack_require__(17);
var fails = __webpack_require__(26);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

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

/***/ 17:
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


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

/***/ 285:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/util");

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

/***/ 47:
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(12);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _table_src_table_column__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(592);


/* istanbul ignore next */
_table_src_table_column__WEBPACK_IMPORTED_MODULE_0__["default"].install = function (Vue) {
  Vue.component(_table_src_table_column__WEBPACK_IMPORTED_MODULE_0__["default"].name, _table_src_table_column__WEBPACK_IMPORTED_MODULE_0__["default"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_table_src_table_column__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ 592:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(103);
/* harmony import */ var babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(78);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(285);
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_util__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(86);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_utils_config__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(87);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_components_icon__WEBPACK_IMPORTED_MODULE_5__);







var columnIdSeed = 1;

var defaults = {
  default: {
    order: ''
  },
  selection: {
    width: 34,
    minWidth: 34,
    realWidth: 34,
    order: ''
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  }
};

function DEFAULT_RENDER_CELL(h, _ref) {
  var row = _ref.row,
      column = _ref.column,
      $index = _ref.$index;

  var property = column.prop;

  var value = property && Object(_utils_util__WEBPACK_IMPORTED_MODULE_3__["getPropByPath"])(row, property).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return value;
};

function DEFAULT_RENDER_HEADER(h, _ref2) {
  var row = _ref2.row,
      column = _ref2.column;

  return column.label || '';
};

var forced = {
  default: {
    renderHeader: function renderHeader(h, data) {
      var column = data.column;

      var render = column.$scopedSlots.header ? function (h, data) {
        return column.$scopedSlots.header(data);
      } : column.renderHeaderFn || DEFAULT_RENDER_HEADER;
      return render(h, data);
    },
    renderCell: function renderCell(h, data) {
      var column = data.column;

      var render = column.$scopedSlots.default ? function (h, data) {
        return column.$scopedSlots.default(data);
      } : DEFAULT_RENDER_CELL;
      return render(h, data);
    }
  },
  selection: {
    renderHeader: function renderHeader(h, _ref3) {
      var store = _ref3.store;
      var _store$states = store.states,
          isAllSelected = _store$states.isAllSelected,
          hasAnySelected = _store$states.hasAnySelected,
          data = _store$states.data;


      return h('wt-checkbox', {
        on: {
          'click': function click(e) {
            return e.stopPropagation();
          },
          'input': store.toggleAllSelection
        },
        attrs: {
          disabled: data && data.length === 0,
          indeterminate: hasAnySelected && !isAllSelected,

          checked: isAllSelected }
      });
    },
    renderCell: function renderCell(h, _ref4) {
      var row = _ref4.row,
          column = _ref4.column,
          store = _ref4.store,
          $index = _ref4.$index;

      var props = store.getCheckboxPropsByItem(row, $index);

      var on = {
        input: function input(checked) {
          store.rowSelectedChanged(row, checked);
        }
      };

      var nativeOn = {
        click: function click(e) {
          return e.stopPropagation();
        }
      };

      var selection = column.$scopedSlots.selection;
      if (selection) {
        return selection({ props: props, on: on, row: row, $index: $index });
      }
      return h('wt-checkbox', { attrs: props, on: on, nativeOn: nativeOn });
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader: function renderHeader(h, _ref5) {
      var column = _ref5.column;

      return column.label || '#';
    },
    renderCell: function renderCell(h, _ref6) {
      var row = _ref6.row,
          $index = _ref6.$index,
          column = _ref6.column;

      var i = $index + 1;
      var index = column.$scopedSlots.index;
      if (index) {
        return index({ row: row, index: i, $index: $index });
      }

      return h('div', [i]);
    },
    sortable: false
  },
  expand: {
    renderCell: function renderCell(h, _ref7) {
      var row = _ref7.row,
          column = _ref7.column,
          store = _ref7.store,
          $index = _ref7.$index;

      var props = store.getExpandPropsByItem(row, $index);
      var proxy = this._renderProxy;
      var disabled = props.disabled,
          expanded = props.expanded;

      var toggle = function toggle(e) {
        proxy.handleExpandClick(e, row, $index);
      };
      if (disabled) {
        return '';
      }

      var expand = column.$scopedSlots.expand;
      if (expand) {
        var scope = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, props, { row: row, $index: $index });
        scope.toggle = toggle;
        return expand(scope);
      }

      return h(
        'div',
        { 'class': this.prefix + '-expand-icon ' + (expanded ? this.prefix + '-expand-icon-expanded' : ''),
          on: {
            'click': toggle
          }
        },
        [h(_components_icon__WEBPACK_IMPORTED_MODULE_5___default.a, {
          attrs: { name: 'right-thick' }
        })]
      );
    },
    // sortable: false,
    resizable: false
  }
};

var getDefaultColumn = function getDefaultColumn(type, options) {
  var column = {};

  babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(column, defaults['default'], type ? defaults[type] : {});
  for (var name in options) {
    if (Object(_utils_util__WEBPACK_IMPORTED_MODULE_3__["hasOwn"])(options, name)) {
      var value = options[name];
      if (typeof value !== 'undefined') {
        column[name] = value;
      }
    }
  }

  if (!column.minWidth) {
    column.minWidth = 80;
  }

  column.realWidth = column.width === undefined ? column.minWidth : column.width;

  return column;
};

var parseWidth = function parseWidth(width) {
  if (width !== undefined) {
    width = parseInt(width, 10);
    if (isNaN(width)) {
      width = undefined;
    }
  }
  return width;
};

var parseMinWidth = function parseMinWidth(minWidth) {
  if (minWidth !== undefined) {
    minWidth = parseInt(minWidth, 10);
    if (isNaN(minWidth)) {
      minWidth = 80;
    }
  }
  return minWidth;
};

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtTableColumn',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'default'
    },
    label: String,
    className: String,
    labelClass: String,
    prop: String,
    width: {},
    minWidth: {},
    renderHeader: Function,
    sortable: {
      type: [String, Boolean],
      default: false
    },
    sortMethod: {
      type: Function
    },
    sortBy: [String, Function, Array],
    resizable: {
      type: Boolean,
      default: false
    },
    context: {},
    columnKey: String,
    align: String,
    headerAlign: String,
    fixed: [Boolean, String],
    formatter: Function,
    index: [Number, Function],
    sortOrders: {
      type: Array,
      default: function _default() {
        return ['ascending', 'descending', null];
      },
      validator: function validator(val) {
        return val.every(function (order) {
          return ['ascending', 'descending', null].indexOf(order) > -1;
        });
      }
    },
    showOverflowTooltip: {
      type: Boolean,
      default: null
    },

    // to support: https://tt.sankuai.com/ticket/detail?id=4121738
    overflowSelector: String,

    filteredValue: Array,
    // 筛选时必须传递此方法
    filterMethod: {
      type: Function
    },
    filters: {
      type: Array
    },
    filterMultiple: {
      type: Boolean,
      default: true
    },
    filterDropdownVisible: Boolean,
    showFilterActions: {
      type: Boolean,
      default: true
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
      column: {},
      sFilteredValue: this.filteredValue || [],
      sFilterDropdownVisible: this.filterDropdownVisible || false
    };
  },


  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('table');
    },
    owner: function owner() {
      var parent = this.$parent;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    },
    columnOrTableParent: function columnOrTableParent() {
      var parent = this.$parent;
      while (parent && !parent.tableId && !parent.columnId) {
        parent = parent.$parent;
      }
      return parent;
    },
    isSubColumn: function isSubColumn() {
      return this.owner !== this.columnOrTableParent;
    },
    _width: function _width() {
      return parseWidth(this.width);
    },
    _minWidth: function _minWidth() {
      return parseMinWidth(this.minWidth);
    },
    _sortable: function _sortable() {
      return this.sortable === '' ? true : this.sortable;
    },
    _fixed: function _fixed() {
      return this.fixed === '' ? true : this.fixed;
    },
    _showOverflowTooltip: function _showOverflowTooltip() {
      return this.showOverflowTooltip === null ? this.owner.showOverflowTooltip : this.showOverflowTooltip;
    },
    _overflowSelector: function _overflowSelector() {
      return this.overflowSelector === null ? this.owner.overflowSelector : this.overflowSelector;
    },
    alignClass: function alignClass() {
      return this.align ? this.prefix + '-text-' + this.align : undefined;
    },
    headerAlignClass: function headerAlignClass() {
      return this.headerAlign ? this.prefix + '-text-' + this.headerAlign : this.alignClass;
    },
    _column: function _column() {
      var type = this.type;

      var option = {
        id: this.columnId,
        columnKey: this.columnKey,
        label: this.label,
        className: this.className,
        labelClass: this.labelClass,
        prop: this.prop,
        type: type,
        context: this.context,

        width: this._width,
        minWidth: this._minWidth,

        alignClass: this.alignClass,
        headerAlignClass: this.headerAlignClass,

        renderHeaderFn: this.renderHeader,
        formatter: this.formatter,

        fixed: this._fixed,

        sortable: this._sortable,
        sortMethod: this.sortMethod,
        sortOrders: this.sortOrders,
        showOverflowTooltip: this._showOverflowTooltip,
        overflowSelector: this._overflowSelector,
        filterable: this.filters || this.filterMethod,
        filters: this.filters,
        filterDropdownVisible: this.sFilterDropdownVisible,
        filteredValue: this.sFilteredValue,
        filterMethod: this.filterMethod,
        filterMultiple: this.filterMultiple,
        showFilterActions: this.showFilterActions,
        updateFilteredValue: this.updateFilteredValue,
        updateFilterDropdownVisible: this.updateFilterDropdownVisible,
        resizable: this.resizable
      };
      var column = getDefaultColumn(type, option);
      babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(column, forced['default'], type ? forced[type] : {});
      return column;
    }
  },

  watch: {
    _column: {
      immediate: true,
      handler: function handler(n, v) {
        var _this = this;

        babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(n).forEach(function (k) {
          var value = n[k];
          if (!v || value !== v[k]) {
            _this.$set(_this.column, k, value);
          }
        });
        var props = ['width', 'minWidth', 'fixed'];
        if (v && props.some(function (p) {
          return n[p] !== v[p];
        })) {
          this.owner.scheduleLayout(n['fixed'] !== v['fixed']);
        }
      }
    },
    filteredValue: function filteredValue(value) {
      this.sFilteredValue = value;
      this.column.filteredValue = this.value;
    },
    filterDropdownVisible: function filterDropdownVisible(visible) {
      this.sFilterDropdownVisible = visible;
      this.column.filterDropdownVisible = this.visible;
    }
  },
  created: function created() {
    var parent = this.columnOrTableParent;
    this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++; // computed 时 id 为空

    this.column.id = this.columnId;

    var type = this.type;

    if (type === 'expand') {
      if (this.owner.renderExpanded) {
        console.warn('[WT warn][TableColumn] expand column only allow once');
      } else {
        var self = this;
        this.owner.renderExpanded = function (h, data) {
          return self.$scopedSlots.default ? self.$scopedSlots.default(data) : self.$slots.default;
        };
      }
    }
  },
  destroyed: function destroyed() {
    if (!this.columnOrTableParent) return;
    var parent = this.columnOrTableParent;
    this.owner.store.removeColumn({
      column: this.column,
      parent: this.isSubColumn ? parent.column : null
    });
  },
  mounted: function mounted() {
    var owner = this.owner;
    var parent = this.columnOrTableParent;
    var columnIndex = void 0;

    if (!this.isSubColumn) {
      columnIndex = [].indexOf.call(parent.$refs.hiddenColumns.children, this.$el);
    } else {
      columnIndex = [].indexOf.call(parent.$el.children, this.$el);
    }

    owner.store.insertColumn({
      column: this.column,
      index: columnIndex > -1 ? columnIndex : undefined,
      parent: this.isSubColumn ? parent.column : null
    });
  },
  render: function render(h) {
    this.column.$scopedSlots = this.$scopedSlots; //
    return h('div', [this.$slots.default]);
  },


  methods: {
    updateFilteredValue: function updateFilteredValue(filteredValue) {
      this.$emit('update:filteredValue', filteredValue);
      if (!('filteredValue' in this.$options.propsData)) {
        this.sFilteredValue = filteredValue;
        this.column.filteredValue = this.sFilteredValue;
      }
    },
    updateFilterDropdownVisible: function updateFilterDropdownVisible(filterDropdownVisible) {
      this.$emit('update:filterDropdownVisible', filterDropdownVisible);
      if (!('filterDropdownVisible' in this.$options.propsData)) {
        this.sFilterDropdownVisible = filterDropdownVisible;
        this.column.filterDropdownVisible = this.sFilterDropdownVisible;
      }
    }
  }
});

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

/***/ })

/******/ });