import createHoc from '@/utils/hoc';

export default function (Component) {
  return createHoc({
    model: true,
    props: {
      defaultVisible: {
        type: Boolean,
        default: false,
      },
      visible: Boolean,
    },
    data () {
      return {
        vs: this.defaultVisible,
      };
    },
    computed: {
      isControlled () {
        return 'visible' in this.$options.propsData;
      },
      _visible () {
        return this.isControlled ? this.visible : this.vs;
      },
    },
    methods: {
      handleVisibleChange (v) {
        if (!this.isControlled) {
          this.vs = v;
        }
        this.$emit('update:visible', v);
      },
      blur () {
        this.$refs.wrappedInstance.blur();
      },
      focus () {
        this.$refs.wrappedInstance.focus();
      },
      updatePopper () {
        this.$refs.wrappedInstance.updatePopper();
      },
    },
  }, {
    withRef: true,
    mapStateToProps (context) {
      return {
        visible: context._visible,
      };
    },
    mapMethodToListener (context) {
      return {
        'update:visible': context.handleVisibleChange,
      };
    },
  })(Component);
}
