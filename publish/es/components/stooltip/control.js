import createHoc from '@wish/wt-vue/es/utils/hoc';
import WtStooltip from './tooltip';

export default createHoc({
  name: 'WtStooltip',
  model: {
    prop: 'visible'
  },
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
    handleInput: function handleInput(v) {
      this.$emit('input', v);
      if (!this.isControlled) {
        this.vs = v;
      }
    },
    updatePopper: function updatePopper() {
      var wrappedInstance = this.$refs.wrappedInstance;

      wrappedInstance && wrappedInstance.updatePopper();
    },
    getPopper: function getPopper() {
      var wrappedInstance = this.$refs.wrappedInstance;

      return wrappedInstance.$refs.popper;
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
      input: context.handleInput
    };
  }
})(WtStooltip);