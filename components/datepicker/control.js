import createHoc from '@/utils/hoc';

export default function (name, Component) {
  return createHoc({
    name: name,
    model: true,
    props: {
      open: Boolean,
    },
    data () {
      return {
        isOpened: false,
      };
    },
    computed: {
      isControlled () {
        return 'open' in this.$options.propsData;
      },
      _open () {
        return this.isControlled ? this.open : this.isOpened;
      },
    },
    methods: {
      handleOpenChange (v) {
        if (!this.isControlled) {
          this.isOpened = v;
        }
        this.$emit('update:open', v);
      },
    },
  }, {
    withRef: true,
    mapStateToProps (context) {
      return {
        open: context._open,
      };
    },
    mapMethodToListener (context) {
      return {
        'update:open': context.handleOpenChange,
      };
    },
  })(Component);
}
