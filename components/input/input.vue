<template>
  <div>
    <fieldset
      :class="{
        [`${inputPrefix}-wrapper`]: true,
        [`${inputPrefix}-${type}`]: type,
        [`${inputPrefix}-with-label`]: label,
        [`${inputPrefix}-disabled`]: disabled,
        [`${inputPrefix}-invalid`]: isInvalid && !focused,
        [`${inputPrefix}-focused`]: focused,
      }"
      :style="fullWidth ? { width: '100%' } : {}"
    >
      <legend v-if="label">{{ label }}</legend>
      <div :class="`${inputPrefix}-con`">
        <slot name="prefix"></slot>
        <textarea
          v-if="type === 'textarea'"
          v-bind="$attrs"
          :value="inputValue"
          :disabled="disabled"
          :class="inputPrefix"
          ref="input"
          v-on="inputLisenters"
          :style="textareaCalcStyle"
        ></textarea>
        <input
          v-else
          v-bind="$attrs"
          :value="inputValue"
          :disabled="disabled"
          :class="inputPrefix"
          ref="input"
          v-on="inputLisenters"
        />
        <slot name="suffix"></slot>
      </div>
    </fieldset>
    <div :class="`${inputPrefix}-tip`">
      <span v-if="isInvalid && !focused">{{ validation || '请填写正确的内容' }}</span>
      <em v-if="type === 'textarea'"> {{ inputValue.length }}/ {{ maxLength }}</em>
    </div>
  </div>
</template>
<script>
import Icon from '@components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
import { isKey } from '@/utils/key-codes';
import calcNodeHeight from './calcNodeHeight';

export default {
  name: 'WtInput',
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
    type: {
      type: String,
      validator: (val) => ['line', 'textarea'].includes(val),
    },
    disabled: Boolean,
    invalid: Boolean,
    fullWidth: Boolean,
    label: String,
    value: [String, Number],
    validation: String,
    autosize: {
      type: [Boolean, Object],
      default: false,
    },
    maxLength: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      focused: false,
      hovering: false,
      isComposing: false,
      textareaCalcStyle: {},
    };
  },

  computed: {
    inputPrefix() {
      return this.config.getPrefixCls('input');
    },
    inputValue() {
      return this.hasValue ? this.value : '';
    },
    hasValue() {
      return this.value === 0 || !!this.value;
    },
    isInvalid() {
      return (this.type === 'textarea' && this.value && this.value.length > this.maxLength) || this.invalid;
    },
    inputLisenters() {
      const lisenters = Object.assign({}, this.$listeners, {
        input: this.handleInput,
        focus: this.focus,
        blur: this.blur,
        keyup: this.handleKeyup,
        compositionstart: this.handleComposition,
        compositionupdate: this.handleComposition,
        compositionend: this.handleComposition,
      });
      if (lisenters.change) {
        // it will trigger change event twice if not remove
        delete lisenters.change;
      }
      return lisenters;
    },
  },
  watch: {
    value(val) {
      if (this.type === 'textarea') {
        this.$nextTick(this.resizeTextarea);
      }
    },
  },
  mounted() {
    this.resizeTextarea();
  },
  methods: {
    /**
     * 输入框内容改变handle
     */
    handleInput(event, options) {
      const { value } = event.target;
      // 输入中触发
      if (value !== this.value) {
        this.$emit('input', value);
        if (!this.isComposing) {
          this.$nextTick(this.setNativeInput);
        }
      }
      // 输入结束后触发
      if (!this.isComposing || (options && options.change)) {
        this.$emit('change', value);
      }
    },
    /**
     * 处理事件集合
     */
    handleComposition(e) {
      const { type } = e;
      if (this.$listeners[type]) {
        this.$emit(type, e);
      }
      if (type === 'compositionend') {
        this.isComposing = false;
        this.handleInput(e, { change: true });
      } else {
        this.isComposing = true;
      }
    },
    /**
     * 设置input值
     */
    setNativeInput() {
      const { input } = this.$refs;
      if (input && input.value !== this.value) {
        this.value = input.value;
      }
    },
    /**
     * 获得焦点
     */
    focus() {
      this.focused = true;
      this.$refs.input.focus();
    },
    /**
     * 失去焦点
     */
    blur() {
      this.focused = false;
      this.$refs.input.blur();
    },
    /**
     * 处理键盘事件
     */
    handleKeyup(e) {
      if (this.$listeners.keyup) {
        this.$emit('keyup', e);
      }
      if (isKey(e, 'enter') && !this.isComposing) {
        this.$emit('enter', e);
      }
    },
    /**
     * 设置textarea自适应高度
     */
    resizeTextarea() {
      if (this.$isServer) return;
      if (!this.autosize) {
        this.textareaCalcStyle = {
          minHeight: calcNodeHeight(this.$refs.input).minHeight,
        };
        return;
      }
      const { minRows = 2, maxRows = 6 } = this.autosize;
      this.textareaCalcStyle = calcNodeHeight(this.$refs.input, minRows, maxRows);
    },
  },
};
</script>
