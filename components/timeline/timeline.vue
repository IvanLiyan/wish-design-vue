<script>
import {
  filterEmptyNode,
  applyProps,
  getProps,
} from '@/utils/vnode';
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'MtdTimeline',
  props: {
    mode: {
      type: String,
      validator (value) {
        return ['right', 'left', '', 'alternate', undefined].indexOf(value) > -1;
      },
    },
    showTitle: Boolean,
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('timeline');
    },
  },
  render () {
    const { mode, showTitle, prefix } = this;
    const items = !this.$slots.default
      ? this.$slots.default
      : filterEmptyNode(this.$slots.default).map((vnode, i) => {
        const props = getProps(vnode);
        const align = props.align || (mode === 'alternate'
          ? (i % 2 === 0 ? undefined : 'right')
          : mode
        );
        return applyProps(vnode, { align, showTitle, mode });
      });
    return <ul class={`${prefix} ${mode ? `${prefix}-${mode}` : ''}`}>
      { items }
    </ul>;
  },
};
</script>
