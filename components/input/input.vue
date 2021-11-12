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
          :disabled="disabled"
          :class="inputPrefix"
          :value="inputValue"
          ref="input"
          v-on="inputLisenters"
          :style="textareaCalcStyle"
        ></textarea>
        <input
          v-else
          v-bind="$attrs"
          :disabled="disabled"
          :class="inputPrefix"
          :value="inputValue"
          ref="input"
          v-on="inputLisenters"
        />
        <Icon v-if="showClearIcon" name="x-circle" @click.stop="handleClear" />
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
      validator: (val) => !val || ['line', 'textarea'].includes(val),
    },
    disabled: Boolean,
    invalid: Boolean,
    fullWidth: Boolean,
    label: String,
    value: [String, Number],
    validation: String,
    clearable: Boolean,
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
      nativeValue: '',
      noModel: false,
    };
  },

  computed: {
    inputPrefix() {
      return this.config.getPrefixCls('input');
    },
    showClearIcon() {
      return this.clearable && this.value && !this.disabled;
    },
    inputValue() {
      return this.noModel ? this.nativeValue : this.value || '';
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
    if (this.type === 'textarea') {
      this.resizeTextarea();
    }
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
          this.$nextTick(() => this.setNativeInput(value));
          this.$emit('change', value);
        }
      }
    },

    /**
     * 处理输入中文的合成事件
     */
    handleComposition(e) {
      const { type } = e;
      if (this.$listeners[type]) {
        this.$emit(type, e);
      }
      if (type === 'compositionend') {
        this.isComposing = false;
        this.handleInput(e);
      } else {
        this.isComposing = true;
      }
    },
    /**
     * 设置input值
     */
    setNativeInput(value) {
      const { input } = this.$refs;
      if (input && input.value !== this.value) {
        // 若没有v-model，则两个值会不同
        this.noModel = true;
        this.nativeValue = input.value;
      }
    },
    /**
     * 获得焦点
     */
    focus(e) {
      this.focused = true;
      this.$emit('focus', e);
      this.$refs.input.focus();
    },
    /**
     * 失去焦点
     */
    blur(e) {
      this.focused = false;
      this.$emit('blur', e);
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
    /**
     * 清楚输入框文本内容
     */
    handleClear() {
      this.$emit('clear');
      this.handleInput({ target: { value: '' } });
    },
  },
};
</script>
