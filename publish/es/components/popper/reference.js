
import { key } from './provide';
import { getFirstComponentChild } from '@wish/wt-vue/es/utils/vnode';

export default {
  name: 'WtPopperReference',
  inheritAttrs: false,
  props: {
    tag: {
      type: [String, Object],
      default: 'div'
    }
  },
  inject: {
    popper: {
      from: key
    }
  },
  mounted: function mounted() {
    this.popper.registerReference(this);
  },
  render: function render() {
    return getFirstComponentChild(this.$slots.default);
  }
};