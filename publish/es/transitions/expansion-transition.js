import { addClass, removeClass } from '../utils/dom';

function createTransition(listeners) {
  return {
    'before-enter': function beforeEnter(el) {
      addClass(el, 'expansion-transition');
      el.style.height = '0';
      var fn = listeners['before-enter'];
      fn && fn();
    },
    enter: function enter(el) {
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
      } else {
        el.style.height = '';
      }
      addClass(el, 'expansion-overflow');
      var fn = listeners['enter'];
      fn && fn();
    },
    'after-enter': function afterEnter(el) {
      // for safari: remove class then reset height is necessary
      removeClass(el, 'expansion-transition expansion-overflow');
      el.style.height = '';
      var fn = listeners['after-enter'];
      fn && fn();
    },
    beforeLeave: function beforeLeave(el) {
      if (!el.dataset) el.dataset = {};
      el.style.height = el.scrollHeight + 'px';
      addClass(el, 'expansion-overflow');
      var fn = listeners['before-leave'];
      fn && fn();
    },
    leave: function leave(el) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height,
        // or it will jump to zero height suddenly, weired
        addClass(el, 'expansion-transition');
        el.style.height = 0;
      }
      var fn = listeners['leave'];
      fn && fn();
    },
    'after-leave': function afterLeave(el) {
      removeClass(el, 'expansion-transition expansion-overflow');
      el.style.height = '';
      var fn = listeners['after-leave'];
      fn && fn();
    }
  };
}

export default {
  name: 'WtExpansionTransition',
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