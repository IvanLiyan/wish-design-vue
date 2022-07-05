<template>
  <popper
    v-bind="$attrs"
    :tag="tag"
    :popper-disabled="disabled"
    :class="`${prefix}-rel`"
    :trigger="trigger"
    :show-arrow="showArrow"
    :visible="!disabled && visible"
    @update:visible="handleVisibleChange"
    ref="popper"
    :open-delay="openDelay"
    @clickoutside="clickoutside"
  >
    <reference><slot></slot></reference>
    <drop
      :class="[
        prefix,
        {
          [`${prefix}-${size}`]: size,
          [`${prefix}-${theme}`]: theme,
        },
        popperClass,
      ]"
    >
      <span v-if="content">{{ content }}</span>
    </drop>
  </popper>
</template>
<script>
import { Popper, Drop, Reference } from '@components/popper';
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtTooltip',
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
    content: [String, Number],
    visible: Boolean,
    size: String,
    showArrow: {
      type: Boolean,
      default: false,
    },
    trigger: {
      type: String,
      default: 'hover',
    },
    popperClass: [String, Object, Array],
    disabled: Boolean,
    theme: {
      type: String,
    },
    openDelay: {
      type: Number,
      default: 300,
    },
    tag: {
      type: [String, Object],
      default: 'span',
    },
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
    prefix() {
      return this.config.getPrefixCls('tooltip');
    },
  },
  methods: {
    clickoutside(e) {
      this.$emit('clickoutside', e);
    },
    handleVisibleChange(v) {
      this.$emit('input', v);
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
