<template>
<popper v-bind="$attrs" :tag="tag"
  :popper-disabled="disabled" :placement="placement"
  :class="`${prefix}-rel`" :trigger="trigger"
  :visible="!disabled && visible" @update:visible="handleVisibleChange"
  :show-arrow="showArrow" ref="popper"
  @clickoutside="clickoutside"
>
  <reference><slot></slot></reference>
  <drop :transition="transition"
    :class="[prefix, { [`${prefix}-${size}`]: size }, popperClass]"
    :style="{
      width: w,
    }"
  >
    <div :class="`${prefix}-title`" v-if="$slots.title || title">
      <slot name="title">{{ title }}</slot>
    </div>
    <slot name="content">{{ content }}</slot>
  </drop>
</popper>
</template>
<script>
import {
  Popper,
  Drop,
  Reference,
} from '@components/popper';
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'Popover',
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
    title: String,
    content: String,
    visible: Boolean,
    size: String,
    showArrow: {
      type: Boolean,
      default: true,
    },
    trigger: {
      type: String,
      default: 'click',
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    transition: String,
    popperClass: [String, Object, Array],
    disabled: Boolean,
    tag: {
      type: [String, Object],
      default: 'span',
    },
    width: [String, Number],
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
      return this.config.getPrefixCls('popover');
    },
    w () {
      return /^\d+$/.test(this.width) ? `${this.width}px` : this.width;
    },
  },
  methods: {
    clickoutside (e) {
      this.$emit('clickoutside', e);
    },
    handleVisibleChange (v) {
      this.$emit('input', v);
    },
    updatePopper () {
      const { popper } = this.$refs;
      if (this.visible && popper) {
        popper.updatePopper();
      }
    },
  },
};
</script>
