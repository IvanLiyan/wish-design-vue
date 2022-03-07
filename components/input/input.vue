<template>
  <div :style="width && { width: `${width}px` }" :class="`${inputPrefix}-box`">
    <fieldset
      :class="{
        [`${inputPrefix}-wrapper`]: true,
        [`${inputPrefix}-${type}`]: type,
        [`${inputPrefix}-with-label`]: label,
        [`${inputPrefix}-disabled`]: disabled,
        [`${inputPrefix}-invalid`]: isInvalid,
        [`${inputPrefix}-focused`]: focused,
      }"
      :style="{ height: newHeight + 'px' }"
    >
      <legend v-if="label" :class="{ 'space-label': !label.trim() }">{{ label }}</legend>
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
          :type="type === 'password' ? 'password' : text"
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
    <em v-if="type === 'textarea' && isInvalid"> {{ inputValue.length }}/ {{ maxLength }}</em>
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
    // 类型
    type: {
      type: String,
      validator: (val) => !val || ['line', 'textarea'].includes(val),
    },
    // 禁止状态
    disabled: Boolean,
    // 校验不通过
    invalid: Boolean,
    // 宽
    width: Number,
    // 宽
    label: String,
    // 输入框的内容
    value: [String, Number],
    // 是否有清空按钮
    clearable: Boolean,
    // 自适应内容高度
    autosize: {
      type: [Boolean, Object],
      default: false,
    },
    // 限制输入的最大长度
    maxLength: {
      type: Number,
      default: 100,
    },
    newHeight: Number,
  },
  data() {
    return {
      // 聚焦
      focused: false,
      // hover
      hovering: false,
      // 是否在拼音拼写中
      isComposing: false,
      // textarea自适应高度
      textareaCalcStyle: {},
      // input自身值
      nativeValue: '',
      // 没有双向绑定
      noModel: false,
    };
  },

  computed: {
    inputPrefix() {
      return this.config.getPrefixCls('input');
    },

    // 是否显示清除icon
    showClearIcon() {
      return this.clearable && this.inputValue && !this.disabled;
    },

    // input值
    inputValue() {
      let value = (this.noModel ? this.nativeValue : this.value) || '';
      if (this.type !== 'textarea') {
        value = value.slice(0, this.maxLength);
      }
      return value;
    },
    // 是否校验不通过
    isInvalid() {
      return (this.type === 'textarea' && this.inputValue && this.inputValue.length > this.maxLength) || this.invalid;
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
      this.nativeValue = val;
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
      if (value !== this.value) {
        this.$emit('input', value);
        if (!this.isComposing) {
          this.setNativeInput(value);
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
      if (value !== this.value) {
        // 若没有v-model，则两个值会不同
        this.noModel = true;
        this.nativeValue = value;
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
      this.handleInput({ target: { value: '' } });
      this.nativeValue = '';
      this.$emit('clear');
    },
  },
};
</script>
