import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

function getArcLength(percent, radius) {
  return percent * 2 * radius * Math.PI;
}

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('svg', { class: _vm.prefix, style: _vm.style, attrs: { "viewBox": "0 0 " + _vm.sizeNumber + " " + _vm.sizeNumber } }, [_c('circle', { ref: "path", staticStyle: { "stroke-dasharray": "25px 1000px", "stroke-dashoffset": "0px" }, attrs: { "cx": _vm.center, "cy": _vm.center, "r": _vm.radius, "fill": "none", "stroke-linecap": "round", "stroke-width": _vm.thickness, "stroke": _vm.color } })]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtLoadingCircle',
  props: {
    thickness: {
      type: Number,
      default: 2
    },
    size: {
      type: Number,
      default: 20
    },
    color: {
      type: String,
      default: 'currentColor'
    },
    disableShrink: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('loading-circle');
    },
    sizeNumber: function sizeNumber() {
      return this.size;
    },
    diameter: function diameter() {
      return getArcLength(1, (this.sizeNumber - this.thickness) / 2);
    },
    radius: function radius() {
      return (this.sizeNumber - this.thickness) / 2;
    },
    center: function center() {
      return this.sizeNumber / 2;
    },
    style: function style() {
      return {
        width: this.sizeNumber + 'px',
        height: this.sizeNumber + 'px'
      };
    }
  },
  watch: {
    disableShrink: function disableShrink(n) {
      !n ? this.scalePath(this.$refs.path) : clearTimeout(this.scalePathTimer);
    }
  },
  mounted: function mounted() {
    var path = this.$refs.path,
        disableShrink = this.disableShrink;

    if (!disableShrink) {
      this.scalePath(path);
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this.scalePathTimer);
  },

  methods: {
    scalePath: function scalePath(path) {
      var _this = this;

      var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var diameter = this.diameter;

      step = step % 3;
      switch (step) {
        case 0:
          path.style.transitionDuration = '0ms';
          path.style.strokeDasharray = '3 ' + diameter;
          path.style.strokeDashoffset = '0';
          break;
        case 1:
          path.style.transitionDuration = '700ms';
          path.style.strokeDasharray = 0.7 * diameter + ' ' + diameter;
          path.style.strokeDashoffset = -0.3 * diameter;
          break;
        case 2:
          path.style.transitionDuration = '700ms'; // 多出100ms用于显示最后一点
          path.style.strokeDasharray = 0.7 * diameter + ' ' + diameter;
          path.style.strokeDashoffset = 3 - diameter;
          // return
          break;
      }
      this.scalePathTimer = setTimeout(function () {
        _this.scalePath(path, step + 1);
      }, step ? 700 : 100);
    }
  }
};