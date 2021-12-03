<template>
  <Popper
    v-bind="$attrs"
    :class="{
      [prefix]: true,
      [`${prefix}-expended`]: visible,
    }"
    :visible="visible"
    :trigger="trigger"
    :placement="placement"
    :show-arrow="showArrow"
    :popper-disabled="disabled"
    @update:visible="updateVisible"
    @clickoutside="clickoutside"
    ref="popper"
  >
    <Reference ref="reference">
      <slot></slot>
    </Reference>
    <Drop :style="{ 'min-width': width }" :use-show="useShow" :class="[popperClass, `${prefix}-popper`]">
      <slot name="dropdown"></slot>
    </Drop>
  </Popper>
</template>
<script>
import { Popper, Drop, Reference } from '@components/popper';
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtDropdown',
  components: {
    Popper,
    Drop,
    Reference,
  },
  inheritAttrs: false,
  model: {
    prop: 'visible',
  },
  props: {
    visible: Boolean,
    trigger: {
      type: String,
      default: 'click',
    },
    placement: String,
    popperClass: [String, Object, Array],
    showArrow: Boolean,
    disabled: Boolean,
    visibleOnMenuItemClick: {
      type: Boolean,
      default: false,
    },

    shouldComputedWidth: {
      type: Boolean,
      default: true,
    },
    useShow: Boolean, // 暂时不确定属性名，谨慎使用
  },
  provide() {
    return {
      dropdown: this,
    };
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
      width: 'auto',
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('dropdown');
    },
  },
  watch: {
    visible(v) {
      if (v && this.shouldComputedWidth) {
        const { width } = this.$refs.reference.$el.getBoundingClientRect();
        this.width = width + 'px';
      }
    },
  },
  mounted() {
    this.$on('itemClick', this.handleMenuItemClick);
  },
  methods: {
    clickoutside(e) {
      this.$emit('clickoutside', e);
    },
    updateVisible(v) {
      this.$emit('input', v);
      this.$emit('change', v);
    },
    handleMenuItemClick() {
      if (!this.visibleOnMenuItemClick) {
        this.$emit('input', false);
        this.$emit('change', false);
      }
    },
    updatePopper() {
      const { popper } = this.$refs;
      if (this.visible && popper) {
        popper.updatePopper();
      }
    },
  },
};
</script>
