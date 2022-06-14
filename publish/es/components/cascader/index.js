import Cascader from './cascader';
import { withFormItem } from '@wish/wt-vue/es/components/form-item';
import CreateComponent from './control';

var WtCascader = withFormItem('WtCascader', CreateComponent(Cascader), {
  withRef: true,
  noLoading: true,
  methods: {
    focus: function focus() {
      return this.$refs.wrappedInstance.focus();
    },
    blur: function blur() {
      return this.$refs.wrappedInstance.blur();
    }
  }
});

/* istanbul ignore next */
WtCascader.install = function (Vue) {
  Vue.component(WtCascader.name, WtCascader);
};

export default WtCascader;