import createHoc from '@wish/wt-vue/es/utils/hoc';

export default function withExpansion(name, Component) {
  return createHoc({
    name: name,
    props: {
      value: [String, Number, Boolean, Object, Array]
    },
    inject: ['expansion'],
    computed: {
      active: function active() {
        var isArray = Array.isArray(this.expansion.value);
        return isArray ? this.expansion.value.indexOf(this.value) > -1 : this.expansion.value === this.value;
      }
    }
  }, {
    mapStateToProps: function mapStateToProps(context) {
      return {
        active: context.active,
        value: context.value
      };
    },
    mapMethodToListener: function mapMethodToListener(context) {
      return {
        itemClick: function itemClick(active, item) {
          context.expansion.$emit('itemClick', active, item);
        }
      };
    }
  })(Component);
}