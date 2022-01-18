import Select from './select.vue';
import { withFormItem } from '@components/form-item';

const WtSelect = withFormItem('WtSelect', Select, {
  withRef: true,
  methods: {
    // 由于暂时不支持 visible 属性，先提供手动展开方法
    // https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/3278600
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
