import createHoc from '@/utils/hoc';
import Popover from './popover.vue';

export default createHoc({
  name: 'MtdPopover',
  model: {
    prop: 'visible',
  },
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
    handleInput (v) {
      this.$emit('input', v);
      if (!this.isControlled) {
        this.vs = v;
      }
    },
    updatePopper () {
      const { wrappedInstance } = this.$refs;
      wrappedInstance && wrappedInstance.updatePopper();
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
      input: context.handleInput,
    };
  },
})(Popover);
