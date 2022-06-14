import createHoc from '@wish/wt-vue/es/utils/hoc';

export default function (Component) {
  return createHoc({
    model: true,
    props: {
      defaultVisible: {
        type: Boolean,
        default: false
      },
      visible: Boolean
    },
    data: function data() {
      return {
        vs: this.defaultVisible
      };
    },

    computed: {
      isControlled: function isControlled() {
        return 'visible' in this.$options.propsData;
      },
      _visible: function _visible() {
        return this.isControlled ? this.visible : this.vs;
      }
    },
    methods: {
      handleVisibleChange: function handleVisibleChange(v) {
        if (!this.isControlled) {
          this.vs = v;
        }
        this.$emit('update:visible', v);
      },
      blur: function blur() {
        this.$refs.wrappedInstance.blur();
      },
      focus: function focus() {
        this.$refs.wrappedInstance.focus();
      },
      updatePopper: function updatePopper() {
        this.$refs.wrappedInstance.updatePopper();
      }
    }
  }, {
    withRef: true,
    mapStateToProps: function mapStateToProps(context) {
      return {
        visible: context._visible
      };
    },
    mapMethodToListener: function mapMethodToListener(context) {
      return {
        'update:visible': context.handleVisibleChange
      };
    }
  })(Component);
}