import Cascader from './cascader.vue';
import { withFormItem } from '@components/form-item';
import CreateComponent from './control';

const WtCascader = withFormItem('WtCascader', CreateComponent(Cascader), {
  withRef: true,
  noLoading: true,
  methods: {
    focus() {
      return this.$refs.wrappedInstance.focus();
    },
    blur() {
      return this.$refs.wrappedInstance.blur();
    },
  },
});

/* istanbul ignore next */
WtCascader.install = function (Vue) {
  Vue.component(WtCascader.name, WtCascader);
};

export default WtCascader;
