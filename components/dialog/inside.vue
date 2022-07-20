<template>
  <div :class="prefix">
    <span :class="`${prefix}-close`" v-if="closable" @click="handleClose">
      <Icon name="x" />
    </span>
    <div :class="`${prefix}-header`" v-if="title || $slots.title">
      <slot name="title">
        <div :class="`${prefix}-title`">{{ title }}</div>
      </slot>
    </div>
    <div :class="`${prefix}-content-wrapper`">
      <div :class="`${prefix}-content`"><slot></slot></div>
    </div>
    <div :class="`${prefix}-footer`" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
import Icon from '@components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'Dialog',
  components: {
    Icon,
  },
  inheritAttrs: false,
  props: {
    title: String,
    closable: Boolean,
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
      return this.config.getPrefixCls('dialog');
    },
  },
  methods: {
    /**
     * 关闭对话框
     */
    handleClose() {
      this.$emit('close');
    },
  },
};
</script>
