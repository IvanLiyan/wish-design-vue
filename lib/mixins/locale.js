'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../locale/index');

exports.default = {
  methods: {
    t: function t() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _index.t.apply(this, args);
    }
  }
};