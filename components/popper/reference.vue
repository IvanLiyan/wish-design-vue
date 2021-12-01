<script>
import { key } from './provide';
import { getFirstComponentChild } from '@/utils/vnode';

export default {
  name: 'WtPopperReference',
  inheritAttrs: false,
  props: {
    tag: {
      type: [String, Object],
      default: 'div',
    },
  },
  inject: {
    popper: {
      from: key,
    },
  },
  mounted() {
    this.popper.registerReference(this);
  },
  render() {
    return getFirstComponentChild(this.$slots.default);
  },
};
</script>
