import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: [_vm.prefix, !_vm.isCenter && _vm.prefix + "-right", _vm.direction && _vm.prefix + "-" + _vm.direction] }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtStepper',
  props: {
    dot: {
      type: Boolean,
      default: false
    },
    space: [String, Number],
    direction: {
      type: String,
      default: 'horizontal'
    },
    active: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: 'process'
    },
    isCenter: {
      type: Boolean,
      default: false
    },
    simple: Boolean
  },
  provide: function provide() {
    return {
      stepper: this
    };
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  data: function data() {
    return {
      stepper: []
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('stepper');
    }
  },
  watch: {
    stepper: function stepper(_stepper) {
      _stepper.forEach(function (child, index) {
        child.index = index;
      });
    }
  },
  created: function created() {
    this.$on('addStep', this.add);
    this.$on('removeStep', this.remove);
  },

  methods: {
    add: function add(step) {
      this.stepper.push(step);
    },
    remove: function remove(step) {
      var index = this.stepper.indexOf(step);
      if (index > -1) {
        this.stepper.splice(index, 1);
      }
    }
  }
};