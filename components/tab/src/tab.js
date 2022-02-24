export default {
  name: 'Tab',
  props: {
    tab: { type: Object },
  },
  render (h) {
    return h('div', {
      on: this.$listeners,
    }, this.$slots.default);
  },
};
