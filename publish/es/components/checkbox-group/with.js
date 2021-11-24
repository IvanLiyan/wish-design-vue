import _Symbol from 'babel-runtime/core-js/symbol';
import createHoc from '@wish/wt-vue/es/utils/hoc';

export default function withCheckboxGroup(name, Component) {
  return createHoc({
    name: name,
    model: {
      prop: 'checked'
    },
    props: {
      value: [String, Number, Boolean, Function, Object, _Symbol],
      disabled: Boolean,
      name: String,
      checked: Boolean
    },
    inject: {
      checkboxGroup: {
        default: ''
      }
    },
    computed: {
      _checked: function _checked() {
        return this.checkboxGroup ? this.checkboxGroup.value.indexOf(this.value) > -1 : this.checked;
      },
      _disabled: function _disabled() {
        return (this.checkboxGroup || {}).disabled || this.disabled;
      },
      inputName: function inputName() {
        return this.checkboxGroup ? this.checkboxGroup.name : this.name;
      },
      _size: function _size() {
        return this.checkboxGroup ? this.checkboxGroup.size : this.size;
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
        input: function input(checked) {
          if (context.checkboxGroup) {
            context.checkboxGroup.$emit('checkboxChange', checked, context.value);
          } else {
            context.$emit('input', checked);
            context.$emit('change', checked);
          }
        }
      };
    }
  })(Component);
}