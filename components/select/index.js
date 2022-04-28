import Select from './select.vue';
import { withFormItem } from '@components/form-item';

const WtSelect = withFormItem('WtSelect', Select, {
  withRef: true,
  methods: {
    toggle(visible) {
      const { wrappedInstance } = this.$refs;
      const nextVisible = visible !== undefined ? visible : !wrappedInstance.focused;
      nextVisible ? this.focus() : this.blur();
    },
    focus() {
      const { wrappedInstance } = this.$refs;
      wrappedInstance.focus();
    },
    blur() {
      const { wrappedInstance } = this.$refs;
      wrappedInstance.blur();
    },
  },
  key(props) {
    return props.multiple ? 'multiple' : '';
  },
});

/* istanbul ignore next */
WtSelect.install = function (Vue) {
  Vue.component(WtSelect.name, WtSelect);
};

export default WtSelect;
