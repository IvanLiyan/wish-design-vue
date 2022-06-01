import _defineProperty from 'babel-runtime/helpers/defineProperty';

import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

export default {
  name: 'WtTabPane',

  props: {
    label: String,
    value: {
      type: [String, Number, Object, Array],
      required: true
    },
    icon: String,
    number: Number,
    closable: Boolean,
    disabled: Boolean,
    labelClass: String,
    lazy: Boolean
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  data: function data() {
    return {
      index: 0,
      active: false,
      hasContent: false,
      $tab: undefined // will set value in tab-one component.
    };
  },


  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('tab-pane');
    },
    isClosable: function isClosable() {
      return this.closable || this.$parent.closable;
    },
    paneName: function paneName() {
      return this.value || this.index;
    },
    dropActive: function dropActive() {
      return this.value === this.$parent.currentValue;
    }
  },

  watch: {
    label: function label() {
      this.$parent.$forceUpdate();
    }
  },

  mounted: function mounted() {
    this.$parent.addTabs && this.$parent.addTabs(this, this.$parent);
  },
  updated: function updated() {
    this.$parent.$emit('tab-nav-update');
  },
  destroyed: function destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  render: function render(h) {
    var active = this.active,
        dropActive = this.dropActive,
        lazy = this.lazy;

    this.hasContent = this.$slots.default && this.$slots.default.length;
    return h(
      'div',
      {
        'class': _defineProperty({}, this.prefix, true),
        directives: [{
          name: 'show',
          value: active || dropActive
        }],

        ref: 'pane'
      },
      [(active || !lazy) && this.$slots.default]
    );
  }
};