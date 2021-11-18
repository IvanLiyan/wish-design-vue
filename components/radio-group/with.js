import createHoc from '@/utils/hoc';

export default function withRadioGroup(name, Component) {
  return createHoc(
    {
      name: name,
      props: {
        value: [String, Number, Boolean, Function, Object, Array, Symbol],
        disabled: Boolean,
        name: String,
        checked: Boolean,
        size: String,
      },
      inject: {
        radioGroup: {
          default: '',
        },
      },
      computed: {
        _checked() {
          return this.radioGroup ? this.radioGroup.value === this.value : this.checked;
        },
        _disabled() {
          return (this.radioGroup || {}).disabled || this.disabled;
        },
        inputName() {
          return this.radioGroup ? this.radioGroup.name : this.name;
        },
        // _size () {
        //   return this.radioGroup ? this.radioGroup.size : this.size;
        // },
      },
    },
    {
      mapStateToProps(context) {
        return {
          checked: context._checked,
          disabled: context._disabled,
          name: context.inputName,
          value: context.value,
        };
      },
      mapMethodToListener(context) {
        return {
          input(v) {
            if (context.radioGroup) {
              context.radioGroup.$emit('radioChange', context.value);
            } else {
              context.$emit('input', v);
            }
          },
        };
      },
    },
  )(Component);
}
