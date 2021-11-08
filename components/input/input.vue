<template>
  <div
    :class="{
      [`${prefix}-wrapper`]: true,
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-readonly`]: readonly,
      [`${prefix}-invalid`]: invalid,
      [`${prefix}-focused`]: focused,
    }"
    :style="fullWidth ? { width: '100%' } : {}"
  >
    <fieldset>
      <legend v-if="label">{{ label }}</legend>
      <input
        v-bind="$attrs"
        :value="inputValue"
        :readonly="readonly"
        :disabled="disabled"
        :class="prefix"
        ref="input"
        v-on="inputLisenters"
      />
    </fieldset>
  </div>
</template>
<script>
import Icon from '@components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
import { isKey } from '@/utils/key-codes';

export default {
  name: 'WdInput',
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
    readonly: Boolean,
    disabled: Boolean,
    invalid: Boolean,
    fullWidth: Boolean,
    label: String,
  },
  data() {
    return {
      focused: false,
      hovering: false,
      isComposing: false,
    };
  },

  computed: {
    prefix() {
      return this.config.getPrefixCls('input');
    },
    inputValue() {
      return this.hasValue ? this.value : '';
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
  methods: {
    handleInput(event, options) {
      const { value } = event.target;
      if (value !== this.value) {
        this.$emit('input', value);
        if (!this.isComposing) {
          this.$nextTick(this.setNativeInput);
        }
      }
      if (!this.isComposing || (options && options.change)) {
        this.$emit('change', value);
      }
    },
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
    setNativeInput() {
      const { input } = this.$refs;
      if (input && input.value !== this.value) {
        input.value = this.inputValue;
      }
    },
    focus() {
      this.focused = true;
      this.$refs.input.focus();
    },
    blur() {
      this.focused = false;
      this.$refs.input.blur();
    },
    handleKeyup(e) {
      if (this.$listeners.keyup) {
        this.$emit('keyup', e);
      }
      if (isKey(e, 'enter') && !this.isComposing) {
        this.$emit('enter', e);
      }
    },
  },
};
</script>
