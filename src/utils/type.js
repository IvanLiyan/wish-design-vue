export function isNumber (v) {
    return typeof v === 'number';
  }
  
  export function isObject (v) {
    return Object(v) === v;
  }
  
  export function isFunction (v) {
    return typeof v === 'function';
  }
  
  export function isUndef (v) {
    return typeof v === 'undefined';
  }
  
  export function isDef (v) {
    return !isUndef(v);
  }
  
  export function isString (v) {
    return typeof v === 'string';
  }
  
  export function isExist (v) {
    return isDef(v) && v !== null && v !== '';
  }
  
  export function isPromise (v) {
    return isObject(v) && isFunction(v.then) && isFunction(v.catch);
  }
  
  export function isDate (v) {
    return v instanceof Date;
  }
  
  export function isNaN (v) {
    return Number.isNaN(v);
  }
  // check native isArray first
  export const isArray = Array.isArray || function (value) {
    return toString.call(value) === '[object Array]';
  };
  