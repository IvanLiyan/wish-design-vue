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
/******/ 	return __webpack_require__(__webpack_require__.s = 386);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(10)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(13)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(11);
var defined = __webpack_require__(12);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(14);
var $export = __webpack_require__(15);
var redefine = __webpack_require__(31);
var hide = __webpack_require__(20);
var Iterators = __webpack_require__(32);
var $iterCreate = __webpack_require__(33);
var setToStringTag = __webpack_require__(49);
var getPrototypeOf = __webpack_require__(51);
var ITERATOR = __webpack_require__(50)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(25) && !__webpack_require__(26)(function () {
  return Object.defineProperty(__webpack_require__(27)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(26)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);
var document = __webpack_require__(16).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(34);
var descriptor = __webpack_require__(29);
var setToStringTag = __webpack_require__(49);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(20)(IteratorPrototype, __webpack_require__(50)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(22);
var dPs = __webpack_require__(35);
var enumBugKeys = __webpack_require__(47);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(27)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(48).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(21);
var anObject = __webpack_require__(22);
var getKeys = __webpack_require__(36);

module.exports = __webpack_require__(25) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(37);
var enumBugKeys = __webpack_require__(47);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(39);
var defined = __webpack_require__(12);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(40);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 41 */
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(11);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(11);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(45)('keys');
var uid = __webpack_require__(46);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 45 */
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
/* 46 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(16).document;
module.exports = document && document.documentElement;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(21).f;
var has = __webpack_require__(30);
var TAG = __webpack_require__(50)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(45)('wks');
var uid = __webpack_require__(46);
var Symbol = __webpack_require__(16).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(30);
var toObject = __webpack_require__(52);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(12);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(40);
var TAG = __webpack_require__(50)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 59 */,
/* 60 */,
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(22);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(32);
var ITERATOR = __webpack_require__(50)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(58);
var ITERATOR = __webpack_require__(50)('iterator');
var Iterators = __webpack_require__(32);
module.exports = __webpack_require__(17).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(50)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
module.exports = __webpack_require__(17).Object.assign;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(15);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(81) });


/***/ }),
/* 81 */
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
/* 82 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 83 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/type");

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/vnode");

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/config");

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/icon");

/***/ }),
/* 88 */
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


/***/ }),
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _input_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(153);
/* harmony import */ var _components_form_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(160);
/* harmony import */ var _components_form_item__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_form_item__WEBPACK_IMPORTED_MODULE_1__);



var WtInput = Object(_components_form_item__WEBPACK_IMPORTED_MODULE_1__["withFormItem"])('WtInput', _input_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
  withRef: true,
  methods: {
    focus: function focus() {
      return this.$refs.wrappedInstance.focus();
    },
    blur: function blur() {
      return this.$refs.wrappedInstance.blur();
    },
    select: function select() {
      return this.$refs.wrappedInstance.select();
    }
  }
});

WtInput.install = function (Vue) {
  Vue.component(WtInput.name, WtInput);
};
/* harmony default export */ __webpack_exports__["default"] = (WtInput);

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _input_vue_vue_type_template_id_af4a07a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(154);
/* harmony import */ var _input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(156);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _input_vue_vue_type_template_id_af4a07a8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _input_vue_vue_type_template_id_af4a07a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_input_vue_vue_type_template_id_af4a07a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(155);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_input_vue_vue_type_template_id_af4a07a8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_input_vue_vue_type_template_id_af4a07a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:(_vm.inputPrefix + "-box"),style:(_vm.width && { width: (_vm.width + "px") })},[_c('fieldset',{class:( _obj = {}, _obj[(_vm.inputPrefix + "-wrapper")] = true, _obj[(_vm.inputPrefix + "-" + _vm.type)] = _vm.type, _obj[(_vm.inputPrefix + "-with-label")] = _vm.label, _obj[(_vm.inputPrefix + "-disabled")] = _vm.disabled, _obj[(_vm.inputPrefix + "-invalid")] = _vm.isInvalid, _obj[(_vm.inputPrefix + "-focused")] = _vm.focused, _obj ),style:({ height: _vm.newHeight + 'px' })},[(_vm.label)?_c('legend',{class:{ 'space-label': !_vm.label.trim() }},[_vm._v(_vm._s(_vm.label))]):_vm._e(),_c('div',{class:(_vm.inputPrefix + "-con")},[_vm._t("prefix"),(_vm.type === 'textarea')?_c('textarea',_vm._g(_vm._b({ref:"input",class:_vm.inputPrefix,style:(_vm.textareaCalcStyle),attrs:{"disabled":_vm.disabled},domProps:{"value":_vm.inputValue}},'textarea',_vm.$attrs,false),_vm.inputLisenters)):_c('input',_vm._g(_vm._b({ref:"input",class:_vm.inputPrefix,attrs:{"type":_vm.type === 'password' ? 'password' : _vm.text,"disabled":_vm.disabled},domProps:{"value":_vm.inputValue}},'input',_vm.$attrs,false),_vm.inputLisenters)),(_vm.showClearIcon)?_c('Icon',{attrs:{"name":"x-circle"},on:{"click":function($event){$event.stopPropagation();return _vm.handleClear.apply(null, arguments)}}}):_vm._e(),_vm._t("suffix")],2)]),(_vm.type === 'textarea' && _vm.isInvalid)?_c('em',[_vm._v(" "+_vm._s(_vm.inputValue.length)+"/ "+_vm._s(_vm.maxLength))]):_vm._e()])}
var staticRenderFns = []



/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(157);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(78);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_icon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(86);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_utils_config__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_key_codes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(158);
/* harmony import */ var _utils_key_codes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_key_codes__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _calcNodeHeight__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(159);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtInput',
  components: {
    Icon: _components_icon__WEBPACK_IMPORTED_MODULE_1___default.a
  },

  inheritAttrs: false,
  inject: {
    config: {
      from: _utils_config__WEBPACK_IMPORTED_MODULE_2__["CONFIG_PROVIDER"],
      default: {
        getPrefixCls: _utils_config__WEBPACK_IMPORTED_MODULE_2__["getPrefixCls"]
      }
    }
  },
  props: {
    // 类型
    type: {
      type: String,
      validator: function validator(val) {
        return !val || ['line', 'textarea'].includes(val);
      }
    },
    // 禁止状态
    disabled: Boolean,
    // 校验不通过
    invalid: Boolean,
    // 宽
    width: Number,
    // 宽
    label: String,
    // 输入框的内容
    value: [String, Number],
    // 是否有清空按钮
    clearable: Boolean,
    // 自适应内容高度
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    // 限制输入的最大长度
    maxLength: {
      type: Number,
      default: 100
    },
    newHeight: Number
  },
  data: function data() {
    return {
      // 聚焦
      focused: false,
      // hover
      hovering: false,
      // 是否在拼音拼写中
      isComposing: false,
      // textarea自适应高度
      textareaCalcStyle: {},
      // input自身值
      nativeValue: '',
      // 没有双向绑定
      noModel: false
    };
  },


  computed: {
    inputPrefix: function inputPrefix() {
      return this.config.getPrefixCls('input');
    },


    // 是否显示清除icon
    showClearIcon: function showClearIcon() {
      return this.clearable && this.inputValue && !this.disabled;
    },


    // input值
    inputValue: function inputValue() {
      var value = (this.noModel ? this.nativeValue : this.value) || '';
      if (this.type !== 'textarea') {
        value = value.slice(0, this.maxLength);
      }
      return value;
    },

    // 是否校验不通过
    isInvalid: function isInvalid() {
      return this.type === 'textarea' && this.inputValue && this.inputValue.length > this.maxLength || this.invalid;
    },
    inputLisenters: function inputLisenters() {
      var lisenters = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, this.$listeners, {
        input: this.handleInput,
        focus: this.focus,
        blur: this.blur,
        keyup: this.handleKeyup,
        compositionstart: this.handleComposition,
        compositionupdate: this.handleComposition,
        compositionend: this.handleComposition
      });
      if (lisenters.change) {
        // it will trigger change event twice if not remove
        delete lisenters.change;
      }
      return lisenters;
    }
  },
  watch: {
    value: function value(val) {
      this.nativeValue = val;
      if (this.type === 'textarea') {
        this.$nextTick(this.resizeTextarea);
      }
    }
  },
  mounted: function mounted() {
    if (this.type === 'textarea') {
      this.resizeTextarea();
    }
  },

  methods: {
    /**
     * 输入框内容改变handle
     */
    handleInput: function handleInput(event, options) {
      var _this = this;

      var value = event.target.value;

      if (value !== this.value) {
        this.$emit('input', value);
        if (!this.isComposing) {
          this.setNativeInput(value);
          this.$nextTick(function () {
            return _this.setNativeInput(value);
          });
          this.$emit('change', value);
        }
      }
    },


    /**
     * 处理输入中文的合成事件
     */
    handleComposition: function handleComposition(e) {
      var type = e.type;

      if (this.$listeners[type]) {
        this.$emit(type, e);
      }
      if (type === 'compositionend') {
        this.isComposing = false;
        this.handleInput(e);
      } else {
        this.isComposing = true;
      }
    },

    /**
     * 设置input值
     */
    setNativeInput: function setNativeInput(value) {
      if (value !== this.value) {
        // 若没有v-model，则两个值会不同
        this.noModel = true;
        this.nativeValue = value;
      }
    },

    /**
     * 获得焦点
     */
    focus: function focus(e) {
      this.focused = true;
      this.$emit('focus', e);
      this.$refs.input.focus();
    },

    /**
     * 失去焦点
     */
    blur: function blur(e) {
      this.focused = false;
      this.$emit('blur', e);
      this.$refs.input.blur();
    },

    /**
     * 处理键盘事件
     */
    handleKeyup: function handleKeyup(e) {
      if (this.$listeners.keyup) {
        this.$emit('keyup', e);
      }
      if (Object(_utils_key_codes__WEBPACK_IMPORTED_MODULE_3__["isKey"])(e, 'enter') && !this.isComposing) {
        this.$emit('enter', e);
      }
    },


    /**
     * 设置textarea自适应高度
     */
    resizeTextarea: function resizeTextarea() {
      if (this.$isServer) return;
      if (!this.autosize) {
        this.textareaCalcStyle = {
          minHeight: Object(_calcNodeHeight__WEBPACK_IMPORTED_MODULE_4__["default"])(this.$refs.input).minHeight
        };
        return;
      }
      var _autosize = this.autosize,
          _autosize$minRows = _autosize.minRows,
          minRows = _autosize$minRows === undefined ? 2 : _autosize$minRows,
          _autosize$maxRows = _autosize.maxRows,
          maxRows = _autosize$maxRows === undefined ? 6 : _autosize$maxRows;

      this.textareaCalcStyle = Object(_calcNodeHeight__WEBPACK_IMPORTED_MODULE_4__["default"])(this.$refs.input, minRows, maxRows);
    },

    /**
     * 清楚输入框文本内容
     */
    handleClear: function handleClear() {
      this.handleInput({ target: { value: '' } });
      this.nativeValue = '';
      this.$emit('clear');
    }
  }
});

/***/ }),
/* 158 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/key-codes");

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return calcNodeHeight; });
var HIDDEN_TEXTAREA_STYLE = '\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n';

var SIZING_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'font-variant', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];

var hiddenTextarea = void 0;

function getNodeFloatAttr(nodeStyle, attr) {
  return parseFloat(nodeStyle.getPropertyValue(attr) || 0);
}

function calcNodeStyling(node) {
  var style = window.getComputedStyle(node);
  var boxSizing = style.getPropertyValue('box-sizing');
  var paddingSize = getNodeFloatAttr(style, 'padding-bottom') + getNodeFloatAttr(style, 'padding-top');
  var borderSize = getNodeFloatAttr(style, 'border-bottom-width') + getNodeFloatAttr(style, 'border-top-width');

  var sizingStyle = SIZING_STYLE.map(function (name) {
    return name + ':' + style.getPropertyValue(name);
  }).join(';');

  return { boxSizing: boxSizing, paddingSize: paddingSize, borderSize: borderSize, sizingStyle: sizingStyle };
};

function calcNodeHeight(node) {
  var minRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var maxRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  var _calcNodeStyling = calcNodeStyling(node),
      boxSizing = _calcNodeStyling.boxSizing,
      paddingSize = _calcNodeStyling.paddingSize,
      borderSize = _calcNodeStyling.borderSize,
      sizingStyle = _calcNodeStyling.sizingStyle;

  hiddenTextarea.setAttribute('style', sizingStyle + ';' + HIDDEN_TEXTAREA_STYLE);
  hiddenTextarea.value = node.value || node.placeholder || '';

  var height = hiddenTextarea.scrollHeight;

  if (boxSizing === 'border-box') {
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize;
  }

  hiddenTextarea.value = 'x';

  var result = {};
  var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null) {
    var minHeight = singleRowHeight * minRows;

    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }

    height = Math.max(minHeight, height);
    result.minHeight = minHeight + 'px';
  }
  if (maxRows !== null) {
    var maxHeight = singleRowHeight * maxRows;

    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }

    height = Math.min(maxHeight, height);
  }

  result.height = height + 'px';
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;

  return result;
};

/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/form-item");

/***/ }),
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(194);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(195), __esModule: true };

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
__webpack_require__(196);
module.exports = __webpack_require__(17).Array.from;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(18);
var $export = __webpack_require__(15);
var toObject = __webpack_require__(52);
var call = __webpack_require__(61);
var isArrayIter = __webpack_require__(62);
var toLength = __webpack_require__(42);
var createProperty = __webpack_require__(197);
var getIterFn = __webpack_require__(63);

$export($export.S + $export.F * !__webpack_require__(74)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(21);
var createDesc = __webpack_require__(29);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/popper");

/***/ }),
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/util");

/***/ }),
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _select_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(387);
/* harmony import */ var _components_form_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(160);
/* harmony import */ var _components_form_item__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_form_item__WEBPACK_IMPORTED_MODULE_1__);



var WtSelect = Object(_components_form_item__WEBPACK_IMPORTED_MODULE_1__["withFormItem"])('WtSelect', _select_vue__WEBPACK_IMPORTED_MODULE_0__["default"], {
  withRef: true,
  methods: {
    // 由于暂时不支持 visible 属性，先提供手动展开方法
    // https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/3278600
    toggle: function toggle(visible) {
      var wrappedInstance = this.$refs.wrappedInstance;

      var nextVisible = visible !== undefined ? visible : !wrappedInstance.focused;
      nextVisible ? this.focus() : this.blur();
    },
    focus: function focus() {
      var wrappedInstance = this.$refs.wrappedInstance;

      wrappedInstance.focus();
    },
    blur: function blur() {
      var wrappedInstance = this.$refs.wrappedInstance;

      wrappedInstance.blur();
    }
  },
  key: function key(props) {
    return props.multiple ? 'multiple' : '';
  }
});

/* istanbul ignore next */
WtSelect.install = function (Vue) {
  Vue.component(WtSelect.name, WtSelect);
};

/* harmony default export */ __webpack_exports__["default"] = (WtSelect);

/***/ }),
/* 387 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _select_vue_vue_type_template_id_9dda509c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(388);
/* harmony import */ var _select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(390);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _select_vue_vue_type_template_id_9dda509c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _select_vue_vue_type_template_id_9dda509c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 388 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_select_vue_vue_type_template_id_9dda509c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(389);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_select_vue_vue_type_template_id_9dda509c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_select_vue_vue_type_template_id_9dda509c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),
/* 389 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
var _obj, _obj$1, _obj$2;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:(_vm.handleClose),expression:"handleClose"}],class:( _obj = {}, _obj[_vm.prefix] = true, _obj[(_vm.prefix + "-" + _vm.size)] = _vm.size, _obj[(_vm.prefix + "-multiple-" + _vm.genre)] = _vm.genre, _obj[(_vm.prefix + "-disabled")] = _vm.disabled, _obj[(_vm.prefix + "-multiple")] = _vm.multiple, _obj[(_vm.prefix + "-multiple-invalid")] = _vm.multiple && _vm.invalid, _obj[(_vm.prefix + "-multiple-focus")] = _vm.multiple && _vm.opened, _obj ),style:(_vm.width && { width: (_vm.width + "px") }),on:{"click":_vm.toggleMenu}},[(_vm.multiple)?_c('div',{ref:"tags",class:[
      (_vm.prefix + "-tags"),
      ( _obj$1 = {}, _obj$1[(_vm.prefix + "-tags-" + _vm.size)] = _vm.size, _obj$1[(_vm.prefix + "-search-focus")] = _vm.opened, _obj$1 ) ]},[_c('ul',{class:(_vm.prefix + "-tags-ul")},[(!_vm.collapseTags)?_vm._l((_vm.filteredSelected),function(item,index){return _c('ChoiceTag',{key:index,attrs:{"option":item,"theme":"","size":_vm.size,"closable":!item.disabled && _vm.closableFn(item),"disabled":_vm.disabled},on:{"close":_vm.handleClearClick},scopedSlots:_vm._u([{key:"tag",fn:function(scope){return (_vm.$scopedSlots.tag)?[_vm._t("tag",null,null,scope)]:undefined}}],null,true)},[_vm._v(" "+_vm._s(_vm.formatterOption(item))+" ")])}):_vm._e(),(_vm.collapseTags && _vm.filteredSelected.length)?_c('ChoiceTag',{ref:"selectedItemFirst",attrs:{"option":_vm.filteredSelected[0],"theme":"","size":_vm.size,"disabled":_vm.disabled},on:{"close":_vm.handleClearClick},scopedSlots:_vm._u([{key:"tag",fn:function(scope){return (_vm.$scopedSlots.tag)?[_vm._t("tag",null,null,scope)]:undefined}}],null,true)},[_vm._v(" "+_vm._s(_vm.formatterOption(_vm.filteredSelected[0]))+" ")]):_vm._e(),_c('li',{class:(_vm.prefix + "-search-line")},[_c('div',{class:(_vm.prefix + "-search-field-wrap")},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.query),expression:"query"}],ref:"tagInput",class:(_vm.prefix + "-search-field"),style:({ width: _vm.inputLength + 'px', 'max-width': _vm.tagInputWidth + 'px' }),attrs:{"readonly":_vm.readonly,"autocomplete":"off","tabindex":"-1"},domProps:{"value":(_vm.query)},on:{"focus":_vm.handleFocus,"keyup":_vm.handleQueryInput,"compositionstart":_vm.handleComposition,"compositionupdate":_vm.handleComposition,"compositionend":_vm.handleComposition,"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.navigateOptions('next')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.navigateOptions('prev')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.selectOption.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }$event.preventDefault();_vm.focused = false},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"])){ return null; }return _vm.deletePrevTag.apply(null, arguments)}],"input":function($event){if($event.target.composing){ return; }_vm.query=$event.target.value}}})])]),(_vm.collapseTags && _vm.filteredSelected.length)?_c('li',{ref:"selectedItemTag",class:(_vm.prefix + "-tags-li")}):_vm._e()],2)]):_vm._e(),_c('popper',{ref:"popper",attrs:{"visible":_vm.opened,"append-to-container":_vm.appendToContainer,"get-popup-container":_vm.getPopupContainer,"placement":_vm.placement,"close-delay":0,"popper-options":_vm.popperOptions}},[_c('reference',[_c('wt-input',_vm._b({ref:"reference",class:( _obj$2 = {}, _obj$2[(_vm.prefix + "-search-focus")] = _vm.focused, _obj$2 ),attrs:{"name":_vm.name,"label":_vm.label,"disabled":_vm.disabled,"placeholder":_vm.currentPlaceholder,"loading":_vm.loading,"invalid":_vm.invalid,"new-height":_vm.newHeight},on:{"clear":_vm.handleInputClear,"focus":_vm.handleFocus,"compositionstart":_vm.handleComposition,"compositionupdate":_vm.handleComposition,"compositionend":_vm.handleComposition,"keyup":_vm.handleInputChange,"keydown":[_vm.handleKeydown,function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.stopPropagation();$event.preventDefault();return _vm.navigateOptions('next')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.stopPropagation();$event.preventDefault();return _vm.navigateOptions('prev')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.selectOption.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }$event.stopPropagation();$event.preventDefault();_vm.focused = false},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }_vm.focused = false}]},model:{value:(_vm.showValue),callback:function ($$v) {_vm.showValue=$$v},expression:"showValue"}},'wt-input',_vm.$attrs,false),[_c('span',{class:(_vm.prefix + "-suffix-inner"),attrs:{"slot":"suffix"},slot:"suffix"},[(!_vm.loading)?_c('Icon',{attrs:{"name":_vm.sIcon}}):_c('wt-loading',{attrs:{"message":"","size":"small"}})],1)])],1),_c('drop',{ref:"drop",class:[(_vm.prefix + "-dropdown"), _vm.popperClass],style:({
        'min-width': _vm.minWidth,
      }),attrs:{"use-show":true}},[_c('ul',{ref:"menu",class:(_vm.dropdownPrefix + "-menu")},[(_vm.canSelectAll)?_c('wt-option',{directives:[{name:"show",rawName:"v-show",value:(!_vm._isEmpty && !_vm.query && !_vm.loading),expression:"!_isEmpty && !query && !loading"}],attrs:{"value":_vm.SELECT_ALL_VALUE,"created":"","is-select-all":"","indeterminate":!_vm.isSelectAll && _vm.value && !!_vm.value.length}},[_vm._v("全选")]):_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.loading && !_vm.emptyText),expression:"!loading && !emptyText"}]},[(_vm.showNewOption)?_c('wt-option',{attrs:{"value":_vm.query,"label":_vm.query,"created":""}}):_vm._e(),_vm._t("default")],2),(!_vm.loading && _vm.emptyText)?_vm._t("empty",function(){return [_c('li',{class:(_vm.dropdownPrefix + "-menu-item " + _vm.prefix + "-dropdown-empty")},[_vm._v(" "+_vm._s(_vm.emptyText)+" ")])]}):_vm._e(),(_vm.loading)?_vm._t("loading",function(){return [_c('li',{class:(_vm.dropdownPrefix + "-menu-item " + _vm.prefix + "-dropdown-loading")},[_vm._v(" "+_vm._s(_vm.loadingText)+" ")])]}):_vm._e()],2)])],1)],1)}
var staticRenderFns = []



/***/ }),
/* 390 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(391);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),
/* 391 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(193);
/* harmony import */ var babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_popper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(217);
/* harmony import */ var _components_popper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_popper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(152);
/* harmony import */ var _utils_clickoutside__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(392);
/* harmony import */ var _utils_clickoutside__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_clickoutside__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _navigation_mixin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(393);
/* harmony import */ var _utils_scroll_into_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(394);
/* harmony import */ var _utils_scroll_into_view__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_utils_scroll_into_view__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_tag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(395);
/* harmony import */ var _components_tag__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_components_tag__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var throttle_debounce_debounce__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(396);
/* harmony import */ var throttle_debounce_debounce__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(throttle_debounce_debounce__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(296);
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_utils_util__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(84);
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_utils_type__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_option__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(398);
/* harmony import */ var _components_option__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_components_option__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(399);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_utils_dom__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(400);
/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_utils_array__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _utils_vnode__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(85);
/* harmony import */ var _utils_vnode__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_utils_vnode__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _utils_key_codes__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(158);
/* harmony import */ var _utils_key_codes__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_utils_key_codes__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _select_tag__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(401);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(86);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_utils_config__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(87);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_components_icon__WEBPACK_IMPORTED_MODULE_17__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



















function getRealValue(value, valueKey) {
  return Object(_utils_type__WEBPACK_IMPORTED_MODULE_9__["isObject"])(value) && valueKey ? Object(_utils_util__WEBPACK_IMPORTED_MODULE_8__["getValueByPath"])(value, valueKey) : value;
}

var SELECT_ALL_VALUE = '__SELECT_ALL__';
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtSelect',
  components: {
    WtInput: _input__WEBPACK_IMPORTED_MODULE_2__["default"],
    Popper: _components_popper__WEBPACK_IMPORTED_MODULE_1__["Popper"],
    Drop: _components_popper__WEBPACK_IMPORTED_MODULE_1__["Drop"],
    Reference: _components_popper__WEBPACK_IMPORTED_MODULE_1__["Reference"],
    WtTag: _components_tag__WEBPACK_IMPORTED_MODULE_6___default.a,
    WtOption: _components_option__WEBPACK_IMPORTED_MODULE_10___default.a,
    ChoiceTag: _select_tag__WEBPACK_IMPORTED_MODULE_15__["default"],
    Icon: _components_icon__WEBPACK_IMPORTED_MODULE_17___default.a
  },
  directives: { Clickoutside: _utils_clickoutside__WEBPACK_IMPORTED_MODULE_3___default.a },
  mixins: [_navigation_mixin__WEBPACK_IMPORTED_MODULE_4__["default"]],
  props: {
    icon: String,
    name: String,
    value: [String, Number, Object, Array, Boolean],
    width: Number,
    defaultActiveFirstOption: {
      type: Boolean,
      default: true
    },
    valueKey: String,
    label: String,
    size: String,
    disabled: Boolean,
    placeholder: {
      type: String,
      default: function _default() {
        return '请选择';
      }
    },
    placement: String,
    filterable: Boolean,
    autoClearQuery: {
      type: Boolean,
      default: false
    },
    clearable: Boolean,
    closeable: [Boolean, Function], // 兼容历史
    closable: {
      type: [Boolean, Function],
      default: true
    },
    debounce: {
      type: Number,
      default: 0
    },
    filterMethod: {
      type: Function,
      default: function _default(query, value) {
        var parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
        return new RegExp(parsedQuery, 'i').test(value);
      }
    },
    remote: Boolean,
    remoteMethod: Function,
    noMatchText: {
      type: String,
      default: function _default() {
        return '暂无搜索结果';
      }
    },

    loading: Boolean,
    loadingText: {
      type: String,
      default: function _default() {
        return '搜索中';
      }
    },
    invalid: Boolean,
    noDataText: {
      type: String,
      default: function _default() {
        return '暂无数据';
      }
    },
    multiple: Boolean,
    showCheckbox: {
      type: Boolean,
      default: true
    },
    multipleLimit: {
      type: Number,
      default: function _default() {
        return 0;
      }
    },
    collapseTags: Boolean,
    popperClass: String,
    appendToContainer: {
      type: Boolean,
      default: true
    },
    getPopupContainer: Function,
    defaultVisible: Boolean,
    isEmpty: Boolean,
    formatter: Function,
    reserveKeyword: Boolean,
    allowCreate: Boolean,
    popperOptions: Object,
    showSelectAll: {
      type: Boolean,
      default: false
    },
    genre: String,
    collapseMaxSearchWidth: {
      // 将在 1.0 中移除
      type: Number,
      default: 50
    }
  },
  inject: {
    config: {
      from: _utils_config__WEBPACK_IMPORTED_MODULE_16__["CONFIG_PROVIDER"],
      default: {
        getPrefixCls: _utils_config__WEBPACK_IMPORTED_MODULE_16__["getPrefixCls"],
        getIconCls: _utils_config__WEBPACK_IMPORTED_MODULE_16__["getIconCls"]
      }
    }
  },
  data: function data() {
    return {
      options: [],
      filteredOptionsCount: 0,
      focused: this.defaultVisible,
      inputLength: 20,
      showValue: '',
      inputWidth: 0,
      tagInputWidth: 0,
      query: '',
      previousQuery: null,
      minWidth: 0,
      isOnComposition: false,
      selected: this.multiple ? [] : {},
      scrollListener: false,
      SELECT_ALL_VALUE: SELECT_ALL_VALUE,
      isSelectAll: false,
      isMounted: false,
      tagsHeight: 36,
      newHeight: this.label ? 44 : 36
    };
  },
  provide: function provide() {
    return {
      select: this
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('select');
    },
    iconPrefix: function iconPrefix() {
      return this.config.getIconCls;
    },
    inputPrefix: function inputPrefix() {
      return this.config.getPrefixCls('input');
    },
    dropdownPrefix: function dropdownPrefix() {
      return this.config.getPrefixCls('dropdown');
    },
    sIcon: function sIcon() {
      return Object(_utils_vnode__WEBPACK_IMPORTED_MODULE_13__["hasProps"])(this, 'icon') ? this.icon : 'chevron-down';
    },
    canSelectAll: function canSelectAll() {
      return this.showSelectAll && this.multiple;
    },
    filteredOptions: function filteredOptions() {
      if (this.canSelectAll) {
        return this.options.filter(function (option) {
          return !option.isSelectAll;
        });
      }
      return this.options;
    },
    filteredSelected: function filteredSelected() {
      if (!this.canSelectAll) {
        return this.selected;
      }
      return this.selected.filter(function (item) {
        return item.value !== SELECT_ALL_VALUE;
      });
    },
    readonly: function readonly() {
      return !this.filterable;
    },
    tooltipWidth: function tooltipWidth() {
      return this.inputWidth;
    },
    _isEmpty: function _isEmpty() {
      if ('isEmpty' in this.$options.propsData) {
        return this.isEmpty;
      } else if (!this.isMounted) {
        return false;
      }
      return !this.filteredOptions.length;
    },
    isNoMatched: function isNoMatched() {
      return this.filterable && this.query && !this.remote && !this.allowCreate && this.filteredOptionsCount === 0;
    },
    emptyText: function emptyText() {
      if (this._isEmpty) {
        if (this.filterable && this.remote) {
          // tofix: https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/40370097
          return this.query ? this.noMatchText : '';
        }
        return this.noDataText;
      }
      if (this.isNoMatched) {
        return this.noMatchText;
      }
      return '';
    },
    currentPlaceholder: function currentPlaceholder() {
      if (this.multiple) {
        if (!this.isOnComposition && !this.query && (!this.value || !this.value.length)) {
          return this.placeholder;
        }
        return '';
      }
      return Object(_utils_type__WEBPACK_IMPORTED_MODULE_9__["isExist"])(this.value) ? this.formatterOption(this.getOption(this.value)) : this.placeholder;
    },
    opened: function opened() {
      if (this.filterable && this.remote) {
        return this.focused && !!(this.query || this.options && this.options.length);
      }
      return this.focused;
    },
    shouldClearQuery: function shouldClearQuery() {
      return this.autoClearQuery;
    },
    canClosed: function canClosed() {
      return 'closeable' in this.$options.propsData ? this.closeable : this.closable;
    },
    omittedValues: function omittedValues() {
      if (this.multiple && this.collapseTags) {
        // collapseTags 模式下只显示一个 tag
        var omittedLength = this.selected.length - 1;
        if (omittedLength > 0) {
          return this.selected.slice(1);
        }
      }
      return [];
    },
    showNewOption: function showNewOption() {
      var _this = this;

      if (!this.allowCreate || !this.filterable || !this.query) {
        return false;
      }
      var hasExistingOption = this.options.some(function (option) {
        return !option.created && option.currentLabel === _this.query;
      });
      return !hasExistingOption;
    },
    showClear: function showClear() {
      return this.clearable && !this.disabled && this.selected && this.selected.length && this.opened;
    }
  },
  watch: {
    focused: function focused(val) {
      if (val && !this.readonly) {
        this.$refs.tagInput && this.$refs.tagInput.focus();
      }
      if (!val) {
        this.resetHover();
        this.showValue = this.formatterOption(this.selected);
        this.query = '';
        this.$emit('blur');
      } else {
        if (this.options.length && this.defaultActiveFirstOption) {
          this.setHoverOption(this.options[0]);
        }
        if (this.filterable) {
          if (this.shouldClearQuery) {
            this.showValue = '';
          } else if (!this.multiple) {
            // tofix ones: https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3305664
            var _selected = this.selected,
                __DEFAULT_OPTION__ = _selected.__DEFAULT_OPTION__,
                _selected$currentLabe = _selected.currentLabel,
                currentLabel = _selected$currentLabe === undefined ? '' : _selected$currentLabe;
            var formatter = this.formatter;

            this.showValue = __DEFAULT_OPTION__ && formatter ? formatter(this.selected) : currentLabel;
          } else {
            this.showValue = '';
          }
          this.query = this.remote ? this.showValue : '';
          this.handleQueryChange(this.query);
        }
        this.getInputWidth();
        this.addScrollListenter();
      }
    },
    opened: function opened(val) {
      this.$emit('update:visible', val);
    },
    options: function options() {
      this.setSelected();
      if (this.opened && this.$refs.popper) {
        this.updatePopper();
        if (this.options.length && this.defaultActiveFirstOption) {
          var showNewOption = this.showNewOption;

          var first = this.options.find(function (item) {
            return showNewOption ? item.created : item.visible;
          });
          first && this.setHoverOption(first);
        }
      }
    },
    value: function value() {
      this.setSelected();
    },
    selected: function selected(val, old) {
      if (this.multiple) {
        if (!this.collapseTags) {
          this.updatePopper();
        } else {}
      } else if (!this.focused) {
        this.showValue = this.formatterOption(this.selected);
        this.previousQuery = this.showValue || null;
      }
    },
    inputWidth: function inputWidth() {
      this.minWidth = this.$refs.reference.$el.getBoundingClientRect().width + 'px';
    },
    tagsHeight: function tagsHeight(val, old) {
      if (val !== old) {
        this.newHeight = val;
      }
    }
  },
  created: function created() {
    this.$on('addOption', this.addOption);
    this.$on('removeOption', this.onOptionDestroy);
    this.$on('optionClick', this.handleOptionClick);

    this.debouncedQueryChange = this.debounce ? throttle_debounce_debounce__WEBPACK_IMPORTED_MODULE_7___default()(this.debounce, this.handleQueryChange) : this.handleQueryChange;
  },
  mounted: function mounted() {
    this.isMounted = true;
    if (this.defaultVisible) {
      this.$refs.reference && this.$refs.reference.focus();
    }
    this.getInputWidth();
    this.setSelected(); // 防止由于没有 options 从而导致默认值不显示问题
  },
  deactivated: function deactivated() {
    this.removeScrollListener();
  },
  beforeDestroy: function beforeDestroy() {
    this.isMounted = false;
    this.removeScrollListener();
  },

  methods: {
    addOption: function addOption(option) {
      this.options.push(option);
    },
    formatterOption: function formatterOption(option) {
      if (option.length) {
        return '';
      } else if (!Object(_utils_type__WEBPACK_IMPORTED_MODULE_9__["isExist"])(option.value) && option.__DEFAULT_OPTION__) {
        return '';
      }
      return this.formatter ? this.formatter({ value: option.value, label: option.currentLabel }) : option.currentLabel || '';
    },
    setSelectedAll: function setSelectedAll() {
      var _this2 = this;

      var options = this.filteredOptions.filter(function (o) {
        return !o._disabled;
      });
      if (this.canSelectAll && this.value && this.value.length && this.value.length >= options.length) {
        var realValues = this.value.map(function (val) {
          return getRealValue(val, _this2.realValue);
        });
        this.isSelectAll = options.every(function (option) {
          return realValues.indexOf(option.realValue) > -1;
        });
        return;
      }
      this.isSelectAll = false;
    },
    setSelected: function setSelected() {
      this.setSelectedAll();
      var value = this.isSelectAll ? [SELECT_ALL_VALUE].concat(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(this.value)) : this.value;
      var next = this.multiple ? (value || []).map(this.getOption) : this.getOption(value);

      this.selected = next;
    },
    handleFocus: function handleFocus(event) {
      if (!this.disabled && this.filterable && !this.focused) {
        this.focused = true;
      }
      this.$emit('focus', event);
    },
    handleClose: function handleClose() {
      this.focused = false;
    },
    handleKeydown: function handleKeydown(e) {
      if (!this.disabled && !this.focused) {
        if (Object(_utils_key_codes__WEBPACK_IMPORTED_MODULE_14__["notKeys"])(e, ['enter', 'tab', 'esc', 'delete'])) {
          this.focused = true;
        }
      }
    },
    handleInputChange: function handleInputChange(e) {
      if (this.focused && this.filterable && this.query !== this.showValue) {
        this.query = this.showValue;
        this.debouncedQueryChange(this.query);
      }
    },
    handleComposition: function handleComposition(e) {
      var type = e.type;

      if (type === 'compositionend') {
        this.isOnComposition = false;
        // 当混合输入前后值不变时，不会触发后续的 input 事件，所以需要再次触发 query
        this.debouncedQueryChange(e.target.value);
      } else {
        this.isOnComposition = true;
      }
    },
    handleQueryInput: function handleQueryInput(e) {
      if (e && e.target) {
        // to fix vue 2.5.22 下多选输入抖动 bug。
        // ones: https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3016033
        this.query = e.target.value;
      }
      var query = this.query;
      // todo: 需要修改成当前字体大小

      var length = query.length * 14 + 5;
      this.inputLength = this.collapseTags ? Math.min(this.collapseMaxSearchWidth, length) : length;
      this.multiple && !this.collapseTags && this.updatePopper();
      this.debouncedQueryChange(this.query);
    },
    getOption: function getOption(value) {
      // todo: 后续需要确认 value=null 时的处理逻辑
      var realValue = getRealValue(value, this.valueKey);
      var equal = function equal(option) {
        return realValue === option.realValue;
      };

      var opt = this.options.find(equal);
      if (!opt) {
        var cached = Array.isArray(this.selected) ? this.selected : [this.selected];

        opt = cached.find(equal);
      } else {
        opt = {
          value: opt.value,
          realValue: opt.realValue,
          label: opt.label,
          currentLabel: opt.currentLabel,
          disabled: opt.disabled
        };
      }
      return opt || {
        value: value,
        realValue: realValue,
        label: !Object(_utils_type__WEBPACK_IMPORTED_MODULE_9__["isExist"])(value) ? '' : value.toString(),
        currentLabel: !Object(_utils_type__WEBPACK_IMPORTED_MODULE_9__["isExist"])(value) ? '' : value.toString(),
        __DEFAULT_OPTION__: true
      };
    },
    handleOptionClick: function handleOptionClick(option) {
      var _this3 = this;

      if (this.disabled) {
        return;
      }

      var optionValue = option.value,
          optionRealValue = option.realValue;

      if (option.isSelectAll) {
        // 取反
        var allValues = this.options.filter(function (option) {
          return !option.isSelectAll && !option._disabled;
        }).map(function (option) {
          return option.value;
        });

        var nextValues = [];
        if (this.isSelectAll) {
          // 已经全选则清空
          nextValues = Object(_utils_array__WEBPACK_IMPORTED_MODULE_12__["subtraction"])(allValues, this.value, function (a, b) {
            return a === b || getRealValue(a) === getRealValue(b);
          });
        } else {
          // 全选
          var diffValues = Object(_utils_array__WEBPACK_IMPORTED_MODULE_12__["subtraction"])(this.value, allValues, function (a, b) {
            return a === b || getRealValue(a) === getRealValue(b);
          });
          nextValues = [].concat(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(this.value || []), babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(diffValues));
        }

        this.$emit('input', nextValues);
        this.$emit('change', nextValues);
      } else if (this.multiple) {
        var copyiedValue = this.value ? [].concat(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(this.value)) : [];
        var realValues = copyiedValue.map(function (val) {
          return getRealValue(val, _this3.valueKey);
        });

        var index = -1;
        realValues.some(function (v, i) {
          var r = v === optionRealValue;
          if (r) {
            index = i;
          }
          return r;
        });
        if (index > -1) {
          copyiedValue.splice(index, 1);
        } else if (!this.multipleLimit || copyiedValue.length < this.multipleLimit) {
          copyiedValue.push(optionValue);
        }
        if (!this.reserveKeyword) {
          this.query = '';
          this.handleQueryInput();
        }
        this.$emit('input', copyiedValue);
        this.$emit('change', copyiedValue);
      } else {
        var realValue = getRealValue(this.value, this.valueKey);
        if (realValue !== optionRealValue) {
          this.$emit('input', option.value);
          this.$emit('change', option.value);
        }
        this.focused = false;
      }
      var input = this.$refs.tagInput;
      if (input) {
        input.focus();
      }
    },
    selectOption: function selectOption() {
      if (!this.opened) {
        this.toggleMenu();
      } else if (!this.isOnComposition && this.hoverOption && this.hoverOption.visible) {
        this.handleOptionClick(this.hoverOption);
      }
    },
    handleInputClear: function handleInputClear() {
      this.$emit('clear');
      this.$emit('input', this.multiple ? [] : '');
      this.$emit('change', this.multiple ? [] : '');
    },
    deletePrevTag: function deletePrevTag(e) {
      if (this.disabled) {
        return;
      }
      if (!this.collapseTags && e.target.value.length <= 0) {
        var filteredSelected = this.filteredSelected;

        if (!filteredSelected || !filteredSelected.length) {
          return;
        }
        var last = filteredSelected[filteredSelected.length - 1];

        if (!last.hitState) {
          this.$set(last, 'hitState', true);
        } else if (!last.disabled && this.closableFn(last)) {
          this.handleClearClick(last);
        }
      }
    },
    handleClearClick: function handleClearClick(tag) {
      if (this.disabled) {
        return;
      }
      var index = this.filteredSelected.indexOf(tag);
      if (index > -1) {
        var value = [].concat(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(this.value));
        value.splice(index, 1);
        this.$emit('input', value);
        this.$emit('change', value);
        this.$emit('remove', tag.value);
      }
    },
    updatePopper: function updatePopper() {
      var _this4 = this;

      this.$nextTick(function () {
        if (_this4.focused) {
          _this4.$refs.popper.updatePopper();
        }
        _this4.tagsHeight = _this4.$refs.tags.offsetHeight;
      });
    },
    handleQueryChange: function handleQueryChange(val) {
      var _this5 = this;

      if (this.previousQuery === val || this.isOnComposition) {
        return;
      }
      this.previousQuery = val;
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.remoteMethod(val);
      } else if (typeof this.filterMethod === 'function') {
        var filteredOptions = this.options.filter(function (item) {
          if (item.isSelectAll) {
            item.visible = !val;
            return false;
          }
          if (item.created) {
            return false;
          }
          item.visible = val !== '' ? _this5.filterMethod(val, item.currentLabel) : true;
          return item.visible;
        });
        this.filteredOptionsCount = filteredOptions.length;
        if (this.defaultActiveFirstOption) {
          // 如果是可创建的，则自动 hover 创建的，否则找到第一个可显示的
          if (this.showNewOption) {
            var first = this.options.find(function (item) {
              return item.created;
            });
            first && this.setHoverOption(first);
          } else if (this.filteredOptionsCount) {
            this.setHoverOption(filteredOptions[0]);
          }
        }
        this.updatePopper();
      }
      this.$emit('filter', val);
    },
    toggleMenu: function toggleMenu() {
      if (!this.disabled) {
        if (!this.filterable || !this.focused) {
          this.focused = !this.focused;
        }
        if (this.focused) {
          this.$refs.tagInput && this.$refs.tagInput.focus();
        }
      }
    },
    getInputWidth: function getInputWidth() {
      var _$refs = this.$refs,
          selectedItemFirst = _$refs.selectedItemFirst,
          selectedItemTag = _$refs.selectedItemTag,
          reference = _$refs.reference;

      var inputWidth = reference.$el.getBoundingClientRect().width;
      this.inputWidth = inputWidth;
      if (selectedItemFirst && selectedItemFirst.$el) {
        inputWidth += selectedItemFirst.$el.getBoundingClientRect().width;
      }
      if (selectedItemTag) {
        inputWidth += selectedItemTag.getBoundingClientRect().width;
      }
      var width = inputWidth - 42; // right icon size
      this.tagInputWidth = width > 0 ? width : 0;
    },
    onOptionDestroy: function onOptionDestroy(option) {
      var index = this.options.indexOf(option);
      if (this.hoverOption === option) {
        this.resetHover();
      }
      if (index > -1) {
        this.options.splice(index, 1);
      }
    },
    scrollToOption: function scrollToOption(option) {
      var target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      if (this.$refs.popper && target) {
        var menu = this.$refs.menu;
        _utils_scroll_into_view__WEBPACK_IMPORTED_MODULE_5___default()(menu, target);
      }
      // this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },
    closableFn: function closableFn(item) {
      return Object(_utils_type__WEBPACK_IMPORTED_MODULE_9__["isFunction"])(this.canClosed) ? this.canClosed(item) : this.canClosed;
    },
    addScrollListenter: function addScrollListenter() {
      var _$listeners = this.$listeners,
          scrollBottom = _$listeners['scroll-bottom'],
          scroll = _$listeners.scroll;
      var dropdownPrefix = this.dropdownPrefix;

      if ((scrollBottom || scroll) && this.$refs.drop) {
        var scrollElement = this.$refs.drop.$el.querySelector('.' + dropdownPrefix + '-menu');
        if (scrollElement) {
          Object(_utils_dom__WEBPACK_IMPORTED_MODULE_11__["on"])(scrollElement, 'scroll', this.handleScroll);
          this.scrollListener = true;
        }
      }
    },
    removeScrollListener: function removeScrollListener() {
      if (this.scrollListener) {
        var dropdownPrefix = this.dropdownPrefix;

        var scrollElement = this.$refs.drop.$el.querySelector('.' + dropdownPrefix + '-menu');
        Object(_utils_dom__WEBPACK_IMPORTED_MODULE_11__["off"])(scrollElement, 'scroll', this.handleScroll);
      }
      this.scrollListener = false;
    },
    handleScroll: function handleScroll(event) {
      this.$emit('scroll', event);
      var _event$target = event.target,
          scrollHeight = _event$target.scrollHeight,
          scrollTop = _event$target.scrollTop,
          clientHeight = _event$target.clientHeight;

      if (scrollTop + clientHeight + 20 >= scrollHeight) {
        this.$emit('scroll-bottom', event);
      }
    },
    focus: function focus() {
      var _$refs2 = this.$refs,
          reference = _$refs2.reference,
          tagInput = _$refs2.tagInput;

      this.focused = true;
      if (this.multiple) {
        tagInput.focus();
        return;
      }
      reference.focus();
    },
    blur: function blur() {
      var _$refs3 = this.$refs,
          reference = _$refs3.reference,
          tagInput = _$refs3.tagInput;

      this.focused = false;
      if (this.multiple) {
        tagInput.blur();
        return;
      }
      reference.blur();
    }
  }
});

/***/ }),
/* 392 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/clickoutside");

/***/ }),
/* 393 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      hoverOption: undefined
    };
  },
  created: function created() {
    this.$on('hoverItem', this.setHoverOption);
  },

  computed: {
    navOptions: function navOptions() {
      return this.options.filter(function (o) {
        return o.visible && !o._disabled;
      });
    }
  },
  methods: {
    setHoverOption: function setHoverOption(option) {
      if (this.hoverOption) {
        this.hoverOption.hover = false;
      }
      if (option && option.disabled) {
        return;
      }
      this.hoverOption = option;
      if (option) {
        option.hover = true;
      }
    },
    resetHover: function resetHover() {
      if (this.hoverOption) {
        this.hoverOption.hover = false;
      }
      this.hoverOption = undefined;
    },
    navigateOptions: function navigateOptions(direction) {
      var _this = this;

      if (!this.focused) {
        this.focused = true;
        return;
      }
      if (this.navOptions.length === 0) return;
      var hoverIndex = this.hoverOption ? this.navOptions.indexOf(this.hoverOption) : -1;
      if (direction === 'next') {
        hoverIndex++;
      } else if (direction === 'prev') {
        hoverIndex--;
      }
      if (hoverIndex >= this.navOptions.length) {
        hoverIndex = 0;
      } else if (hoverIndex < 0) {
        hoverIndex = this.navOptions.length - 1;
      }
      var option = this.navOptions[hoverIndex];
      if (option) {
        this.setHoverOption(option);
        this.$nextTick(function () {
          return _this.scrollToOption(option);
        });
      } else {
        this.setHoverOption();
      }
    }
  }
});

/***/ }),
/* 394 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/scroll-into-view");

/***/ }),
/* 395 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/tag");

/***/ }),
/* 396 */
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
/* 397 */
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
/* 398 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/option");

/***/ }),
/* 399 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/dom");

/***/ }),
/* 400 */
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/array");

/***/ }),
/* 401 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _select_tag_vue_vue_type_template_id_37f8b397___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(402);
/* harmony import */ var _select_tag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(404);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _select_tag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _select_tag_vue_vue_type_template_id_37f8b397___WEBPACK_IMPORTED_MODULE_0__["render"],
  _select_tag_vue_vue_type_template_id_37f8b397___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 402 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_select_tag_vue_vue_type_template_id_37f8b397___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(403);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_select_tag_vue_vue_type_template_id_37f8b397___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_select_tag_vue_vue_type_template_id_37f8b397___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),
/* 403 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:(_vm.prefix + "-choice")},[_vm._t("tag",function(){return [_c('wt-tag',{class:{ focus: _vm.option.hitState },attrs:{"size":_vm.size,"clearable":_vm.clearable,"disabled":_vm.disabled,"round":""},on:{"close":_vm.handleClose}},[_vm._t("default")],2)]},{"option":_vm.option,"size":_vm.size,"clearable":_vm.clearable,"disabled":_vm.disabled,"onClose":_vm.handleClose})],2)}
var staticRenderFns = []



/***/ }),
/* 404 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_select_tag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(405);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_select_tag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),
/* 405 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(395);
/* harmony import */ var _components_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_tag__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtSelectChoice',
  components: {
    WtTag: _components_tag__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  props: {
    size: String,
    option: {
      type: Object,
      required: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: Boolean
  },
  inject: {
    config: {
      from: _utils_config__WEBPACK_IMPORTED_MODULE_0__["CONFIG_PROVIDER"],
      default: {
        getPrefixCls: _utils_config__WEBPACK_IMPORTED_MODULE_0__["getPrefixCls"]
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('select');
    }
  },
  methods: {
    handleClose: function handleClose() {
      this.$emit('close', this.option);
    }
  }
});

/***/ })
/******/ ]);