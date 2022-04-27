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
          /**
           *
           * 监听radio的change事件并进行透传逻辑处理
           */
          change(v) {
            if (context.radioGroup) {
              context.$emit('change', context.value);
              context.radioGroup.$emit('radioChange', context.value);
            } else {
              context.$emit('change', v);
            }
          },
        };
      },
    },
  )(Component);
}
