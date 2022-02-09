import Input from './input.vue';
import { withFormItem } from '@components/form-item';

const WtInput = withFormItem('WtInput', Input, {
  withRef: true,
  methods: {
    focus() {
      return this.$refs.wrappedInstance.focus();
    },
    blur() {
      return this.$refs.wrappedInstance.blur();
    },
    select() {
      return this.$refs.wrappedInstance.select();
    },
  },
});

WtInput.install = function (Vue) {
  Vue.component(WtInput.name, WtInput);
};
export default WtInput;
