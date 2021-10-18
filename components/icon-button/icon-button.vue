<template>
  <button
    :class="[
      prefix,
      type ? `${prefix}-${type}` : '',
      size ? `${prefix}-${size}` : '',
      {
        [`${prefix}-disabled`]: disabled,
        [`${btnPrefix}-clicked`]: clicked, // 使用 btn 的动画
      },
    ]"
    :type="htmlType"
    :disabled="disabled"
    v-on="listen"
  >
    <slot><i :class="icon" /></slot>
  </button>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WdIconButton',
  props: {
    icon: String,
    disabled: Boolean,
    htmlType: {
      type: String,
      default: 'button',
    },
    size: String,
    type: String,
  },
  data () {
    return {
      clicked: false,
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
  computed: {
    prefix () {
      return this.config.getPrefixCls('icon-btn');
    },
    btnPrefix () {
      return this.config.getPrefixCls('btn');
    },
    listen () {
      return {
        ...this.$listeners,
        click: this.handleClick,
      };
    },
  },
  beforeDestroy () {
    clearTimeout(this.timeout);
  },
  methods: {
    handleClick (e) {
      clearTimeout(this.timeout);
      this.clicked = true;
      this.$emit('click', e);
      this.timeout = setTimeout(() => {
        this.clicked = false;
      }, 500);
    },
  },
};
</script>
