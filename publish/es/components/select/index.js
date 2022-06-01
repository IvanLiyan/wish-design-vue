import Select from './select';
import { withFormItem } from '@wish/wt-vue/es/components/form-item';

var WtSelect = withFormItem('WtSelect', Select, {
  withRef: true,
  methods: {
    toggle: function toggle(visible) {
      var wrappedInstance = this.$refs.wrappedInstance;

      var nextVisible = visible !== undefined ? visible : !wrappedInstance.focused;
      nextVisible ? this.focus() : this.blur();
    },
    focus: function focus() {
      var wrappedInstance = this.$refs.wrappedInstance;

      wrappedInstance.focus();
    },
    blur: function blur() {
      var wrappedInstance = this.$refs.wrappedInstance;

      wrappedInstance.blur();
    }
  },
  key: function key(props) {
    return props.multiple ? 'multiple' : '';
  }
});

/* istanbul ignore next */
WtSelect.install = function (Vue) {
  Vue.component(WtSelect.name, WtSelect);
};

export default WtSelect;