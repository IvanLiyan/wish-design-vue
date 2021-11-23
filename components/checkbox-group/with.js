import createHoc from '@/utils/hoc';

export default function withCheckboxGroup(name, Component) {
  return createHoc(
    {
      name: name,
      model: {
        prop: 'checked',
      },
      props: {
        value: [String, Number, Boolean, Function, Object, Symbol],
        disabled: Boolean,
        name: String,
        checked: Boolean,
      },
      inject: {
        checkboxGroup: {
          default: '',
        },
      },
      computed: {
        _checked() {
          return this.checkboxGroup ? this.checkboxGroup.value.indexOf(this.value) > -1 : this.checked;
        },
        _disabled() {
          return (this.checkboxGroup || {}).disabled || this.disabled;
        },
        inputName() {
          return this.checkboxGroup ? this.checkboxGroup.name : this.name;
        },
        _size() {
          return this.checkboxGroup ? this.checkboxGroup.size : this.size;
        },
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
          input(checked) {
            if (context.checkboxGroup) {
              context.checkboxGroup.$emit('checkboxChange', checked, context.value);
            } else {
              context.$emit('input', checked);
              context.$emit('change', checked);
            }
          },
        };
      },
    },
  )(Component);
}
