
import { filterEmptyNode, applyProps, getProps } from '@wish/wt-vue/es/utils/vnode';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

export default {
  name: 'WtTimeline',
  props: {
    mode: {
      type: String,
      validator: function validator(value) {
        return ['right', 'left', '', 'alternate', undefined].indexOf(value) > -1;
      }
    },
    showTitle: Boolean
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('timeline');
    }
  },
  render: function render() {
    var h = arguments[0];
    var mode = this.mode,
        showTitle = this.showTitle,
        prefix = this.prefix;

    var items = !this.$slots.default ? this.$slots.default : filterEmptyNode(this.$slots.default).map(function (vnode, i) {
      var props = getProps(vnode);
      var align = props.align || (mode === 'alternate' ? i % 2 === 0 ? undefined : 'right' : mode);
      return applyProps(vnode, { align: align, showTitle: showTitle, mode: mode });
    });
    return h(
      'ul',
      { 'class': prefix + ' ' + (mode ? prefix + '-' + mode : '') },
      [items]
    );
  }
};