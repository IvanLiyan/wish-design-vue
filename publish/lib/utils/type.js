'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = undefined;

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isUndef = isUndef;
exports.isDef = isDef;
exports.isString = isString;
exports.isExist = isExist;
exports.isPromise = isPromise;
exports.isDate = isDate;
exports.isNaN = isNaN;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNumber(v) {
  return typeof v === 'number';
}

function isObject(v) {
  return Object(v) === v;
}

function isFunction(v) {
  return typeof v === 'function';
}

function isUndef(v) {
  return typeof v === 'undefined';
}

function isDef(v) {
  return !isUndef(v);
}

function isString(v) {
  return typeof v === 'string';
}

function isExist(v) {
  return isDef(v) && v !== null && v !== '';
}

function isPromise(v) {
  return isObject(v) && isFunction(v.then) && isFunction(v.catch);
}

function isDate(v) {
  return v instanceof Date;
}

function isNaN(v) {
  return (0, _isNan2.default)(v);
}
// check native isArray first
var isArray = exports.isArray = Array.isArray || function (value) {
  return toString.call(value) === '[object Array]';
};