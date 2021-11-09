<template>
  <fieldset
    :class="{
      [`${inpuPrefix}-wrapper`]: true,
      [`${inpuPrefix}-linetype`]: type === 'line',
      [`${inpuPrefix}-disabled`]: disabled,
      [`${inpuPrefix}-invalid`]: invalid,
      [`${inpuPrefix}-focused`]: focused,
      [`no-label-field`]: !label,
    }"
    :style="fullWidth ? { width: '100%' } : {}"
  >
    <legend v-if="label">{{ label }}</legend>
    <div :class="`${inpuPrefix}-con`">
      <slot name="prefix"></slot>
      <input
        v-bind="$attrs"
        :value="inputValue"
        :disabled="disabled"
        :class="inpuPrefix"
        ref="input"
        v-on="inputLisenters"
      />
      <slot name="suffix"></slot>
    </div>
  </fieldset>
</template>
<script>
import Icon from '@components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
import { isKey } from '@/utils/key-codes';

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
    type: String,
    disabled: Boolean,
    invalid: Boolean,
    fullWidth: Boolean,
    label: String,
    value: [String, Number],
  },
  data() {
    return {
      focused: false,
      hovering: false,
      isComposing: false,
    };
  },

  computed: {
    inpuPrefix() {
      return this.config.getPrefixCls('input');
    },
    inputValue() {
      return this.hasValue ? this.value : '';
    },
    hasValue() {
      return this.value === 0 || !!this.value;
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
        this.value = input.value;
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
