import { addClass, removeClass } from '../utils/dom';

function createTransition (listeners) {
  return {
    'before-enter' (el) {
      addClass(el, 'collapse-transition');
      el.style.height = '0';
      const fn = listeners['before-enter'];
      fn && fn();
    },

    'enter' (el) {
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
      } else {
        el.style.height = '';
      }
      addClass(el, 'collapse-overflow');
      const fn = listeners['enter'];
      fn && fn();
    },

    'after-enter' (el) {
      // for safari: remove class then reset height is necessary
      removeClass(el, 'collapse-transition collapse-overflow');
      el.style.height = '';
      const fn = listeners['after-enter'];
      fn && fn();
    },

    beforeLeave (el) {
      if (!el.dataset) el.dataset = {};
      el.style.height = el.scrollHeight + 'px';
      addClass(el, 'collapse-overflow');
      const fn = listeners['before-leave'];
      fn && fn();
    },

    leave (el) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height,
        // or it will jump to zero height suddenly, weired
        addClass(el, 'collapse-transition');
        el.style.height = 0;
      }
      const fn = listeners['leave'];
      fn && fn();
    },

    'after-leave' (el) {
      removeClass(el, 'collapse-transition collapse-overflow');
      el.style.height = '';
      const fn = listeners['after-leave'];
      fn && fn();
    },
  };
};

export default {
  name: 'MtdCollapseTransition',
  functional: true,
  render (h, context) {
    const { children, listeners } = context;
    const data = {
      on: createTransition(listeners),
    };

    return h('transition', data, children);
  },
};
