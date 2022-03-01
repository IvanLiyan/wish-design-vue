<template>
  <label :class="wrapperCls" @click.prevent="handleChange">
    <input type="checkbox" style="display: none" :name="name" />
    <span :class="`${prefix}-inner`"
      ><Icon
        v-if="checked"
        name="check"
        :width="10"
        :height="10"
        color="#fff"
        :stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
    /></span>
    <span :class="`${prefix}-text`"><slot></slot></span>
    <span :class="`${prefix}-hint`" v-if="$slots.hint"><slot name="hint"></slot></span>
  </label>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
import Icon from '@components/icon';

export default {
  name: 'WtCheckbox',
  components: {
    Icon,
  },
  inheritAttrs: false,
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  props: {
    // value
    value: [String, Number, Boolean, Function, Object, Array, Symbol],
    // 是否选中
    checked: {
      type: Boolean,
      default: false,
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 禁用
    name: String,
    // 注释内容
    hint: String,
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('checkbox');
    },
    wrapperCls() {
      const { prefix } = this;
      return [
        prefix,
        {
          [`${prefix}-checked`]: this.checked,
          [`${prefix}-disabled`]: this.disabled,
        },
      ];
    },
  },
  methods: {
    /**
     * 改变值
     */
    handleChange($event) {
      if (!this.disabled) {
        this.$emit('input', !this.checked);
        this.$emit('change', !this.checked);
      }
    },
  },
};
</script>
