<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtTabPane',

  props: {
    label: String,
    value: {
      type: [String, Number, Object, Array],
      required: true,
    },
    icon: String,
    number: Number,
    closable: Boolean,
    disabled: Boolean,
    labelClass: String,
    lazy: Boolean,
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  data() {
    return {
      index: 0,
      active: false,
      hasContent: false,
      $tab: undefined, // will set value in tab-one component.
    };
  },

  computed: {
    prefix() {
      return this.config.getPrefixCls('tab-pane');
    },
    isClosable() {
      return this.closable || this.$parent.closable;
    },

    paneName() {
      return this.value || this.index;
    },

    dropActive() {
      return this.value === this.$parent.currentValue;
    },
  },

  watch: {
    label() {
      this.$parent.$forceUpdate();
    },
  },

  mounted() {
    this.$parent.addTabs && this.$parent.addTabs(this, this.$parent);
  },

  updated() {
    this.$parent.$emit('tab-nav-update');
  },

  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },

  render(h) {
    const { active, dropActive, lazy } = this;
    this.hasContent = this.$slots.default && this.$slots.default.length;
    return (
      <div
        class={{
          [this.prefix]: true,
        }}
        v-show={active || dropActive}
        ref='pane'
      >
        {(active || !lazy) && this.$slots.default}
      </div>
    );
  },
};
</script>
