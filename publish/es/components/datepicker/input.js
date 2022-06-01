import createHoc from '@wish/wt-vue/es/utils/hoc';
import Input from '@wish/wt-vue/es/components/input';

export default createHoc({
  name: 'DatePickerInput',
  props: {
    currentValue: {
      type: String
    },
    label: {
      type: String
    }
  },
  data: function data() {
    return {
      value: this.currentValue,
      focused: false
    };
  },

  watch: {
    currentValue: function currentValue(n) {
      this.value = n;
    },
    focused: function focused(n) {
      if (!n) {
        this.value = this.currentValue;
      }
    }
  },
  methods: {
    handleFocus: function handleFocus(e) {
      this.focused = true;
      this.$emit('focus', e);
    },
    handleBlur: function handleBlur(e) {
      if (this.value !== this.currentValue) {
        this.$emit('input', this.value);
      }
      this.focused = false;
      this.$emit('blur', e);
    },
    handleEnter: function handleEnter(e) {
      if (this.value !== this.currentValue) {
        this.$emit('input', this.value);
      }
      this.$emit('enter', e);
    },
    handleInput: function handleInput(v) {
      this.value = v;
    },
    focus: function focus() {
      return this.$refs.wrappedInstance.focus();
    },
    blur: function blur() {
      return this.$refs.wrappedInstance.blur();
    }
  }
}, {
  withRef: true,
  mapStateToProps: function mapStateToProps(context) {
    return {
      value: context.value,
      label: context.label
    };
  },
  mapMethodToListener: function mapMethodToListener(context) {
    return {
      input: context.handleInput,
      change: context.handleInput,
      blur: context.handleBlur,
      focus: context.handleFocus,
      enter: context.handleEnter
    };
  }
})(Input);