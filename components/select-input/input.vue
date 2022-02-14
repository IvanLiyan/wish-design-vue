<template>
  <div
    :class="[
      `${prefix}-wrapper`,
      `${selectPrefix}-input`,
      {
        [`${prefix}-prefix`]: hasPrefix,
        [`${prefix}-suffix`]: hasSuffix,
        [`${prefix}-disabled`]: disabled,
        [`${prefix}-invalid`]: invalid,
        [`${prefix}-readonly`]: readonly,
        [`${prefix}-${size}`]: !!size,
        [`${prefix}-${genre}`]: !!genre,
      },
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <span :class="`${prefix}-prefix-inner`" v-if="hasPrefix">
      <slot name="prefix">
        <Icon :name="prefixIcon" @click="handlePrefixClick" />
      </slot>
    </span>
    <input
      v-bind="$attrs"
      :type="type"
      :value="value"
      :readonly="readonly"
      :disabled="disabled"
      :class="prefix"
      v-on="inputLisenters"
      autocomplete="off"
      ref="input"
    />
    <span :class="`${prefix}-suffix-inner`" v-if="hasSuffix">
      <i :class="`${prefix}-clear ${iconPrefix('error-circle')}`" @click.stop="handleClearClick" v-if="showClear"></i>
      <slot name="suffix">
        <Icon v-if="!loading" :name="suffixIcon" @click="handlePrefixClick" />
        <wt-loading v-else message="" size="small" />
      </slot>
    </span>
  </div>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';
import Icon from '@components/icon';
export default {
  name: 'WtSelectInput',
  components: {
    Icon,
  },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'text',
    },
    size: String,
    clearable: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    invalid: Boolean,
    value: [String, Number, Array],
    prefixIcon: String,
    suffixIcon: String,
    multiple: Boolean,
    inputWidth: Number,
    genre: String,
    loading: {
      type: Boolean,
      default() {
        return false;
      },
    },
    filterable: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
        getIconCls,
      },
    },
  },
  data() {
    return {
      focused: false,
      hovering: false,
      query: '',
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('input');
    },
    iconPrefix() {
      return this.config.getIconCls;
    },
    selectPrefix() {
      return this.config.getPrefixCls('select');
    },
    hasPrefix() {
      return !!(this.prefixIcon || this.$slots.prefix);
    },
    hasSuffix() {
      return this.clearable || !!(this.suffixIcon || this.$slots.suffix);
    },
    hasValue() {
      return this.value === 0 || !!this.value;
    },
    inputLisenters() {
      return {
        ...this.$listeners,
        input: this.handleInput,
      };
    },
    showClear() {
      return this.clearable && !this.disabled && this.hasValue && (this.focused || this.hovering);
    },
  },
  watch: {
    value(val) {
      this.query = val;
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },
    handleClearClick() {
      this.$emit('clear');
      this.$emit('input', '');
    },
    handlePrefixClick(e) {
      this.$emit('click-prefix', e);
    },
    handleSuffixIconClick(e) {
      this.focus();
      this.$emit('click-suffix', e);
    },
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    },
  },
};
</script>
