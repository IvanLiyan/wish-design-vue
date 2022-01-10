import createHoc from '@/utils/hoc';
import Input from '@components/input';

export default createHoc({
  name: 'DatePickerInput',
  props: {
    currentValue: {
      type: String,
    },
  },
  data () {
    return {
      value: this.currentValue,
      focused: false,
    };
  },
  watch: {
    currentValue (n) {
      this.value = n;
    },
    focused (n) {
      if (!n) {
        this.value = this.currentValue;
      }
    },
  },
  methods: {
    handleFocus (e) {
      this.focused = true;
      this.$emit('focus', e);
    },
    handleBlur (e) {
      if (this.value !== this.currentValue) {
        this.$emit('input', this.value);
      }
      this.focused = false;
      this.$emit('blur', e);
    },
    handleEnter (e) {
      if (this.value !== this.currentValue) {
        this.$emit('input', this.value);
      }
      this.$emit('enter', e);
    },
    handleInput (v) {
      this.value = v;
    },
    focus () {
      return this.$refs.wrappedInstance.focus();
    },
    blur () {
      return this.$refs.wrappedInstance.blur();
    },
  },
}, {
  withRef: true,
  mapStateToProps (context) {
    return {
      value: context.value,
    };
  },
  mapMethodToListener (context) {
    return {
      input: context.handleInput,
      blur: context.handleBlur,
      focus: context.handleFocus,
      enter: context.handleEnter,
    };
  },
})(Input);
