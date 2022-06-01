import Input from './input';
import { withFormItem } from '@wish/wt-vue/es/components/form-item';

var WtInput = withFormItem('WtInput', Input, {
  withRef: true,
  methods: {
    focus: function focus() {
      return this.$refs.wrappedInstance.focus();
    },
    blur: function blur() {
      return this.$refs.wrappedInstance.blur();
    },
    select: function select() {
      return this.$refs.wrappedInstance.select();
    }
  }
});

WtInput.install = function (Vue) {
  Vue.component(WtInput.name, WtInput);
};
export default WtInput;