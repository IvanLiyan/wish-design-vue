import Select from './select';
import { withFormItem } from '@wish/wt-vue/es/components/form-item';

var WtSelect = withFormItem('WtSelect', Select, {
  withRef: true,
  methods: {
    // 由于暂时不支持 visible 属性，先提供手动展开方法
    // https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/3278600
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