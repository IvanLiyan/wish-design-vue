import _Symbol from 'babel-runtime/core-js/symbol';
import createHoc from '@wish/wt-vue/es/utils/hoc';

export default function withRadioGroup(name, Component) {
  return createHoc({
    name: name,
    props: {
      value: [String, Number, Boolean, Function, Object, Array, _Symbol],
      disabled: Boolean,
      name: String,
      checked: Boolean,
      size: String
    },
    inject: {
      radioGroup: {
        default: ''
      }
    },
    computed: {
      _checked: function _checked() {
        return this.radioGroup ? this.radioGroup.value === this.value : this.checked;
      },
      _disabled: function _disabled() {
        return (this.radioGroup || {}).disabled || this.disabled;
      },
      inputName: function inputName() {
        return this.radioGroup ? this.radioGroup.name : this.name;
      }
    }
  }, {
    mapStateToProps: function mapStateToProps(context) {
      return {
        checked: context._checked,
        disabled: context._disabled,
        name: context.inputName,
        value: context.value
      };
    },
    mapMethodToListener: function mapMethodToListener(context) {
      return {
        change: function change(v) {
          if (context.radioGroup) {
            context.radioGroup.$emit('radioChange', context.value);
          } else {
            context.$emit('change', v);
          }
        }
      };
    }
  })(Component);
}