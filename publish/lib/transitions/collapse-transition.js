'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('../utils/dom');

function createTransition(listeners) {
  return {
    'before-enter': function beforeEnter(el) {
      (0, _dom.addClass)(el, 'collapse-transition');
      el.style.height = '0';
      var fn = listeners['before-enter'];
      fn && fn();
    },
    'enter': function enter(el) {
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
      } else {
        el.style.height = '';
      }
      (0, _dom.addClass)(el, 'collapse-overflow');
      var fn = listeners['enter'];
      fn && fn();
    },
    'after-enter': function afterEnter(el) {
      // for safari: remove class then reset height is necessary
      (0, _dom.removeClass)(el, 'collapse-transition collapse-overflow');
      el.style.height = '';
      var fn = listeners['after-enter'];
      fn && fn();
    },
    beforeLeave: function beforeLeave(el) {
      if (!el.dataset) el.dataset = {};
      el.style.height = el.scrollHeight + 'px';
      (0, _dom.addClass)(el, 'collapse-overflow');
      var fn = listeners['before-leave'];
      fn && fn();
    },
    leave: function leave(el) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height,
        // or it will jump to zero height suddenly, weired
        (0, _dom.addClass)(el, 'collapse-transition');
        el.style.height = 0;
      }
      var fn = listeners['leave'];
      fn && fn();
    },
    'after-leave': function afterLeave(el) {
      (0, _dom.removeClass)(el, 'collapse-transition collapse-overflow');
      el.style.height = '';
      var fn = listeners['after-leave'];
      fn && fn();
    }
  };
};

exports.default = {
  name: 'WdCollapseTransition',
  functional: true,
  render: function render(h, context) {
    var children = context.children,
        listeners = context.listeners;

    var data = {
      on: createTransition(listeners)
    };

    return h('transition', data, children);
  }
};