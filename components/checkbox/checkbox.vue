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
    value: [String, Number, Boolean, Function, Object, Array, Symbol],
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: String,
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
    handleChange($event) {
      if (!this.disabled) {
        this.$emit('change', !this.checked);
        this.$emit('input', !this.checked);
      }
    },
  },
};
</script>
