import createHoc from '@/utils/hoc';

export default function withExpansion(name, Component) {
  return createHoc(
    {
      name,
      props: {
        value: [String, Number, Boolean, Object, Array],
      },
      inject: ['expansion'],
      computed: {
        active() {
          const isArray = Array.isArray(this.expansion.value);
          return isArray ? this.expansion.value.indexOf(this.value) > -1 : this.expansion.value === this.value;
        },
      },
    },
    {
      mapStateToProps(context) {
        return {
          active: context.active,
          value: context.value,
        };
      },
      mapMethodToListener(context) {
        return {
          itemClick: function (active, item) {
            context.expansion.$emit('itemClick', active, item);
          },
        };
      },
    },
  )(Component);
}
